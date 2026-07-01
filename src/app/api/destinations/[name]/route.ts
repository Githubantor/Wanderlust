import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'

export const dynamic = 'force-dynamic'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  try {
    const { name } = await params
    const db = await connectDB()
    const dest = await db.collection('destinations').findOne({ name })
    if (!dest) {
      return NextResponse.json({ error: 'Destination not found' }, { status: 404 })
    }
    return NextResponse.json(dest)
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}
