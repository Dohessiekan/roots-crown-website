import { GetServerSideProps } from 'next'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import ServiceNavbar from '../../components/ServiceNavbar'
import Footer from '../../components/Footer'
import StaffCard from '../../components/StaffCard'
import { Staff } from '../../lib/api'
import { PrismaClient } from '@prisma/client'

interface StaffPageProps {
  staff: Staff[]
}

export default function StaffPage({ staff }: StaffPageProps) {
  const router = useRouter()
  const [page, setPage] = useState(1)
  const pageSize = 9 // 3 lines of 3 cards

  const totalPages = Math.ceil(staff.length / pageSize)
  const paginatedStaff = staff.slice((page - 1) * pageSize, page * pageSize)

  return (
    <>
      <ServiceNavbar />
      
      {/* Banner Section */}
      <section className="relative w-full h-[320px] md:h-[400px] lg:h-[484px] flex items-center justify-center overflow-hidden">
        <img
          src="/images/staffBanner.svg"
          alt="Staff Banner"
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
            <span className="text-white font-body">Staff</span>
          </div>
          <h1 className="font-montaga text-2xl md:text-3xl lg:text-4xl text-yellow-500 text-left mb-4 pt-14 sm:pt-0 md:pt-0 lg:pt-0" style={{ letterSpacing: '1px' }}>
            Our Professional Team
          </h1>
          <p className="font-body italic text-base md:text-lg text-white max-w-2xl text-left">
            Meet our experienced specialists who are dedicated to providing you with exceptional beauty and wellness services. Each member of our team brings unique skills and expertise to ensure you receive the best care possible.
          </p>
        </div>
      </section>

      <main className="pt-0 bg-white">
        {/* Staff Section */}
        <section className="py-0 bg-white">
          <div className="max-w-full mx-auto px-2 sm:px-4 md:px-8 lg:px-12">
            <h2 className="font-montaga text-2xl sm:text-3xl text-primary-green text-center mb-8 sm:mb-12 mt-8 sm:mt-12">
              Meet Our Team
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-10">
              {paginatedStaff.length === 0 ? (
                <div className="col-span-full text-center text-gray-500 py-12 text-lg">
                  No staff members found.
                </div>
              ) : (
                paginatedStaff.map((staffMember) => (
                  <div key={staffMember.id} className="flex flex-row w-full h-48 bg-white border border-gray-200 rounded-[5px] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="h-full w-[35%] flex-shrink-0">
                      <img
                        src={staffMember.image || "/images/staffImg.svg"}
                        alt={staffMember.name}
                        className="h-full w-full object-cover"
                        style={{ borderTopLeftRadius: '5px', borderBottomLeftRadius: '5px', borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between p-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-montaga text-lg text-gray-900 font-semibold truncate pr-2">{staffMember.name || 'Staff Member'}</h3>
                          <div className="flex items-center gap-1 flex-shrink-0">
                            <span className="text-yellow-400 text-lg">★</span>
                            <span className="text-black font-bold text-sm">{staffMember.rating || '5.0'}</span>
                          </div>
                        </div>
                        <p className="text-primary-green font-semibold text-sm mb-3">{staffMember.title || 'Beauty Professional'}</p>
                        <p className="text-gray-700 text-xs leading-relaxed mb-4">
                          <span className="font-medium">Specialties:</span> {
                            Array.isArray(staffMember.specialties) && staffMember.specialties.length > 0 
                              ? staffMember.specialties.slice(0, 3).join(', ') + (staffMember.specialties.length > 3 ? '...' : '')
                              : 'General Beauty Services'
                          }
                        </p>
                      </div>
                      <div className="flex justify-start items-center mt-auto">
                        <button
                          className="text-white font-body font-semibold px-4 py-2 rounded-lg shadow-sm transition-all duration-200 text-sm hover:shadow-md transform hover:scale-105"
                          style={{ backgroundColor: '#C49B38' }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#B88A32'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#C49B38'}
                          onClick={() => router.push(`/staff/${staffMember.id}`)}
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

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    // Use direct database access instead of HTTP API
    const prisma = new PrismaClient()
    
    try {
      // Fetch all staff members with their services
      const staff = await prisma.staff.findMany({
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

      // Parse specialties for each staff member
      const parsedStaff = staff.map(staffMember => {
        let specialties = []
        try {
          if (staffMember.specialties) {
            specialties = JSON.parse(staffMember.specialties)
          }
        } catch (error) {
          console.error('Error parsing specialties for', staffMember.name, ':', error)
          specialties = []
        }
        
        return {
          ...staffMember,
          specialties
        }
      })

      await prisma.$disconnect()

      return {
        props: {
          staff: JSON.parse(JSON.stringify(parsedStaff))
        }
      }
    } catch (dbError) {
      console.error('Database error:', dbError)
      await prisma.$disconnect()
      
      // Return empty staff array as fallback
      return {
        props: {
          staff: []
        }
      }
    }
  } catch (error) {
    console.error('Error fetching staff data:', error)
    return {
      props: {
        staff: []
      }
    }
  }
}
