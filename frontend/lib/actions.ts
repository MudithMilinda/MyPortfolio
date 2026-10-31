"use server";

import { Resend } from "resend";

const MAX_NAME_LENGTH = 100;
const MAX_COMPANY_LENGTH = 150;
const MAX_MESSAGE_LENGTH = 5_000;

function getField(formData: FormData, field: string, maxLength: number) {
  const value = formData.get(field);
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;",
    };

    return entities[character];
  });
}

export async function sendEmail(formData: FormData) {
  const name = getField(formData, "name", MAX_NAME_LENGTH);
  const email = getField(formData, "email", 254);
  const company = getField(formData, "company", MAX_COMPANY_LENGTH);
  const message = getField(formData, "message", MAX_MESSAGE_LENGTH);

  if (!name || !email || !message) {
    return { success: false, error: "Please complete all required fields." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: "Please enter a valid email address." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { success: false, error: "Email is not configured yet." };
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeCompany = escapeHtml(company || "N/A");
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
      to: [process.env.CONTACT_TO_EMAIL ?? "mudithmilinda@gmail.com"],
      replyTo: email,
      subject: `New portfolio message from ${name}`,
      html: `
        <h1>New portfolio inquiry</h1>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
        <p><strong>Company:</strong> ${safeCompany}</p>
        <p><strong>Message:</strong><br />${safeMessage}</p>
      `,
    });

    if (error) {
      console.error("Resend email error:", error);
      return { success: false, error: "Unable to send your message. Please try again." };
    }

    return { success: true };
  } catch (error) {
    console.error("Contact form email error:", error);
    return { success: false, error: "Unable to send your message. Please try again." };
  }
}
