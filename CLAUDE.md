# E-Village — Claude Instructions

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
- Never explain git or deployments to the user unless asked

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

## Colours
- Pink (brand): `#E91E63`
- Dark: `slate-900`
- Background: white / `slate-50`
