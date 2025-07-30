// API client utilities for Roots & Crown booking system

const API_BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'

// Generic API request function
async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}/api${endpoint}`
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  }

  try {
    const response = await fetch(url, config)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('API request failed:', error)
    throw error
  }
}

// Categories API
export const categoriesApi = {
  getAll: () => apiRequest('/categories'),
  getBySlug: (slug: string) => apiRequest(`/categories/${slug}`),
  create: (data: any) => apiRequest('/categories', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
}

// Services API
export const servicesApi = {
  getAll: (categoryId?: string) => {
    const query = categoryId ? `?categoryId=${categoryId}` : ''
    return apiRequest(`/services${query}`)
  },
  getBySlug: (slug: string) => apiRequest(`/services/${slug}`),
  create: (data: any) => apiRequest('/services', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
}

// Staff API
export const staffApi = {
  getAll: (serviceId?: string) => {
    const query = serviceId ? `?serviceId=${serviceId}` : ''
    return apiRequest(`/staff${query}`)
  },
  getById: (id: string) => apiRequest(`/staff/${id}`),
  create: (data: any) => apiRequest('/staff', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: string, data: any) => apiRequest(`/staff/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id: string) => apiRequest(`/staff/${id}`, {
    method: 'DELETE',
  }),
}

// Bookings API
export const bookingsApi = {
  getAll: (params?: { staffId?: string; status?: string; date?: string }) => {
    const query = new URLSearchParams()
    if (params?.staffId) query.append('staffId', params.staffId)
    if (params?.status) query.append('status', params.status)
    if (params?.date) query.append('date', params.date)
    
    const queryString = query.toString()
    return apiRequest(`/bookings${queryString ? `?${queryString}` : ''}`)
  },
  getById: (id: string) => apiRequest(`/bookings/${id}`),
  create: (data: any) => apiRequest('/bookings', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: string, data: any) => apiRequest(`/bookings/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id: string) => apiRequest(`/bookings/${id}`, {
    method: 'DELETE',
  }),
}

// Availability API
export const availabilityApi = {
  getAvailableSlots: (staffId: string, date: string) => 
    apiRequest(`/availability/${staffId}?date=${date}`),
}

// Utility functions
export const utils = {
  formatDate: (date: Date): string => {
    return date.toISOString().split('T')[0]
  },
  
  formatTime: (time: string): string => {
    const [hours, minutes] = time.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${ampm}`
  },
  
  generateBookingId: (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString()
  },
  
  calculateEndTime: (startTime: string, duration: string): string => {
    const durationMinutes = parseInt(duration.replace(/\D/g, '')) || 60
    const [hours, minutes] = startTime.split(':').map(Number)
    const totalMinutes = hours * 60 + minutes + durationMinutes
    const endHours = Math.floor(totalMinutes / 60)
    const endMins = totalMinutes % 60
    return `${endHours.toString().padStart(2, '0')}:${endMins.toString().padStart(2, '0')}`
  }
}

// Types for TypeScript
export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  icon?: string
  services?: Service[]
  createdAt: string
  updatedAt: string
}

export interface Service {
  id: string
  name: string
  slug: string
  description: string
  price: string
  duration: string
  image?: string
  categoryId: string
  category?: Category
  staffServices?: StaffService[]
  createdAt: string
  updatedAt: string
}

export interface Staff {
  id: string
  name: string
  title: string
  bio: string
  email: string
  phone?: string
  image?: string
  specialties: string[]
  rating?: number
  reviewCount?: number
  nextAvailable?: string
  isActive: boolean
  staffServices?: StaffService[]
  availability?: Availability[]
  createdAt: string
  updatedAt: string
}

export interface StaffService {
  id: string
  staffId: string
  serviceId: string
  staff?: Staff
  service?: Service
  createdAt: string
}

export interface Availability {
  id: string
  staffId: string
  dayOfWeek: number
  startTime: string
  endTime: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface Booking {
  id: string
  bookingId: string
  customerName: string
  customerEmail: string
  customerPhone?: string
  serviceId: string
  staffId: string
  appointmentDate: string
  appointmentTime: string
  status: 'CONFIRMED' | 'COMPLETED' | 'CANCELLED'
  notes?: string
  totalPrice?: string
  service?: Service
  staff?: Staff
  createdAt: string
  updatedAt: string
}
