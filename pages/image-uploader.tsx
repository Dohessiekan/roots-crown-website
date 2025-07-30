import { useState, useEffect } from 'react'
import Head from 'next/head'

interface StaffMember {
  id: string
  name: string
  email: string
  image?: string
}

interface ImageInfo {
  filename: string
  staffId: string
  imagePath: string
  size: number
  lastModified: string
}

export default function ImageUploader() {
  const [staff, setStaff] = useState<StaffMember[]>([])
  const [images, setImages] = useState<ImageInfo[]>([])
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [selectedStaffId, setSelectedStaffId] = useState('')
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchStaff()
    fetchImages()
  }, [])

  const fetchStaff = async () => {
    try {
      const response = await fetch('/api/staff/all')
      const data = await response.json()
      setStaff(data)
    } catch (error) {
      console.error('Error fetching staff:', error)
    }
  }

  const fetchImages = async () => {
    try {
      const response = await fetch('/api/images/list')
      const data = await response.json()
      setImages(data.images || [])
    } catch (error) {
      console.error('Error fetching images:', error)
    }
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedFile || !selectedStaffId) {
      setMessage('Please select both a file and a staff member')
      return
    }

    setUploading(true)
    setMessage('')

    try {
      const formData = new FormData()
      formData.append('image', selectedFile)
      formData.append('staffId', selectedStaffId)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      const result = await response.json()

      if (response.ok) {
        setMessage(`✅ Image uploaded successfully! Path: ${result.imagePath}`)
        setSelectedFile(null)
        setSelectedStaffId('')
        fetchImages()
        
        // Show instructions for Prisma Studio
        setTimeout(() => {
          setMessage(`✅ Upload complete! Now go to Prisma Studio:
1. Open http://localhost:5555
2. Go to Staff table
3. Find staff member "${selectedStaffId}"
4. Edit their record
5. Add this path to image field: ${result.imagePath}`)
        }, 1000)
      } else {
        setMessage(`❌ Upload failed: ${result.message}`)
      }
    } catch (error) {
      setMessage(`❌ Upload error: ${error}`)
    } finally {
      setUploading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setMessage(`📋 Copied to clipboard: ${text}`)
  }

  return (
    <>
      <Head>
        <title>Staff Image Uploader - Prisma Studio Helper</title>
      </Head>
      
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Staff Image Uploader
            </h1>
            <p className="text-gray-600 mb-6">
              Upload images for staff members, then use the paths in Prisma Studio
            </p>

            {/* Upload Form */}
            <form onSubmit={handleUpload} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Staff Member
                  </label>
                  <select
                    value={selectedStaffId}
                    onChange={(e) => setSelectedStaffId(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Choose a staff member...</option>
                    {staff.map(person => (
                      <option key={person.id} value={person.id}>
                        {person.id} - {person.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Image File
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  {selectedFile && (
                    <p className="text-sm text-green-600 mt-1">
                      Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                    </p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={uploading || !selectedFile || !selectedStaffId}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {uploading ? 'Uploading...' : 'Upload Image'}
              </button>
            </form>

            {message && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
                <pre className="text-sm text-blue-800 whitespace-pre-wrap">{message}</pre>
              </div>
            )}
          </div>

          {/* Current Images */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Current Staff Images</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {images.map(image => (
                <div key={image.filename} className="border border-gray-200 rounded-lg p-4">
                  <div className="mb-3">
                    <img 
                      src={image.imagePath} 
                      alt={`Staff ${image.staffId}`}
                      className="w-full h-32 object-cover rounded-md"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-900">Staff ID: {image.staffId}</h3>
                    <p className="text-sm text-gray-600">File: {image.filename}</p>
                    
                    <div className="bg-gray-50 p-2 rounded text-xs font-mono">
                      {image.imagePath}
                    </div>
                    
                    <button
                      onClick={() => copyToClipboard(image.imagePath)}
                      className="w-full bg-green-600 text-white py-1 px-3 rounded text-sm hover:bg-green-700"
                    >
                      📋 Copy Path for Prisma Studio
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {images.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>No staff images uploaded yet.</p>
                <p className="text-sm">Use the form above to upload your first image!</p>
              </div>
            )}
          </div>

          {/* Instructions */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mt-8">
            <h3 className="text-lg font-semibold text-yellow-800 mb-3">
              📋 How to use with Prisma Studio:
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-yellow-700">
              <li>Upload an image using the form above</li>
              <li>Copy the image path (e.g., <code>/images/staff/sarah.jpg</code>)</li>
              <li>Open Prisma Studio at <a href="http://localhost:5555" target="_blank" className="underline">http://localhost:5555</a></li>
              <li>Go to the <strong>Staff</strong> table</li>
              <li>Find your staff member and click <strong>Edit</strong></li>
              <li>Paste the image path into the <strong>image</strong> field</li>
              <li>Click <strong>Save</strong></li>
              <li>✅ The image will now appear on your booking pages!</li>
            </ol>
          </div>
        </div>
      </div>
    </>
  )
}
