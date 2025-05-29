'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'
import { FiUser, FiShoppingCart, FiHeart, FiSettings, FiLogOut, FiSave, FiAlertCircle } from 'react-icons/fi'

export default function Settings() {
  const { user, signOut, updateProfile } = useAuth()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'España'
  })
  const [message, setMessage] = useState({ text: '', type: '' })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.user_metadata?.full_name || '',
        email: user.email || '',
        phone: user.user_metadata?.phone || '',
        address: user.user_metadata?.address || '',
        city: user.user_metadata?.city || '',
        postalCode: user.user_metadata?.postal_code || '',
        country: user.user_metadata?.country || 'España'
      })
    }
  }, [user])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage({ text: '', type: '' })

    try {
      await updateProfile({
        data: {
          full_name: formData.fullName,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          postal_code: formData.postalCode,
          country: formData.country
        }
      })

      setMessage({
        text: 'Perfil actualizado correctamente',
        type: 'success'
      })
    } catch (error) {
      console.error('Error al actualizar perfil:', error)
      setMessage({
        text: 'Error al actualizar el perfil. Inténtalo de nuevo.',
        type: 'error'
      })
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Acceso no autorizado</h1>
          <p className="text-gray-600 mb-4">Debes iniciar sesión para acceder a esta página.</p>
          <Link 
            href="/login"
            className="bg-[#E65100] text-white px-4 py-2 rounded hover:bg-[#D84315] transition-colors duration-200"
          >
            Iniciar sesión
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Mi cuenta</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar de navegación */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex flex-col space-y-2">
            <Link 
              href="/account/dashboard"
              className="flex items-center p-3 hover:bg-gray-100 rounded-md transition-colors duration-200"
            >
              <FiUser className="mr-2" /> Dashboard
            </Link>
            <Link 
              href="/account/orders"
              className="flex items-center p-3 hover:bg-gray-100 rounded-md transition-colors duration-200"
            >
              <FiShoppingCart className="mr-2" /> Mis pedidos
            </Link>
            <Link 
              href="/account/favorites"
              className="flex items-center p-3 hover:bg-gray-100 rounded-md transition-colors duration-200"
            >
              <FiHeart className="mr-2" /> Favoritos
            </Link>
            <Link 
              href="/account/settings"
              className="flex items-center p-3 bg-[#FFF3E0] text-[#E65100] rounded-md"
            >
              <FiSettings className="mr-2" /> Configuración
            </Link>
            <button 
              onClick={signOut}
              className="flex items-center p-3 hover:bg-gray-100 rounded-md transition-colors duration-200 text-red-600"
            >
              <FiLogOut className="mr-2" /> Cerrar sesión
            </button>
          </div>
        </div>
        
        {/* Contenido principal */}
        <div className="bg-white rounded-lg shadow-md p-6 md:col-span-3">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Configuración de la cuenta</h2>
          
          {message.text && (
            <div className={`p-4 mb-6 rounded-md ${
              message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              <div className="flex items-center">
                <FiAlertCircle className="mr-2" />
                {message.text}
              </div>
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre completo
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E65100] focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                />
                <p className="text-xs text-gray-500 mt-1">El email no se puede cambiar</p>
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Teléfono
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E65100] focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Dirección
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E65100] focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                  Ciudad
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E65100] focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                  Código postal
                </label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E65100] focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                  País
                </label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E65100] focus:border-transparent"
                >
                  <option value="España">España</option>
                  <option value="Portugal">Portugal</option>
                  <option value="Francia">Francia</option>
                  <option value="Italia">Italia</option>
                  <option value="Alemania">Alemania</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center bg-[#E65100] text-white px-6 py-2 rounded hover:bg-[#D84315] transition-colors duration-200 disabled:bg-gray-400"
              >
                {loading ? (
                  <>
                    <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></span>
                    Guardando...
                  </>
                ) : (
                  <>
                    <FiSave className="mr-2" /> Guardar cambios
                  </>
                )}
              </button>
            </div>
          </form>
          
          <div className="mt-12 border-t pt-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Cambiar contraseña</h3>
            <p className="text-gray-600 mb-4">
              Para cambiar tu contraseña, primero debes cerrar sesión y usar la opción "¿Olvidaste tu contraseña?" en la página de inicio de sesión.
            </p>
            <button 
              onClick={signOut}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition-colors duration-200"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}