'use client'
import Hero from '../components/Hero'
import Destinations from '../components/Destinations'
import BookingPreview from '../components/BookingPreview'
import Testimonials from '../components/Testimonials'
import TripPlanner from '../components/TripPlanner'

export default function Home() {
  return (
    <>
      <Hero />
      <Destinations />
      <BookingPreview />
      <Testimonials />
      <TripPlanner />
    </>
  )
}
