import { Resend } from "resend";
import EmailTemplate from "@/api/email/EmailTemplate";

const resend = new Resend(import.meta.env.VITE_RESEND_API_KEY);

export default async function sendEmail({ feedbackType, feedbackContent, userEmail }: Feedback) {
  try {
    const { data, error } = await resend.emails.send({
      from: "Resend <onboarding@resend.dev>",
      to: ["charlieweinberger05@gmail.com"],
      subject: `New feedback for Leetcode Calendar`,
      react: EmailTemplate({
        feedbackType: feedbackType,
        feedbackContent: feedbackContent,
        userEmail: userEmail
      }),
    });
    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (error) {
    console.error(`Resent error: ${error}`);
    return null;
  }
}
