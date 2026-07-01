import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const db = await connectDB()
    const destinations = await db.collection('destinations').find().sort({ name: 1 }).toArray()
    return NextResponse.json(destinations)
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}
