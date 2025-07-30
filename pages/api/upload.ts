import { NextApiRequest, NextApiResponse } from 'next'
import formidable from 'formidable'
import fs from 'fs'
import path from 'path'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const uploadDir = path.join(process.cwd(), 'public', 'images', 'staff')
    
    // Ensure the upload directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }

    const form = formidable({
      uploadDir,
      keepExtensions: true,
      maxFileSize: 5 * 1024 * 1024, // 5MB limit
      filter: (part) => {
        return !!(part.mimetype && part.mimetype.includes('image'))
      }
    })

    const [fields, files] = await form.parse(req)
    
    const uploadedFile = Array.isArray(files.image) ? files.image[0] : files.image
    
    if (!uploadedFile) {
      return res.status(400).json({ message: 'No image file uploaded' })
    }

    // Get the file extension
    const fileExtension = path.extname(uploadedFile.originalFilename || '')
    const staffId = Array.isArray(fields.staffId) ? fields.staffId[0] : fields.staffId
    
    if (!staffId) {
      return res.status(400).json({ message: 'Staff ID is required' })
    }

    // Create new filename: staffId + extension
    const newFileName = `${staffId}${fileExtension}`
    const newFilePath = path.join(uploadDir, newFileName)
    
    // Move file to new location with proper name
    fs.renameSync(uploadedFile.filepath, newFilePath)
    
    // Return the web path for the database
    const imagePath = `/images/staff/${newFileName}`
    
    return res.status(200).json({ 
      message: 'File uploaded successfully',
      imagePath: imagePath
    })

  } catch (error) {
    console.error('Upload error:', error)
    return res.status(500).json({ message: 'Upload failed' })
  }
}
