const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function seedDatabase() {
  console.log('🌱 Seeding database with essential data...')

  try {
    // Check if categories already exist
    const existingCategories = await prisma.category.count()
    
    if (existingCategories > 0) {
      console.log(`✅ Database already has ${existingCategories} categories. Skipping seed.`)
      return
    }

    console.log('📂 Creating categories...')
    
    // Create categories
    const categories = [
      {
        id: 'hair',
        name: 'Hair Services',
        slug: 'hair-services',
        description: 'Professional hair styling, cutting, and coloring services',
        icon: 'hairIcon.svg'
      },
      {
        id: 'body',
        name: 'Body Treatments', 
        slug: 'body-treatments',
        description: 'Relaxing body treatments and wellness services',
        icon: 'BodyIcon.svg'
      },
      {
        id: 'massage',
        name: 'Massage Therapy',
        slug: 'massage-therapy', 
        description: 'Therapeutic and relaxation massage services',
        icon: 'massageIcon.svg'
      },
      {
        id: 'nails',
        name: 'Nail Services',
        slug: 'nail-services',
        description: 'Manicure, pedicure, and nail art services',
        icon: 'nailsIcon.svg'
      },
      {
        id: 'skin',
        name: 'Skincare',
        slug: 'skincare',
        description: 'Facial treatments and skincare services',
        icon: 'skinIcon.svg'
      },
      {
        id: 'makeup',
        name: 'Makeup Services',
        slug: 'makeup-services',
        description: 'Professional makeup application and styling',
        icon: 'makeupIcon.svg'
      }
    ]

    for (const category of categories) {
      await prisma.category.create({
        data: category
      })
      console.log(`  ✅ Created category: ${category.name}`)
    }

    console.log('👥 Creating sample staff...')
    
    // Create staff if they don't exist
    const existingStaff = await prisma.staff.count()
    if (existingStaff === 0) {
      const staff = [
        {
          id: 'anna',
          name: 'Anna Williams',
          title: 'Senior Hair Stylist',
          bio: 'Anna has over 10 years of experience in hair styling and coloring.',
          email: 'anna@rootscrown.com',
          specialties: '["Hair Cutting", "Hair Coloring", "Balayage"]',
          rating: 4.9,
          reviewCount: 127,
          isActive: true
        },
        {
          id: 'mike',
          name: 'Mike Thompson',
          title: 'Massage Therapist',
          bio: 'Certified massage therapist specializing in deep tissue and relaxation massage.',
          email: 'mike@rootscrown.com',
          specialties: '["Deep Tissue Massage", "Swedish Massage", "Hot Stone"]',
          rating: 4.8,
          reviewCount: 89,
          isActive: true
        }
      ]

      for (const member of staff) {
        await prisma.staff.create({
          data: member
        })
        console.log(`  ✅ Created staff: ${member.name}`)
      }
    }

    console.log('🛠️ Creating sample services...')
    
    // Create some essential services
    const existingServices = await prisma.service.count()
    if (existingServices === 0) {
      const services = [
        {
          id: 'haircut-basic',
          name: 'Basic Haircut',
          slug: 'basic-haircut',
          description: 'Professional haircut with wash and style',
          price: '$45',
          duration: '45 min',
          categoryId: 'hair'
        },
        {
          id: 'deep-tissue-massage',
          name: 'Deep Tissue Massage',
          slug: 'deep-tissue-massage',
          description: 'Therapeutic deep tissue massage for muscle tension relief',
          price: '$80',
          duration: '60 min',
          categoryId: 'massage'
        },
        {
          id: 'facial-basic',
          name: 'Basic Facial',
          slug: 'basic-facial',
          description: 'Cleansing and moisturizing facial treatment',
          price: '$65',
          duration: '50 min',
          categoryId: 'skin'
        }
      ]

      for (const service of services) {
        await prisma.service.create({
          data: service
        })
        console.log(`  ✅ Created service: ${service.name}`)
      }
    }

    // Create availability for staff
    const existingAvailability = await prisma.availability.count()
    if (existingAvailability === 0) {
      console.log('📅 Creating staff availability...')
      
      const availability = [
        { id: 'anna-mon', staffId: 'anna', dayOfWeek: 1, startTime: '09:00', endTime: '17:00', isActive: true },
        { id: 'anna-tue', staffId: 'anna', dayOfWeek: 2, startTime: '09:00', endTime: '17:00', isActive: true },
        { id: 'anna-wed', staffId: 'anna', dayOfWeek: 3, startTime: '09:00', endTime: '17:00', isActive: true },
        { id: 'mike-mon', staffId: 'mike', dayOfWeek: 1, startTime: '10:00', endTime: '18:00', isActive: true },
        { id: 'mike-tue', staffId: 'mike', dayOfWeek: 2, startTime: '10:00', endTime: '18:00', isActive: true },
      ]

      for (const slot of availability) {
        await prisma.availability.create({
          data: slot
        })
      }
      console.log(`  ✅ Created ${availability.length} availability slots`)
    }

    console.log('🎉 Database seeding completed successfully!')

  } catch (error) {
    console.error('❌ Seeding failed:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Run if called directly
if (require.main === module) {
  seedDatabase().catch(console.error)
}

module.exports = { seedDatabase }
