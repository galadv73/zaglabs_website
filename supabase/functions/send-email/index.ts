import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const RECIPIENT_EMAIL = "Accounts@zaglabs.io";

interface ContactFormData {
  type: "contact";
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
}

interface JobApplicationData {
  type: "job-application";
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  position: string;
  experience: string;
  portfolioUrl?: string;
  coverLetter: string;
}

type EmailRequest = ContactFormData | JobApplicationData;

const getSubjectLabel = (subject: string): string => {
  const labels: Record<string, string> = {
    general: "General Inquiry",
    project: "New Project",
    partnership: "Partnership",
    support: "Support",
    other: "Other",
  };
  return labels[subject] || subject;
};

const getPositionLabel = (position: string): string => {
  const labels: Record<string, string> = {
    frontend: "Frontend Developer",
    backend: "Backend Developer",
    fullstack: "Fullstack Developer",
    designer: "UI/UX Designer",
    pm: "Product Manager",
    other: "Other",
  };
  return labels[position] || position;
};

const getExperienceLabel = (experience: string): string => {
  const labels: Record<string, string> = {
    junior: "Junior (0-2 years)",
    mid: "Mid-level (2-5 years)",
    senior: "Senior (5+ years)",
  };
  return labels[experience] || experience;
};

const buildContactEmail = (data: ContactFormData): string => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333; border-bottom: 2px solid #10b981; padding-bottom: 10px;">
        New Contact Form Submission
      </h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; width: 120px;">Name:</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.name}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Email:</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">
            <a href="mailto:${data.email}">${data.email}</a>
          </td>
        </tr>
        ${data.company ? `
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Company:</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.company}</td>
        </tr>
        ` : ''}
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Subject:</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${getSubjectLabel(data.subject)}</td>
        </tr>
      </table>
      <h3 style="color: #333; margin-top: 20px;">Message:</h3>
      <div style="background: #f9fafb; padding: 15px; border-radius: 8px; white-space: pre-wrap;">
        ${data.message}
      </div>
    </div>
  `;
};

const buildJobApplicationEmail = (data: JobApplicationData): string => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333; border-bottom: 2px solid #10b981; padding-bottom: 10px;">
        New Job Application
      </h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; width: 120px;">Name:</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.firstName} ${data.lastName}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Email:</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">
            <a href="mailto:${data.email}">${data.email}</a>
          </td>
        </tr>
        ${data.phone ? `
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Phone:</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.phone}</td>
        </tr>
        ` : ''}
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Position:</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${getPositionLabel(data.position)}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Experience:</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${getExperienceLabel(data.experience)}</td>
        </tr>
        ${data.portfolioUrl ? `
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Portfolio:</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">
            <a href="${data.portfolioUrl}" target="_blank">${data.portfolioUrl}</a>
          </td>
        </tr>
        ` : ''}
      </table>
      <h3 style="color: #333; margin-top: 20px;">Cover Letter:</h3>
      <div style="background: #f9fafb; padding: 15px; border-radius: 8px; white-space: pre-wrap;">
        ${data.coverLetter}
      </div>
    </div>
  `;
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: EmailRequest = await req.json();
    console.log("Received email request:", data.type);

    let subject: string;
    let html: string;

    if (data.type === "contact") {
      subject = `[ZagLabs Contact] ${getSubjectLabel(data.subject)} from ${data.name}`;
      html = buildContactEmail(data);
    } else if (data.type === "job-application") {
      subject = `[ZagLabs Application] ${getPositionLabel(data.position)} - ${data.firstName} ${data.lastName}`;
      html = buildJobApplicationEmail(data);
    } else {
      throw new Error("Invalid email type");
    }

    const emailResponse = await resend.emails.send({
      from: "ZagLabs <onboarding@resend.dev>",
      to: [RECIPIENT_EMAIL],
      subject,
      html,
      reply_to: data.email,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, data: emailResponse.data }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
