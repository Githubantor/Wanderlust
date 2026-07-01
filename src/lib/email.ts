import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

export async function sendApprovalEmail(booking: {
  name: string
  email: string
  dest: string
  departure?: string
  returnDate?: string
  travelers?: number
  total?: number
}) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log('Email not configured, skipping notification')
    return
  }

  const departureStr = booking.departure
    ? new Date(booking.departure).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : 'TBD'

  const returnStr = booking.returnDate
    ? new Date(booking.returnDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : 'TBD'

  await transporter.sendMail({
    from: `"Wanderlust Travel" <${process.env.EMAIL_FROM}>`,
    to: booking.email,
    subject: `Your Trip to ${booking.dest} is Confirmed!`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; background: #0a0a14; border-radius: 16px;">
        <div style="text-align: center; margin-bottom: 24px;">
          <div style="width: 48px; height: 48px; border-radius: 12px; background: linear-gradient(135deg, #6366F1, #8B5CF6); display: flex; align-items: center; justify-content: center; margin: 0 auto 12px;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M9 12l2 2 4-4"/></svg>
          </div>
          <h1 style="color: #fff; font-size: 24px; margin: 0;">Trip Confirmed!</h1>
          <p style="color: rgba(255,255,255,0.5); font-size: 14px; margin-top: 4px;">Your adventure to ${booking.dest} is officially booked.</p>
        </div>

        <div style="background: rgba(99,102,241,0.06); border: 1px solid rgba(99,102,241,0.12); border-radius: 12px; padding: 20px; margin-bottom: 20px;">
          <h2 style="color: #818CF8; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 12px;">Trip Details</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="color: rgba(255,255,255,0.4); font-size: 13px; padding: 6px 0;">Destination</td><td style="color: #fff; font-size: 13px; font-weight: 600; text-align: right;">${booking.dest}</td></tr>
            <tr><td style="color: rgba(255,255,255,0.4); font-size: 13px; padding: 6px 0;">Travelers</td><td style="color: #fff; font-size: 13px; font-weight: 600; text-align: right;">${booking.travelers || 1}</td></tr>
            <tr><td style="color: rgba(255,255,255,0.4); font-size: 13px; padding: 6px 0;">Departure</td><td style="color: #fff; font-size: 13px; font-weight: 600; text-align: right;">${departureStr}</td></tr>
            <tr><td style="color: rgba(255,255,255,0.4); font-size: 13px; padding: 6px 0;">Return</td><td style="color: #fff; font-size: 13px; font-weight: 600; text-align: right;">${returnStr}</td></tr>
            <tr><td style="color: rgba(255,255,255,0.4); font-size: 13px; padding: 6px 0;">Total</td><td style="color: #A78BFA; font-size: 13px; font-weight: 700; text-align: right;">$${(booking.total || 0).toLocaleString()}</td></tr>
          </table>
        </div>

        <div style="background: rgba(52,211,153,0.06); border: 1px solid rgba(52,211,153,0.12); border-radius: 12px; padding: 16px 20px; margin-bottom: 20px;">
          <p style="color: #34D399; font-size: 13px; margin: 0;"><strong>Next Steps:</strong> Our team will reach out within 24 hours with your detailed itinerary. Get ready for an unforgettable experience!</p>
        </div>

        <p style="color: rgba(255,255,255,0.25); font-size: 12px; text-align: center; margin: 0;">Wanderlust Travel — Making dreams take flight.</p>
      </div>
    `,
  })
}
