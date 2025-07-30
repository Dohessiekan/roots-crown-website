import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ServiceCard from '../components/ServiceCard'
import Link from 'next/link'
import { GetServerSideProps } from 'next'
import { categoriesApi, Category } from '../lib/api'

interface ServicesProps {
	categories: Category[]
}

export default function Services({ categories }: ServicesProps) {
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
					<div className="relative z-10 flex flex-col items-center justify-center w-full h-full text-center px-4">
						<h1 className="font-heading text-2xl md:text-3xl lg:text-4xl text-white mb-4">
							Our Services
						</h1>
						<p className="font-body italic text-base md:text-lg text-white max-w-2xl mx-auto">
							Explore our full range of beauty and wellness treatments. Choose a
							category, select your desired service, view available staff, and book
							a time that suits you, all in one smooth experience.
						</p>
					</div>
				</section>
				{/* Services Grid */}
				<section className="py-16 bg-gray-50">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<h2 className="text-3xl md:text-4xl font-heading text-primary-green text-center mb-12">
							Categories
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
							{categories.map((category) => (
								<Link 
									key={category.id}
									href={`/services/${category.slug}`} 
									className="bg-white shadow-md rounded-lg border border-gray-200 p-6 flex flex-col items-start relative overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
								>
									<img
										src={category.icon || '/images/default-icon.svg'}
										alt={`${category.name} Icon`}
										className="mb-3 w-14 h-14"
									/>
									<h3 className="font-heading text-xl text-primary-green mb-2">
										{category.name}
									</h3>
									<p className="text-gray-700 text-base text-left mb-8">
										{category.description}
									</p>
									<span className="self-end mt-auto">
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
								</Link>
							))}
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</>
	)
}

export const getServerSideProps: GetServerSideProps = async () => {
	try {
		const categories = await categoriesApi.getAll()
		return {
			props: {
				categories
			}
		}
	} catch (error) {
		console.error('Error fetching categories:', error)
		return {
			props: {
				categories: []
			}
		}
	}
}
