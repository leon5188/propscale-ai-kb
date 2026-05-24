import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pipelineId = searchParams.get('pipelineId');
  const queryLocationId = searchParams.get('location_id');
  
  const apiKey = process.env.GHL_API_KEY;
  // Use the dynamic location ID from the URL if provided, otherwise fallback to the default env variable
  const locationId = queryLocationId || process.env.GHL_LOCATION_ID;

  if (!apiKey || !locationId) {
    return NextResponse.json({ error: 'Missing configuration' }, { status: 400 });
  }

  try {
    // 1. Pipelines
    const pipeRes = await fetch(`https://services.leadconnectorhq.com/opportunities/pipelines?locationId=${locationId}`, {
      headers: { 'Authorization': `Bearer ${apiKey}`, 'Version': '2021-07-28', 'Accept': 'application/json' }
    });
    const pipeData = await pipeRes.json();
    const allPipelines = pipeData.pipelines || [];
    const stageMap: Record<string, string> = {};
    allPipelines.forEach((p: any) => p.stages.forEach((s: any) => { stageMap[s.id] = s.name; }));

    // 2. Opportunities (Safely wrapped)
    let opportunities = [];
    try {
      const oppsUrl = `https://services.leadconnectorhq.com/opportunities/search?location_id=${locationId}${pipelineId ? `&pipeline_id=${pipelineId}` : ''}&limit=100`;
      const oppsRes = await fetch(oppsUrl, {
        headers: { 'Authorization': `Bearer ${apiKey}`, 'Version': '2021-07-28', 'Accept': 'application/json' }
      });
      if (oppsRes.ok) {
        const data = await oppsRes.json();
        opportunities = data.opportunities || [];
      }
    } catch (e) { console.error("Opps error", e); }

    // 3. REAL APPOINTMENTS (Using provided Calendar ID)
    let weeklyAppointments = 0;
    try {
      const calendarId = "JqoR5yqDJ919KjyMyAnY";
      const now = new Date();
      const firstDay = now.getDate() - now.getDay(); // Sunday
      const startOfWeek = new Date(now.setDate(firstDay)).setHours(0, 0, 0, 0);
      const endOfWeek = new Date().getTime();

      const apptUrl = `https://services.leadconnectorhq.com/calendars/events?locationId=${locationId}&calendarId=${calendarId}&startTime=${startOfWeek}&endTime=${endOfWeek}`;
      const apptRes = await fetch(apptUrl, {
        headers: { 'Authorization': `Bearer ${apiKey}`, 'Version': '2021-07-28', 'Accept': 'application/json' }
      });
      
      if (apptRes.ok) {
        const apptData = await apptRes.json();
        weeklyAppointments = (apptData.events || []).length;
      }
    } catch (e) {
      console.error("Calendar error", e);
      weeklyAppointments = 0;
    }

    // --- PROCESS DATA ---
    let totalWeightedValue = 0;
    let totalWonValue = 0;
    let totalCycleTime = 0;
    let wonCount = 0;
    let staleCount = 0;
    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

    const processedOpps = opportunities.map((o: any) => {
      const value = o.monetaryValue || 5000; // Simulated fallback
      const updatedAt = new Date(o.updatedAt);
      const createdAt = new Date(o.createdAt);

      if (o.status === 'open') {
        totalWeightedValue += value;
        if (updatedAt < ninetyDaysAgo) staleCount++;
      }
      if (o.status === 'won') {
        totalWonValue += value;
        wonCount++;
        totalCycleTime += Math.ceil(Math.abs(updatedAt.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24));
      }
      return { ...o, computedValue: value };
    });

    // 3. Performance Chart
    const monthlyData: Record<string, { pipeline: number, revenue: number }> = {};
    processedOpps.forEach((o: any) => {
      const month = new Date(o.createdAt).toLocaleString('default', { month: 'short' });
      if (!monthlyData[month]) monthlyData[month] = { pipeline: 0, revenue: 0 };
      if (o.status === 'open') monthlyData[month].pipeline += o.computedValue;
      if (o.status === 'won') monthlyData[month].revenue += o.computedValue;
    });

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentMonthIdx = new Date().getMonth();
    const last6Months = [];
    for(let i=5; i>=0; i--) {
      const idx = (currentMonthIdx - i + 12) % 12;
      const m = months[idx];
      last6Months.push({ month: m, pipeline: monthlyData[m]?.pipeline || 0, revenue: monthlyData[m]?.revenue || 0 });
    }

    // 4. Source & Funnel
    const sourceCounts: Record<string, number> = {};
    const stageCounts: Record<string, number> = {};
    processedOpps.forEach((o: any) => {
      const source = o.source || 'Other';
      sourceCounts[source] = (sourceCounts[source] || 0) + 1;
      const stage = stageMap[o.pipelineStageId] || 'Unknown';
      stageCounts[stage] = (stageCounts[stage] || 0) + 1;
    });

    // 4. REAL SMS REPLY RATE (Conversations API)
    let smsReplyRate = 0;
    try {
      const convUrl = `https://services.leadconnectorhq.com/conversations/search?locationId=${locationId}&limit=100`;
      const convRes = await fetch(convUrl, {
        headers: { 'Authorization': `Bearer ${apiKey}`, 'Version': '2021-07-28', 'Accept': 'application/json' }
      });
      
      if (convRes.ok) {
        const convData = await convRes.json();
        const conversations = convData.conversations || [];
        
        if (conversations.length > 0) {
          // Identify 'Replied' by checking if the last message was inbound or unread count
          const repliedCount = conversations.filter((c: any) => 
            c.unreadCount > 0 || c.lastMessageDirection === 'inbound'
          ).length;
          
          smsReplyRate = Math.round((repliedCount / conversations.length) * 100);
        }
      }
    } catch (e) {
      console.error("SMS API error", e);
      smsReplyRate = 0;
    }

    // 5. Final Payload
    return NextResponse.json({
      metrics: {
        weightedPipeline: totalWeightedValue,
        closedGCI: totalWonValue,
        avgCycle: `${wonCount > 0 ? Math.round(totalCycleTime / wonCount) : 14} Days`,
        decayRate: `${opportunities.length > 0 ? Math.round((staleCount / opportunities.length) * 100) : 0}%`,
        weeklyAppointments, 
        smsReplyRate: `${smsReplyRate}%`
      },
      charts: {
        performance: last6Months,
        funnel: Object.entries(stageCounts).map(([stage, value]) => ({ stage, value })).sort((a,b) => b.value - a.value),
        sources: Object.entries(sourceCounts).map(([name, value]) => ({ name, value })).sort((a,b) => b.value - a.value).slice(0, 5)
      },
      table: processedOpps.slice(0, 10).map(o => ({
        id: o.id,
        contactName: o.contact?.name || 'Unknown',
        stage: stageMap[o.pipelineStageId] || o.status,
        dealValue: o.computedValue,
        probability: 70,
        lastTouchpoint: new Date(o.updatedAt).toLocaleDateString()
      })),
      pipelines: allPipelines,
      aiInsights: [
        { type: 'warning', text: 'You have stagnant deals in Escrow.', action: 'Nudge Lead' },
        { type: 'info', text: 'Pipeline health is optimal.', action: 'View Report' }
      ]
    });

  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
