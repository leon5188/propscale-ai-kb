# PropScale AI: Outbound Calling Launch Checklist

Follow these 5 steps to trigger your first AI outbound call safely and effectively within GoHighLevel.

## ✅ 1. Compliance Verification
- [ ] **Form Check:** Ensure the "Consent Language" is visible on your GHL Form/Landing Page.
- [ ] **Checkbox:** Ensure the consent checkbox is **Required** before submission.
- [ ] **GHL Settings:** Go to `Settings > Business Profile` and ensure your A2P 10DL/Compliance profile is active (required for automated calling in the US/Canada).

## ✅ 2. AI Employee Configuration
- [ ] **Instructions:** Copy the instructions from `GHL_VOICE_AI_SETUP.md` into `Settings > AI Employee`.
- [ ] **Knowledge Base:** Upload the FAQ list provided in our previous chat to the AI's Knowledge Base section.
- [ ] **Voice Selection:** Choose a professional, clear voice (e.g., "English - US - Sarah").

## ✅ 3. Workflow Trigger Setup
- [ ] **The Trigger:** Create a Workflow with the trigger `Contact Tag Added (Tag: Call-Now)`.
- [ ] **The Action:** Add the action `AI Voice Call`.
- [ ] **Fallback:** Add a `Wait` step (1 min) followed by an SMS if the call status is "No Answer".

## ✅ 4. The "Dry Run" Test
- [ ] **Test Contact:** Create a contact in GHL with your own name and phone number.
- [ ] **Manual Trigger:** Manually add the tag `Call-Now` to your test contact.
- [ ] **Evaluation:** Answer the call and try to "break" the AI. Ask about market trends or try to book a showing to see if it follows the routing logic.

## ✅ 5. Live Launch
- [ ] **Connect Landing Page:** Ensure your PropScale AI Landing Page form is connected to this GHL Workflow.
- [ ] **Monitor:** Check the `Conversations` tab in GHL to read the transcripts of the first few AI calls to ensure quality.

---
**Ready to go?** Once these are checked, your PropScale AI engine is officially live and calling.
