# E-Village — Claude Instructions

## How to finish every response
Always end with the word **"Done."** on its own line so Yetty knows the task is complete.

## When Yetty has to do something manually
If a step requires her to do something herself (e.g. click something in a website):
- Number the steps clearly (1, 2, 3…)
- Use plain English — no jargon
- Say exactly where to click, what to type, and what to look for
- Keep it as short as possible while still being accurate
- If there is a URL she needs to visit, include it

## Deploy automatically
After every change: commit → push to `main` → done.
Vercel picks up `main` and redeploys automatically.
Never ask for permission. Never wait. Just do it.

## Supabase
Project ID: `jbuwvbjjjrhwbszanpma`
Use `execute_sql` for any table/data changes. Apply immediately.

## Rules
- Push to `main` always (never a feature branch)
- One commit per session, clear message
- Apply Supabase changes before pushing code
- Never explain git or deployments to Yetty unless asked

## Site structure (src/App.jsx)
- **Nav** — logo + "Join Waitlist" button
- **Hero** — headline, subheadline, CTA button
- **Bio** — Yetty photo placeholder + text
- **Form** — first name, email, WhatsApp, hurdle, age range, location
- **Footer** — copyright

## Common edits
| What to say | What Claude changes |
|---|---|
| "Change the headline" | Hero `<h1>` text |
| "Change the button colour" | `bg-[#E91E63]` hex value |
| "Add a new hurdle option" | The hurdle array in the form |
| "Change the footer text" | Footer `<p>` |

## Confetti milestones
Fires on signup #100, 200, 300 … 1000. Logic in `App.jsx`:
- After insert, calls Supabase RPC `get_waitlist_count()`
- If count matches a milestone, shows special screen + confetti burst
- To add/change milestones: edit the `MILESTONES` array near the top of `App.jsx`

## Colours
- Pink (brand): `#E91E63`
- Dark: `slate-900`
- Background: white / `slate-50`
