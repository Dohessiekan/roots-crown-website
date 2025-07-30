import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Updating Roots & Crown database with comprehensive RWF pricing...')
  console.log('🛡️ Preserving existing bookings and feedback...')

  // First, let's see what we're working with
  const existingBookings = await prisma.booking.findMany({
    include: { service: true, staff: true }
  })
  
  console.log(`📊 Found ${existingBookings.length} existing bookings to preserve`)
  
  // Create temporary mappings for existing bookings
  const bookingServiceMappings = new Map()
  for (const booking of existingBookings) {
    if (booking.service) {
      bookingServiceMappings.set(booking.serviceId, {
        originalId: booking.serviceId,
        originalName: booking.service.name,
        bookingIds: []
      })
    }
  }

  existingBookings.forEach(booking => {
    if (bookingServiceMappings.has(booking.serviceId)) {
      bookingServiceMappings.get(booking.serviceId).bookingIds.push(booking.id)
    }
  })

  console.log(`🔄 Services with existing bookings:`)
  bookingServiceMappings.forEach((data, serviceId) => {
    console.log(`  - ${data.originalName} (${serviceId}): ${data.bookingIds.length} bookings`)
  })

  // Categories to update (use existing structure)
  const categories = [
    {
      id: 'massage',
      name: 'Massage Therapy',
      slug: 'massage-therapy',
      description: 'Professional therapeutic massage services',
      icon: 'massageIcon.svg'
    },
    {
      id: 'skincare',
      name: 'Facial Treatments',
      slug: 'skincare-facials',
      description: 'Professional facial and skincare treatments',
      icon: 'skinIcon.svg'
    },
    {
      id: 'body',
      name: 'Body Treatments',
      slug: 'body-treatments',
      description: 'Full body care and wellness treatments',
      icon: 'BodyIcon.svg'
    },
    {
      id: 'nails',
      name: 'Pedicure & Manicure',
      slug: 'nail-services',
      description: 'Professional nail care services',
      icon: 'nailsIcon.svg'
    },
    {
      id: 'hair',
      name: 'Hair Services',
      slug: 'hair-services',
      description: 'Professional hair styling and treatments',
      icon: 'hairIcon.svg'
    },
    {
      id: 'tattoo',
      name: 'Tattoo & Piercing',
      slug: 'tattoo-piercing',
      description: 'Professional tattoo and piercing services',
      icon: 'tattooIcon.svg'
    }
  ]

  // Update categories first
  console.log('📂 Updating categories...')
  for (const category of categories) {
    await prisma.category.upsert({
      where: { id: category.id },
      update: category,
      create: category
    })
  }
  console.log(`✅ ${categories.length} categories updated`)

  // Clean up old categories we're not using anymore
  const currentCategoryIds = categories.map(c => c.id)
  const categoriesToDelete = ['makeup', 'removal', 'wellness']
  
  for (const categoryId of categoriesToDelete) {
    try {
      // Check if there are any services or other references
      const servicesInCategory = await prisma.service.count({
        where: { categoryId }
      })
      
      if (servicesInCategory === 0) {
        await prisma.category.delete({
          where: { id: categoryId }
        })
        console.log(`🗑️ Removed unused category: ${categoryId}`)
      }
    } catch (error: any) {
      console.log(`⚠️ Could not remove category ${categoryId}: ${error.message}`)
    }
  }

  // Clear existing staff-service relationships (safe to delete)
  console.log('🧹 Clearing existing staff-service relationships...')
  await prisma.staffService.deleteMany()

  // Now carefully handle services - preserve ones with existing bookings, replace others
  console.log('💇 Processing services...')

  // First, delete services that don't have bookings
  const servicesWithoutBookings = await prisma.service.findMany({
    where: {
      bookings: {
        none: {}
      }
    }
  })

  console.log(`🗑️ Removing ${servicesWithoutBookings.length} services without bookings...`)
  for (const service of servicesWithoutBookings) {
    await prisma.service.delete({
      where: { id: service.id }
    })
  }

  // Define new comprehensive service list
  const newServices = [
    // Massage Therapy
    { id: 'swedish-massage', name: 'Swedish Massage', slug: 'swedish-massage', description: 'Relaxing full-body massage with gentle strokes', price: '15,000 RWF', duration: '60 minutes', categoryId: 'massage' },
    { id: 'deep-tissue-massage', name: 'Deep Tissue Massage', slug: 'deep-tissue-massage', description: 'Therapeutic massage targeting muscle tension', price: '18,000 RWF', duration: '60 minutes', categoryId: 'massage' },
    { id: 'hot-stone-massage', name: 'Hot Stone Massage', slug: 'hot-stone-massage', description: 'Massage using heated stones for deep relaxation', price: '20,000 RWF', duration: '75 minutes', categoryId: 'massage' },
    { id: 'aromatherapy-massage', name: 'Aromatherapy Massage', slug: 'aromatherapy-massage', description: 'Relaxing massage with essential oils', price: '16,000 RWF', duration: '60 minutes', categoryId: 'massage' },
    { id: 'prenatal-massage', name: 'Prenatal Massage', slug: 'prenatal-massage', description: 'Safe and gentle massage for expectant mothers', price: '17,000 RWF', duration: '60 minutes', categoryId: 'massage' },
    { id: 'sports-massage', name: 'Sports Massage', slug: 'sports-massage', description: 'Recovery and performance massage for athletes', price: '19,000 RWF', duration: '60 minutes', categoryId: 'massage' },
    { id: 'reflexology', name: 'Reflexology', slug: 'reflexology', description: 'Therapeutic foot massage targeting pressure points', price: '12,000 RWF', duration: '45 minutes', categoryId: 'massage' },
    { id: 'couples-massage', name: 'Couples Massage', slug: 'couples-massage', description: 'Relaxing massage session for two', price: '30,000 RWF', duration: '60 minutes', categoryId: 'massage' },
    { id: 'chair-massage', name: 'Chair Massage', slug: 'chair-massage', description: 'Quick relaxation massage while seated', price: '8,000 RWF', duration: '20 minutes', categoryId: 'massage' },
    { id: 'thai-massage', name: 'Thai Massage', slug: 'thai-massage', description: 'Traditional stretching and pressure point massage', price: '18,000 RWF', duration: '75 minutes', categoryId: 'massage' },
    
    // Map old services to new equivalents for bookings
    { id: 'relaxmassage', name: 'Relaxation Massage', slug: 'relaxation-massage', description: 'Gentle relaxing full-body massage', price: '15,000 RWF', duration: '60 minutes', categoryId: 'massage' },
    { id: 'deepmassage', name: 'Deep Tissue Massage', slug: 'deep-massage', description: 'Therapeutic deep tissue massage', price: '18,000 RWF', duration: '60 minutes', categoryId: 'massage' },

    // Facial Treatments
    { id: 'classic-facial', name: 'Classic Facial', slug: 'classic-facial-treatment', description: 'Deep cleansing and moisturizing facial treatment', price: '12,000 RWF', duration: '60 minutes', categoryId: 'skincare' },
    { id: 'anti-aging-facial', name: 'Anti-Aging Facial', slug: 'anti-aging-facial', description: 'Advanced treatment targeting signs of aging', price: '18,000 RWF', duration: '75 minutes', categoryId: 'skincare' },
    { id: 'acne-treatment', name: 'Acne Treatment Facial', slug: 'acne-treatment', description: 'Specialized treatment for acne-prone skin', price: '15,000 RWF', duration: '60 minutes', categoryId: 'skincare' },
    { id: 'hydrating-facial', name: 'Hydrating Facial', slug: 'hydrating-facial', description: 'Intensive moisture restoration treatment', price: '14,000 RWF', duration: '60 minutes', categoryId: 'skincare' },
    { id: 'brightening-facial', name: 'Brightening Facial', slug: 'brightening-facial', description: 'Treatment to even skin tone and add radiance', price: '16,000 RWF', duration: '60 minutes', categoryId: 'skincare' },
    { id: 'sensitive-skin-facial', name: 'Sensitive Skin Facial', slug: 'sensitive-skin-facial', description: 'Gentle treatment for delicate skin', price: '13,000 RWF', duration: '60 minutes', categoryId: 'skincare' },
    { id: 'microdermabrasion', name: 'Microdermabrasion', slug: 'microdermabrasion', description: 'Exfoliating treatment for smooth skin', price: '20,000 RWF', duration: '45 minutes', categoryId: 'skincare' },
    { id: 'chemical-peel', name: 'Chemical Peel', slug: 'chemical-peel', description: 'Professional skin resurfacing treatment', price: '25,000 RWF', duration: '60 minutes', categoryId: 'skincare' },
    { id: 'oxygen-facial', name: 'Oxygen Facial', slug: 'oxygen-facial', description: 'Rejuvenating treatment with oxygen infusion', price: '22,000 RWF', duration: '75 minutes', categoryId: 'skincare' },
    { id: 'eyebrow-shaping', name: 'Eyebrow Shaping', slug: 'eyebrow-shaping', description: 'Professional eyebrow sculpting and shaping', price: '5,000 RWF', duration: '30 minutes', categoryId: 'skincare' },

    // Map old facial services
    { id: 'classicfacial', name: 'Classic Facial', slug: 'classic-facial-service', description: 'Traditional deep cleansing facial', price: '12,000 RWF', duration: '60 minutes', categoryId: 'skincare' },
    { id: 'deepfacial', name: 'Deep Cleansing Facial', slug: 'deep-cleansing-facial', description: 'Intensive deep cleansing treatment', price: '14,000 RWF', duration: '75 minutes', categoryId: 'skincare' },

    // Body Treatments
    { id: 'body-scrub', name: 'Full Body Scrub', slug: 'body-scrub', description: 'Exfoliating treatment for smooth, soft skin', price: '15,000 RWF', duration: '45 minutes', categoryId: 'body' },
    { id: 'body-wrap', name: 'Body Wrap', slug: 'body-wrap', description: 'Detoxifying and moisturizing body treatment', price: '20,000 RWF', duration: '60 minutes', categoryId: 'body' },
    { id: 'cellulite-treatment', name: 'Cellulite Treatment', slug: 'cellulite-treatment', description: 'Specialized treatment targeting cellulite', price: '25,000 RWF', duration: '60 minutes', categoryId: 'body' },
    { id: 'back-facial', name: 'Back Facial', slug: 'back-facial', description: 'Deep cleansing treatment for back skin', price: '18,000 RWF', duration: '60 minutes', categoryId: 'body' },
    { id: 'sunless-tanning', name: 'Sunless Tanning', slug: 'sunless-tanning', description: 'Professional spray tan application', price: '12,000 RWF', duration: '30 minutes', categoryId: 'body' },
    { id: 'body-contouring', name: 'Body Contouring', slug: 'body-contouring', description: 'Non-invasive body shaping treatment', price: '30,000 RWF', duration: '90 minutes', categoryId: 'body' },
    { id: 'stretch-mark-treatment', name: 'Stretch Mark Treatment', slug: 'stretch-mark-treatment', description: 'Specialized treatment for stretch marks', price: '22,000 RWF', duration: '60 minutes', categoryId: 'body' },
    { id: 'detox-treatment', name: 'Detox Treatment', slug: 'detox-treatment', description: 'Full body detoxification therapy', price: '25,000 RWF', duration: '75 minutes', categoryId: 'body' },

    // Pedicure & Manicure
    { id: 'classic-manicure-new', name: 'Classic Manicure', slug: 'classic-manicure-new', description: 'Traditional nail care and polish application', price: '8,000 RWF', duration: '45 minutes', categoryId: 'nails' },
    { id: 'gel-manicure-new', name: 'Gel Manicure', slug: 'gel-manicure-new', description: 'Long-lasting gel polish manicure', price: '12,000 RWF', duration: '60 minutes', categoryId: 'nails' },
    { id: 'french-manicure', name: 'French Manicure', slug: 'french-manicure', description: 'Classic French tip nail styling', price: '10,000 RWF', duration: '50 minutes', categoryId: 'nails' },
    { id: 'nail-art', name: 'Nail Art Design', slug: 'nail-art', description: 'Custom creative nail art and designs', price: '15,000 RWF', duration: '75 minutes', categoryId: 'nails' },
    { id: 'classic-pedicure-new', name: 'Classic Pedicure', slug: 'classic-pedicure-new', description: 'Complete foot care and nail treatment', price: '10,000 RWF', duration: '60 minutes', categoryId: 'nails' },
    { id: 'spa-pedicure', name: 'Spa Pedicure', slug: 'spa-pedicure', description: 'Luxurious foot treatment with massage', price: '15,000 RWF', duration: '75 minutes', categoryId: 'nails' },
    { id: 'gel-pedicure', name: 'Gel Pedicure', slug: 'gel-pedicure', description: 'Long-lasting gel polish pedicure', price: '14,000 RWF', duration: '70 minutes', categoryId: 'nails' },
    { id: 'paraffin-treatment', name: 'Paraffin Hand/Foot Treatment', slug: 'paraffin-treatment', description: 'Moisturizing paraffin wax treatment', price: '8,000 RWF', duration: '30 minutes', categoryId: 'nails' },
    { id: 'callus-removal', name: 'Callus Removal', slug: 'callus-removal', description: 'Professional callus and dead skin removal', price: '6,000 RWF', duration: '30 minutes', categoryId: 'nails' },
    { id: 'nail-repair', name: 'Nail Repair', slug: 'nail-repair', description: 'Treatment for damaged or broken nails', price: '5,000 RWF', duration: '30 minutes', categoryId: 'nails' },

    // Map old nail services
    { id: 'manicure', name: 'Classic Manicure', slug: 'manicure', description: 'Professional nail care and polish', price: '8,000 RWF', duration: '45 minutes', categoryId: 'nails' },
    { id: 'gelmanicure', name: 'Gel Manicure', slug: 'gel-manicure', description: 'Long-lasting gel polish', price: '12,000 RWF', duration: '60 minutes', categoryId: 'nails' },
    { id: 'pedicure', name: 'Classic Pedicure', slug: 'pedicure', description: 'Complete foot care treatment', price: '10,000 RWF', duration: '60 minutes', categoryId: 'nails' },

    // Hair Services
    { id: 'haircut-styling-new', name: 'Haircut & Styling', slug: 'haircut-styling-new', description: 'Professional cut and style for all hair types', price: '12,000 RWF', duration: '60 minutes', categoryId: 'hair' },
    { id: 'hair-coloring-new', name: 'Hair Coloring', slug: 'hair-coloring-new', description: 'Full or partial hair color application', price: '25,000 RWF', duration: '120 minutes', categoryId: 'hair' },
    { id: 'highlights', name: 'Hair Highlights', slug: 'highlights', description: 'Professional highlighting service', price: '20,000 RWF', duration: '90 minutes', categoryId: 'hair' },
    { id: 'balayage', name: 'Balayage', slug: 'balayage', description: 'Hand-painted natural hair highlighting', price: '30,000 RWF', duration: '150 minutes', categoryId: 'hair' },
    { id: 'hair-treatment-new', name: 'Deep Hair Treatment', slug: 'hair-treatment-new', description: 'Intensive conditioning and repair treatment', price: '15,000 RWF', duration: '60 minutes', categoryId: 'hair' },
    { id: 'keratin-treatment', name: 'Keratin Treatment', slug: 'keratin-treatment', description: 'Smoothing and strengthening hair treatment', price: '40,000 RWF', duration: '180 minutes', categoryId: 'hair' },
    { id: 'hair-extensions', name: 'Hair Extensions', slug: 'hair-extensions', description: 'Professional hair extension application', price: '35,000 RWF', duration: '120 minutes', categoryId: 'hair' },
    { id: 'bridal-hair', name: 'Bridal Hair Styling', slug: 'bridal-hair', description: 'Special occasion hair styling', price: '25,000 RWF', duration: '90 minutes', categoryId: 'hair' },
    { id: 'hair-wash-blowdry', name: 'Wash & Blow Dry', slug: 'hair-wash-blowdry', description: 'Professional hair washing and styling', price: '8,000 RWF', duration: '45 minutes', categoryId: 'hair' },
    { id: 'scalp-treatment', name: 'Scalp Treatment', slug: 'scalp-treatment', description: 'Therapeutic scalp care and massage', price: '12,000 RWF', duration: '45 minutes', categoryId: 'hair' },

    // Map old hair services
    { id: 'haircut', name: 'Hair Cut & Styling', slug: 'haircut', description: 'Professional haircut and styling', price: '12,000 RWF', duration: '60 minutes', categoryId: 'hair' },
    { id: 'haircolor', name: 'Hair Coloring', slug: 'haircolor', description: 'Professional hair coloring service', price: '25,000 RWF', duration: '120 minutes', categoryId: 'hair' },
    { id: 'hairtreatment', name: 'Hair Treatment', slug: 'hairtreatment', description: 'Deep conditioning hair treatment', price: '15,000 RWF', duration: '60 minutes', categoryId: 'hair' },

    // Tattoo & Piercing
    { id: 'small-tattoo', name: 'Small Tattoo', slug: 'small-tattoo', description: 'Custom small tattoo design (up to 3 inches)', price: '25,000 RWF', duration: '60 minutes', categoryId: 'tattoo' },
    { id: 'medium-tattoo', name: 'Medium Tattoo', slug: 'medium-tattoo', description: 'Custom medium tattoo design (3-6 inches)', price: '50,000 RWF', duration: '120 minutes', categoryId: 'tattoo' },
    { id: 'large-tattoo', name: 'Large Tattoo', slug: 'large-tattoo', description: 'Custom large tattoo design (6+ inches)', price: '100,000 RWF', duration: '240 minutes', categoryId: 'tattoo' },
    { id: 'tattoo-consultation', name: 'Tattoo Consultation', slug: 'tattoo-consultation', description: 'Design consultation and planning session', price: '5,000 RWF', duration: '30 minutes', categoryId: 'tattoo' },
    { id: 'ear-piercing', name: 'Ear Piercing', slug: 'ear-piercing', description: 'Professional ear piercing with jewelry', price: '8,000 RWF', duration: '15 minutes', categoryId: 'tattoo' },
    { id: 'nose-piercing', name: 'Nose Piercing', slug: 'nose-piercing', description: 'Professional nose piercing with jewelry', price: '10,000 RWF', duration: '20 minutes', categoryId: 'tattoo' },
    { id: 'lip-piercing', name: 'Lip Piercing', slug: 'lip-piercing', description: 'Professional lip piercing with jewelry', price: '12,000 RWF', duration: '20 minutes', categoryId: 'tattoo' },
    { id: 'eyebrow-piercing', name: 'Eyebrow Piercing', slug: 'eyebrow-piercing', description: 'Professional eyebrow piercing with jewelry', price: '10,000 RWF', duration: '20 minutes', categoryId: 'tattoo' },
    { id: 'body-piercing', name: 'Body Piercing', slug: 'body-piercing', description: 'Professional body piercing service', price: '15,000 RWF', duration: '30 minutes', categoryId: 'tattoo' },
    { id: 'piercing-jewelry', name: 'Piercing Jewelry Change', slug: 'piercing-jewelry', description: 'Professional jewelry change and care', price: '3,000 RWF', duration: '10 minutes', categoryId: 'tattoo' }
  ]

  // Create/update all services
  console.log('💇 Creating/updating services...')
  const allServices = []
  for (const service of newServices) {
    try {
      const updatedService = await prisma.service.upsert({
        where: { id: service.id },
        update: {
          name: service.name,
          description: service.description,
          price: service.price,
          duration: service.duration,
          categoryId: service.categoryId,
          // Don't update slug to avoid conflicts
        },
        create: service
      })
      allServices.push(updatedService)
    } catch (error: any) {
      console.log(`⚠️ Issue with service ${service.id}: ${error.message}`)
      // Try to find existing service and update it
      try {
        const existingService = await prisma.service.findUnique({
          where: { id: service.id }
        })
        if (existingService) {
          allServices.push(existingService)
        }
      } catch (e) {
        console.log(`❌ Could not process service ${service.id}`)
      }
    }
  }
  console.log(`✅ ${allServices.length} services processed`)

  // Staff data (keep existing staff)
  const staffData = [
    {
      id: 'sarah',
      name: 'Sarah Johnson',
      title: 'Licensed Massage Therapist',
      bio: 'Sarah has over 8 years of experience in therapeutic massage and specializes in Swedish and deep tissue techniques.',
      email: 'sarah@rootsandcrown.rw',
      phone: '+250-788-123-456',
      image: '/images/staff/sarah.jpg',
      specialties: JSON.stringify(['Swedish Massage', 'Deep Tissue Massage', 'Hot Stone Massage', 'Aromatherapy']),
      rating: 4.9,
      reviewCount: 127
    },
    {
      id: 'mike',
      name: 'Mike Thompson',
      title: 'Senior Hair Stylist',
      bio: 'Mike is a creative hair stylist with 10+ years experience in cutting, coloring, and styling for all hair types.',
      email: 'mike@rootsandcrown.rw',
      phone: '+250-788-234-567',
      image: '/images/staff/mike.jpg',
      specialties: JSON.stringify(['Hair Cutting', 'Hair Coloring', 'Balayage', 'Keratin Treatments']),
      rating: 4.8,
      reviewCount: 98
    },
    {
      id: 'lisa',
      name: 'Lisa Chen',
      title: 'Nail Specialist',
      bio: 'Lisa specializes in nail care and artistic nail designs with 6 years of professional experience.',
      email: 'lisa@rootsandcrown.rw',
      phone: '+250-788-345-678',
      image: '/images/staff/lisa.jpg',
      specialties: JSON.stringify(['Manicures', 'Pedicures', 'Gel Nails', 'Nail Art']),
      rating: 4.9,
      reviewCount: 156
    },
    {
      id: 'anna',
      name: 'Anna Williams',
      title: 'Esthetician & Body Treatment Specialist',
      bio: 'Anna is a licensed esthetician specializing in facial treatments and body therapies with 7 years experience.',
      email: 'anna@rootsandcrown.rw',
      phone: '+250-788-456-789',
      image: '/images/staff/anna.jpg',
      specialties: JSON.stringify(['Facials', 'Body Treatments', 'Skincare', 'Anti-Aging']),
      rating: 4.8,
      reviewCount: 89
    },
    {
      id: 'john',
      name: 'John Davis',
      title: 'Tattoo Artist & Piercing Specialist',
      bio: 'John is a professional tattoo artist and piercer with 12 years experience in custom designs and body art.',
      email: 'john@rootsandcrown.rw',
      phone: '+250-788-567-890',
      image: '/images/staff/john.jpg',
      specialties: JSON.stringify(['Tattoo Design', 'Body Piercing', 'Custom Art', 'Consultations']),
      rating: 4.9,
      reviewCount: 203
    }
  ]

  // Update staff information
  console.log('👥 Updating staff information...')
  for (const staff of staffData) {
    await prisma.staff.upsert({
      where: { id: staff.id },
      update: staff,
      create: staff
    })
  }
  console.log(`✅ ${staffData.length} staff members updated`)

  // Create staff-service relationships
  console.log('🔗 Creating staff-service relationships...')

  // Sarah - Massage specialist
  const massageServices = allServices.filter(s => s.categoryId === 'massage')
  for (const service of massageServices) {
    try {
      await prisma.staffService.create({
        data: {
          id: `sarah-${service.id}`,
          staffId: 'sarah',
          serviceId: service.id
        }
      })
    } catch (error) {
      // Relationship might already exist
    }
  }

  // Mike - Hair specialist
  const hairServices = allServices.filter(s => s.categoryId === 'hair')
  for (const service of hairServices) {
    try {
      await prisma.staffService.create({
        data: {
          id: `mike-${service.id}`,
          staffId: 'mike',
          serviceId: service.id
        }
      })
    } catch (error) {
      // Relationship might already exist
    }
  }

  // Lisa - Nail specialist
  const nailServices = allServices.filter(s => s.categoryId === 'nails')
  for (const service of nailServices) {
    try {
      await prisma.staffService.create({
        data: {
          id: `lisa-${service.id}`,
          staffId: 'lisa',
          serviceId: service.id
        }
      })
    } catch (error) {
      // Relationship might already exist
    }
  }

  // Anna - Body treatments and facial specialist
  const bodyAndFacialServices = allServices.filter(s => 
    s.categoryId === 'body' || s.categoryId === 'skincare'
  )
  for (const service of bodyAndFacialServices) {
    try {
      await prisma.staffService.create({
        data: {
          id: `anna-${service.id}`,
          staffId: 'anna',
          serviceId: service.id
        }
      })
    } catch (error) {
      // Relationship might already exist
    }
  }

  // John - Tattoo/Piercing specialist
  const tattooServices = allServices.filter(s => s.categoryId === 'tattoo')
  for (const service of tattooServices) {
    try {
      await prisma.staffService.create({
        data: {
          id: `john-${service.id}`,
          staffId: 'john',
          serviceId: service.id
        }
      })
    } catch (error) {
      // Relationship might already exist
    }
  }

  console.log('✅ Staff-Service relationships updated')
  console.log('🎉 Database updated successfully with comprehensive RWF services!')
  console.log(`Updated:`)
  console.log(`- ${categories.length} categories`)
  console.log(`- ${allServices.length} services (all priced in RWF)`)
  console.log(`- ${staffData.length} staff members`)
  console.log('✅ All existing bookings and feedback preserved!')
  
  // Final verification
  const finalBookings = await prisma.booking.findMany({
    include: { service: true, staff: true }
  })
  console.log(`🔍 Verification: ${finalBookings.length} bookings still exist`)
  
  const staffServiceCount = await prisma.staffService.count()
  console.log(`🔗 Created ${staffServiceCount} staff-service relationships`)
}

main()
  .catch((e) => {
    console.error('❌ Error updating database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
