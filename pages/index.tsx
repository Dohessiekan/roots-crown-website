import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ServiceCard from '../components/ServiceCard'

// Sample data - replace with actual data from your backend
const featuredServices = [
  {
    id: '1',
    name: 'Hair Styling',
    description: 'Professional hair cuts, styling, and treatments',
    price: 'From $45',
    duration: '60-90 min',
    image: '/images/hair-styling.jpg'
  },
  {
    id: '2',
    name: 'Facial Treatment',
    description: 'Rejuvenating facial treatments for all skin types',
    price: 'From $75',
    duration: '75 min',
    image: '/images/facial.jpg'
  },
  {
    id: '3',
    name: 'Massage Therapy',
    description: 'Relaxing massage therapy for stress relief',
    price: 'From $85',
    duration: '60 min',
    image: '/images/massage.jpg'
  }
]

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section 
          className="relative text-white py-20 h-[32rem] flex items-center"
          style={{
            backgroundImage: "url('/images/homepageh.svg')",
            backgroundSize: 'cover',
            backgroundPosition: 'bottom center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-start w-full lg:w-2/3">
            <h1 className="text-3xl md:text-5xl font-heading font-bold mb-6 text-white">
              Welcome to Roots & Crown
            </h1>
            <p className="text-lg md:text-xl mb-8 font-sans font-normal text-white">
              Step into our vibrant Kigali salon where beauty meets passion. From braids to skin care, our talented team is here to pamper you with style, laughter, and a touch of home.
            </p>
            <button className="flex items-center gap-2 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors font-sans"
              style={{ backgroundColor: '#C49B38' }}
            >
              Explore Now
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </section>

        {/* About Us Section */}
        <section className="py-16 bg-white">
          <div className="w-full max-w-7xl mx-auto px-4" style={{ width: '80%' }}>
            <h2 className="text-4xl font-heading text-primary-green text-center mb-8">
              About Us
            </h2>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-32 mt-24">
              <div className="w-full md:w-1/2 flex justify-center md:justify-start">
                <img src="/images/aboutus.svg" alt="About Us" className="max-w-xs w-full h-auto" />
              </div>
              <div className="w-full md:w-1/2">
                <p className="text-gray-700 text-lg text-left mb-8">
                  <span className="text-primary-green font-heading text-xl md:text-2xl">Roots &amp; Crown</span> is a one-stop beauty lounge based in Kigali, offering expert care in <span className="text-primary-green">beauty</span>, <span className="text-primary-green">grooming</span>, and wellness. From stylish cuts and advanced facials to massage therapy and spa treatments, our goal is to provide high-quality, personalized experiences that help you feel <span className="text-primary-green">beautiful</span>, inside and out.
                </p>
                <p className="text-gray-700 text-lg text-left">
                  We believe in more than just great service, we’re here to help you <span className="text-primary-green">relax</span>, <span className="text-primary-green">restore</span>, and <span className="text-primary-green">reconnect</span> with yourself in a serene and luxurious setting.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Core Values Section */}
        <section className="py-16" style={{ backgroundColor: 'rgba(162, 207, 168, 0.24)' }}>
          <div className="w-full max-w-7xl mx-auto px-4" style={{ width: '100%' }}>
            <h2 className="text-4xl font-heading text-primary-green text-center mb-8">
              Our Core Values
            </h2>
            <div className="flex flex-col md:flex-row justify-center items-stretch gap-12 mt-16" style={{ width: '100%' }}>
              {/* Excellence */}
              <div className="flex flex-col items-center text-center px-8 py-10 flex-1">
                <img src="/images/excellence.svg" alt="Excellence" className="mb-6 w-20 h-20" />
                <h3 className="text-primary-green font-semibold font-sans text-xl mb-4">Excellence</h3>
                <p className="text-gray-700 text-lg md:text-xl font-sans">
                  Professional, top-tier care at every visit. We strive to exceed expectations and deliver results you can trust.
                </p>
              </div>
              {/* Wellbeing */}
              <div className="flex flex-col items-center text-center px-8 py-10 flex-1">
                <img src="/images/wellbeing.svg" alt="Wellbeing" className="mb-6 w-20 h-20" />
                <h3 className="text-primary-green font-semibold font-sans text-xl mb-4">Wellbeing</h3>
                <p className="text-gray-700 text-lg md:text-xl font-sans">
                  Beauty starts with how you feel. We create a welcoming space where you can relax, recharge, and leave feeling your best.
                </p>
              </div>
              {/* Personalized Attention */}
              <div className="flex flex-col items-center text-center px-8 py-10 flex-1">
                <img src="/images/attention.svg" alt="Personalized Attention" className="mb-6 w-20 h-20" />
                <h3 className="text-primary-green font-semibold font-sans text-xl mb-4">Personalized Attention</h3>
                <p className="text-gray-700 text-lg md:text-xl font-sans">
                  Every client deserves unique, thoughtful treatment. We listen, adapt, and tailor every service to your individual needs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Services Section */}
        <section className="py-16 bg-gray-50">
          <div className="w-full max-w-7xl mx-auto px-4" style={{ width: '100%' }}>
            <h2 className="text-4xl font-heading text-primary-green text-center mb-12">
              Our Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {/* Service Card 1 */}
              <div className="bg-white shadow-md rounded-lg border border-gray-200 p-6 flex flex-col items-start">
                <img src="/images/HairIcon.svg" alt="Hair Services Icon" className="mb-3 w-14 h-14" />
                <h3 className="font-heading text-xl text-primary-green mb-2">Hair Services</h3>
                <p className="text-gray-700 text-base text-left">Haircuts, styling, braids, coloring, and deep treatments like keratin or protein care.</p>
              </div>
              {/* Service Card 2 */}
              <div className="bg-white shadow-md rounded-lg border border-gray-200 p-6 flex flex-col items-start">
                <img src="/images/skinIcon.svg" alt="Skincare & Facials Icon" className="mb-3 w-14 h-14" />
                <h3 className="font-heading text-xl text-primary-green mb-2">Skincare & Facials</h3>
                <p className="text-gray-700 text-base text-left">Advanced facials, anti-aging treatments, cleansing, exfoliation, and glowing skin care.</p>
              </div>
              {/* Service Card 3 */}
              <div className="bg-white shadow-md rounded-lg border border-gray-200 p-6 flex flex-col items-start">
                <img src="/images/MassageIcon.svg" alt="Massage Therapy Icon" className="mb-3 w-14 h-14" />
                <h3 className="font-heading text-xl text-primary-green mb-2">Massage Therapy</h3>
                <p className="text-gray-700 text-base text-left">Relaxation, deep tissue, and aromatherapy massage options for stress relief and healing.</p>
              </div>
              {/* Service Card 4 */}
              <div className="bg-white shadow-md rounded-lg border border-gray-200 p-6 flex flex-col items-start">
                <img src="/images/nailsIcon.svg" alt="Nail Services Icon" className="mb-3 w-14 h-14" />
                <h3 className="font-heading text-xl text-primary-green mb-2">Nail Services</h3>
                <p className="text-gray-700 text-base text-left">Manicures, pedicures, gel and acrylic nails, nail art, and nourishing treatments.</p>
              </div>
              {/* Service Card 5 */}
              <div className="bg-white shadow-md rounded-lg border border-gray-200 p-6 flex flex-col items-start">
                <img src="/images/BodyIcon.svg" alt="Body Treatments Icon" className="mb-3 w-14 h-14" />
                <h3 className="font-heading text-xl text-primary-green mb-2">Body Treatments</h3>
                <p className="text-gray-700 text-base text-left">Full-body scrubs, exfoliation, and wraps for smooth, glowing skin.</p>
              </div>
              {/* Service Card 6 */}
              <div className="bg-white shadow-md rounded-lg border border-gray-200 p-6 flex flex-col items-start">
                <img src="/images/RemovalIcon.svg" alt="Hair Removal Icon" className="mb-3 w-14 h-14" />
                <h3 className="font-heading text-xl text-primary-green mb-2">Hair Removal</h3>
                <p className="text-gray-700 text-base text-left">Professional waxing and threading for smooth, clean results.</p>
              </div>
            </div>
            <div className="flex justify-center mt-10">
              <button className="text-white font-semibold px-8 py-3 rounded-lg text-lg transition-colors shadow-md"
                style={{ backgroundColor: '#C49B38' }}
              >
                See More
              </button>
            </div>
            <div className="w-screen relative left-1/2 right-1/2 -translate-x-1/2">
              <hr className="mt-8 mb-0 border-t border-gray-200 w-full" />
            </div>

            {/* Testimonials Section */}
            <section className="py-16 bg-white">
              <div className="w-full max-w-none mx-auto px-4" style={{ width: '100%' }}>
                <h2 className="text-4xl font-heading text-primary-green text-center mb-6">
                  Testimonials
                </h2>
                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                  {/* Testimonial Card 1 */}
                  <div className="bg-white shadow-md rounded-lg border border-gray-200 p-10 flex flex-col items-start w-full max-w-[600px] mx-auto">
                    <div className="flex items-center mb-4">
                      {/* 5 stars */}
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" /></svg>
                      ))}
                    </div>
                    <p className="text-black italic text-left mb-4">
                      "Absolutely loved my experience! The staff is so friendly and my hair has never looked better."
                    </p>
                    <div className="text-gray-500 italic text-right w-full">
                      — Aline M.
                    </div>
                  </div>
                  {/* Testimonial Card 2 */}
                  <div className="bg-white shadow-md rounded-lg border border-gray-200 p-10 flex flex-col items-start w-full max-w-[600px] mx-auto">
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" /></svg>
                      ))}
                    </div>
                    <p className="text-black italic text-left mb-4">
                      "The massage therapy was so relaxing. I left feeling completely renewed. Highly recommend Roots & Crown!"
                    </p>
                    <div className="text-gray-500 italic text-right w-full">
                      — Jean-Paul N.
                    </div>
                  </div>
                  {/* Testimonial Card 3 */}
                  <div className="bg-white shadow-md rounded-lg border border-gray-200 p-10 flex flex-col items-start w-full max-w-[600px] mx-auto">
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" /></svg>
                      ))}
                    </div>
                    <p className="text-black italic text-left mb-4">
                      "Clean, beautiful space and truly personalized attention. I always feel pampered and valued."
                    </p>
                    <div className="text-gray-500 italic text-right w-full">
                      — Diane K.
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
