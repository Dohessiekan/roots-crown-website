import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { categoriesApi, servicesApi, Category, Service } from '../../lib/api'

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

interface CategoryPageProps {
  category: Category
  services: Service[]
}

export default function CategoryPage({ category, services }: CategoryPageProps) {
  const router = useRouter()

  if (!category) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center pt-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Category Not Found</h1>
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
      <Navbar />
      <main>
        {/* Banner Section */}
        <section className="relative w-full h-[320px] md:h-[400px] lg:h-[484px] flex items-center justify-center overflow-hidden">
          <img
            src="/images/servicesbanner.svg"
            alt="Services Banner"
            className="absolute inset-0 w-full h-full object-cover object-center z-0 select-none pointer-events-none"
            draggable="false"
          />
          <div className="relative z-10 flex flex-col items-start justify-center w-full h-full px-4 sm:px-8 md:px-16 lg:px-24">
            {/* Breadcrumb Navigation */}
            <div className="hidden md:flex flex-wrap items-center gap-1 sm:gap-2 bg-transparent mb-4 md:mb-6 text-xs md:text-base">
              <Link href="/services" className="text-white font-body hover:underline flex items-center">
                Services
              </Link>
              <span className="mx-1 sm:mx-2 text-white">&gt;</span>
              <span className="text-white font-body">{category.name}</span>
            </div>
            <h1 className="font-heading text-2xl md:text-3xl lg:text-4xl text-white text-left mb-4">
              {category.name}
            </h1>
            <p className="font-body italic text-base md:text-lg text-white max-w-2xl text-left">
              {category.description}. Choose from our professional services below and book with our experienced specialists.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-heading text-primary-green text-center mb-12">
              {category.name} Services
            </h2>
            
            {services.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No services available in this category yet.</p>
                <Link 
                  href="/services"
                  className="inline-block mt-4 bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
                >
                  Browse All Categories
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {services.map((service) => (
                  <Link 
                    key={service.id}
                    href={`/services/service/${slugify(service.name)}`}
                    className="bg-white shadow-md rounded-lg border border-gray-200 p-6 flex flex-col items-start relative overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                  >
                    <div className="mb-4">
                      <img
                        src={category.icon || '/images/default-icon.svg'}
                        alt={`${service.name} Icon`}
                        className="w-14 h-14"
                      />
                    </div>
                    <h3 className="font-heading text-xl text-primary-green mb-2">
                      {service.name}
                    </h3>
                    <p className="text-gray-700 text-base text-left mb-4 flex-grow">
                      {service.description}
                    </p>
                    
                    <div className="w-full flex justify-between items-center mt-auto">
                      <div className="flex flex-col">
                        {service.price && (
                          <span className="text-green-600 font-bold text-lg">
                            RWF {service.price.toLocaleString()}
                          </span>
                        )}
                        {service.duration && (
                          <span className="text-gray-500 text-sm">
                            {service.duration} minutes
                          </span>
                        )}
                      </div>
                      <span className="self-end">
                        <svg
                          width="32"
                          height="32"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#FDC536"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M9 18l6-6-6-6" />
                        </svg>
                      </span>
                    </div>
                  </Link>
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
    const categorySlug = params?.category as string
    
    if (!categorySlug) {
      return { notFound: true }
    }

    // Fetch category by slug
    const categories = await categoriesApi.getAll()
    const category = categories.find((c: Category) => c.slug === categorySlug)

    if (!category) {
      return { notFound: true }
    }

    // Fetch services in this category
    const allServices = await servicesApi.getAll()
    const services = allServices.filter((service: Service) => service.categoryId === category.id)

    return {
      props: {
        category,
        services
      }
    }
  } catch (error) {
    console.error('Error fetching category data:', error)
    return { notFound: true }
  }
}
