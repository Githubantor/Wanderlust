'use client'
import { Suspense } from 'react'
import BookingPage from '../../components/BookingPage'

export default function BookNow() {
  return (
    <Suspense fallback={<div style={{ padding: 100, textAlign: 'center', color: 'rgba(255,255,255,0.3)' }}>Loading...</div>}>
      <BookingPage />
    </Suspense>
  )
}
