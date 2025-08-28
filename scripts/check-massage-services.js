const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkMassageServices() {
  try {
    const massageServices = await prisma.service.findMany({
      where: { categoryId: 'massage-therapy' },
      include: {
        staffServices: {
          include: {
            staff: { select: { name: true } }
          }
        }
      }
    });

    console.log('🌿 Massage Therapy Services:');
    massageServices.forEach(service => {
      const staffNames = service.staffServices.map(ss => ss.staff.name).join(', ');
      console.log(`- ${service.name}: ${staffNames || 'No staff assigned'}`);
    });
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkMassageServices();
