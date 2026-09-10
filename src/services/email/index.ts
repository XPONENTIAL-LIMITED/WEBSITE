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

  // Keys must match the {{placeholders}} configured on the EmailJS templates.
  // Both templates use {{name}}, {{email}}, {{title}}, {{message}}, {{company}};
  // the from_*/to_*/reply_to aliases are kept for any legacy placeholders.
  const params = {
    name: form.name,
    email: form.email,
    title: form.name,
    company,
    message: form.message,
    from_name: form.name,
    from_email: form.email,
    to_name: form.name,
    reply_to: form.email,
  }

  // 1. Notify the Xponential inbox (template "To Email" is a fixed address).
  await emailjs.send(emailConfig.serviceId, emailConfig.contactTemplateId, {
    ...params,
    to_email: emailConfig.toEmail,
  })

  // 2. Automated acknowledgement to the sender (template "To Email" = {{email}}).
  await emailjs.send(emailConfig.serviceId, emailConfig.autoReplyTemplateId, {
    ...params,
    to_email: form.email,
  })
}

export { emailConfig } from "./config"
