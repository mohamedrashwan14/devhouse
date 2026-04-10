import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, clinicName, specialty, websiteUrl, whatsapp, frustration } = body;

    if (!name || !clinicName || !specialty || !whatsapp || !frustration) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: process.env.EMAIL_PORT === '465',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: 'contact@devhouse.dev',
      subject: `New Free Audit Request — ${clinicName}`,
      text: `
New free audit request received:

Name: ${name}
Clinic: ${clinicName}
Specialty: ${specialty}
Current Website: ${websiteUrl || 'None provided'}
WhatsApp: ${whatsapp}

Biggest frustration:
${frustration}
      `.trim(),
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Free audit form error:', error);
    return NextResponse.json({ success: false, error: 'Something went wrong' }, { status: 500 });
  }
}
