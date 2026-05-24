export type ContactFormData = {
  fullName: string
  email: string
  company: string
  timeline: string
  projectType: string
  message: string
}

export type ContactSubmitResult = {
  ok: boolean
  message: string
}

export async function submitContactForm(
  data: ContactFormData,
): Promise<ContactSubmitResult> {
  console.info('[contact] submit stub', data)

  return {
    ok: true,
    message: 'Enquiry received — we\'ll respond within one business day.',
  }
}
