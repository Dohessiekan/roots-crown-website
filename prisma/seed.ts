import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Create categories
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
      id: 'removal',
      name: 'Hair Removal',
      slug: 'hair-removal',
      description: 'Professional hair removal services',
      icon: '/images/RemovalIcon.svg'
    },
    {
      id: 'makeup',
      name: 'Makeup Services',
      slug: 'makeup-services',
      description: 'Professional makeup and beauty enhancement',
      icon: '/images/makeupIcon.svg'
    },
    {
      id: 'spa',
      name: 'Spa Services',
      slug: 'spa-services',
      description: 'Luxurious spa treatments for ultimate relaxation',
      icon: '/images/spaIcon.svg'
    }
  ]

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category
    })
  }

  // Get created categories
  const hairCategory = await prisma.category.findUnique({ where: { slug: 'hair-services' } })
  const skinCategory = await prisma.category.findUnique({ where: { slug: 'skincare-facials' } })
  const massageCategory = await prisma.category.findUnique({ where: { slug: 'massage-therapy' } })
  const nailCategory = await prisma.category.findUnique({ where: { slug: 'nail-services' } })
  const spaCategory = await prisma.category.findUnique({ where: { slug: 'spa-services' } })

  // Create services
  const services = [
    // Hair Services
    {
      id: 'hair-cut',
      name: 'Hair Cut & Styling',
      slug: 'hair-cut-styling',
      description: 'Professional hair cuts and styling for all hair types. Includes wash, cut, and style.',
      price: 'From $45',
      duration: '60-90 min',
      categoryId: hairCategory!.id
    },
    {
      id: 'hair-color',
      name: 'Hair Coloring',
      slug: 'hair-coloring',
      description: 'Expert hair coloring, highlights, and color correction services.',
      price: 'From $85',
      duration: '120-180 min',
      categoryId: hairCategory!.id
    },
    {
      id: 'hair-treatment',
      name: 'Hair Treatment',
      slug: 'hair-treatment',
      description: 'Deep conditioning and repair treatments for damaged hair.',
      price: 'From $65',
      duration: '75 min',
      categoryId: hairCategory!.id
    },
    // Skincare Services
    {
      id: 'classic-facial',
      name: 'Classic Facial',
      slug: 'classic-facial',
      description: 'Customized facial treatment for all skin types including cleansing, exfoliation, and moisturizing.',
      price: 'From $75',
      duration: '75 min',
      categoryId: skinCategory!.id
    },
    {
      id: 'deep-facial',
      name: 'Deep Cleansing Facial',
      slug: 'deep-cleansing-facial',
      description: 'Intensive deep cleansing facial for problem skin and acne treatment.',
      price: 'From $95',
      duration: '90 min',
      categoryId: skinCategory!.id
    },
    // Massage Services
    {
      id: 'relax-massage',
      name: 'Relaxation Massage',
      slug: 'relaxation-massage',
      description: 'Full body massage for stress relief and deep relaxation.',
      price: 'From $85',
      duration: '60 min',
      categoryId: massageCategory!.id
    },
    {
      id: 'deep-massage',
      name: 'Deep Tissue Massage',
      slug: 'deep-tissue-massage',
      description: 'Therapeutic deep tissue massage for muscle tension and pain relief.',
      price: 'From $95',
      duration: '60 min',
      categoryId: massageCategory!.id
    },
    // Nail Services
    {
      id: 'classic-mani',
      name: 'Classic Manicure',
      slug: 'classic-manicure',
      description: 'Complete nail care including shaping, cuticle care, and polish application.',
      price: 'From $35',
      duration: '45 min',
      categoryId: nailCategory!.id
    },
    {
      id: 'gel-mani',
      name: 'Gel Manicure',
      slug: 'gel-manicure',
      description: 'Long-lasting gel polish manicure with UV curing.',
      price: 'From $45',
      duration: '60 min',
      categoryId: nailCategory!.id
    },
    {
      id: 'pedicure',
      name: 'Pedicure',
      slug: 'pedicure',
      description: 'Complete foot care including soak, exfoliation, and polish.',
      price: 'From $40',
      duration: '60 min',
      categoryId: nailCategory!.id
    },
    // Spa Services
    {
      id: 'hot-stone',
      name: 'Hot Stone Therapy',
      slug: 'hot-stone-therapy',
      description: 'Therapeutic massage using heated stones to relax muscles and restore energy.',
      price: 'From $110',
      duration: '90 min',
      categoryId: spaCategory!.id
    },
    {
      id: 'aromatherapy',
      name: 'Aromatherapy Session',
      slug: 'aromatherapy-session',
      description: 'Relaxing therapy using essential oils to promote healing and wellness.',
      price: 'From $85',
      duration: '75 min',
      categoryId: spaCategory!.id
    },
    {
      id: 'body-wrap',
      name: 'Detox Body Wrap',
      slug: 'detox-body-wrap',
      description: 'Full body treatment to detoxify and nourish the skin.',
      price: 'From $120',
      duration: '90 min',
      categoryId: spaCategory!.id
    }
  ]

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: {},
      create: service
    })
  }

  // Create staff members
  const staff = [
    {
      id: 'sarah',
      name: 'Sarah Johnson',
      title: 'Senior Hair Stylist',
      bio: 'Sarah has over 8 years of experience in hair styling and coloring. She specializes in modern cuts and color techniques.',
      email: 'sarah@rootsandcrown.com',
      phone: '+250-123-456-789',
      image: '/images/staff/sarah.jpg',
      specialties: JSON.stringify(['Hair Cutting', 'Hair Coloring', 'Highlights', 'Styling'])
    },
    {
      id: 'maria',
      name: 'Maria Rodriguez',
      title: 'Licensed Esthetician',
      bio: 'Maria is a certified esthetician with expertise in facial treatments and skincare. She has 6 years of experience.',
      email: 'maria@rootsandcrown.com',
      phone: '+250-123-456-790',
      image: '/images/staff/maria.jpg',
      specialties: JSON.stringify(['Facials', 'Skincare', 'Anti-aging', 'Acne Treatment'])
    },
    {
      id: 'jennifer',
      name: 'Jennifer Lee',
      title: 'Massage Therapist',
      bio: 'Jennifer is a licensed massage therapist specializing in relaxation and therapeutic massage techniques.',
      email: 'jennifer@rootsandcrown.com',
      phone: '+250-123-456-791',
      image: '/images/staff/jennifer.jpg',
      specialties: JSON.stringify(['Swedish Massage', 'Deep Tissue', 'Hot Stone', 'Aromatherapy'])
    },
    {
      id: 'emma',
      name: 'Emma Wilson',
      title: 'Nail Technician',
      bio: 'Emma is a certified nail technician with expertise in manicures, pedicures, and nail art.',
      email: 'emma@rootsandcrown.com',
      phone: '+250-123-456-792',
      image: '/images/staff/emma.jpg',
      specialties: JSON.stringify(['Manicures', 'Pedicures', 'Gel Nails', 'Nail Art'])
    },
    {
      id: 'alex',
      name: 'Alex Thompson',
      title: 'Spa Therapist',
      bio: 'Alex is a certified spa therapist with expertise in holistic wellness treatments and aromatherapy.',
      email: 'alex@rootsandcrown.com',
      phone: '+250-123-456-793',
      image: '/images/staff/alex.jpg',
      specialties: JSON.stringify(['Hot Stone Therapy', 'Aromatherapy', 'Body Wraps', 'Wellness Treatments'])
    }
  ]

  for (const member of staff) {
    await prisma.staff.upsert({
      where: { email: member.email },
      update: {},
      create: member
    })
  }

  // Create staff-service associations
  const createdStaff = await prisma.staff.findMany()
  const createdServices = await prisma.service.findMany()

  // Sarah - Hair services
  const sarah = createdStaff.find(s => s.email === 'sarah@rootsandcrown.com')
  const hairServices = createdServices.filter(s => s.categoryId === hairCategory!.id)
  
  for (const service of hairServices) {
    await prisma.staffService.upsert({
      where: {
        staffId_serviceId: {
          staffId: sarah!.id,
          serviceId: service.id
        }
      },
      update: {},
      create: {
        id: `${sarah!.id}-${service.id}`,
        staffId: sarah!.id,
        serviceId: service.id
      }
    })
  }

  // Maria - Skincare services
  const maria = createdStaff.find(s => s.email === 'maria@rootsandcrown.com')
  const skinServices = createdServices.filter(s => s.categoryId === skinCategory!.id)
  
  for (const service of skinServices) {
    await prisma.staffService.upsert({
      where: {
        staffId_serviceId: {
          staffId: maria!.id,
          serviceId: service.id
        }
      },
      update: {},
      create: {
        id: `${maria!.id}-${service.id}`,
        staffId: maria!.id,
        serviceId: service.id
      }
    })
  }

  // Jennifer - Massage services
  const jennifer = createdStaff.find(s => s.email === 'jennifer@rootsandcrown.com')
  const massageServices = createdServices.filter(s => s.categoryId === massageCategory!.id)
  
  for (const service of massageServices) {
    await prisma.staffService.upsert({
      where: {
        staffId_serviceId: {
          staffId: jennifer!.id,
          serviceId: service.id
        }
      },
      update: {},
      create: {
        id: `${jennifer!.id}-${service.id}`,
        staffId: jennifer!.id,
        serviceId: service.id
      }
    })
  }

  // Emma - Nail services
  const emma = createdStaff.find(s => s.email === 'emma@rootsandcrown.com')
  const nailServices = createdServices.filter(s => s.categoryId === nailCategory!.id)
  
  for (const service of nailServices) {
    await prisma.staffService.upsert({
      where: {
        staffId_serviceId: {
          staffId: emma!.id,
          serviceId: service.id
        }
      },
      update: {},
      create: {
        id: `${emma!.id}-${service.id}`,
        staffId: emma!.id,
        serviceId: service.id
      }
    })
  }

  // Alex - Spa services
  const alex = createdStaff.find(s => s.email === 'alex@rootsandcrown.com')
  const spaServices = createdServices.filter(s => s.categoryId === spaCategory!.id)
  
  for (const service of spaServices) {
    await prisma.staffService.upsert({
      where: {
        staffId_serviceId: {
          staffId: alex!.id,
          serviceId: service.id
        }
      },
      update: {},
      create: {
        id: `${alex!.id}-${service.id}`,
        staffId: alex!.id,
        serviceId: service.id
      }
    })
  }

  // Create availability for all staff (Monday to Saturday, 9 AM to 6 PM)
  for (const member of createdStaff) {
    for (let day = 1; day <= 6; day++) { // Monday to Saturday
      await prisma.availability.upsert({
        where: {
          staffId_dayOfWeek: {
            staffId: member.id,
            dayOfWeek: day
          }
        },
        update: {},
        create: {
          id: `${member.id}-day${day}`,
          staffId: member.id,
          dayOfWeek: day,
          startTime: '09:00',
          endTime: '18:00',
          isActive: true
        }
      })
    }
  }

  console.log('Database seeding completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
