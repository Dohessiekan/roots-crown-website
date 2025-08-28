const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function checkStaff() {
  try {
    console.log('👥 Staff Members with Services:')
    console.log('===============================')
    
    const staff = await prisma.staff.findMany({
      include: {
        staffServices: {
          include: {
            service: {
              select: { name: true, price: true }
            }
          }
        },
        availability: true
      },
      orderBy: { name: 'asc' }
    })

    staff.forEach((member, index) => {
      console.log(`${index + 1}. ${member.name} (${member.id})`)
      console.log(`   Title: ${member.title}`)
      console.log(`   Email: ${member.email}`)
      console.log(`   Phone: ${member.phone}`)
      console.log(`   Services: ${member.staffServices.length} connected`)
      console.log(`   Availability: ${member.availability.length} days`)
      console.log(`   Active: ${member.isActive ? '✅' : '❌'}`)
      console.log('')
    })

    console.log('📊 Summary:')
    console.log(`Total Staff: ${staff.length}`)
    const totalConnections = await prisma.staffService.count()
    console.log(`Total Service Connections: ${totalConnections}`)

    await prisma.$disconnect()
  } catch (error) {
    console.error('Error:', error)
    await prisma.$disconnect()
  }
}

checkStaff()
