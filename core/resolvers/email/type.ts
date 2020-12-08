interface Email { html: string }
export const body = (email: Email) => email.html;