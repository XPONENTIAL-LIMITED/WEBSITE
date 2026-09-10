# Email service (EmailJS)

Client-side contact delivery via [EmailJS](https://www.emailjs.com/). One form
submission fires **two** emails:

1. **Enquiry → Xponential inbox** (`VITE_EMAILJS_CONTACT_TEMPLATE_ID`)
2. **Automated acknowledgement → the sender** (`VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID`)
   — "thank you for contacting us, we'll get in touch shortly".

## Files

| File         | Purpose                                                            |
| ------------ | ----------------------------------------------------------------- |
| `config.ts`  | Reads EmailJS settings from `import.meta.env`, validates them.     |
| `index.ts`   | `sendContactEmail(form)` — inits the SDK and sends both messages.  |

## Setup

1. `cp .env.example .env` (repo root) and fill in the values from the
   [EmailJS dashboard](https://dashboard.emailjs.com/admin):
   - `VITE_EMAILJS_SERVICE_ID` — already set to `service_vhtn1qg`.
   - `VITE_EMAILJS_PUBLIC_KEY` — Account → General → API Keys.
   - `VITE_EMAILJS_CONTACT_TEMPLATE_ID` — the template from step 2.
   - `VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID` — the template from step 3.
   - `VITE_EMAILJS_TO_EMAIL` — inbox that receives enquiries
     (defaults to `solution@xponential.co.zm`).

2. **Contact template** (Email Templates → Create New Template)
   - **To email:** `{{to_email}}`  (or hard-code `solution@xponential.co.zm`)
   - **Reply to:** `{{reply_to}}`
   - **Subject:** `New enquiry from {{from_name}}`
   - **Body:** use `{{from_name}}`, `{{from_email}}`, `{{company}}`, `{{message}}`.

3. **Auto-reply template**
   - **To email:** `{{to_email}}`  ← this is the website visitor's address
   - **Reply to:** `{{reply_to}}`  ← `solution@xponential.co.zm`
   - **Subject:** `Thanks for contacting Xponential`
   - **Body:** e.g.
     > Hi {{to_name}},
     >
     > Thank you for contacting Xponential. We've received your message and a
     > member of our team will get in touch shortly.
     >
     > — The Xponential Team

4. In **Account → Security**, add the production domain to **Allowed Origins**
   so the public key can't be reused elsewhere.

## Production (Vercel)

Add the same `VITE_EMAILJS_*` variables under **Project → Settings →
Environment Variables**. `.env` is git-ignored and never deployed.

## A note on "secrets"

EmailJS is a browser SDK: the public key and template IDs are bundled into the
shipped JavaScript by design and are not truly secret. Keeping them in `.env`
avoids committing them to git and lets each environment differ, but the real
abuse protection is the **Allowed Origins** allow-list plus the rate-limit /
reCAPTCHA options in the EmailJS dashboard.
