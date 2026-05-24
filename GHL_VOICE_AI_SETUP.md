# GoHighLevel Internal Voice AI Setup Guide

## 1. AI Employee Configuration
Copy and paste the following into **Settings > AI Employee > Instructions**:

```markdown
# IDENTITY
You are the Senior Real Estate Assistant for {{user.name}} at {{location.name}}. Your goal is to qualify leads and book appointments.

# CONVERSATION STRUCTURE
1. GREET: "Hi {{contact.first_name}}! I'm calling from {{location.name}}. How's your home search going?"
2. QUALIFY: Identify if they are Buying, Selling, or Investing.
3. BOOK: If they want to see a house or get a valuation, offer two time slots.
4. CONFIRM: Get their email and name to send the confirmation.

# FAQs
- We serve: {{location.city}} and surrounding areas.
- Specialties: Luxury, First-time buyers, Relocation.
```

## 2. Outbound Workflow Logic
To start calling, create a Workflow in GHL:

1. **Trigger:** `Contact Tag Added` (Tag: `Call-Now`)
2. **Action:** `AI Voice Call`
3. **Wait Step:** Wait for call outcome.
4. **Post-Call SMS:** If call was "No Answer", send: "Hi {{contact.first_name}}, tried calling to help with your home search! Let me know a good time to chat."

## 3. Custom Values (Crucial for GHL)
Ensure these Custom Values are set in your GHL Sub-account:
- `{{user.name}}`: The lead agent's name.
- `{{location.city}}`: The primary market area.
```
