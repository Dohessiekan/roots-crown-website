import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const staffImageDir = path.join(process.cwd(), 'public', 'images', 'staff')
    
    // Ensure directory exists
    if (!fs.existsSync(staffImageDir)) {
      fs.mkdirSync(staffImageDir, { recursive: true })
    }

    // Get all image files
    const files = fs.readdirSync(staffImageDir)
    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
    )

    // Map to useful information
    const images = imageFiles.map(file => {
      const stats = fs.statSync(path.join(staffImageDir, file))
      const staffId = path.parse(file).name
      const imagePath = `/images/staff/${file}`
      
      return {
        filename: file,
        staffId: staffId,
        imagePath: imagePath,
        size: stats.size,
        lastModified: stats.mtime,
        extension: path.extname(file)
      }
    })

    return res.status(200).json({
      directory: '/images/staff',
      totalImages: images.length,
      images: images,
      instructions: {
        prismaStudio: 'Copy the imagePath value to the image field in Prisma Studio',
        upload: 'To add new images, copy them to public/images/staff/ folder'
      }
    })

  } catch (error) {
    console.error('Error listing images:', error)
    return res.status(500).json({ message: 'Failed to list images' })
  }
}
