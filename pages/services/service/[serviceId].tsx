import { useRouter } from 'next/router'
import { useState } from 'react'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import Footer from '../../../components/Footer'
import ServiceNavbar from '../../../components/ServiceNavbar'
import { servicesApi, staffApi, Service, Staff } from '../../../lib/api'

// Utility to slugify service names for URLs
function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

interface ServiceDetailProps {
  service: Service
  availableStaff: Staff[]
}

export default function ServiceDetail({ service, availableStaff }: ServiceDetailProps) {
  const router = useRouter()
  const [page, setPage] = useState(1)
  const pageSize = 9 // 3 lines of 3 cards

  const totalPages = Math.ceil(availableStaff.length / pageSize)
  const paginatedStaff = availableStaff.slice((page - 1) * pageSize, page * pageSize)

  if (!service) {
    return (
      <>
        <ServiceNavbar />
        <div className="min-h-screen flex items-center justify-center pt-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Service Not Found</h1>
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

  return (
    <>
      <ServiceNavbar />
      {/* Banner Section - Responsive like services page */}
      <section className="relative w-full h-[320px] md:h-[400px] lg:h-[484px] flex items-center justify-center overflow-hidden">
        <img
          src="/images/staffBanner.svg"
          alt="Service Banner"
          className="absolute inset-0 w-full h-full object-cover object-center z-0 select-none pointer-events-none"
          draggable="false"
        />
        <div className="relative z-10 flex flex-col items-start justify-center w-full h-full px-4 sm:px-8 md:px-16 lg:px-24">
          {/* Breadcrumb Navigation Overlay */}
          <div className="hidden md:flex flex-wrap items-center gap-1 sm:gap-2 bg-transparent mb-4 md:mb-6 text-xs md:text-base pt-0 md:pt-1 lg:pt-0 xl:pt-0">
            <Link href="/services" className="text-white font-body hover:underline flex items-center">
              Services
            </Link>
            <span className="mx-1 sm:mx-2 text-white">&gt;</span>
            <Link href={`/services/${service.category?.slug || ''}`} className="text-white font-body hover:underline flex items-center">
              {service.category?.name || 'Category'}
            </Link>
            <span className="mx-1 sm:mx-2 text-white">&gt;</span>
            <span className="text-white font-body">{service.name}</span>
          </div>
          <h1 className="font-montaga text-2xl md:text-3xl lg:text-4xl text-yellow-500 text-left mb-4 pt-14 sm:pt-0 md:pt-0 lg:pt-0" style={{ letterSpacing: '1px' }}>
            {service.name}
          </h1>
          <p className="font-body italic text-base md:text-lg text-white max-w-2xl text-left">
            {service.description}. This service is provided by our experienced specialists and is tailored to your needs for maximum comfort and results. Book now to enjoy a premium experience at Roots Crown.
          </p>
          <div className="mt-4 bg-white bg-opacity-20 rounded-lg px-4 py-2">
            <span className="text-white font-bold text-lg">Price: {service.price}</span>
            {service.duration && (
              <span className="text-white ml-4">Duration: {service.duration}</span>
            )}
          </div>
        </div>
      </section>
      <main className="pt-0 bg-white">
        {/* Our Specialists Section */}
        <section className="py-0 bg-white">
          <div className="max-w-full mx-auto px-2 sm:px-4 md:px-8 lg:px-12">
            <h2 className="font-montaga text-2xl sm:text-3xl text-primary-green text-center mb-8 sm:mb-12 mt-8 sm:mt-12">
              Available Professionals
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-10">
              {paginatedStaff.length === 0 ? (
                <div className="col-span-full text-center text-gray-500 py-12 text-lg">
                  No professionals found for this service.
                </div>
              ) : (
                paginatedStaff.map((staff) => (
                  <div key={staff.id} className="flex flex-row w-full h-44 bg-white border border-gray-200 rounded-[5px] overflow-hidden shadow-sm">
                    <div className="h-full w-[35%] flex-shrink-0">
                      <img
                        src={staff.image || "/images/staffImg.svg"}
                        alt={staff.name}
                        className="h-full w-full object-cover"
                        style={{ borderTopLeftRadius: '5px', borderBottomLeftRadius: '5px', borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-center pl-6 pr-4 relative">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-montaga text-lg text-gray-900">{staff.name}</h3>
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-400 text-xl">★</span>
                          <span className="text-black font-bold text-base">{staff.rating}</span>
                        </div>
                      </div>
                      <p className="text-primary-green font-semibold text-sm mb-2">{staff.title}</p>
                      <p className="text-gray-700 text-sm mb-4">Specialties: {staff.specialties.join(', ')}</p>
                      <div className="flex justify-start items-center">
                        <button
                          className="text-white font-body font-semibold px-4 py-2 rounded-lg shadow-sm transition-colors text-sm"
                          style={{ backgroundColor: '#C49B38' }}
                          onClick={() => router.push(`/staff/${staff.id}`)}
                        >
                          View Profile
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8 sm:mt-10 gap-2 mb-8 sm:mb-12">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`h-10 sm:h-12 w-8 sm:w-10 px-0 py-0 rounded-none font-body font-semibold text-base transition-colors border-0 flex items-center justify-center ${
                      page === i + 1
                        ? 'bg-accent text-white'
                        : 'bg-white text-accent border border-accent'
                    }`}
                    style={{ minWidth: '32px', minHeight: '40px', width: '32px', height: '40px' }}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const serviceId = params?.serviceId as string
    
    if (!serviceId) {
      return { notFound: true }
    }

    // Fetch service by slug (serviceId is actually the slug)
    const services = await servicesApi.getAll()
    const service = services.find((s: Service) => slugify(s.name) === serviceId)

    if (!service) {
      return { notFound: true }
    }

    // Fetch staff who can perform this service
    const allStaff = await staffApi.getAll()
    const availableStaff = allStaff.filter((staff: Staff) => 
      staff.staffServices?.some((staffService: any) => staffService.serviceId === service.id)
    )

    return {
      props: {
        service,
        availableStaff
      }
    }
  } catch (error) {
    console.error('Error fetching service data:', error)
    return { notFound: true }
  }
}
