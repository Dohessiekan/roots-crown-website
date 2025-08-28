import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Updating Roots & Crown database with RWF pricing...')

  // Only clear staff-service relationships, preserve everything else
  await prisma.staffService.deleteMany()
  
  // Don't delete services, categories, staff, bookings or feedback - just update them

  // Create or update Categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { id: 'massage-therapy' },
      update: {},
      create: {
        id: 'massage-therapy',
        name: 'Massage Therapy',
        slug: 'massage-therapy',
        description: 'Professional massage services for relaxation and wellness',
        icon: '/images/massageIcon.svg'
      }
    }),
    prisma.category.upsert({
      where: { id: 'facial-treatments' },
      update: {},
      create: {
        id: 'facial-treatments',
        name: 'Facial Treatments',
        slug: 'facial-treatments', 
        description: 'Luxurious facial treatments for glowing skin',
        icon: '/images/skinIcon.svg'
      }
    }),
    prisma.category.upsert({
      where: { id: 'body-treatments' },
      update: {},
      create: {
        id: 'body-treatments',
        name: 'Body Treatments',
        slug: 'body-treatments',
        description: 'Complete body therapy and waxing services',
        icon: '/images/BodyIcon.svg'
      }
    }),
    prisma.category.upsert({
      where: { id: 'pedicure-manicure' },
      update: {},
      create: {
        id: 'pedicure-manicure',
        name: 'Pedicure & Manicure',
        slug: 'pedicure-manicure',
        description: 'Professional nail care and beauty services',
        icon: '/images/nailsIcon.svg'
      }
    }),
    prisma.category.upsert({
      where: { id: 'hair-services' },
      update: {},
      create: {
        id: 'hair-services',
        name: 'Hair Services',
        slug: 'hair-services',
        description: 'Complete hair care including cuts, treatments, styling and coloring',
        icon: '/images/hairIcon.svg'
      }
    }),
    prisma.category.upsert({
      where: { id: 'tattoos-piercings' },
      update: {},
      create: {
        id: 'tattoos-piercings',
        name: 'Tattoos and Piercings',
        slug: 'tattoos-piercings',
        description: 'Professional tattoo and piercing services',
        icon: '/images/tattooIcon.svg'
      }
    })
  ])

  console.log('✅ Categories created')

  // Create Services with RWF pricing - exactly as you provided
  const services = [
    // MASSAGE THERAPY
    { name: 'Swedish Massage', price: '30,000 RWF', category: 'massage-therapy', duration: '60 min', id: 'swedish-massage' },
    { name: 'Thai Massage', price: '35,000 RWF', category: 'massage-therapy', duration: '60 min', id: 'thai-massage' },
    { name: 'Deep Tissue Massage', price: '40,000 RWF', category: 'massage-therapy', duration: '60 min', id: 'deep-tissue-massage' },
    { name: 'Sports Massage', price: '40,000 RWF', category: 'massage-therapy', duration: '60 min', id: 'sports-massage' },
    { name: 'Indian Head Massage', price: '20,000 RWF', category: 'massage-therapy', duration: '30 min', id: 'indian-head-massage' },
    { name: 'Hawaiian Massage', price: '30,000 RWF', category: 'massage-therapy', duration: '60 min', id: 'hawaiian-massage' },
    { name: 'Aromatherapy Massage', price: '40,000 RWF', category: 'massage-therapy', duration: '60 min', id: 'aromatherapy-massage' },
    { name: 'Physiotherapy', price: '40,000 RWF', category: 'massage-therapy', duration: '45 min', id: 'physiotherapy' },
    { name: 'Back, Neck & Shoulder Massage', price: '25,000 RWF', category: 'massage-therapy', duration: '30 min', id: 'back-neck-shoulder-massage' },
    { name: 'Reflexology', price: '20,000 RWF', category: 'massage-therapy', duration: '30 min', id: 'reflexology' },
    { name: 'Body Scrub Massage', price: '50,000 RWF', category: 'massage-therapy', duration: '90 min', id: 'body-scrub-massage' },
    { name: 'Hot Stone Massage', price: '60,000 RWF', category: 'massage-therapy', duration: '90 min', id: 'hot-stone-massage' },

    // FACIAL TREATMENTS
    { name: 'Diamond Facial Treatment', price: '25,000 RWF', category: 'facial-treatments', duration: '60 min', id: 'diamond-facial' },
    { name: 'Gold Facial Treatment', price: '35,000 RWF', category: 'facial-treatments', duration: '75 min', id: 'gold-facial' },
    { name: 'Platinum Facial Treatment', price: '45,000 RWF', category: 'facial-treatments', duration: '90 min', id: 'platinum-facial' },
    { name: 'Face Scrub/Mask', price: '5,000 RWF', category: 'facial-treatments', duration: '20 min', id: 'face-scrub-mask' },

    // BODY THERAPY & WAXING
    { name: 'Soft Glam', price: '10,000 RWF', category: 'body-treatments', duration: '30 min', id: 'soft-glam' },
    { name: 'Eyebrow Shaping', price: '5,000 RWF', category: 'body-treatments', duration: '15 min', id: 'eyebrow-shaping' },
    { name: 'Full Glam', price: '25,000 RWF', category: 'body-treatments', duration: '60 min', id: 'full-glam' },
    { name: 'Eyebrow Waxing', price: '5,000 RWF', category: 'body-treatments', duration: '15 min', id: 'eyebrow-waxing' },
    { name: 'Upper Lip Waxing', price: '5,000 RWF', category: 'body-treatments', duration: '10 min', id: 'upper-lip-waxing' },
    { name: 'Under Arm Waxing', price: '5,000 RWF', category: 'body-treatments', duration: '15 min', id: 'under-arm-waxing' },
    { name: 'Chest Waxing', price: '15,000 RWF', category: 'body-treatments', duration: '30 min', id: 'chest-waxing' },
    { name: 'Back Waxing', price: '15,000 RWF', category: 'body-treatments', duration: '30 min', id: 'back-waxing' },
    { name: 'Arms Waxing', price: '15,000 RWF', category: 'body-treatments', duration: '30 min', id: 'arms-waxing' },
    { name: 'Bikini Wax', price: '15,000 RWF', category: 'body-treatments', duration: '20 min', id: 'bikini-wax' },
    { name: 'Brazilian Wax', price: '20,000 RWF', category: 'body-treatments', duration: '30 min', id: 'brazilian-wax' },
    { name: 'Half Legs Wax', price: '15,000 RWF', category: 'body-treatments', duration: '30 min', id: 'half-legs-wax' },
    { name: 'Full Legs Wax', price: '30,000 RWF', category: 'body-treatments', duration: '45 min', id: 'full-legs-wax' },
    { name: 'Full Body Wax', price: '100,000 RWF', category: 'body-treatments', duration: '120 min', id: 'full-body-wax' },

    // PEDICURE AND MANICURE
    { name: 'Deluxe Manicure', price: '5,000 RWF', category: 'pedicure-manicure', duration: '30 min', id: 'deluxe-manicure' },
    { name: 'Gel Polish', price: '10,000 RWF', category: 'pedicure-manicure', duration: '45 min', id: 'gel-polish' },
    { name: 'Deluxe Pedicure', price: '5,000 RWF', category: 'pedicure-manicure', duration: '45 min', id: 'deluxe-pedicure' },
    { name: 'Removing Gel', price: '5,000 RWF', category: 'pedicure-manicure', duration: '15 min', id: 'removing-gel' },
    { name: 'Normal Polish', price: '5,000 RWF', category: 'pedicure-manicure', duration: '20 min', id: 'normal-polish' },
    { name: 'Stick On Nails', price: '15,000 RWF', category: 'pedicure-manicure', duration: '60 min', id: 'stick-on-nails' },
    { name: 'Gel Builder', price: '15,000 RWF', category: 'pedicure-manicure', duration: '60 min', id: 'gel-builder' },
    { name: 'Powder Gel', price: '25,000 RWF', category: 'pedicure-manicure', duration: '75 min', id: 'powder-gel' },
    { name: 'Artificial Gel Nails', price: '25,000 RWF', category: 'pedicure-manicure', duration: '90 min', id: 'artificial-gel-nails' },
    { name: 'Acrylic & Nail Art', price: '30,000 RWF', category: 'pedicure-manicure', duration: '90 min', id: 'acrylic-nail-art' },
    { name: 'Feet Scrub', price: '15,000 RWF', category: 'pedicure-manicure', duration: '30 min', id: 'feet-scrub' },

    // HAIR SERVICES & HAIRCUTS
    { name: 'Kids Machine Haircut', price: '3,000 RWF', category: 'hair-services', duration: '20 min', id: 'kids-machine-haircut' },
    { name: 'Hair Lining', price: '3,000 RWF', category: 'hair-services', duration: '15 min', id: 'hair-lining' },
    { name: 'Beard Lining', price: '3,000 RWF', category: 'hair-services', duration: '15 min', id: 'beard-lining' },
    { name: 'Regular Machine Haircut', price: '5,000 RWF', category: 'hair-services', duration: '30 min', id: 'regular-machine-haircut' },
    { name: 'Scissor Haircut', price: '15,000 RWF', category: 'hair-services', duration: '45 min', id: 'scissor-haircut' },
    { name: 'Black Shampoo & Haircut', price: '15,000 RWF', category: 'hair-services', duration: '60 min', id: 'black-shampoo-haircut' },
    { name: 'Relaxer & Haircut', price: '15,000 RWF', category: 'hair-services', duration: '90 min', id: 'relaxer-haircut' },
    { name: 'Men Cornrows & Twist', price: '20,000 RWF', category: 'hair-services', duration: '120 min', id: 'men-cornrows-twist' },

    // HAIR TREATMENT
    { name: 'Mayonnaise Treatment', price: '20,000 RWF', category: 'hair-services', duration: '60 min', id: 'mayonnaise-treatment' },
    { name: 'Mixed Fruits Treatment', price: '20,000 RWF', category: 'hair-services', duration: '60 min', id: 'mixed-fruits-treatment' },
    { name: 'Eggs & Honey Treatment', price: '20,000 RWF', category: 'hair-services', duration: '60 min', id: 'eggs-honey-treatment' },
    { name: 'Motions Treatment', price: '25,000 RWF', category: 'hair-services', duration: '75 min', id: 'motions-treatment' },
    { name: 'Mizani Treatment', price: '25,000 RWF', category: 'hair-services', duration: '75 min', id: 'mizani-treatment' },
    { name: 'Keracare Treatment', price: '30,000 RWF', category: 'hair-services', duration: '90 min', id: 'keracare-treatment' },
    { name: 'Hot Oil Treatment', price: '30,000 RWF', category: 'hair-services', duration: '60 min', id: 'hot-oil-treatment' },
    { name: 'Organic Hair Treatment', price: '35,000 RWF', category: 'hair-services', duration: '90 min', id: 'organic-hair-treatment' },
    { name: 'Your Own Treatment', price: '15,000 RWF', category: 'hair-services', duration: '60 min', id: 'your-own-treatment' },

    // HAIR STYLING
    { name: 'Relaxed Hair Styling', price: '6,000 RWF', category: 'hair-services', duration: '30 min', id: 'relaxed-hair-styling' },
    { name: 'Weave/Wig Styling', price: '10,000 RWF', category: 'hair-services', duration: '45 min', id: 'weave-wig-styling' },
    { name: 'Natural Hair Styling', price: '10,000 RWF', category: 'hair-services', duration: '45 min', id: 'natural-hair-styling' },
    { name: 'Dreadlocks Styling', price: '10,000 RWF', category: 'hair-services', duration: '45 min', id: 'dreadlocks-styling' },
    { name: 'Braids Styling', price: '10,000 RWF', category: 'hair-services', duration: '45 min', id: 'braids-styling' },
    { name: 'Brushing Short Hair', price: '10,000 RWF', category: 'hair-services', duration: '30 min', id: 'brushing-short-hair' },
    { name: 'Brushing Long Hair', price: '15,000 RWF', category: 'hair-services', duration: '45 min', id: 'brushing-long-hair' },

    // HAIR COLOR
    { name: 'Black Shampoo Color', price: '15,000 RWF', category: 'hair-services', duration: '60 min', id: 'black-shampoo-color' },
    { name: 'Henna Color', price: '15,000 RWF', category: 'hair-services', duration: '90 min', id: 'henna-color' },
    { name: 'Roots Only Color', price: '15,000 RWF', category: 'hair-services', duration: '60 min', id: 'roots-only-color' },
    { name: 'Highlight', price: '15,000 RWF', category: 'hair-services', duration: '90 min', id: 'highlight' },
    { name: 'Full Head Color', price: '30,000 RWF', category: 'hair-services', duration: '120 min', id: 'full-head-color' },
    { name: 'Weave/Wig Color', price: '35,000 RWF', category: 'hair-services', duration: '90 min', id: 'weave-wig-color' },
    { name: 'Mix 2 Colors', price: '40,000 RWF', category: 'hair-services', duration: '120 min', id: 'mix-2-colors' },
    { name: 'Design Your Color', price: '50,000 RWF', category: 'hair-services', duration: '150 min', id: 'design-your-color' },

    // WASH SETS
    { name: 'Relaxed Hair Wash Set', price: '10,000 RWF', category: 'hair-services', duration: '45 min', id: 'relaxed-hair-wash-set' },
    { name: 'Weave/Wig Wash Set', price: '15,000 RWF', category: 'hair-services', duration: '60 min', id: 'weave-wig-wash-set' },
    { name: 'Natural Hair Wash Set', price: '15,000 RWF', category: 'hair-services', duration: '60 min', id: 'natural-hair-wash-set' },
    { name: 'Dreadlocks Wash Set', price: '15,000 RWF', category: 'hair-services', duration: '60 min', id: 'dreadlocks-wash-set' },
    { name: 'Braids Wash Set', price: '15,000 RWF', category: 'hair-services', duration: '60 min', id: 'braids-wash-set' },
    { name: 'Small Rollers Wash Set', price: '15,000 RWF', category: 'hair-services', duration: '90 min', id: 'small-rollers-wash-set' },
    { name: 'Wash & Brushing', price: '15,000 RWF', category: 'hair-services', duration: '45 min', id: 'wash-brushing' },

    // EXTRAS
    { name: 'Extra Head Massage Minutes', price: '5,000 RWF', category: 'hair-services', duration: '10 min', id: 'extra-head-massage' },
    { name: 'Wash & Set with Premium Shampoo', price: '20,000 RWF', category: 'hair-services', duration: '60 min', id: 'premium-wash-set' }
  ]

  // Create or update all services
  for (const serviceData of services) {
    const category = categories.find(cat => cat.slug === serviceData.category)
    if (category) {
      await prisma.service.upsert({
        where: { id: serviceData.id },
        update: {
          name: serviceData.name,
          description: `Professional ${serviceData.name.toLowerCase()} service at Roots & Crown`,
          price: serviceData.price,
          duration: serviceData.duration,
        },
        create: {
          id: serviceData.id,
          name: serviceData.name,
          slug: serviceData.id,
          description: `Professional ${serviceData.name.toLowerCase()} service at Roots & Crown`,
          price: serviceData.price,
          duration: serviceData.duration,
          categoryId: category.id,
          image: ''
        }
      })
    }
  }

  console.log('✅ Services created with RWF pricing')

  // Update existing staff or create if they don't exist
  const staffData = [
    {
      id: 'sarah',
      name: 'Sarah Johnson',
      title: 'Senior Massage Therapist & Facial Specialist',
      bio: 'Sarah has over 8 years of experience in massage therapy and facial treatments. She specializes in Swedish massage, deep tissue therapy, and luxury facial treatments.',
      email: 'rootsandcrownspa@gmail.com',
      phone: '+250788123456',
      image: '/images/staff/sarah.jpg',
      specialties: JSON.stringify(['Swedish Massage', 'Deep Tissue', 'Facial Treatments', 'Aromatherapy']),
      isActive: true,
      rating: 4.9,
      reviewCount: 127
    },
    {
      id: 'sabra',
      name: 'Sabra',
      title: 'Hair Braiding Stylist',
      bio: 'Sabra is our hair braiding stylist, well experienced and gentle with scalp. She specializes in all types of braiding styles, cornrows, and protective hairstyles.',
      email: 'rootsandcrownspa@gmail.com',
      phone: '+250788123457',
      image: '/images/staff/sabra.jpg',
      specialties: JSON.stringify(['Hair Braiding', 'Cornrows', 'Protective Styles', 'Hair Styling']),
      isActive: true,
      rating: 4.8,
      reviewCount: 98
    },
    {
      id: 'claude',
      name: 'Claude',
      title: 'Hair Dresser',
      bio: 'Claude is our professional hair dresser specializing in all hair services including cutting, styling, coloring, and treatments.',
      email: 'rootsandcrownspa@gmail.com',
      phone: '+250788123460',
      image: '/images/staff/claude.jpg',
      specialties: JSON.stringify(['Hair Cutting', 'Hair Styling', 'Hair Coloring', 'Hair Treatments']),
      isActive: true,
      rating: 4.7,
      reviewCount: 85
    },
    {
      id: 'abouba',
      name: 'Abouba',
      title: 'Barber',
      bio: 'Abouba is our skilled barber specializing in mens grooming, beard trimming, and classic barber services.',
      email: 'rootsandcrownspa@gmail.com',
      phone: '+250788123461',
      image: '/images/staff/abouba.jpg',
      specialties: JSON.stringify(['Mens Haircuts', 'Beard Trimming', 'Mens Grooming', 'Classic Barber Services']),
      isActive: true,
      rating: 4.8,
      reviewCount: 92
    },
    {
      id: 'bibiane',
      name: 'Bibiane',
      title: 'Body & Facial Treatment Specialist',
      bio: 'Bibiane specializes in body and facial treatments, providing relaxing and rejuvenating services for our clients.',
      email: 'rootsandcrownspa@gmail.com',
      phone: '+250788123462',
      image: '/images/staff/bibiane.jpg',
      specialties: JSON.stringify(['Body Treatments', 'Facial Treatments', 'Skin Care', 'Beauty Therapy']),
      isActive: true,
      rating: 4.6,
      reviewCount: 78
    },
    {
      id: 'mohamed',
      name: 'Mohamed',
      title: 'Male Nail Technician',
      bio: 'Mohamed is our male nail technician specializing in manicures, pedicures, and nail care for all clients.',
      email: 'rootsandcrownspa@gmail.com',
      phone: '+250788123463',
      image: '/images/staff/mohamed.jpg',
      specialties: JSON.stringify(['Manicure', 'Pedicure', 'Nail Care', 'Nail Treatments']),
      isActive: true,
      rating: 4.5,
      reviewCount: 65
    },
    {
      id: 'ishimwe',
      name: 'Ishimwe',
      title: 'Female Nail Technician',
      bio: 'Ishimwe is our female nail technician specializing in nail art, gel nails, and luxury nail treatments.',
      email: 'rootsandcrownspa@gmail.com',
      phone: '+250788123464',
      image: '/images/staff/ishimwe.jpg',
      specialties: JSON.stringify(['Nail Art', 'Gel Nails', 'Manicure', 'Pedicure']),
      isActive: true,
      rating: 4.7,
      reviewCount: 88
    },
    {
      id: 'lydia',
      name: 'Lydia',
      title: 'Female Hairdresser',
      bio: 'Lydia is our female hairdresser specializing in womens hair styling, cutting, and hair treatments.',
      email: 'rootsandcrownspa@gmail.com',
      phone: '+250788123465',
      image: '/images/staff/lydia.jpg',
      specialties: JSON.stringify(['Womens Haircuts', 'Hair Styling', 'Hair Treatments', 'Hair Care']),
      isActive: true,
      rating: 4.8,
      reviewCount: 95
    },
    {
      id: 'lisa',
      name: 'Lisa Chen',
      title: 'Nail Artist & Pedicure Specialist',
      bio: 'Lisa is our talented nail artist specializing in all manicure and pedicure services, including gel nails, nail art, and luxury treatments.',
      email: 'rootsandcrownspa@gmail.com',
      phone: '+250788123458',
      image: '/images/staff/lisa.jpg',
      specialties: JSON.stringify(['Manicure', 'Pedicure', 'Gel Nails', 'Nail Art']),
      isActive: true,
      rating: 4.9,
      reviewCount: 156
    },
    {
      id: 'anna',
      name: 'Anna Rodriguez',
      title: 'Body Treatment & Waxing Specialist',
      bio: 'Anna specializes in all body treatments including waxing, body therapy, and beauty treatments. She ensures comfort and professionalism in all services.',
      email: 'rootsandcrownspa@gmail.com',
      phone: '+250788123459',
      image: '/images/staff/anna.jpg',
      specialties: JSON.stringify(['Body Waxing', 'Body Treatments', 'Beauty Therapy']),
      isActive: true,
      rating: 4.7,
      reviewCount: 89
    }
  ]

  // Update or create staff
  for (const staff of staffData) {
    await prisma.staff.upsert({
      where: { id: staff.id },
      update: {
        name: staff.name,
        title: staff.title,
        bio: staff.bio,
        phone: staff.phone,
        specialties: staff.specialties,
        isActive: staff.isActive
      },
      create: staff
    })
  }

  console.log('✅ Staff updated/created')

  // Link staff to their specialties (StaffService relationships)
  const allServices = await prisma.service.findMany()
  
  // Sarah - Massage & Facial specialist
  const massageServices = allServices.filter(s => 
    s.name.includes('Massage') || 
    s.name.includes('Facial') || 
    s.name.includes('Reflexology') || 
    s.name.includes('Aromatherapy') ||
    s.name.includes('Physiotherapy') ||
    s.name.includes('Face Scrub')
  )
  
  for (const service of massageServices) {
    await prisma.staffService.upsert({
      where: {
        staffId_serviceId: {
          staffId: 'sarah',
          serviceId: service.id
        }
      },
      update: {},
      create: {
        id: `sarah-${service.id}`,
        staffId: 'sarah',
        serviceId: service.id
      }
    })
  }

  // Sabra - Hair braiding and styling specialist
  const hairServices = allServices.filter(s => 
    s.categoryId === 'hair-services'
  )
  
  for (const service of hairServices) {
    await prisma.staffService.upsert({
      where: {
        staffId_serviceId: {
          staffId: 'sabra',
          serviceId: service.id
        }
      },
      update: {},
      create: {
        id: `sabra-${service.id}`,
        staffId: 'sabra',
        serviceId: service.id
      }
    })
  }

  // Lisa - Nail specialist
  const nailServices = allServices.filter(s => 
    s.categoryId === 'pedicure-manicure'
  )
  
  for (const service of nailServices) {
    await prisma.staffService.upsert({
      where: {
        staffId_serviceId: {
          staffId: 'lisa',
          serviceId: service.id
        }
      },
      update: {},
      create: {
        id: `lisa-${service.id}`,
        staffId: 'lisa',
        serviceId: service.id
      }
    })
  }

  // Anna - Body treatments specialist
  const bodyServices = allServices.filter(s => 
    s.categoryId === 'body-treatments'
  )
  
  for (const service of bodyServices) {
    await prisma.staffService.upsert({
      where: {
        staffId_serviceId: {
          staffId: 'anna',
          serviceId: service.id
        }
      },
      update: {},
      create: {
        id: `anna-${service.id}`,
        staffId: 'anna',
        serviceId: service.id
      }
    })
  }

  // Claude - Hair dresser specialist
  for (const service of hairServices) {
    await prisma.staffService.upsert({
      where: {
        staffId_serviceId: {
          staffId: 'claude',
          serviceId: service.id
        }
      },
      update: {},
      create: {
        id: `claude-${service.id}`,
        staffId: 'claude',
        serviceId: service.id
      }
    })
  }

  // Abouba - Barber specialist (men's hair services)
  const menHairServices = hairServices.filter(s => 
    s.name.includes('Men') || 
    s.name.includes('Beard') || 
    s.name.includes('Machine Haircut') ||
    s.name.includes('Kids')
  )
  
  for (const service of menHairServices) {
    await prisma.staffService.upsert({
      where: {
        staffId_serviceId: {
          staffId: 'abouba',
          serviceId: service.id
        }
      },
      update: {},
      create: {
        id: `abouba-${service.id}`,
        staffId: 'abouba',
        serviceId: service.id
      }
    })
  }

  // Bibiane - Body & Facial treatments specialist
  const facialServices = allServices.filter(s => 
    s.categoryId === 'facial-treatments'
  )
  
  for (const service of bodyServices) {
    await prisma.staffService.upsert({
      where: {
        staffId_serviceId: {
          staffId: 'bibiane',
          serviceId: service.id
        }
      },
      update: {},
      create: {
        id: `bibiane-${service.id}`,
        staffId: 'bibiane',
        serviceId: service.id
      }
    })
  }
  
  for (const service of facialServices) {
    await prisma.staffService.upsert({
      where: {
        staffId_serviceId: {
          staffId: 'bibiane',
          serviceId: service.id
        }
      },
      update: {},
      create: {
        id: `bibiane-facial-${service.id}`,
        staffId: 'bibiane',
        serviceId: service.id
      }
    })
  }

  // Mohamed - Male nail technician
  for (const service of nailServices) {
    await prisma.staffService.upsert({
      where: {
        staffId_serviceId: {
          staffId: 'mohamed',
          serviceId: service.id
        }
      },
      update: {},
      create: {
        id: `mohamed-${service.id}`,
        staffId: 'mohamed',
        serviceId: service.id
      }
    })
  }

  // Ishimwe - Female nail technician
  for (const service of nailServices) {
    await prisma.staffService.upsert({
      where: {
        staffId_serviceId: {
          staffId: 'ishimwe',
          serviceId: service.id
        }
      },
      update: {},
      create: {
        id: `ishimwe-${service.id}`,
        staffId: 'ishimwe',
        serviceId: service.id
      }
    })
  }

  // Lydia - Female hairdresser
  for (const service of hairServices) {
    await prisma.staffService.upsert({
      where: {
        staffId_serviceId: {
          staffId: 'lydia',
          serviceId: service.id
        }
      },
      update: {},
      create: {
        id: `lydia-${service.id}`,
        staffId: 'lydia',
        serviceId: service.id
      }
    })
  }

  console.log('✅ Staff-Service relationships updated')
  console.log('🎉 Database updated successfully with Roots & Crown RWF services!')
  console.log(`Updated:`)
  console.log(`- ${categories.length} categories`)
  console.log(`- ${services.length} services (all priced in RWF)`)
  console.log(`- ${staffData.length} staff members`)
  console.log('✅ All existing bookings and feedback preserved!')
}

main()
  .catch((e) => {
    console.error('❌ Error updating database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
