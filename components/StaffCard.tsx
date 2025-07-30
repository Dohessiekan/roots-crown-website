import Link from 'next/link'

interface Staff {
  id: string
  name: string
  title: string
  bio: string
  image?: string
  specialties: string[]
  rating?: number
  reviewCount?: number
  nextAvailable?: string
}

interface StaffCardProps {
  staff: Staff
}

export default function StaffCard({ staff }: StaffCardProps) {
  const renderStars = (rating: number) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={`text-lg ${i <= rating ? 'text-accent' : 'text-gray-300'}`}>
          ★
        </span>
      )
    }
    return stars
  }

  return (
    <div className="card bg-pure-white text-center p-6 group">
      {/* Staff Photo */}
      <div className="mb-6 flex justify-center">
        <div className="relative">
          {staff.image ? (
            <img 
              src={staff.image} 
              alt={staff.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-secondary group-hover:border-accent transition-colors"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-secondary border-4 border-secondary group-hover:border-accent transition-colors flex items-center justify-center">
              <span className="text-primary text-2xl font-heading">
                {staff.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Staff Info */}
      <h4 className="font-heading text-lg text-primary mb-1 group-hover:text-accent transition-colors">
        {staff.name}
      </h4>
      
      <p className="font-body text-small text-text-dark opacity-70 mb-3">
        {staff.title}
      </p>

      {/* Rating */}
      {staff.rating && (
        <div className="flex items-center justify-center mb-4">
          <div className="flex">
            {renderStars(staff.rating)}
          </div>
          {staff.reviewCount && (
            <span className="ml-2 font-body text-small text-text-dark opacity-60">
              ({staff.reviewCount})
            </span>
          )}
        </div>
      )}

      {/* Bio */}
      <p className="font-body text-text-dark opacity-80 mb-4 line-clamp-3">
        {staff.bio}
      </p>

      {/* Specialties */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2 justify-center">
          {staff.specialties.slice(0, 3).map((specialty: string, index: number) => (
            <span 
              key={index}
              className="bg-secondary text-primary px-3 py-1 rounded-full text-small font-body"
            >
              {specialty}
            </span>
          ))}
          {staff.specialties.length > 3 && (
            <span className="text-primary text-small font-body">
              +{staff.specialties.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Next Available */}
      {staff.nextAvailable && (
        <p className="font-body text-small text-primary mb-4">
          Next available: <span className="font-semibold">{staff.nextAvailable}</span>
        </p>
      )}

      {/* View Profile Button */}
      <Link 
        href={`/staff/${staff.id}`}
        className="btn-secondary w-full text-center py-3 px-6 rounded-lg font-body font-semibold"
      >
        View Profile
      </Link>
    </div>
  )
}
