import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import nodemailer from 'nodemailer';

// Path to RequestContact.json file
const requestContactFilePath = path.join(process.cwd(), "data", "RequestContact.json");

// Helper function to read contact requests from JSON file
function readContactRequests() {
  try {
    const fileContents = fs.readFileSync(requestContactFilePath, "utf8");
    return JSON.parse(fileContents);
  } catch (error) {
    console.error("Error reading contact requests file:", error);
    return [];
  }
}

// Helper function to write contact requests to JSON file
function writeContactRequests(requests: any[]) {
  try {
    fs.writeFileSync(requestContactFilePath, JSON.stringify(requests, null, 2), "utf8");
    return true;
  } catch (error) {
    console.error("Error writing contact requests file:", error);
    return false;
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body;
    
    // Validation
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    // === 1. บันทึกข้อมูลลง JSON file ก่อนเสมอ ===
    const newRequest = {
      id: Date.now().toString(),
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      createdAt: new Date().toISOString(),
      status: "new", // สถานะ: new, read, replied
    };

    const requests = readContactRequests();
    requests.unshift(newRequest); // เพิ่มใหม่ไว้ด้านบนสุด

    const saveSuccess = writeContactRequests(requests);
    if (!saveSuccess) {
      return NextResponse.json(
        { error: 'Failed to save contact request' },
        { status: 500 }
      );
    }

    // === 2. พยายามส่งอีเมล (ถ้า SMTP มีการตั้งค่า) ===
    let emailSent = false;
    let emailError = null;

    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || 587);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const to = process.env.CONTACT_TO_EMAIL;

    if (host && user && pass && to) {
      try {
        const transporter = nodemailer.createTransport({
          host,
          port,
          secure: port === 465,
          auth: { user, pass },
        });

        await transporter.sendMail({
          from: `${name} <${email}>`,
          to,
          subject: `New contact from ${name}`,
          text: message,
          html: `<p><strong>From:</strong> ${name} &lt;${email}&gt;</p><p>${message.replace(/\n/g, '<br/>')}</p>`,
        });

        emailSent = true;
      } catch (err: any) {
        emailError = err.message || String(err);
        console.error("Email sending failed:", emailError);
      }
    }

    // === 3. Return success (เพราะข้อมูลถูกบันทึกแล้ว) ===
    return NextResponse.json({
      success: true,
      message: 'Contact request saved successfully',
      saved: true,
      emailSent,
      emailError: emailSent ? null : (emailError || 'SMTP not configured'),
      request: {
        id: newRequest.id,
        name: newRequest.name,
        email: newRequest.email,
      }
    });

  } catch (err: any) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: err.message || String(err) },
      { status: 500 }
    );
  }
}

// GET: อ่านข้อมูล contact requests ทั้งหมด (สำหรับ admin)
export async function GET() {
  try {
    const requests = readContactRequests();
    return NextResponse.json({ success: true, requests });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to read contact requests" },
      { status: 500 }
    );
  }
}
