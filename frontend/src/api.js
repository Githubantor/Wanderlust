const API_BASE = '/api'

async function request(url, options = {}) {
  const res = await fetch(`${API_BASE}${url}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }))
    throw new Error(err.error || 'Request failed')
  }
  return res.json()
}

export async function fetchDestinations() {
  return request('/destinations')
}

export async function fetchDestination(name) {
  return request(`/destinations/${encodeURIComponent(name)}`)
}

export async function fetchTestimonials() {
  return request('/testimonials')
}

export async function fetchAddons() {
  return request('/addons')
}

export async function createBooking(data) {
  return request('/bookings', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export async function fetchBookings() {
  return request('/bookings')
}

export async function deleteBooking(id) {
  return request(`/bookings/${id}`, { method: 'DELETE' })
}

export async function adminLogin(password) {
  return request('/admin/login', {
    method: 'POST',
    body: JSON.stringify({ password }),
  })
}

export async function adminFetchBookings(token) {
  return request('/admin/bookings', {
    headers: { Authorization: `Bearer ${token}` },
  })
}

export async function adminUpdateBooking(id, data, token) {
  return request(`/admin/bookings/${id}`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  })
}
