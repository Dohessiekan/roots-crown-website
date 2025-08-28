const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkStaffConnections() {
  console.log('🔍 Checking staff-service connections...');
  
  try {
    // Get all staff
    const staff = await prisma.staff.findMany({
      select: { id: true, name: true }
    });
    
    // Get all services
    const services = await prisma.service.findMany({
      select: { id: true, name: true, categoryId: true }
    });
    
    // Get all staff-service connections
    const connections = await prisma.staffService.findMany({
      include: {
        staff: { select: { name: true } },
        service: { select: { name: true } }
      }
    });
    
    console.log(`👥 Total staff: ${staff.length}`);
    console.log(`🎯 Total services: ${services.length}`);
    console.log(`🔗 Total connections: ${connections.count || connections.length}`);
    
    console.log('\n🔗 Current staff-service connections:');
    connections.forEach(conn => {
      console.log(`   - ${conn.staff.name} → ${conn.service.name}`);
    });
    
    if (connections.length === 0) {
      console.log('\n⚠️  WARNING: No staff are connected to any services!');
      console.log('💡 You may need to reconnect staff to the new services.');
    }
    
  } catch (error) {
    console.error('❌ Error checking connections:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkStaffConnections();
