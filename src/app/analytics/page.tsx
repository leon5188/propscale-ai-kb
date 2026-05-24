"use client"

import * as React from "react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  PieChart,
  Pie,
} from "recharts"
import {
  ArrowUpRight,
  ChevronDown,
  Clock,
  Database,
  DollarSign,
  Filter,
  MoreHorizontal,
  Target,
  TrendingUp,
  Loader2,
  LayoutDashboard,
  Zap,
  Sparkles,
  AlertCircle,
  Lightbulb,
  CalendarCheck,
  MessageSquareQuote,
} from "lucide-react"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// --- Types ---

interface Deal {
  id: string
  contactName: string
  stage: string
  dealValue: number
  probability: number
  lastTouchpoint: string
}

// --- Helpers ---

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value)
}

const COLORS = ["#2563eb", "#10b981", "#6366f1", "#f59e0b", "#8b5cf6", "#ec4899"]

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }: any) => {
  const RADIAN = Math.PI / 180;
  const radius = outerRadius + 25;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text 
      x={x} 
      y={y} 
      fill="#64748b" 
      textAnchor={x > cx ? 'start' : 'end'} 
      dominantBaseline="central" 
      className="text-[10px] font-bold"
    >
      {`${name} ${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

// --- Main Component ---

export default function AnalyticsDashboard() {
  const [data, setData] = React.useState<any>(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const [selectedPipelineId, setSelectedPipelineId] = React.useState("")
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [dateRange, setDateRange] = React.useState("Last 30 Days")

  // 1. Fetch data from our API route
  React.useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      try {
        const queryParams = new URLSearchParams(window.location.search);
        const locId = queryParams.get('location_id');
        
        let url = selectedPipelineId 
          ? `/api/ghl/analytics?pipelineId=${selectedPipelineId}` 
          : '/api/ghl/analytics'
          
        if (locId) {
          url += (url.includes('?') ? '&' : '?') + `location_id=${locId}`
        }

        const res = await fetch(url)
        const json = await res.json()
        setData(json)
      } catch (error) {
        console.error("Failed to load analytics:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [selectedPipelineId, dateRange])

  // --- Handlers ---

  const handleExport = () => {
    if (!data?.table) return
    const headers = ["Contact Name", "Stage", "Value", "Probability", "Last Touchpoint"]
    const csvContent = [
      headers.join(","),
      ...data.table.map((row: any) => 
        `"${row.contactName}","${row.stage}",${row.dealValue},${row.probability}%,"${row.lastTouchpoint}"`
      )
    ].join("\n")

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `propscale-analytics-${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const openGHLCrm = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const locationId = queryParams.get('location_id') || "dcJGZR1L77vJd0rvaNI5"
    window.open(`https://app.gohighlevel.com/v2/location/${locationId}/opportunities/list`, "_blank")
  }

  // 2. Table Configuration
  const columns: ColumnDef<Deal>[] = [
    {
      accessorKey: "contactName",
      header: "Contact Name",
      cell: ({ row }) => <div className="font-semibold text-gray-900">{row.getValue("contactName")}</div>,
    },
    {
      accessorKey: "stage",
      header: "Stage",
      cell: ({ row }) => (
        <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-100 hover:bg-blue-100 capitalize">
          {row.getValue("stage")}
        </Badge>
      ),
    },
    {
      accessorKey: "dealValue",
      header: ({ column }) => (
        <div className="text-right cursor-pointer flex items-center justify-end" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Value <ChevronDown className="ml-2 h-4 w-4" />
        </div>
      ),
      cell: ({ row }) => <div className="text-right font-bold text-gray-900">{formatCurrency(row.getValue("dealValue"))}</div>,
    },
    {
      accessorKey: "probability",
      header: "Prob %",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Progress value={row.getValue("probability")} className="h-2 w-16 bg-gray-100" />
          <span className="text-xs font-medium text-gray-600">{row.getValue("probability")}%</span>
        </div>
      ),
    },
    {
      accessorKey: "lastTouchpoint",
      header: "Updated",
      cell: ({ row }) => <div className="text-gray-500 text-xs">{row.getValue("lastTouchpoint")}</div>,
    },
    {
      id: "actions",
      cell: () => (
        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-600">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      ),
    },
  ]

  const table = useReactTable({
    data: data?.table || [],
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  // 3. Loading & Error State
  if (isLoading && !data) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-gray-50/50">
        <div className="relative">
          <div className="absolute inset-0 animate-ping rounded-full bg-blue-100 opacity-75"></div>
          <div className="relative rounded-full bg-white p-4 shadow-xl border border-blue-50">
            <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
          </div>
        </div>
        <span className="mt-6 text-xl font-bold text-gray-900 tracking-tight">PropScale Intelligence</span>
        <p className="mt-2 text-gray-500 font-medium animate-pulse">Syncing with GoHighLevel CRM...</p>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="flex h-screen flex-col items-center justify-center space-y-4 bg-gray-50">
        <div className="rounded-full bg-red-50 p-4 border border-red-100">
           <Zap className="h-8 w-8 text-red-600" />
        </div>
        <div className="text-2xl font-bold text-gray-900">Connection Interrupted</div>
        <p className="max-w-xs text-center text-gray-500 font-medium">We couldn't reach your GHL account. Please verify your API credentials.</p>
        <Button size="lg" className="bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200" onClick={() => window.location.reload()}>Retry Connection</Button>
      </div>
    )
  }

  const selectedPipelineName = data?.pipelines?.find((p: any) => p.id === selectedPipelineId)?.name || "All Pipelines"

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-lg bg-blue-600 text-white text-xs font-bold uppercase tracking-wider mb-2">
              <LayoutDashboard className="w-3 h-3" />
              <span>PropScale AI Command Center</span>
            </div>
            <h2 className="text-4xl font-black text-gray-900 tracking-tight">Analytics Dashboard</h2>
            <div className="flex items-center gap-3">
              <span className="text-gray-500 font-medium">Viewing Data for:</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-9 border-blue-100 bg-white text-blue-600 font-bold hover:bg-blue-50 hover:text-blue-700 transition-all rounded-xl shadow-sm">
                    {selectedPipelineName}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="rounded-xl p-2 border-gray-100 shadow-xl w-56">
                  <DropdownMenuItem onClick={() => setSelectedPipelineId("")} className="rounded-lg font-medium">All Pipelines</DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-50" />
                  {data?.pipelines?.map((pipe: any) => (
                    <DropdownMenuItem key={pipe.id} onClick={() => setSelectedPipelineId(pipe.id)} className="rounded-lg font-medium">
                      {pipe.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="flex gap-2">
             <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="lg" className="rounded-xl border-gray-200 bg-white font-bold text-gray-600 shadow-sm hover:bg-gray-50">
                    <Filter className="mr-2 h-4 w-4" />
                    {dateRange}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="rounded-xl p-2">
                  <DropdownMenuItem onClick={() => setDateRange("Last 7 Days")}>Last 7 Days</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setDateRange("Last 30 Days")}>Last 30 Days</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setDateRange("Last 90 Days")}>Last 90 Days</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setDateRange("Year to Date")}>Year to Date</DropdownMenuItem>
                </DropdownMenuContent>
             </DropdownMenu>
             <Button size="lg" onClick={handleExport} className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-100 px-8">
               Export Report
             </Button>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          {/* Main Dashboard Content */}
          <div className="lg:col-span-9 space-y-8">
            
            {/* Hero Metrics Row */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
              <MetricCard 
                title="Weighted Pipeline" 
                value={formatCurrency(data?.metrics?.weightedPipeline || 0)} 
                description="+12.4% trend" 
                trend="up" 
                icon={<DollarSign className="h-5 w-5" />} 
              />
              <MetricCard 
                title="Closed GCI YTD" 
                value={formatCurrency(data?.metrics?.closedGCI || 0)} 
                progress={34} 
                progressLabel="Goal: $250k" 
                icon={<Target className="h-5 w-5" />} 
              />
              <MetricCard 
                title="Weekly Appts" 
                value={data?.metrics?.weeklyAppointments || 0} 
                description="Active bookings" 
                trend="up" 
                icon={<CalendarCheck className="h-5 w-5" />} 
              />
              <MetricCard 
                title="SMS Reply Rate" 
                value={data?.metrics?.smsReplyRate || "0%"} 
                description="Engagement" 
                trend="up" 
                icon={<MessageSquareQuote className="h-5 w-5" />} 
              />
              <MetricCard 
                title="Avg Deal Cycle" 
                value={data?.metrics?.avgCycle || "0 Days"} 
                description="Stable vs Q1" 
                trend="neutral" 
                icon={<Clock className="h-5 w-5" />} 
              />
              <MetricCard 
                title="Database Decay" 
                value={data?.metrics?.decayRate || "0%"} 
                description="Attention needed" 
                trend="down" 
                icon={<Database className="h-5 w-5" />} 
              />
            </div>

            {/* Charts Row */}
            <div className="grid gap-6 md:grid-cols-7">
              <Card className="md:col-span-4 rounded-3xl shadow-xl shadow-gray-100/50 border-gray-100/50 overflow-hidden bg-white">
                <CardHeader className="border-b border-gray-50 bg-gray-50/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl font-bold text-gray-900">Performance Trend</CardTitle>
                      <CardDescription className="font-medium">Pipeline volume vs Won Revenue</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-8 px-4 pb-4">
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={data?.charts?.performance || []}>
                        <defs>
                          <linearGradient id="colorPipeline" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#2563eb" stopOpacity={0.15} />
                            <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v/1000}k`} />
                        <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                        <Area type="monotone" dataKey="pipeline" stroke="#2563eb" strokeWidth={4} fill="url(#colorPipeline)" />
                        <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} strokeDasharray="5 5" fillOpacity={0} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-3 rounded-3xl shadow-xl shadow-gray-100/50 border-gray-100/50 overflow-hidden bg-white">
                <CardHeader className="border-b border-gray-50 bg-gray-50/30">
                  <CardTitle className="text-xl font-bold text-gray-900">Lead Sources</CardTitle>
                  <CardDescription className="font-medium">Channel distribution</CardDescription>
                </CardHeader>
                <CardContent className="pt-10 pb-4">
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={data?.charts?.sources || []}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={8}
                          dataKey="value"
                          label={renderCustomizedLabel}
                        >
                          {(data?.charts?.sources || []).map((entry: any, index: number) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Priority Table */}
            <Card className="rounded-3xl shadow-xl shadow-gray-100/50 border-gray-100/50 overflow-hidden bg-white">
              <CardHeader className="border-b border-gray-50 bg-gray-50/30 px-8 py-6">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold text-gray-900">Priority Pipeline</CardTitle>
                    <CardDescription className="font-medium text-gray-500">High-value opportunities.</CardDescription>
                  </div>
                  <Button variant="link" onClick={openGHLCrm} className="text-blue-600 font-bold decoration-2">View CRM Pipeline →</Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-gray-50/50 text-gray-400 font-bold uppercase tracking-widest text-[10px]">
                    {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id} className="hover:bg-transparent border-none">
                        {headerGroup.headers.map((header) => (
                          <TableHead key={header.id} className="px-8 h-12">
                            {flexRender(header.column.columnDef.header, header.getContext())}
                          </TableHead>
                        ))}
                      </TableRow>
                    ))}
                  </TableHeader>
                  <TableBody>
                    {table.getRowModel().rows.map((row) => (
                      <TableRow key={row.id} className="hover:bg-blue-50/30 transition-colors border-gray-50">
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id} className="px-8 py-5">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* AI Insights Sidebar */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center space-x-2 px-1">
              <Sparkles className="w-5 h-5 text-blue-600 fill-blue-600" />
              <h3 className="font-black text-gray-900 uppercase tracking-tighter">AI Command Insights</h3>
            </div>
            
            {data?.aiInsights?.map((insight: any, i: number) => (
              <Card key={i} className="rounded-3xl border-none shadow-lg shadow-blue-50 bg-gradient-to-br from-white to-blue-50/30 overflow-hidden group hover:-translate-y-1 transition-all duration-300">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className={`p-2 rounded-xl ${
                      insight.type === 'warning' ? 'bg-orange-100 text-orange-600' :
                      insight.type === 'opportunity' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'
                    }`}>
                      {insight.type === 'warning' ? <AlertCircle className="w-5 h-5" /> : <Lightbulb className="w-5 h-5" />}
                    </div>
                    <Badge variant="outline" className="border-blue-200 text-blue-600 bg-white shadow-sm">AI Recommendation</Badge>
                  </div>
                  <p className="text-sm font-bold text-gray-900 leading-snug">
                    {insight.text}
                  </p>
                  <div className="pt-2">
                    <Button 
                      variant="secondary" 
                      onClick={() => {
                        if (insight.action.includes('Nudge')) {
                          const queryParams = new URLSearchParams(window.location.search);
                          const locationId = queryParams.get('location_id') || "dcJGZR1L77vJd0rvaNI5";
                          window.open(`https://app.gohighlevel.com/v2/location/${locationId}/conversations`, "_blank")
                        } else {
                          openGHLCrm()
                        }
                      }}
                      className="w-full justify-between bg-white border border-blue-100 text-blue-700 font-bold rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm"
                    >
                      {insight.action}
                      <ArrowUpRight className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Card className="rounded-3xl border-dashed border-2 border-gray-200 bg-transparent">
              <CardContent className="p-8 text-center space-y-2">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2 text-gray-400">
                  <Zap className="w-6 h-6" />
                </div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">System Health</p>
                <p className="text-sm font-medium text-gray-500">GHL Sync active. Last update: Just now.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

function MetricCard({ title, value, description, trend, progress, progressLabel, icon }: any) {
  return (
    <Card className="rounded-3xl shadow-lg shadow-gray-100/50 border-gray-100/50 bg-white hover:shadow-xl transition-all duration-300 group">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-bold text-gray-500 uppercase tracking-wider">{title}</CardTitle>
        <div className="p-2.5 bg-gray-50 rounded-2xl text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-black text-gray-900 tracking-tight">{value}</div>
        {progress !== undefined ? (
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-gray-400">
              <span>{progressLabel}</span>
              <span className="text-blue-600">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2 bg-gray-50" />
          </div>
        ) : (
          <div className={`mt-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
            trend === "up" ? "bg-emerald-50 text-emerald-600" : trend === "down" ? "bg-orange-50 text-orange-600" : "bg-gray-50 text-gray-500"
          }`}>
            {trend === "up" && <ArrowUpRight className="mr-1 h-3.5 w-3.5" />}
            {description}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
