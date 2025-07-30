import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { FaCheck } from 'react-icons/fa'
import { useBooking } from '../../../src/context/BookingContext'

export default function BookingConfirmation() {
  const router = useRouter()
  const { service: queryService, staff, date, time, bookingId } = router.query
  const { service: contextService } = useBooking()
  const [isClient, setIsClient] = useState(false)

  // Ensure hydration consistency
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Use the service name directly from the query params (now passed properly)
  // or fallback to context service, or use a simple display name
  let displayService = 'Service'
  const serviceValue = queryService || contextService
  if (serviceValue) {
    // If it's already a readable name (from our updated redirect), use it directly
    displayService = Array.isArray(serviceValue) ? serviceValue[0] : serviceValue
  }
  
  const displayStaff = staff || 'Staff Member'
  const displayDate = date || 'Date'
  const displayTime = time || 'Time'
  
  // Fix hydration issue: use router id parameter or generate consistent fallback
  let displayBookingId = '000000'
  
  if (bookingId) {
    displayBookingId = Array.isArray(bookingId) ? bookingId[0] : bookingId
  } else if (router.query.id) {
    // Use the route parameter as booking ID if available
    const routeId = Array.isArray(router.query.id) ? router.query.id[0] : router.query.id
    displayBookingId = routeId || '000000'
  } else if (isClient) {
    // Only generate random on client side to avoid hydration mismatch
    displayBookingId = Math.floor(Math.random() * 1000000).toString().padStart(6, '0')
  }

  return (
    <div style={{ minHeight: '100vh', background: '#FDF5EF' }} className="flex flex-col items-center justify-center py-16 px-4">
      {/* Gold Circle with Check */}
      <div className="flex flex-col items-center justify-center mb-8">
        <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ background: '#C7A15A' }}>
          <FaCheck className="text-white" size={40} />
        </div>
      </div>
      {/* Confirmation Texts */}
      <h1 className="text-2xl md:text-3xl font-montaga text-green-700 mb-2 text-center">Your appointment is confirmed !</h1>
      <p className="font-lato text-lg text-gray-800 mb-8 text-center">Thank you for booking with Roots & Crown</p>
      {/* Details Container */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm px-8 py-6 w-full max-w-md mb-8">
        <div className="font-lato text-base text-gray-700 mb-3 flex flex-row gap-2 items-center">
          <span className="font-semibold min-w-[90px]">Service:</span>
          <span className="ml-2">{displayService}</span>
        </div>
        <div className="font-lato text-base text-gray-700 mb-3 flex flex-row gap-2 items-center">
          <span className="font-semibold min-w-[90px]">Staff:</span>
          <span className="ml-2">{displayStaff}</span>
        </div>
        <div className="font-lato text-base text-gray-700 mb-3 flex flex-row gap-2 items-center">
          <span className="font-semibold min-w-[90px]">Date & Time:</span>
          <span className="ml-2">{displayDate} at {displayTime}</span>
        </div>
        <div className="font-lato text-base text-gray-700 mb-3 flex flex-row gap-2 items-center">
          <span className="font-semibold min-w-[90px]">Booking ID:</span>
          <span className="ml-2">{displayBookingId}</span>
        </div>
        <div className="border-t border-gray-200 my-4"></div>
        <div className="font-lato text-sm text-gray-500 text-center mb-4">A confirmation email has been sent to you.</div>
        <div className="flex flex-row gap-4 justify-center">
          <button
            className="bg-[#C7A15A] text-white font-lato text-base px-8 py-3 rounded-md hover:bg-[#b38d46] transition"
            onClick={() => router.push('/')}
          >
            Return Home
          </button>
          <button
            className="border border-[#C7A15A] text-[#C7A15A] font-lato text-base px-8 py-3 rounded-md hover:bg-[#f7e8d0] transition"
            onClick={() => router.push('/services')}
          >
            Book Another
          </button>
        </div>
      </div>
    </div>
  )
}
