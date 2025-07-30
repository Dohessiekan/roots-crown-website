const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function checkCategories() {
  try {
    const categories = await prisma.category.findMany()
    console.log('Existing categories:')
    categories.forEach(cat => {
      console.log(`- ID: ${cat.id}, Name: ${cat.name}, Slug: ${cat.slug}`)
    })
    
    const services = await prisma.service.findMany({
      include: {
        category: true
      }
    })
    console.log('\nExisting services:')
    services.forEach(service => {
      console.log(`- ${service.name} (${service.id}) - Category: ${service.category?.name} (${service.categoryId})`)
    })
    
  } catch (error) {
    console.error('Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkCategories()
