const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function checkServices() {
  try {
    const services = await prisma.service.findMany({
      select: {
        id: true,
        name: true,
        price: true,
        image: true,
        category: {
          select: {
            name: true
          }
        }
      },
      take: 10 // Just first 10 for verification
    })
    
    console.log('Sample services with images:')
    services.forEach(service => {
      console.log(`- ${service.name} (${service.category.name}): ${service.price} - Image: ${service.image}`)
    })
    
  } catch (error) {
    console.error('Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkServices()
