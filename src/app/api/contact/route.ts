import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { contactFormSchema } from "@/lib/validations/contact";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const validatedData = contactFormSchema.parse(body);
    const { name, email, message } = validatedData;

    const { data, error } = await resend.emails.send({
      from: "Contact Form <noreply@caiocezartg.com.br>",
      to: "caiocezartg@gmail.com",
      replyTo: email,
      subject: `A new contact from ${name}!`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #FBBF24; padding-bottom: 10px;">Hey Caio! You have a new message ✉️</h2>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #555; margin-bottom: 5px;">From:</h3>
            <p style="margin: 0; font-size: 16px;"><strong>${name}</strong> (${email})</p>
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #555; margin-bottom: 5px;">Message:</h3>
            <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; border-left: 4px solid #FBBF24;">
              <p style="margin: 0; line-height: 1.6; white-space: pre-wrap;">${message}</p>
            </div>
          </div>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
          <p style="color: #888; font-size: 14px; margin: 0;">
            This email was sent from your personal website.
          </p>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Email sent successfully", id: data?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);

    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Invalid form data", details: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
