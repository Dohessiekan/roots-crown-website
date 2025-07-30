import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Updating Roots & Crown database with RWF pricing...')

  // Clear existing data but preserve bookings and feedback
  await prisma.staffService.deleteMany()
  await prisma.service.deleteMany()
  await prisma.category.deleteMany()
  
  // Don't delete staff - keep existing staff with their IDs
  // Don't delete bookings or feedback - preserve the feedback system

  // Create Categories
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        id: 'massage-therapy',
        name: 'Massage Therapy',
        slug: 'massage-therapy',
        description: 'Professional massage services for relaxation and wellness',
        icon: '/images/massageIcon.svg'
      }
    }),
    prisma.category.create({
      data: {
        id: 'facial-treatments',
        name: 'Facial Treatments',
        slug: 'facial-treatments', 
        description: 'Luxurious facial treatments for glowing skin',
        icon: '/images/skinIcon.svg'
      }
    }),
    prisma.category.create({
      data: {
        id: 'body-treatments',
        name: 'Body Treatments',
        slug: 'body-treatments',
        description: 'Complete body therapy and waxing services',
        icon: '/images/BodyIcon.svg'
      }
    }),
    prisma.category.create({
      data: {
        id: 'pedicure-manicure',
        name: 'Pedicure & Manicure',
        slug: 'pedicure-manicure',
        description: 'Professional nail care and beauty services',
        icon: '/images/nailsIcon.svg'
      }
    }),
    prisma.category.create({
      data: {
        id: 'hair-services',
        name: 'Hair Services',
        slug: 'hair-services',
        description: 'Complete hair care including cuts, treatments, styling and coloring',
        icon: '/images/hairIcon.svg'
      }
    }),
    prisma.category.create({
      data: {
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

  // Create all services
  for (const serviceData of services) {
    const category = categories.find(cat => cat.slug === serviceData.category)
    if (category) {
      await prisma.service.create({
        data: {
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
      email: 'sarah@rootscrown.com',
      phone: '+250788123456',
      image: '/images/staff/sarah.jpg',
      specialties: JSON.stringify(['Swedish Massage', 'Deep Tissue', 'Facial Treatments', 'Aromatherapy']),
      isActive: true,
      rating: 4.9,
      reviewCount: 127
    },
    {
      id: 'mike',
      name: 'Mike Thompson',
      title: 'Master Hair Stylist & Colorist',
      bio: 'Mike is our lead hair specialist with expertise in all hair services including cuts, treatments, styling, and advanced coloring techniques.',
      email: 'mike@rootscrown.com',
      phone: '+250788123457',
      image: '/images/staff/mike.jpg',
      specialties: JSON.stringify(['Hair Cutting', 'Hair Coloring', 'Hair Treatments', 'Hair Styling']),
      isActive: true,
      rating: 4.8,
      reviewCount: 98
    },
    {
      id: 'lisa',
      name: 'Lisa Chen',
      title: 'Nail Artist & Pedicure Specialist',
      bio: 'Lisa is our talented nail artist specializing in all manicure and pedicure services, including gel nails, nail art, and luxury treatments.',
      email: 'lisa@rootscrown.com',
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
      email: 'anna@rootscrown.com',
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

  // Mike - Hair specialist
  const hairServices = allServices.filter(s => 
    s.categoryId === 'hair-services'
  )
  
  for (const service of hairServices) {
    await prisma.staffService.upsert({
      where: {
        staffId_serviceId: {
          staffId: 'mike',
          serviceId: service.id
        }
      },
      update: {},
      create: {
        id: `mike-${service.id}`,
        staffId: 'mike',
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

  // John - Tattoo/Piercing specialist
  const tattooServices = allServices.filter(s => 
    s.categoryId === 'tattoo-piercing'
  )
  
  for (const service of tattooServices) {
    await prisma.staffService.upsert({
      where: {
        staffId_serviceId: {
          staffId: 'john',
          serviceId: service.id
        }
      },
      update: {},
      create: {
        id: `john-${service.id}`,
        staffId: 'john',
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
