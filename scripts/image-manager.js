#!/usr/bin/env node

/**
 * Image Management Helper for Prisma Studio
 * 
 * This script helps you easily add images to the staff folder
 * and provides the correct paths for Prisma Studio.
 */

const fs = require('fs')
const path = require('path')

const STAFF_IMAGE_DIR = path.join(__dirname, '..', 'public', 'images', 'staff')

// Ensure staff directory exists
if (!fs.existsSync(STAFF_IMAGE_DIR)) {
  fs.mkdirSync(STAFF_IMAGE_DIR, { recursive: true })
  console.log('✅ Created staff images directory')
}

// Function to list all images in staff folder
function listStaffImages() {
  console.log('\n📸 Current Staff Images:')
  console.log('=' .repeat(50))
  
  const files = fs.readdirSync(STAFF_IMAGE_DIR)
  const imageFiles = files.filter(file => 
    /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
  )
  
  if (imageFiles.length === 0) {
    console.log('No images found in /images/staff/')
    console.log('\n💡 To add images:')
    console.log('1. Copy image files to: public/images/staff/')
    console.log('2. Rename them with staff ID (e.g., sarah.jpg, alex.png)')
    console.log('3. Use the paths below in Prisma Studio')
  } else {
    imageFiles.forEach(file => {
      const staffId = path.parse(file).name
      const imagePath = `/images/staff/${file}`
      console.log(`🔹 ${file} → Staff ID: "${staffId}" → Path: "${imagePath}"`)
    })
  }
  
  console.log('\n🔧 Prisma Studio Usage:')
  console.log('1. Open http://localhost:5555')
  console.log('2. Go to Staff table')
  console.log('3. Edit staff member')
  console.log('4. Add image path from above list')
  console.log('=' .repeat(50))
}

// Function to rename image for staff ID
function renameImageForStaff(currentName, staffId) {
  const currentPath = path.join(STAFF_IMAGE_DIR, currentName)
  const extension = path.extname(currentName)
  const newName = `${staffId}${extension}`
  const newPath = path.join(STAFF_IMAGE_DIR, newName)
  
  if (!fs.existsSync(currentPath)) {
    console.log(`❌ File not found: ${currentName}`)
    return false
  }
  
  fs.renameSync(currentPath, newPath)
  console.log(`✅ Renamed: ${currentName} → ${newName}`)
  console.log(`📝 Use this path in Prisma Studio: /images/staff/${newName}`)
  return true
}

// Main execution
console.log('🎨 Staff Image Manager for Prisma Studio')
listStaffImages()

// Export functions for use in other scripts
module.exports = {
  listStaffImages,
  renameImageForStaff,
  STAFF_IMAGE_DIR
}
