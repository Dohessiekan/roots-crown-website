const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkNailServices() {
  try {
    const nailServices = await prisma.service.findMany({
      where: { categoryId: 'pedicure-manicure' },
      include: {
        staffServices: {
          include: {
            staff: { select: { name: true } }
          }
        }
      }
    });

    console.log('💅 Pedicure & Manicure Services:');
    nailServices.forEach(service => {
      const staffNames = service.staffServices.map(ss => ss.staff.name).join(', ');
      console.log(`- ${service.name}: ${staffNames || 'No staff assigned'}`);
    });
    
    // Also check body treatment services
    const bodyServices = await prisma.service.findMany({
      where: { categoryId: 'body-treatments' },
      include: {
        staffServices: {
          include: {
            staff: { select: { name: true } }
          }
        }
      }
    });

    console.log('\n💆 Body Treatment Services:');
    bodyServices.forEach(service => {
      const staffNames = service.staffServices.map(ss => ss.staff.name).join(', ');
      console.log(`- ${service.name}: ${staffNames || 'No staff assigned'}`);
    });
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkNailServices();
