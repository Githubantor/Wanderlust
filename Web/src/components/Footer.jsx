import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import useMediaQuery from '../hooks/useMediaQuery'

const links = {
  Destinations: ['Maldives', 'Santorini', 'Bali', 'Tokyo', 'Swiss Alps', 'Amazon'],
  Company: ['About Us', 'Careers', 'Press', 'Blog', 'Partners'],
  Support: ['Contact', 'FAQ', 'Travel Insurance', 'Cancellation', 'Privacy Policy'],
}

export default function Footer() {
  const router = useRouter()
  const isMobile = useMediaQuery('(max-width: 768px)')

  return (
    <footer style={{ padding: '60px 20px 32px', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr 1fr 1fr',
          gap: isMobile ? 28 : 40,
          marginBottom: 40,
        }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <motion.div
                whileHover={{ rotate: [0, -8, 8, -4, 0], scale: 1.06 }}
                transition={{ duration: 0.5 }}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 16px rgba(99,102,241,0.2)',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="8.5" stroke="#fff" strokeWidth="0.8" opacity="0.5"/>
                  <circle cx="10" cy="10" r="4" stroke="#fff" strokeWidth="0.7" opacity="0.4"/>
                  <path d="M10 1l1.5 5.5L17 8l-5.5 1.5L10 15l-1.5-5.5L3 8l5.5-1.5L10 1Z" fill="#fff" opacity="0.7"/>
                  <path d="M10 3l1 3.5 3.5 1-3.5 1-1 3.5-1-3.5L5.5 7.5 9 6.5l1-3.5Z" fill="#fff" opacity="0.3"/>
                  <circle cx="10" cy="10" r="1.5" fill="#fff" opacity="0.6"/>
                </svg>
              </motion.div>
              <span style={{ fontWeight: 700, fontSize: 17, color: '#fff' }}>Wanderlust</span>
            </div>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', lineHeight: 1.7, maxWidth: 300 }}>
              We believe travel transforms lives. Every journey we craft tells a story. Let us help you write yours.
            </p>
            <div style={{ display: 'flex', gap: 14, marginTop: 16 }}>
              {['𝕏', '📷', '📘', '🎵'].map((icon) => (
                <motion.span
                  key={icon}
                  whileHover={{ scale: 1.15, color: '#818CF8' }}
                  style={{ color: 'rgba(255,255,255,0.2)', fontSize: 16, cursor: 'pointer', transition: 'color 0.3s' }}
                >
                  {icon}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {Object.entries(links).map(([category, items], i) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <h4 style={{
                fontSize: 12,
                fontWeight: 600,
                color: '#fff',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                marginBottom: 12,
              }}>
                {category}
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                {items.map((item) => (
                  <a
                    key={item}
                    href="#"
                    style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', textDecoration: 'none', transition: 'color 0.3s' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div style={{ height: 1, background: 'rgba(255,255,255,0.04)', marginBottom: 18 }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.15)' }}>
            &copy; 2026 Wanderlust Travel Co. All rights reserved.
          </span>
          <motion.button
            whileHover={{ scale: 1.04, color: '#818CF8' }}
            whileTap={{ scale: 0.96 }}
            onClick={() => router.push('/admin-login')}
            style={{
              background: 'none', border: 'none', cursor: 'pointer', fontSize: 11,
              color: 'rgba(255,255,255,0.12)', fontWeight: 500, fontFamily: 'inherit',
              transition: 'color 0.3s', letterSpacing: '0.5px',
            }}
          >
            Admin
          </motion.button>
        </div>
      </div>
    </footer>
  )
}
