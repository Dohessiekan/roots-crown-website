import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { FaStar } from 'react-icons/fa'

export default function Feedback() {
  const router = useRouter()
  const { bookingId } = router.query
  
  const [feedback, setFeedback] = useState({
    customerName: '',
    customerEmail: '',
    bookingId: '',
    rating: 5,
    serviceRating: 5,
    staffRating: 5,
    facilityRating: 5,
    comment: '',
    wouldRecommend: true,
    improvementSuggestions: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [bookingDetails, setBookingDetails] = useState<any>(null)

  // Update booking ID when router query is available
  useEffect(() => {
    if (bookingId && typeof bookingId === 'string') {
      setFeedback(prev => ({
        ...prev,
        bookingId: bookingId
      }))
      
      // Fetch booking details to show to the user
      fetchBookingDetails(bookingId)
    }
  }, [bookingId])

  const fetchBookingDetails = async (id: string) => {
    try {
      const response = await fetch(`/api/debug/booking?bookingId=${id}`)
      if (response.ok) {
        const data = await response.json()
        setBookingDetails(data.booking)
      }
    } catch (error) {
      console.error('Error fetching booking details:', error)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFeedback(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : 
              type === 'number' ? parseInt(value) : value
    }))
  }

  const handleRatingChange = (category: string, rating: number) => {
    setFeedback(prev => ({
      ...prev,
      [category]: rating
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedback),
      })

      if (response.ok) {
        setSubmitted(true)
      } else {
        alert('Error submitting feedback. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting feedback:', error)
      alert('Error submitting feedback. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const StarRating = ({ rating, onRatingChange, label }: { rating: number, onRatingChange: (rating: number) => void, label: string }) => {
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => onRatingChange(star)}
              className={`text-2xl ${star <= rating ? 'text-yellow-400' : 'text-gray-300'} hover:text-yellow-400 transition-colors`}
            >
              <FaStar />
            </button>
          ))}
        </div>
      </div>
    )
  }

  if (submitted) {
    return (
      <>
        <Head>
          <title>Feedback Submitted - Roots & Crown</title>
        </Head>
        <Navbar />
        
        <div className="min-h-screen bg-gray-50 py-16">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              
              <h1 className="text-3xl font-montaga text-gray-900 mb-4">
                Thank You for Your Feedback!
              </h1>
              
              <p className="text-lg text-gray-600 mb-8">
                Your feedback helps us improve our services and provide better experiences for all our clients.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => router.push('/')}
                  className="bg-[#C7A15A] text-white px-8 py-3 rounded-md hover:bg-[#b38d46] transition font-lato"
                >
                  Return Home
                </button>
                <button
                  onClick={() => router.push('/services')}
                  className="border border-[#C7A15A] text-[#C7A15A] px-8 py-3 rounded-md hover:bg-[#f7e8d0] transition font-lato"
                >
                  Book Another Service
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <Footer />
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Share Your Feedback - Roots & Crown</title>
      </Head>
      <Navbar />
      
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-montaga text-gray-900 mb-4">
              Share Your Experience
            </h1>
            <p className="text-xl text-gray-600">
              We'd love to hear about your visit to Roots & Crown
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Customer Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="customerName"
                    value={feedback.customerName}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-[#C7A15A] focus:border-[#C7A15A]"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="customerEmail"
                    value={feedback.customerEmail}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-[#C7A15A] focus:border-[#C7A15A]"
                    required
                  />
                </div>
              </div>

              {/* Booking Details - Show when booking ID is available */}
              {bookingDetails && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <h3 className="text-lg font-semibold text-green-800 mb-2">Your Booking Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-green-700">Service:</span>
                      <span className="ml-2 text-green-600">{bookingDetails.service?.name}</span>
                    </div>
                    <div>
                      <span className="font-medium text-green-700">Staff:</span>
                      <span className="ml-2 text-green-600">{bookingDetails.staff?.name}</span>
                    </div>
                    <div>
                      <span className="font-medium text-green-700">Date:</span>
                      <span className="ml-2 text-green-600">
                        {new Date(bookingDetails.appointmentDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-green-700">Time:</span>
                      <span className="ml-2 text-green-600">{bookingDetails.appointmentTime}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Booking ID */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {bookingId ? 'Booking ID' : 'Booking ID (Optional)'}
                </label>
                {bookingId ? (
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      name="bookingId"
                      value={feedback.bookingId}
                      readOnly
                      className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-700"
                    />
                    <span className="text-green-600 text-sm">✓ Linked to your booking</span>
                  </div>
                ) : (
                  <input
                    type="text"
                    name="bookingId"
                    value={feedback.bookingId}
                    onChange={handleInputChange}
                    placeholder="Enter your 6-digit booking ID"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-[#C7A15A] focus:border-[#C7A15A]"
                  />
                )}
              </div>

              {/* Ratings */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <StarRating
                  rating={feedback.rating}
                  onRatingChange={(rating) => handleRatingChange('rating', rating)}
                  label="Overall Experience"
                />
                
                <StarRating
                  rating={feedback.serviceRating}
                  onRatingChange={(rating) => handleRatingChange('serviceRating', rating)}
                  label="Service Quality"
                />
                
                <StarRating
                  rating={feedback.staffRating}
                  onRatingChange={(rating) => handleRatingChange('staffRating', rating)}
                  label="Staff Performance"
                />
                
                <StarRating
                  rating={feedback.facilityRating}
                  onRatingChange={(rating) => handleRatingChange('facilityRating', rating)}
                  label="Facility & Cleanliness"
                />
              </div>

              {/* Would Recommend */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Would you recommend us to friends and family?
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="wouldRecommend"
                      value="true"
                      checked={feedback.wouldRecommend === true}
                      onChange={() => setFeedback(prev => ({ ...prev, wouldRecommend: true }))}
                      className="mr-2"
                    />
                    Yes
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="wouldRecommend"
                      value="false"
                      checked={feedback.wouldRecommend === false}
                      onChange={() => setFeedback(prev => ({ ...prev, wouldRecommend: false }))}
                      className="mr-2"
                    />
                    No
                  </label>
                </div>
              </div>

              {/* Comments */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tell us about your experience
                </label>
                <textarea
                  name="comment"
                  value={feedback.comment}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-[#C7A15A] focus:border-[#C7A15A]"
                  placeholder="What did you love most about your visit? How did our team make you feel?"
                />
              </div>

              {/* Improvement Suggestions */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How can we improve? (Optional)
                </label>
                <textarea
                  name="improvementSuggestions"
                  value={feedback.improvementSuggestions}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-[#C7A15A] focus:border-[#C7A15A]"
                  placeholder="Any suggestions for how we can make your next visit even better?"
                />
              </div>

              {/* Submit Button */}
              <div className="text-center pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-8 py-3 rounded-md font-lato text-lg transition ${
                    isSubmitting
                      ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                      : 'bg-[#C7A15A] text-white hover:bg-[#b38d46]'
                  }`}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  )
}
