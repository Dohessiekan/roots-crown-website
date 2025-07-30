import Link from 'next/link'

interface Service {
  id: string
  name: string
  description: string
  price: string
  duration: string
  category?: string
  image?: string
}

interface ServiceCardProps {
  service: Service
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="card bg-pure-white overflow-hidden group">
      {service.image && (
        <div className="relative overflow-hidden">
          <img 
            src={service.image} 
            alt={service.name}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {service.category && (
            <div className="absolute top-4 left-4">
              <span className="bg-primary text-pure-white px-3 py-1 rounded-full text-small font-body font-medium">
                {service.category}
              </span>
            </div>
          )}
          <div className="absolute inset-0 organic-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      )}
      
      <div className="p-6">
        <h3 className="font-heading text-h3 text-primary mb-3 group-hover:text-accent transition-colors">
          {service.name}
        </h3>
        
        <p className="font-body text-text-dark opacity-80 mb-4 line-clamp-3">
          {service.description}
        </p>
        
        <div className="flex justify-between items-center mb-6">
          <div>
            <span className="font-heading text-xl font-bold text-accent">
              {service.price}
            </span>
            <p className="font-body text-small text-text-dark opacity-60">
              {service.duration}
            </p>
          </div>
        </div>
        
        <Link 
          href={`/services/${service.id}`}
          className="btn-outline w-full text-center py-3 px-6 rounded-lg font-body font-semibold inline-block group-hover:bg-accent group-hover:text-pure-white group-hover:border-accent transition-all"
        >
          View Staff
        </Link>
      </div>
    </div>
  )
}
