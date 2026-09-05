'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const company = formData.get('company') as string;
  const message = formData.get('message') as string;

  const emailHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body style="margin:0; padding:0; background-color:#0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0a0a; padding: 40px 16px;">
          <tr>
            <td align="center">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 560px; background-color:#141414; border:1px solid #262626; border-radius: 16px; overflow: hidden;">

                <!-- Header -->
                <tr>
                  <td style="padding: 28px 32px; border-bottom: 1px solid #262626;">
                    <p style="margin:0; font-size: 12px; letter-spacing: 1.5px; text-transform: uppercase; color:#ec4899; font-weight: 700;">
                      New Portfolio Message
                    </p>
                    <h1 style="margin: 6px 0 0; font-size: 20px; color:#ffffff; font-weight: 700;">
                      You've got a new inquiry
                    </h1>
                  </td>
                </tr>

                <!-- Body -->
                <tr>
                  <td style="padding: 28px 32px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid #262626;">
                          <p style="margin:0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.8px; color:#8a8a8a;">Name</p>
                          <p style="margin: 4px 0 0; font-size: 15px; color:#ffffff; font-weight: 600;">${name}</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid #262626;">
                          <p style="margin:0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.8px; color:#8a8a8a;">Email</p>
                          <p style="margin: 4px 0 0; font-size: 15px;">
                            <a href="mailto:${email}" style="color:#ec4899; text-decoration:none; font-weight: 600;">${email}</a>
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid #262626;">
                          <p style="margin:0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.8px; color:#8a8a8a;">Company</p>
                          <p style="margin: 4px 0 0; font-size: 15px; color:#ffffff; font-weight: 600;">${company || 'N/A'}</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 16px 0 0;">
                          <p style="margin:0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.8px; color:#8a8a8a;">Message</p>
                          <p style="margin: 8px 0 0; font-size: 15px; line-height: 1.6; color:#e5e5e5; white-space: pre-wrap;">${message}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- CTA -->
                <tr>
                  <td style="padding: 0 32px 32px;">
                    <a href="mailto:${email}" style="display:inline-block; background-color:#ec4899; color:#ffffff; text-decoration:none; font-size: 14px; font-weight: 700; padding: 12px 24px; border-radius: 999px;">
                      Reply to ${name.split(' ')[0]}
                    </a>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="padding: 20px 32px; background-color:#0f0f0f; border-top: 1px solid #262626;">
                    <p style="margin:0; font-size: 12px; color:#6b6b6b;">
                      Sent from the contact form on your portfolio site.
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  try {
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev', // පසුව ඔබේ domain එකක් දාගන්න පුළුවන්
      to: ['mudithmilinda@gmail.com'], // ඔබේ email ලිපිනය
      subject: `New Message from ${name} (${company || 'Individual'})`,
      html: emailHtml,
    });

    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}