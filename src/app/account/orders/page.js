'use client'

import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'
import Image from 'next/image'
import { FiUser, FiShoppingCart, FiHeart, FiSettings, FiLogOut, FiChevronRight } from 'react-icons/fi'

export default function Orders() {
  const { user, signOut } = useAuth()
  const [orders, setOrders] = useState([
    {
      id: 'ORD-12345',
      date: '15/05/2023',
      status: 'Entregado',
      total: 129.99,
      items: [
        {
          id: 1,
          name: 'Smartphone XYZ',
          price: 99.99,
          quantity: 1,
          image: '/images/placeholder.jpg'
        },
        {
          id: 2,
          name: 'Funda protectora',
          price: 15.00,
          quantity: 2,
          image: '/images/placeholder.jpg'
        }
      ]
    },
    {
      id: 'ORD-67890',
      date: '03/04/2023',
      status: 'Entregado',
      total: 45.50,
      items: [
        {
          id: 3,
          name: 'Auriculares Bluetooth',
          price: 45.50,
          quantity: 1,
          image: '/images/placeholder.jpg'
        }
      ]
    }
  ])

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
              className="flex items-center p-3 bg-[#FFF3E0] text-[#E65100] rounded-md"
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
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Mis pedidos</h2>
          
          {orders.length > 0 ? (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="border rounded-lg overflow-hidden">
                  <div className="bg-gray-50 p-4 flex justify-between items-center">
                    <div>
                      <p className="font-medium text-gray-800">Pedido #{order.id}</p>
                      <p className="text-sm text-gray-700">Fecha: {order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-800">Total: {order.total.toFixed(2)} €</p>
                      <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                        {order.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-medium mb-2 text-gray-800">Productos</h3>
                    <div className="space-y-4">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center">
                          <div className="w-16 h-16 bg-gray-200 rounded-md overflow-hidden relative flex-shrink-0">
                            <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                              <FiShoppingCart size={24} />
                            </div>
                          </div>
                          <div className="ml-4 flex-grow">
                            <p className="font-medium text-gray-800">{item.name}</p>
                            <p className="text-sm text-gray-700">
                              {item.quantity} x {item.price.toFixed(2)} €
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-gray-800">{(item.quantity * item.price).toFixed(2)} €</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 flex justify-end">
                    <Link 
                      href={`/account/orders/${order.id}`}
                      className="flex items-center text-[#E65100] hover:text-[#D84315] transition-colors duration-200"
                    >
                      Ver detalles <FiChevronRight className="ml-1" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 p-8 rounded-md text-center">
              <FiShoppingCart className="mx-auto text-4xl text-gray-400 mb-4" />
              <h3 className="text-xl font-medium text-gray-700 mb-2">No tienes pedidos</h3>
              <p className="text-gray-500 mb-4">Parece que aún no has realizado ningún pedido.</p>
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