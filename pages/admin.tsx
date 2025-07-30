import { useState, useEffect } from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

interface Category {
  id: string
  name: string
  slug: string
  description: string
  icon: string
}

interface Service {
  id: string
  name: string
  slug: string
  description: string
  price: string
  duration: string
  categoryId: string
  category: Category
}

interface Staff {
  id: string
  name: string
  title: string
  email: string
  phone: string
  image?: string
  specialties: string
  isActive: boolean
}

interface Booking {
  id: string
  bookingId: string
  customerName: string
  customerEmail: string
  staffName: string
  service: Service
  appointmentDate: string
  appointmentTime: string
  status: string
  totalPrice: string
}

const AdminDashboard: NextPage = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [categories, setCategories] = useState<Category[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [staff, setStaff] = useState<Staff[]>([])
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)

  // Forms state
  const [newCategory, setNewCategory] = useState({ id: '', name: '', description: '', icon: '' })
  const [newService, setNewService] = useState({ id: '', name: '', description: '', price: '', duration: '', categoryId: '' })
  const [newStaff, setNewStaff] = useState({ id: '', name: '', title: '', email: '', phone: '', specialties: '' })
  
  // Image upload state
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [categoriesRes, servicesRes, staffRes, bookingsRes] = await Promise.all([
        fetch('/api/categories'),
        fetch('/api/services/all'),
        fetch('/api/staff/all'),
        fetch('/api/bookings')
      ])

      setCategories(await categoriesRes.json())
      setServices(await servicesRes.json())
      setStaff(await staffRes.json())
      setBookings(await bookingsRes.json())
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const addCategory = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newCategory,
          slug: newCategory.name.toLowerCase().replace(/\s+/g, '-')
        })
      })
      if (response.ok) {
        setNewCategory({ id: '', name: '', description: '', icon: '' })
        fetchData()
        alert('Category added successfully!')
      }
    } catch (error) {
      alert('Error adding category')
    }
  }

  const addService = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newService,
          slug: newService.name.toLowerCase().replace(/\s+/g, '-')
        })
      })
      if (response.ok) {
        setNewService({ id: '', name: '', description: '', price: '', duration: '', categoryId: '' })
        fetchData()
        alert('Service added successfully!')
      }
    } catch (error) {
      alert('Error adding service')
    }
  }

  const uploadImage = async (staffId: string): Promise<string> => {
    if (!selectedImage) return ''
    
    const formData = new FormData()
    formData.append('image', selectedImage)
    formData.append('staffId', staffId)
    
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    })
    
    if (response.ok) {
      const result = await response.json()
      return result.imagePath
    }
    
    throw new Error('Image upload failed')
  }

  const addStaff = async (e: React.FormEvent) => {
    e.preventDefault()
    setUploading(true)
    
    try {
      let imagePath = ''
      
      // Upload image first if selected
      if (selectedImage) {
        imagePath = await uploadImage(newStaff.id)
      }
      
      const response = await fetch('/api/staff', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newStaff,
          bio: `${newStaff.title} with expertise in ${newStaff.specialties}`,
          image: imagePath,
          specialties: JSON.stringify(newStaff.specialties.split(',').map(s => s.trim()))
        })
      })
      
      if (response.ok) {
        setNewStaff({ id: '', name: '', title: '', email: '', phone: '', specialties: '' })
        setSelectedImage(null)
        fetchData()
        alert('Staff member added successfully!')
      }
    } catch (error) {
      alert('Error adding staff member: ' + error)
    } finally {
      setUploading(false)
    }
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <>
      <Head>
        <title>Admin Dashboard - Roots Crown</title>
      </Head>
      <Navbar />
      
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
          
          {/* Navigation Tabs */}
          <div className="border-b border-gray-200 mb-8">
            <nav className="-mb-px flex space-x-8">
              {['overview', 'categories', 'services', 'staff', 'bookings'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                    activeTab === tab
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-900">Categories</h3>
                <p className="text-3xl font-bold text-purple-600">{categories.length}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-900">Services</h3>
                <p className="text-3xl font-bold text-blue-600">{services.length}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-900">Staff</h3>
                <p className="text-3xl font-bold text-green-600">{staff.length}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-900">Bookings</h3>
                <p className="text-3xl font-bold text-orange-600">{bookings.length}</p>
              </div>
            </div>
          )}

          {/* Categories Tab */}
          {activeTab === 'categories' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Add Category Form */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Add New Category</h2>
                <form onSubmit={addCategory} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">ID (simple name)</label>
                    <input
                      type="text"
                      value={newCategory.id}
                      onChange={(e) => setNewCategory({...newCategory, id: e.target.value})}
                      placeholder="e.g., spa, tattoo, piercing"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      value={newCategory.name}
                      onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                      placeholder="e.g., Spa Services"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      value={newCategory.description}
                      onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
                      placeholder="Describe the category"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Icon Path</label>
                    <input
                      type="text"
                      value={newCategory.icon}
                      onChange={(e) => setNewCategory({...newCategory, icon: e.target.value})}
                      placeholder="/images/spaIcon.svg"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700"
                  >
                    Add Category
                  </button>
                </form>
              </div>

              {/* Categories List */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Existing Categories</h2>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <div key={category.id} className="border-l-4 border-purple-500 pl-4 py-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">ID: {category.id}</h3>
                          <p className="text-gray-900">{category.name}</p>
                          <p className="text-sm text-gray-600">{category.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Services Tab */}
          {activeTab === 'services' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Add Service Form */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Add New Service</h2>
                <form onSubmit={addService} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">ID (simple name)</label>
                    <input
                      type="text"
                      value={newService.id}
                      onChange={(e) => setNewService({...newService, id: e.target.value})}
                      placeholder="e.g., hotstone, aromatherapy"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      value={newService.name}
                      onChange={(e) => setNewService({...newService, name: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <select
                      value={newService.categoryId}
                      onChange={(e) => setNewService({...newService, categoryId: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                      required
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name} (ID: {category.id})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      value={newService.description}
                      onChange={(e) => setNewService({...newService, description: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                      rows={3}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Price</label>
                      <input
                        type="text"
                        value={newService.price}
                        onChange={(e) => setNewService({...newService, price: e.target.value})}
                        placeholder="From $75"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Duration</label>
                      <input
                        type="text"
                        value={newService.duration}
                        onChange={(e) => setNewService({...newService, duration: e.target.value})}
                        placeholder="60 min"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                        required
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                  >
                    Add Service
                  </button>
                </form>
              </div>

              {/* Services List */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Existing Services</h2>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {services.map((service) => (
                    <div key={service.id} className="border-l-4 border-blue-500 pl-4 py-2">
                      <h3 className="font-semibold">ID: {service.id}</h3>
                      <p className="text-gray-900">{service.name}</p>
                      <p className="text-sm text-gray-600">Category: {service.category?.name}</p>
                      <p className="text-sm text-purple-600">{service.price} • {service.duration}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Staff Tab */}
          {activeTab === 'staff' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Add Staff Form */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Add New Staff Member</h2>
                <form onSubmit={addStaff} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">ID (first name lowercase)</label>
                    <input
                      type="text"
                      value={newStaff.id}
                      onChange={(e) => setNewStaff({...newStaff, id: e.target.value})}
                      placeholder="e.g., john, mary, alex"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                      type="text"
                      value={newStaff.name}
                      onChange={(e) => setNewStaff({...newStaff, name: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                      type="text"
                      value={newStaff.title}
                      onChange={(e) => setNewStaff({...newStaff, title: e.target.value})}
                      placeholder="Senior Hair Stylist"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      value={newStaff.email}
                      onChange={(e) => setNewStaff({...newStaff, email: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                      type="tel"
                      value={newStaff.phone}
                      onChange={(e) => setNewStaff({...newStaff, phone: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Profile Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setSelectedImage(e.target.files?.[0] || null)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                    />
                    {selectedImage && (
                      <p className="text-sm text-green-600 mt-1">
                        Selected: {selectedImage.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Specialties (comma-separated)</label>
                    <input
                      type="text"
                      value={newStaff.specialties}
                      onChange={(e) => setNewStaff({...newStaff, specialties: e.target.value})}
                      placeholder="Hair Cutting, Hair Coloring, Styling"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={uploading}
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:bg-gray-400"
                  >
                    {uploading ? 'Adding Staff & Uploading Image...' : 'Add Staff Member'}
                  </button>
                </form>
              </div>

              {/* Staff List */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Existing Staff</h2>
                <div className="space-y-3">
                  {staff.map((person) => (
                    <div key={person.id} className="border-l-4 border-green-500 pl-4 py-2 flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        {person.image ? (
                          <img 
                            src={person.image} 
                            alt={person.name}
                            className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                            <span className="text-gray-600 text-xs">No Image</span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">ID: {person.id}</h3>
                        <p className="text-gray-900">{person.name}</p>
                        <p className="text-sm text-gray-600">{person.title}</p>
                        <p className="text-sm text-blue-600">{person.email}</p>
                        <p className="text-sm text-gray-500">
                          {JSON.parse(person.specialties || '[]').join(', ')}
                        </p>
                        {person.image && (
                          <p className="text-xs text-green-600">✓ Profile image uploaded</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Bookings Tab */}
          {activeTab === 'bookings' && (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold">Recent Bookings</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Booking ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Service
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Staff
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date & Time
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {bookings.map((booking) => (
                      <tr key={booking.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {booking.bookingId}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{booking.customerName}</div>
                          <div className="text-sm text-gray-500">{booking.customerEmail}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {booking.service?.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {booking.staffName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(booking.appointmentDate).toLocaleDateString()} at {booking.appointmentTime}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            booking.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' :
                            booking.status === 'COMPLETED' ? 'bg-blue-100 text-blue-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {booking.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </>
  )
}

export default AdminDashboard
