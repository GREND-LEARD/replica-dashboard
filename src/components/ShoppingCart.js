'use client'

import { useState, useEffect } from 'react'
import { FiX, FiPlus, FiMinus, FiTrash2, FiShoppingBag } from 'react-icons/fi'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'

export default function ShoppingCart({ onClose }) {
  const { user } = useAuth()
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Smartphone XYZ Pro',
      price: 199.99,
      quantity: 1,
      image: '/images/placeholder.jpg'
    },
    {
      id: 2,
      name: 'Auriculares Bluetooth',
      price: 49.99,
      quantity: 2,
      image: '/images/placeholder.jpg'
    }
  ])

  // Calcular el total del carrito
  const cartTotal = cartItems.reduce((total, item) => {
    return total + (item.price * item.quantity)
  }, 0)

  // Incrementar cantidad
  const increaseQuantity = (id) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ))
  }

  // Decrementar cantidad
  const decreaseQuantity = (id) => {
    setCartItems(cartItems.map(item => 
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    ))
  }

  // Eliminar producto
  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id))
  }

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(cartItems))
    }
  }, [cartItems])

  // Cargar carrito desde localStorage al iniciar
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart')
      if (savedCart) {
        try {
          setCartItems(JSON.parse(savedCart))
        } catch (error) {
          console.error('Error al cargar el carrito:', error)
        }
      }
    }
  }, [])

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Panel del carrito */}
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="relative w-screen max-w-md">
          <div className="h-full flex flex-col bg-white shadow-xl overflow-y-auto">
            {/* Cabecera */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#E65100] text-white">
              <h2 className="text-lg font-medium">Tu carrito</h2>
              <button 
                onClick={onClose}
                className="text-white hover:text-gray-200 transition-colors duration-200"
              >
                <FiX size={24} />
              </button>
            </div>
            
            {/* Contenido */}
            <div className="flex-1 px-4 py-6 sm:px-6">
              {cartItems.length > 0 ? (
                <div className="flow-root">
                  <ul className="-my-6 divide-y divide-gray-200">
                    {cartItems.map((item) => (
                      <li key={item.id} className="py-6 flex">
                        {/* Imagen del producto */}
                        <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden relative">
                          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400">
                            <FiShoppingBag size={24} />
                          </div>
                        </div>
                        
                        {/* Detalles del producto */}
                        <div className="ml-4 flex-1 flex flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>{item.name}</h3>
                              <p className="ml-4">{(item.price * item.quantity).toFixed(2)} €</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">{item.price.toFixed(2)} € / unidad</p>
                          </div>
                          
                          <div className="flex-1 flex items-end justify-between text-sm">
                            {/* Control de cantidad */}
                            <div className="flex items-center border rounded-md">
                              <button 
                                onClick={() => decreaseQuantity(item.id)}
                                className="px-2 py-1 text-gray-600 hover:text-[#E65100] transition-colors duration-200"
                              >
                                <FiMinus size={16} />
                              </button>
                              <span className="px-2 py-1 text-gray-900">{item.quantity}</span>
                              <button 
                                onClick={() => increaseQuantity(item.id)}
                                className="px-2 py-1 text-gray-600 hover:text-[#E65100] transition-colors duration-200"
                              >
                                <FiPlus size={16} />
                              </button>
                            </div>
                            
                            {/* Botón eliminar */}
                            <button 
                              onClick={() => removeItem(item.id)}
                              className="text-red-500 hover:text-red-700 transition-colors duration-200"
                            >
                              <FiTrash2 size={18} />
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="text-center py-12">
                  <FiShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-lg font-medium text-gray-900">Tu carrito está vacío</h3>
                  <p className="mt-1 text-sm text-gray-500">Comienza a añadir productos a tu carrito</p>
                  <div className="mt-6">
                    <Link 
                      href="/"
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#E65100] hover:bg-[#D84315] transition-colors duration-200"
                      onClick={onClose}
                    >
                      Continuar comprando
                    </Link>
                  </div>
                </div>
              )}
            </div>
            
            {/* Pie del carrito */}
            {cartItems.length > 0 && (
              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                  <p>Subtotal</p>
                  <p>{cartTotal.toFixed(2)} €</p>
                </div>
                <p className="text-sm text-gray-500 mb-4">Envío y impuestos calculados al finalizar la compra.</p>
                <div className="grid grid-cols-2 gap-3">
                  <Link 
                    href="/checkout"
                    className="flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-[#E65100] hover:bg-[#D84315] transition-colors duration-200"
                    onClick={onClose}
                  >
                    Finalizar compra
                  </Link>
                  <button 
                    onClick={onClose}
                    className="flex justify-center items-center px-6 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
                  >
                    Seguir comprando
                  </button>
                </div>
                
                {!user && (
                  <div className="mt-6 text-center text-sm text-gray-500">
                    <p>
                      ¿Tienes una cuenta?{' '}
                      <Link 
                        href="/login"
                        className="text-[#E65100] hover:text-[#D84315] transition-colors duration-200"
                        onClick={onClose}
                      >
                        Inicia sesión
                      </Link>
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}