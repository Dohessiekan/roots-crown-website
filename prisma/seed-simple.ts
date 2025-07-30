import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database with simple IDs...')

  // Categories with simple IDs
  const categories = [
    {
      id: 'hair',
      name: 'Hair Services',
      slug: 'hair-services',
      description: 'Professional hair care and styling services',
      icon: '/images/hairIcon.svg'
    },
    {
      id: 'skincare',
      name: 'Skincare & Facials',
      slug: 'skincare-facials',
      description: 'Rejuvenating facial treatments and skincare',
      icon: '/images/skinIcon.svg'
    },
    {
      id: 'massage',
      name: 'Massage Therapy',
      slug: 'massage-therapy',
      description: 'Relaxing and therapeutic massage treatments',
      icon: '/images/massageIcon.svg'
    },
    {
      id: 'nails',
      name: 'Nail Services',
      slug: 'nail-services',
      description: 'Professional nail care and styling',
      icon: '/images/nailsIcon.svg'
    },
    {
      id: 'body',
      name: 'Body Treatments',
      slug: 'body-treatments',
      description: 'Full body wellness and beauty treatments',
      icon: '/images/BodyIcon.svg'
    },
    {
      id: 'makeup',
      name: 'Makeup Services',
      slug: 'makeup-services',
      description: 'Professional makeup and beauty enhancement',
      icon: '/images/makeupIcon.svg'
    },
    {
      id: 'removal',
      name: 'Hair Removal',
      slug: 'hair-removal',
      description: 'Professional hair removal services',
      icon: '/images/RemovalIcon.svg'
    },
    {
      id: 'wellness',
      name: 'Wellness Services',
      slug: 'wellness-services',
      description: 'Holistic wellness and therapeutic treatments',
      icon: '/images/wellnessIcon.svg'
    }
  ]

  // Services with simple IDs
  const services = [
    // Hair Services
    {
      id: 'haircut',
      name: 'Hair Cut & Styling',
      slug: 'hair-cut-styling',
      description: 'Professional hair cuts and styling for all hair types. Includes wash, cut, and style.',
      price: 'From $45',
      duration: '60-90 min',
      categoryId: 'hair'
    },
    {
      id: 'haircolor',
      name: 'Hair Coloring',
      slug: 'hair-coloring',
      description: 'Expert hair coloring, highlights, and color correction services.',
      price: 'From $85',
      duration: '120-180 min',
      categoryId: 'hair'
    },
    {
      id: 'hairtreatment',
      name: 'Hair Treatment',
      slug: 'hair-treatment',
      description: 'Deep conditioning and repair treatments for damaged hair.',
      price: 'From $65',
      duration: '75 min',
      categoryId: 'hair'
    },
    
    // Skincare Services
    {
      id: 'classicfacial',
      name: 'Classic Facial',
      slug: 'classic-facial',
      description: 'Customized facial treatment for all skin types including cleansing, exfoliation, and moisturizing.',
      price: 'From $75',
      duration: '75 min',
      categoryId: 'skincare'
    },
    {
      id: 'deepfacial',
      name: 'Deep Cleansing Facial',
      slug: 'deep-cleansing-facial',
      description: 'Intensive deep cleansing facial for problem skin and acne treatment.',
      price: 'From $95',
      duration: '90 min',
      categoryId: 'skincare'
    },
    
    // Massage Services
    {
      id: 'relaxmassage',
      name: 'Relaxation Massage',
      slug: 'relaxation-massage',
      description: 'Full body massage for stress relief and deep relaxation.',
      price: 'From $85',
      duration: '60 min',
      categoryId: 'massage'
    },
    {
      id: 'deepmassage',
      name: 'Deep Tissue Massage',
      slug: 'deep-tissue-massage',
      description: 'Therapeutic deep tissue massage for muscle tension and pain relief.',
      price: 'From $95',
      duration: '60 min',
      categoryId: 'massage'
    },
    
    // Nail Services
    {
      id: 'manicure',
      name: 'Classic Manicure',
      slug: 'classic-manicure',
      description: 'Complete nail care including shaping, cuticle care, and polish application.',
      price: 'From $35',
      duration: '45 min',
      categoryId: 'nails'
    },
    {
      id: 'gelmanicure',
      name: 'Gel Manicure',
      slug: 'gel-manicure',
      description: 'Long-lasting gel polish manicure with UV curing.',
      price: 'From $45',
      duration: '60 min',
      categoryId: 'nails'
    },
    {
      id: 'pedicure',
      name: 'Pedicure',
      slug: 'pedicure',
      description: 'Complete foot care including soak, exfoliation, and polish.',
      price: 'From $40',
      duration: '60 min',
      categoryId: 'nails'
    }
  ]

  // Staff with simple IDs
  const staff = [
    {
      id: 'sarah',
      name: 'Sarah Johnson',
      title: 'Senior Hair Stylist & Colorist',
      bio: 'Sarah has over 8 years of experience in hair styling and coloring. She specializes in modern cuts and creative color techniques.',
      email: 'sarah@rootscrown.com',
      phone: '+1-555-0101',
      image: '/images/staff/sarah.jpg',
      specialties: JSON.stringify(['Hair Cutting', 'Hair Coloring', 'Hair Treatments']),
      rating: 4.9,
      reviewCount: 127
    },
    {
      id: 'mike',
      name: 'Mike Thompson',
      title: 'Licensed Massage Therapist',
      bio: 'Mike is a certified massage therapist with expertise in deep tissue and relaxation massage techniques.',
      email: 'mike@rootscrown.com',
      phone: '+1-555-0102',
      image: '/images/staff/mike.jpg',
      specialties: JSON.stringify(['Deep Tissue Massage', 'Relaxation Massage', 'Sports Massage']),
      rating: 4.8,
      reviewCount: 89
    },
    {
      id: 'lisa',
      name: 'Lisa Chen',
      title: 'Senior Esthetician',
      bio: 'Lisa specializes in skincare and facial treatments with a focus on anti-aging and acne treatments.',
      email: 'lisa@rootscrown.com',
      phone: '+1-555-0103',
      image: '/images/staff/lisa.jpg',
      specialties: JSON.stringify(['Facials', 'Skincare', 'Anti-aging Treatments']),
      rating: 4.9,
      reviewCount: 156
    },
    {
      id: 'anna',
      name: 'Anna Rodriguez',
      title: 'Nail Technician & Manicurist',
      bio: 'Anna is an expert in nail care and nail art with over 5 years of experience in the beauty industry.',
      email: 'anna@rootscrown.com',
      phone: '+1-555-0104',
      image: '/images/staff/anna.jpg',
      specialties: JSON.stringify(['Manicures', 'Pedicures', 'Nail Art', 'Gel Polish']),
      rating: 4.7,
      reviewCount: 98
    }
  ]

  // Create categories
  for (const category of categories) {
    await prisma.category.upsert({
      where: { id: category.id },
      update: {},
      create: category
    })
  }

  // Create services
  for (const service of services) {
    await prisma.service.upsert({
      where: { id: service.id },
      update: {},
      create: service
    })
  }

  // Create staff
  for (const person of staff) {
    await prisma.staff.upsert({
      where: { id: person.id },
      update: {},
      create: person
    })
  }

  // Create staff-service relationships with simple IDs
  const staffServices = [
    // Sarah - Hair Services
    { id: 'sarah-haircut', staffId: 'sarah', serviceId: 'haircut' },
    { id: 'sarah-haircolor', staffId: 'sarah', serviceId: 'haircolor' },
    { id: 'sarah-hairtreatment', staffId: 'sarah', serviceId: 'hairtreatment' },
    
    // Mike - Massage Services
    { id: 'mike-relaxmassage', staffId: 'mike', serviceId: 'relaxmassage' },
    { id: 'mike-deepmassage', staffId: 'mike', serviceId: 'deepmassage' },
    
    // Lisa - Skincare Services
    { id: 'lisa-classicfacial', staffId: 'lisa', serviceId: 'classicfacial' },
    { id: 'lisa-deepfacial', staffId: 'lisa', serviceId: 'deepfacial' },
    
    // Anna - Nail Services
    { id: 'anna-manicure', staffId: 'anna', serviceId: 'manicure' },
    { id: 'anna-gelmanicure', staffId: 'anna', serviceId: 'gelmanicure' },
    { id: 'anna-pedicure', staffId: 'anna', serviceId: 'pedicure' }
  ]

  for (const staffService of staffServices) {
    await prisma.staffService.upsert({
      where: { id: staffService.id },
      update: {},
      create: staffService
    })
  }

  // Create availability with simple IDs
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
  const availability = []

  for (const person of staff) {
    for (let day = 1; day <= 5; day++) { // Monday to Friday
      availability.push({
        id: `${person.id}-${days[day]}`,
        staffId: person.id,
        dayOfWeek: day,
        startTime: '09:00',
        endTime: '17:00',
        isActive: true
      })
    }
  }

  for (const avail of availability) {
    await prisma.availability.upsert({
      where: { id: avail.id },
      update: {},
      create: avail
    })
  }

  console.log('✅ Database seeded successfully with simple IDs!')
  console.log(`
📊 Created:
  - ${categories.length} Categories (hair, skincare, massage, nails, etc.)
  - ${services.length} Services (haircut, facial, manicure, etc.)
  - ${staff.length} Staff Members (sarah, mike, lisa, anna)
  - ${staffServices.length} Staff-Service Relations
  - ${availability.length} Availability Schedules
  `)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
