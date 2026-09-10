// EmailJS configuration, sourced from environment variables.
//
// All values are read from `import.meta.env` so nothing sensitive is hard-coded
// in the source tree. Copy `.env.example` to `.env` and fill in the values from
// your EmailJS dashboard (https://dashboard.emailjs.com/admin).
//
// Note: EmailJS is a browser SDK, so the public key and IDs are shipped in the
// client bundle by design. Real protection comes from the EmailJS dashboard:
// restrict "Allowed Origins" to your production domain and enable the reCAPTCHA
// / rate-limit options on the account.

export const emailConfig = {
  /** EmailJS service ID (the connected mail provider). */
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID as string,
  /** EmailJS public key (Account -> General -> API Keys). */
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string,
  /** Template that delivers the enquiry to the Xponential inbox. */
  contactTemplateId: import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID as string,
  /** Template that sends the automated "thank you" reply to the sender. */
  autoReplyTemplateId: import.meta.env.VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID as string,
  /** Inbox that receives enquiries. */
  toEmail:
    (import.meta.env.VITE_EMAILJS_TO_EMAIL as string | undefined) ??
    "solution@xponential.co.zm",
} as const

/** Throws a descriptive error if any required EmailJS setting is missing. */
export function assertEmailConfig(): void {
  const required: (keyof typeof emailConfig)[] = [
    "serviceId",
    "publicKey",
    "contactTemplateId",
    "autoReplyTemplateId",
  ]
  const missing = required.filter((key) => !emailConfig[key])
  if (missing.length > 0) {
    throw new Error(
      `EmailJS is not configured. Missing env vars: ${missing
        .map((key) => `VITE_EMAILJS_${key.replace(/([A-Z])/g, "_$1").toUpperCase()}`)
        .join(", ")}. Copy .env.example to .env and fill in the values.`
    )
  }
}
