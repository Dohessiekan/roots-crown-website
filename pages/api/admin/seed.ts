import { NextApiRequest, NextApiResponse } from 'next'
import { seedDatabase } from '../../../seed-production'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    console.log('🌱 Starting database seeding...')
    await seedDatabase()
    
    res.status(200).json({ 
      success: true, 
      message: 'Database seeded successfully',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Seeding error:', error)
    res.status(500).json({ 
      success: false, 
      error: 'Failed to seed database',
      message: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}
