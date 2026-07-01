import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'
import { sendApprovalEmail } from '@/lib/email'

export const dynamic = 'force-dynamic'

function isAuthorized(request: Request) {
  const auth = request.headers.get('authorization')
  return auth === `Bearer ${process.env.ADMIN_PASSWORD}`
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params
    const { status, adminNote } = await request.json()

    const db = await connectDB()
    const booking = await db.collection('book').findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { status, adminNote, updatedAt: new Date().toISOString() } },
      { returnDocument: 'after' }
    )

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    }

    if (status === 'approved') {
      const emailData = {
        name: booking.name || '',
        email: booking.email || '',
        dest: booking.dest || '',
        departure: booking.departure,
        returnDate: booking.returnDate,
        travelers: booking.travelers,
        total: booking.total,
      }
      sendApprovalEmail(emailData).catch(err => console.error('Email failed:', err))
    }

    return NextResponse.json(booking)
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}
