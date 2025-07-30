import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import { useState, useEffect } from 'react'
import ServiceNavbar from '../../components/ServiceNavbar'
import Footer from '../../components/Footer'
import { Staff, StaffService } from '../../lib/api'
import { PrismaClient } from '@prisma/client'

interface FeedbackData {
  id: string
  customerName: string
  rating: number
  comment: string
  serviceName: string
  date: string
  wouldRecommend: boolean
}

interface StaffProfileProps {
  staff: Staff
}

export default function StaffProfile({ staff }: StaffProfileProps) {
  const router = useRouter()
  
  // State for booking form
  const [selectedDate, setSelectedDate] = useState(() => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow.toISOString().split('T')[0]
  })
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [selectedService, setSelectedService] = useState<string>('')
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    phone: '', 
    notes: '' 
  })
  const [isBooking, setIsBooking] = useState(false)
  const [bookingSuccess, setBookingSuccess] = useState(false)
  const [availableSlots, setAvailableSlots] = useState<string[]>([])
  const [loadingSlots, setLoadingSlots] = useState(false)
  
  // State for feedback
  const [feedbacks, setFeedbacks] = useState<FeedbackData[]>([])
  const [loadingFeedback, setLoadingFeedback] = useState(true)

  // Fetch available time slots when date changes
  useEffect(() => {
    if (selectedDate && staff?.id) {
      fetchAvailableSlots()
    }
  }, [selectedDate, staff?.id])

  // Fetch feedback data when component mounts
  useEffect(() => {
    if (staff?.id) {
      fetchFeedback()
    }
  }, [staff?.id])

  const fetchFeedback = async () => {
    setLoadingFeedback(true)
    try {
      const response = await fetch(`/api/staff/${staff.id}/feedback`)
      if (response.ok) {
        const data = await response.json()
        setFeedbacks(data.feedbacks)
      } else {
        console.error('Failed to fetch feedback')
        setFeedbacks([])
      }
    } catch (error) {
      console.error('Error fetching feedback:', error)
      setFeedbacks([])
    } finally {
      setLoadingFeedback(false)
    }
  }

  const fetchAvailableSlots = async () => {
    setLoadingSlots(true)
    setSelectedTime(null) // Reset selected time when date changes
    try {
      const response = await fetch(`/api/availability/${staff.id}?date=${selectedDate}`)
      if (response.ok) {
        const data = await response.json()
        setAvailableSlots(data.availableSlots)
      } else {
        setAvailableSlots([])
      }
    } catch (error) {
      console.error('Error fetching available slots:', error)
      setAvailableSlots([])
    } finally {
      setLoadingSlots(false)
    }
  }

  if (!staff) {
    return (
      <>
        <ServiceNavbar />
        <div className="min-h-screen flex items-center justify-center pt-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Staff Member Not Found</h1>
            <button
              onClick={() => router.push('/services')}
              className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
            >
              Back to Services
            </button>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  // Handle booking form submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!selectedTime || !selectedService) {
      alert('Please select a service and time')
      return
    }

    setIsBooking(true)

    try {
      const bookingData = {
        serviceId: selectedService,
        staffId: staff.id,
        customerName: form.name,
        customerEmail: form.email,
        customerPhone: form.phone,
        appointmentDate: selectedDate,
        appointmentTime: selectedTime,
        notes: form.notes
      }

      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      })

      if (response.ok) {
        const booking = await response.json()
        
        // Show success message and refresh available slots
        setBookingSuccess(true)
        await fetchAvailableSlots()
        
        // Get service name for confirmation page
        const selectedServiceObj = staff.staffServices?.find((rel: StaffService) => rel.service?.id === selectedService)
        const serviceName = selectedServiceObj?.service?.name || 'Service'
        
        // Delay to let user see the success message and slot disappear
        setTimeout(() => {
          router.push(`/book/${booking.id}/confirm?service=${encodeURIComponent(serviceName)}&staff=${encodeURIComponent(staff.name)}&date=${encodeURIComponent(selectedDate)}&time=${encodeURIComponent(selectedTime)}&bookingId=${booking.bookingId}`)
        }, 2000)
        
        return // Exit early to avoid form reset since we're navigating away
      } else {
        const error = await response.json()
        alert(`Booking failed: ${error.message}`)
      }
    } catch (error) {
      console.error('Booking error:', error)
      alert('An error occurred while booking. Please try again.')
    } finally {
      setIsBooking(false)
    }
  }

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  // Format time for display
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${ampm}`
  }

  return (
    <>
      <ServiceNavbar />
      
      {/* Breadcrumb Navigation */}
      <div className="w-full px-4 sm:px-8 md:px-16 lg:px-24 pt-[75px] pb-10">
        <nav className="flex flex-wrap items-center gap-2 text-base font-body bg-transparent py-8 px-0">
          <button 
            onClick={() => router.push('/services')}
            className="hover:underline flex items-center text-gray-700 font-normal"
          >
            Services
          </button>
          <span className="mx-2 text-gray-500">&gt;</span>
          <span className="text-gray-700 font-normal">Staff</span>
          <span className="mx-2 text-gray-500">&gt;</span>
          <span className="text-gray-900 font-normal">{staff.name}</span>
        </nav>
      </div>

      {/* Profile Section */}
      <div className="w-full flex flex-col md:flex-row items-center md:items-start justify-center py-8 md:py-12 gap-6 md:gap-16 lg:gap-24 px-4 sm:px-8 md:px-16 lg:px-24">
        {/* Staff Image */}
        <div className="flex flex-col items-center md:items-start w-full md:w-auto">
          <div className="flex-shrink-0 w-40 h-40 md:w-56 md:h-56 rounded-[5px] overflow-hidden bg-gray-100 shadow-md flex items-center justify-center">
            <img 
              src={staff.image || "/images/staffProfile.svg"} 
              alt={staff.name}
              className="w-full h-full object-cover" 
            />
          </div>
        </div>
        
        {/* Staff Info */}
        <div className="flex flex-col items-center md:items-start max-w-xl mt-8 md:mt-0 text-center md:text-left">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-montaga text-gray-900 mb-4">
            {staff.name}
          </h1>
          <h2 className="text-base md:text-lg lg:text-xl font-lato text-green-700 font-semibold mb-4">
            {staff.title}
          </h2>
          <p className="font-lato text-sm md:text-base lg:text-lg text-gray-600 mb-2 whitespace-pre-line">
            {staff.bio}
          </p>
          {staff.email && (
            <p className="font-lato text-sm text-gray-500 mb-1">
              📧 {staff.email}
            </p>
          )}
          {staff.phone && (
            <p className="font-lato text-sm text-gray-500 mb-4">
              📞 {staff.phone}
            </p>
          )}
        </div>
      </div>

      {/* Rating Section */}
      <div className="w-full flex flex-col items-center justify-center pb-12 gap-8 px-4 sm:px-8 md:px-16 lg:px-24">
        <div className="flex-1 flex flex-col items-center">
          <h3 className="text-2xl md:text-3xl font-montaga text-gray-900 mb-3">Rating</h3>
          <div className="flex items-center">
            <span className="text-lg md:text-xl font-montaga font-normal text-gray-900 mr-3">
              {staff.rating ? staff.rating.toFixed(1) : 'New'}
            </span>
            <div className="flex gap-1">
              {[1,2,3,4,5].map(i => (
                <span 
                  key={i} 
                  className={`text-xl md:text-2xl ${
                    staff.rating && i <= Math.round(staff.rating) ? 'text-yellow-500' : 'text-gray-300'
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
          {staff.reviewCount && staff.reviewCount > 0 && (
            <p className="font-lato text-sm text-gray-500 mt-1">
              Based on {staff.reviewCount} reviews
            </p>
          )}
        </div>
      </div>

      {/* Booking Section */}
      <div className="w-full px-4 sm:px-8 md:px-16 lg:px-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-montaga text-gray-900 mb-6">Book an Appointment</h3>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Service Selection */}
            <div>
              <label className="block font-lato text-base text-gray-700 mb-2">Select Service</label>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full border border-gray-300 rounded-md outline-none bg-white text-gray-900 font-lato text-base p-3"
                required
              >
                <option value="">Choose a service...</option>
                {staff.staffServices?.map((serviceRelation: StaffService) => (
                  <option key={serviceRelation.service?.id} value={serviceRelation.service?.id}>
                    {serviceRelation.service?.name} - {serviceRelation.service?.price}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-lato text-base text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full border border-gray-300 rounded-md outline-none bg-white text-gray-900 font-lato text-base p-3"
                  required
                />
              </div>
              
              {/* Time Selection */}
              <div>
                <label className="block font-lato text-base text-gray-700 mb-2">
                  Available Times
                  {loadingSlots && <span className="text-sm text-gray-500 ml-2">(Loading...)</span>}
                </label>
                {loadingSlots ? (
                  <div className="grid grid-cols-4 gap-2 max-h-32 overflow-y-auto">
                    {[1,2,3,4,5,6,7,8].map(i => (
                      <div key={i} className="px-2 py-2 text-sm border rounded-md bg-gray-100 animate-pulse h-8"></div>
                    ))}
                  </div>
                ) : availableSlots.length > 0 ? (
                  <div className="grid grid-cols-4 gap-2 max-h-32 overflow-y-auto">
                    {availableSlots.map((time: string) => (
                      <button
                        key={time}
                        type="button"
                        className={`px-2 py-2 text-sm border rounded-md font-lato transition ${
                          selectedTime === time 
                            ? 'border-green-600 bg-green-100 text-green-800' 
                            : 'border-gray-300 bg-white text-gray-900 hover:border-green-600'
                        }`}
                        onClick={() => setSelectedTime(time)}
                      >
                        {formatTime(time)}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="text-gray-500 text-sm py-4 text-center border border-gray-200 rounded-md">
                    No available time slots for this date. Please select another date.
                  </div>
                )}
              </div>
            </div>

            {/* Customer Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md outline-none bg-white text-gray-900 font-lato text-base p-3"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md outline-none bg-white text-gray-900 font-lato text-base p-3"
                required
              />
            </div>

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md outline-none bg-white text-gray-900 font-lato text-base p-3"
              required
            />

            <textarea
              name="notes"
              placeholder="Additional Notes (Optional)"
              value={form.notes}
              onChange={handleInputChange}
              rows={4}
              className="w-full border border-gray-300 rounded-md outline-none bg-white text-gray-900 font-lato text-base p-3 resize-none"
            />

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isBooking || !selectedTime || !selectedService || bookingSuccess}
              className={`w-full md:w-auto px-8 py-3 rounded-md font-lato text-base transition ${
                isBooking || !selectedTime || !selectedService || bookingSuccess
                  ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                  : 'bg-[#C7A15A] text-white hover:bg-[#b38d46]'
              }`}
            >
              {bookingSuccess ? '✅ Booking Successful!' : isBooking ? 'Processing Booking...' : 'Book Appointment'}
            </button>

            {/* Success Message */}
            {bookingSuccess && (
              <div className="w-full md:w-auto px-6 py-3 bg-green-100 border border-green-400 text-green-700 rounded-md text-center">
                <p className="font-lato text-base">
                  ✅ Booking confirmed! The selected time slot has been removed from availability.
                  <br />
                  <span className="text-sm">Redirecting to confirmation page...</span>
                </p>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Customer Feedback Section */}
      <div className="w-full flex flex-row items-stretch justify-between pb-12 gap-8 md:gap-24 px-4 sm:px-8 md:px-16 lg:px-24">
        <div className="flex-1 flex flex-col items-start">
          <h3 className="text-2xl md:text-3xl font-montaga text-gray-900 mb-3">Customer Feedback</h3>
          
          {loadingFeedback ? (
            <div className="w-full max-w-2xl flex flex-col gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex flex-row items-start gap-4 w-full animate-pulse">
                  <div className="w-12 h-12 rounded-full bg-gray-300"></div>
                  <div className="flex-1 flex flex-col">
                    <div className="h-4 bg-gray-300 rounded mb-2 w-3/4"></div>
                    <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : feedbacks.length > 0 ? (
            <div className="w-full max-w-2xl flex flex-col gap-6">
              {feedbacks.map((feedback, idx) => {
                // Generate a random color for the profile circle (from a fixed palette for consistency)
                const colors = ['bg-[#C7A15A]', 'bg-green-600', 'bg-blue-500', 'bg-pink-500', 'bg-purple-500', 'bg-red-400'];
                const color = colors[idx % colors.length];
                const feedbackDate = new Date(feedback.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                });
                
                return (
                  <div key={feedback.id} className="flex flex-row items-start gap-4 w-full">
                    {/* Profile Circle */}
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-bold ${color}`}>
                      {feedback.customerName.charAt(0)}
                    </div>
                    {/* Comment and Details */}
                    <div className="flex-1 flex flex-col">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map(i => (
                            <span 
                              key={i} 
                              className={`text-sm ${i <= feedback.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">• {feedback.serviceName}</span>
                      </div>
                      {feedback.comment && (
                        <div className="font-lato text-base text-gray-900 mb-1">{feedback.comment}</div>
                      )}
                      <div className="flex flex-row justify-between text-sm text-gray-500 font-lato">
                        <span>{feedback.customerName}</span>
                        <span>{feedbackDate}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="w-full max-w-2xl text-center py-8 text-gray-500">
              <p className="font-lato text-base">No customer feedback yet.</p>
              <p className="font-lato text-sm mt-2">Be the first to share your experience!</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const staffId = params?.id as string
    
    if (!staffId) {
      return { notFound: true }
    }

    // Use direct database access instead of HTTP API
    const prisma = new PrismaClient()
    
    try {
      // Fetch staff member by ID with services
      const staff = await prisma.staff.findUnique({
        where: { id: staffId },
        include: {
          staffServices: {
            include: {
              service: {
                include: {
                  category: true
                }
              }
            }
          }
        }
      })

      if (!staff) {
        await prisma.$disconnect()
        return { notFound: true }
      }

      // Parse the specialties JSON string
      let parsedStaff = {
        ...staff,
        specialties: []
      }
      
      try {
        if (staff.specialties) {
          parsedStaff.specialties = JSON.parse(staff.specialties)
        }
      } catch (error) {
        console.error('Error parsing specialties:', error)
        parsedStaff.specialties = []
      }

      await prisma.$disconnect()

      return {
        props: {
          staff: JSON.parse(JSON.stringify(parsedStaff))
        }
      }
    } catch (dbError) {
      console.error('Database error:', dbError)
      await prisma.$disconnect()
      return { notFound: true }
    }
  } catch (error) {
    console.error('Error fetching staff data:', error)
    return { notFound: true }
  }
}
