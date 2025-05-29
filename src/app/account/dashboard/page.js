'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'
import { FiUser, FiShoppingCart, FiHeart, FiSettings, FiLogOut } from 'react-icons/fi'

export default function Dashboard() {
  const { user, signOut } = useAuth()
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Cargar datos del usuario
    if (user) {
      setUserData({
        email: user.email,
        name: user.user_metadata?.full_name || 'Usuario',
        createdAt: new Date(user.created_at).toLocaleDateString(),
      })
    }
    setLoading(false)
  }, [user])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#E65100]"></div>
        </div>
      </div>
    )
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
              className="flex items-center p-3 bg-[#FFF3E0] text-[#E65100] rounded-md"
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
              className="flex items-center p-3 hover:bg-gray-100 rounded-md transition-colors duration-200"
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
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Información de la cuenta</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="text-lg font-medium text-gray-700 mb-2">Perfil</h3>
              <div className="space-y-2">
                <p><span className="font-medium">Nombre:</span> {userData?.name}</p>
                <p><span className="font-medium">Email:</span> {userData?.email}</p>
                <p><span className="font-medium">Miembro desde:</span> {userData?.createdAt}</p>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="text-lg font-medium text-gray-700 mb-2">Actividad reciente</h3>
              <div className="space-y-2">
                <p>No hay actividad reciente</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-700 mb-2">Acciones rápidas</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link 
                href="/account/orders"
                className="bg-[#FFF3E0] hover:bg-[#FFE0B2] text-[#E65100] p-4 rounded-md transition-colors duration-200 flex flex-col items-center justify-center text-center"
              >
                <FiShoppingCart className="text-2xl mb-2" />
                <span>Ver mis pedidos</span>
              </Link>
              <Link 
                href="/account/favorites"
                className="bg-[#FFF3E0] hover:bg-[#FFE0B2] text-[#E65100] p-4 rounded-md transition-colors duration-200 flex flex-col items-center justify-center text-center"
              >
                <FiHeart className="text-2xl mb-2" />
                <span>Ver favoritos</span>
              </Link>
              <Link 
                href="/account/settings"
                className="bg-[#FFF3E0] hover:bg-[#FFE0B2] text-[#E65100] p-4 rounded-md transition-colors duration-200 flex flex-col items-center justify-center text-center"
              >
                <FiSettings className="text-2xl mb-2" />
                <span>Editar perfil</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}