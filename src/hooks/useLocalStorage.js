import { useState } from 'react'

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') return initialValue
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = (value) => {
    try {
      setStoredValue(prev => {
        const newValue = value instanceof Function ? value(prev) : value
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(newValue))
        }
        return newValue
      })
    } catch (error) {
      console.error(error)
    }
  }

  const removeValue = () => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key)
      }
      setStoredValue(initialValue instanceof Function ? initialValue() : initialValue)
    } catch (error) {
      console.error(error)
    }
  }

  return [storedValue, setValue, removeValue]
}

export function useBookingForm(initialState = {}) {
  const [formState, setFormState] = useLocalStorage('booking_form_state', {
    dest: '',
    travelers: 2,
    departure: '',
    returnDate: '',
    name: '',
    email: '',
    phone: '',
    notes: '',
    selectedAddons: [],
    step: 1,
    ...initialState,
  })

  const updateField = (field, value) => {
    setFormState(prev => ({ ...prev, [field]: value }))
  }

  const updateMultiple = (updates) => {
    setFormState(prev => ({ ...prev, ...updates }))
  }

  const resetForm = () => {
    setFormState({
      dest: '',
      travelers: 2,
      departure: '',
      returnDate: '',
      name: '',
      email: '',
      phone: '',
      notes: '',
      selectedAddons: [],
      step: 1,
    })
  }

  return { formState, setFormState, updateField, updateMultiple, resetForm }
}

export function useBookingPreview(initialState = {}) {
  const [previewState, setPreviewState] = useLocalStorage('booking_preview_state', {
    dest: 'Maldives',
    count: 2,
    date: '',
    showPrice: false,
    ...initialState,
  })

  const updateField = (field, value) => {
    setPreviewState(prev => ({ ...prev, [field]: value }))
  }

  const resetPreview = () => {
    setPreviewState({
      dest: 'Maldives',
      count: 2,
      date: '',
      showPrice: false,
    })
  }

  return { previewState, setPreviewState, updateField, resetPreview }
}

export function useUserProfile() {
  const [profile, setProfile] = useLocalStorage('user_profile', {
    name: '',
    email: '',
    phone: '',
  })

  const updateProfile = (updates) => {
    setProfile(prev => ({ ...prev, ...updates }))
  }

  return { profile, setProfile, updateProfile }
}

export function useBookingHistory() {
  const [history, setHistory, clearHistory] = useLocalStorage('booking_history', [])

  const addBooking = (booking) => {
    const newBooking = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      ...booking,
    }
    setHistory(prev => [newBooking, ...prev].slice(0, 50))
    return newBooking
  }

  const removeBooking = (id) => {
    setHistory(prev => prev.filter(b => b.id !== id))
  }

  return { history, addBooking, removeBooking, clearHistory }
}

export function useSelectedTrip() {
  const [trip, setTrip, removeTrip] = useLocalStorage('selected_trip', null)
  return { trip, setTrip, removeTrip }
}

export function useUserPreferences() {
  const [prefs, setPrefs] = useLocalStorage('user_preferences', {
    currency: 'USD',
    theme: 'dark',
    notifications: true,
  })

  return { prefs, setPrefs }
}