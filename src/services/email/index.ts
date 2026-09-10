import emailjs from "@emailjs/browser"

import { assertEmailConfig, emailConfig } from "./config"

export type ContactForm = {
  name: string
  email: string
  company: string
  message: string
}

let initialized = false

function init(): void {
  if (initialized) return
  assertEmailConfig()
  emailjs.init({ publicKey: emailConfig.publicKey })
  initialized = true
}

/**
 * Sends a contact enquiry through EmailJS.
 *
 * Two messages are dispatched:
 *   1. The enquiry itself to the Xponential inbox (`contactTemplateId`).
 *   2. An automated acknowledgement back to the person who filled the form
 *      (`autoReplyTemplateId`) — "thank you for contacting us, we'll get in
 *      touch shortly".
 *
 * The template variables below must match the placeholders configured on the
 * EmailJS templates ({{from_name}}, {{message}}, etc.).
 */
export async function sendContactEmail(form: ContactForm): Promise<void> {
  init()

  const company = form.company.trim() || "Not provided"

  // 1. Notify the Xponential inbox.
  await emailjs.send(emailConfig.serviceId, emailConfig.contactTemplateId, {
    from_name: form.name,
    from_email: form.email,
    reply_to: form.email,
    company,
    message: form.message,
    to_email: emailConfig.toEmail,
  })

  // 2. Automated acknowledgement to the sender.
  await emailjs.send(emailConfig.serviceId, emailConfig.autoReplyTemplateId, {
    to_name: form.name,
    to_email: form.email,
    reply_to: emailConfig.toEmail,
    company,
    message: form.message,
  })
}

export { emailConfig } from "./config"
