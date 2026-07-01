import { motion } from 'framer-motion'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { adminLogin } from '../api'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await adminLogin(password)
      sessionStorage.setItem('admin_token', res.token)
      navigate('/admin')
    } catch {
      setError('Invalid password')
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#08080e', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <motion.div animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }} transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', top: '-10%', left: '-5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.06), transparent)', filter: 'blur(80px)' }} />
      </div>
      <motion.form
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        style={{
          position: 'relative', zIndex: 1, width: '100%', maxWidth: 380, padding: 32, borderRadius: 18,
          background: 'linear-gradient(135deg, rgba(99,102,241,0.06), rgba(139,92,246,0.03))',
          border: '1px solid rgba(99,102,241,0.08)',
        }}
      >
        <div style={{ width: 48, height: 48, borderRadius: 12, background: 'linear-gradient(135deg, #6366F1, #8B5CF6)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"><path d="M12 3v2m0 14v2M3 12h2m14 0h2M5.64 5.64l1.42 1.42m9.9 9.9l1.42 1.42M5.64 18.36l1.42-1.42m9.9-9.9l1.42-1.42"/><circle cx="12" cy="12" r="4"/></svg>
        </div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#fff', textAlign: 'center', marginBottom: 4 }}>Admin Access</h2>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', textAlign: 'center', marginBottom: 20 }}>Enter the secret password to continue</p>

        <input
          type="password" value={password} onChange={e => setError('') || setPassword(e.target.value)}
          placeholder="Enter password" autoFocus
          style={{
            width: '100%', padding: '11px 14px', borderRadius: 10, border: `1px solid ${error ? 'rgba(244,114,182,0.4)' : 'rgba(255,255,255,0.08)'}`,
            background: 'rgba(255,255,255,0.02)', color: '#fff', fontSize: 13, outline: 'none', fontFamily: 'inherit',
            marginBottom: 12,
          }}
        />
        {error && (
          <div style={{ fontSize: 12, color: '#F472B6', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#F472B6" strokeWidth="1.5" strokeLinecap="round"><circle cx="6" cy="6" r="5"/><path d="M6 4v2M6 8h0"/></svg>
            {error}
          </div>
        )}

        <motion.button
          type="submit" disabled={!password || loading}
          whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(99,102,241,0.25)' }}
          whileTap={{ scale: 0.96 }}
          style={{
            width: '100%', padding: '13px 0', borderRadius: 10, border: 'none',
            background: 'linear-gradient(135deg, #6366F1, #8B5CF6)', color: '#fff', fontWeight: 600, fontSize: 13,
            cursor: 'pointer', opacity: password && !loading ? 1 : 0.5, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}
        >
          {loading ? (
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              style={{ width: 16, height: 16, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff' }} />
          ) : 'Unlock Dashboard'}
        </motion.button>
      </motion.form>
    </div>
  )
}
