import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const db = await connectDB()
    const testimonials = await db.collection('testimonials').find().sort({ _id: -1 }).toArray()
    return NextResponse.json(testimonials)
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}
