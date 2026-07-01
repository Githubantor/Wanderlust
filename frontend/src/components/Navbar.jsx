import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import useMediaQuery from '../hooks/useMediaQuery'

const navLinks = [
  { label: 'Destinations', href: '/#destinations' },
  { label: 'Experiences', href: '/#booking' },
  { label: 'Stories', href: '/#testimonials' },
  { label: 'Plan Trip', href: '/#planner' },
  { label: 'My Bookings', href: '/my-bookings' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const isMobile = useMediaQuery('(max-width: 768px)')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!isMobile) setMobileOpen(false)
  }, [isMobile])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: scrolled ? '14px 0' : '22px 0',
        background: scrolled ? 'rgba(8,8,14,0.82)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none',
        transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
      }}
    >
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '0 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <motion.div whileHover={{ scale: 1.04 }}>
        <Link to="/"
          style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}
        >
          <motion.div
            whileHover={{ rotate: [0, -8, 8, -4, 0], scale: 1.06 }}
            transition={{ duration: 0.5 }}
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(99,102,241,0.2)',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="8.5" stroke="#fff" strokeWidth="0.8" opacity="0.5"/>
              <circle cx="10" cy="10" r="4" stroke="#fff" strokeWidth="0.7" opacity="0.4"/>
              <path d="M10 1l1.5 5.5L17 8l-5.5 1.5L10 15l-1.5-5.5L3 8l5.5-1.5L10 1Z" fill="#fff" opacity="0.7"/>
              <path d="M10 3l1 3.5 3.5 1-3.5 1-1 3.5-1-3.5L5.5 7.5 9 6.5l1-3.5Z" fill="#fff" opacity="0.3"/>
              <circle cx="10" cy="10" r="1.5" fill="#fff" opacity="0.6"/>
            </svg>
          </motion.div>
          <span style={{ fontWeight: 700, fontSize: 19, letterSpacing: '-0.4px', color: '#fff' }}>
            Wanderlust
          </span>
        </Link>
        </motion.div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          {!isMobile && (
            <div style={{ display: 'flex', gap: 28 }}>
              {navLinks.map((link) => (
                <motion.div key={link.label} whileHover={{ y: -1 }}>
                  <Link to={link.href}
                    style={{
                      textDecoration: 'none',
                      color: 'rgba(255,255,255,0.55)',
                      fontSize: 14,
                      fontWeight: 500,
                      transition: 'color 0.3s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          {!isMobile && (
            <motion.div whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(99,102,241,0.25)' }} whileTap={{ scale: 0.96 }}
              style={{ borderRadius: 10 }}
            >
              <Link to="/book-now"
                style={{
                  padding: '10px 26px',
                  borderRadius: 10,
                  border: 'none',
                  background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: 'pointer',
                  textDecoration: 'none',
                  display: 'inline-block',
                }}
              >
                Book Now
              </Link>
            </motion.div>
          )}

          {isMobile && (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              style={{
                background: 'none',
                border: 'none',
                color: '#fff',
                fontSize: 24,
                cursor: 'pointer',
                padding: 4,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 36,
                height: 36,
              }}
            >
              {mobileOpen ? (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 5l10 10M15 5l-10 10"/></svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 5h14M3 10h14M3 15h14"/></svg>
              )}
            </motion.button>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isMobile && mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ overflow: 'hidden', background: 'rgba(8,8,14,0.97)', backdropFilter: 'blur(24px)' }}
          >
            <div style={{ padding: '12px 20px 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
              {navLinks.map((link) => (
                <Link key={link.label} to={link.href} onClick={() => setMobileOpen(false)}
                  style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: 16, fontWeight: 500, padding: '6px 0' }}>
                  {link.label}
                </Link>
              ))}
              <Link to="/book-now" onClick={() => setMobileOpen(false)}
                style={{
                  marginTop: 6,
                  padding: '12px 0',
                  borderRadius: 10,
                  border: 'none',
                  background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: 14,
                  cursor: 'pointer',
                  textDecoration: 'none',
                  textAlign: 'center',
                  display: 'block',
                }}
              >
                Book Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
