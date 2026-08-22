import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import dbConnect from '@/lib/mongodb';
import FreeAudit from '@/app/models/FreeAudit';

export async function POST(req: Request) {
  const body = await req.json();
  const { name, businessName, businessType, websiteUrl, whatsapp, frustration } = body;

  if (!name || !businessName || !businessType || !whatsapp || !frustration) {
    return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
  }

  // Capture the lead two ways. Either one succeeding is enough — the prospect
  // should never see an error for a submission we actually received.
  let savedToDb = false;
  let emailSent = false;

  try {
    await dbConnect();
    await FreeAudit.create({ name, businessName, businessType, websiteUrl, whatsapp, frustration });
    savedToDb = true;
  } catch (error) {
    console.error('Free audit DB error:', error);
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: process.env.EMAIL_PORT === '465',
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASSWORD },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: 'contact@devhouse.dev',
      subject: `New Free Audit Request — ${businessName}`,
      text: `
New free audit request received:

Name: ${name}
Business: ${businessName}
Business Type: ${businessType}
Current Website: ${websiteUrl || 'None provided'}
WhatsApp: ${whatsapp}

Biggest frustration:
${frustration}
${savedToDb ? '' : '\n⚠️ NOT saved to the database — this email is the only copy. Check the admin panel and MongoDB connection.'}
      `.trim(),
    });
    emailSent = true;
  } catch (error) {
    console.error('Free audit email error:', error);
  }

  // Only a total failure is worth surfacing to the prospect
  if (!savedToDb && !emailSent) {
    console.error('Free audit LOST — both DB and email failed:', { businessName, whatsapp });
    return NextResponse.json({ success: false, error: 'Something went wrong' }, { status: 500 });
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
