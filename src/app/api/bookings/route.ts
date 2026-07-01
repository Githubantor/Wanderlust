import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const db = await connectDB()
    const bookings = await db.collection('book').find().sort({ bookedAt: -1 }).toArray()
    return NextResponse.json(bookings)
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const db = await connectDB()
    const doc = { ...body, status: 'pending' }
    const result = await db.collection('book').insertOne(doc)
    return NextResponse.json({ _id: result.insertedId, ...doc }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 400 })
  }
}
