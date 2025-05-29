'use client'

import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'
import Image from 'next/image'
import { FiUser, FiShoppingCart, FiHeart, FiSettings, FiLogOut, FiTrash2, FiShoppingBag } from 'react-icons/fi'

export default function Favorites() {
  const { user, signOut } = useAuth()
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      name: 'Smartphone XYZ Pro Max',
      price: 299.99,
      rating: 4.8,
      reviews: 245,
      image: '/images/placeholder.jpg'
    },
    {
      id: 2,
      name: 'Auriculares Bluetooth Premium',
      price: 89.99,
      rating: 4.5,
      reviews: 187,
      image: '/images/placeholder.jpg'
    },
    {
      id: 3,
      name: 'Smartwatch Serie 5',
      price: 159.99,
      rating: 4.7,
      reviews: 132,
      image: '/images/placeholder.jpg'
    }
  ])

  const removeFavorite = (id) => {
    setFavorites(favorites.filter(item => item.id !== id))
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
              className="flex items-center p-3 bg-[#FFF3E0] text-[#E65100] rounded-md"
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
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Mis favoritos</h2>
            <p className="text-gray-500">{favorites.length} productos</p>
          </div>
          
          {favorites.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map((item) => (
                <div key={item.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200">
                  <div className="h-48 bg-gray-200 relative">
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                      <FiShoppingBag size={48} />
                    </div>
                    <button 
                      onClick={() => removeFavorite(item.id)}
                      className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200"
                      title="Eliminar de favoritos"
                    >
                      <FiTrash2 className="text-red-500" />
                    </button>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-medium text-gray-800 mb-2">{item.name}</h3>
                    <p className="text-[#E65100] font-bold mb-2">{item.price.toFixed(2)} €</p>
                    
                    <div className="flex items-center mb-3">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${i < Math.floor(item.rating) ? 'fill-current' : 'stroke-current fill-none'}`} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 ml-1">({item.reviews})</span>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Link 
                        href={`/products/${item.id}`}
                        className="flex-1 bg-[#E65100] text-white text-center py-2 rounded hover:bg-[#D84315] transition-colors duration-200"
                      >
                        Ver detalles
                      </Link>
                      <button 
                        className="flex-1 border border-[#E65100] text-[#E65100] py-2 rounded hover:bg-[#FFF3E0] transition-colors duration-200"
                      >
                        Añadir al carrito
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 p-8 rounded-md text-center">
              <FiHeart className="mx-auto text-4xl text-gray-400 mb-4" />
              <h3 className="text-xl font-medium text-gray-700 mb-2">No tienes favoritos</h3>
              <p className="text-gray-500 mb-4">Añade productos a tus favoritos para verlos aquí.</p>
              <Link 
                href="/"
                className="inline-block bg-[#E65100] text-white px-4 py-2 rounded hover:bg-[#D84315] transition-colors duration-200"
              >
                Explorar productos
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}