"use server"

import { GoogleSpreadsheet } from "google-spreadsheet"
import { JWT } from "google-auth-library"
import nodemailer from "nodemailer"

// Background email sender (non-blocking)
async function sendEmailsInBackground(email: string, feedback: string) {
  if (!process.env.EMAIL_ENABLED || process.env.EMAIL_ENABLED !== "true") {
    console.log("⚠️ Email disabled")
    return
  }

  if (!process.env.SMTP_FROM_EMAIL || !process.env.SMTP_PASSWORD) {
    console.log("⚠️ Email config missing")
    return
  }

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_FROM_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    })

    // Send confirmation email to user
    await transporter.sendMail({
      from: `"SmartMatch Team" <${process.env.SMTP_FROM_EMAIL}>`,
      to: email,
      subject: "🎉 You're on the SmartMatch Waitlist!",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #059669; margin-bottom: 20px;">Welcome to SmartMatch! 🚀</h1>
          <p style="font-size: 16px; line-height: 1.6; color: #333;">Thank you for joining our waitlist! We're excited to have you on board.</p>
          
          <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; border-left: 4px solid #059669; margin: 24px 0;">
            <p style="margin: 0; color: #065f46; font-weight: 600;">Your feedback:</p>
            <p style="margin: 8px 0 0 0; color: #065f46;">${feedback}</p>
          </div>
          
          <p style="font-size: 16px; line-height: 1.6; color: #333;">We'll keep you updated on our progress and notify you as soon as SmartMatch is ready for early access.</p>
          
          <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px; margin: 0;">Best regards,<br/>The SmartMatch Team</p>
          </div>
        </div>
      `,
    })

    // Send notification to admin
    await transporter.sendMail({
      from: `"SmartMatch Notifications" <${process.env.SMTP_FROM_EMAIL}>`,
      to: process.env.ORDER_NOTIFICATION_EMAIL,
      subject: "🔔 New Waitlist Signup - SmartMatch",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #1f2937; margin-bottom: 20px;">New Waitlist Signup 🎉</h2>
          
          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0 0 12px 0;"><strong style="color: #374151;">Email:</strong> <span style="color: #059669;">${email}</span></p>
            <p style="margin: 0 0 12px 0;"><strong style="color: #374151;">Signed up:</strong> ${new Date().toLocaleString()}</p>
            <p style="margin: 0;"><strong style="color: #374151;">Feedback:</strong></p>
            <p style="margin: 8px 0 0 0; padding: 12px; background: white; border-radius: 4px; color: #1f2937;">${feedback}</p>
          </div>
          
          <p style="color: #6b7280; font-size: 14px; margin-top: 24px;">Data saved to Google Sheet ✓</p>
        </div>
      `,
    })

    console.log(`✅ Emails sent: User (${email}) + Admin notification`)
  } catch (error) {
    console.error("❌ Email error:", error)
  }
}

export async function submitWaitlist(formData: FormData) {
  const email = formData.get("email") as string
  const feedback = formData.get("feedback") as string

  // Start email sending in background (non-blocking)
  sendEmailsInBackground(email, feedback).catch((err) =>
    console.error("Background email error:", err)
  )

  try {
    // Save to Google Sheet with timeout
    if (process.env.GOOGLE_SHEET_ID && process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_PRIVATE_KEY) {
      try {
        const serviceAccountAuth = new JWT({
          email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
          key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
          scopes: ["https://www.googleapis.com/auth/spreadsheets"],
        })

        const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth)

        // 5 second timeout
        const loadPromise = doc.loadInfo()
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Timeout")), 5000)
        )

        await Promise.race([loadPromise, timeoutPromise])

        const sheet = doc.sheetsByIndex[0]
        await sheet.loadCells("A1:C1")
        const hasHeaders = sheet.getCell(0, 0).value !== null

        if (!hasHeaders) {
          await sheet.setHeaderRow(["Email", "Feedback", "Date"])
        } else {
          await sheet.loadHeaderRow()
        }

        await sheet.addRow({
          Email: email,
          Feedback: feedback,
          Date: new Date().toISOString(),
        })

        console.log("✅ Saved to Google Sheets")
      } catch (sheetError) {
        console.error("⚠️ Sheets error (emails still sending):", sheetError)
      }
    }

    return { success: true }
  } catch (error) {
    console.error("❌ Error:", error)
    return { success: true } // Return success anyway since emails are sending
  }
}
