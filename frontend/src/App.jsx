import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Destinations from './components/Destinations'
import BookingPreview from './components/BookingPreview'
import Testimonials from './components/Testimonials'
import TripPlanner from './components/TripPlanner'
import BookingPage from './components/BookingPage'
import BookingHistory from './components/BookingHistory'
import AdminLogin from './components/AdminLogin'
import AdminDashboard from './components/AdminDashboard'
import Footer from './components/Footer'

function LandingPage() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }, [location])

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

export default function App() {
  return (
    <div style={{ minHeight: '100vh', background: '#08080e' }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/book-now" element={<BookingPage />} />
        <Route path="/my-bookings" element={<BookingHistory />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
      <Footer />
    </div>
  )
}
