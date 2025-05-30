'use client'

import { useState, useEffect, useCallback } from 'react'
import { FiX, FiPlus, FiMinus, FiTrash2, FiShoppingBag } from 'react-icons/fi'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'

export default function ShoppingCart({ onClose }) {
  const { user } = useAuth()
  const [cartItems, setCartItems] = useState([])

  // Cargar carrito desde localStorage al iniciar
  useEffect(() => {
    const stored = typeof window !== 'undefined' && localStorage.getItem('cart')
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setCartItems(Array.isArray(parsed) ? parsed : [])
      } catch (error) {
        console.error('Carrito inválido:', error)
      }
    }
  }, [])

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(cartItems))
    }
  }, [cartItems])

  const updateQuantity = useCallback((id, delta) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    )
  }, [])

  const removeItem = useCallback(id => {
    setCartItems(prev => prev.filter(item => item.id !== id))
  }, [])

  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
        aria-label="Cerrar carrito"
      />

      {/* Carrito Panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="relative w-screen max-w-md bg-white shadow-xl flex flex-col h-full overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#E65100] text-white">
            <h2 className="text-lg font-semibold">Tu carrito</h2>
            <button onClick={onClose} aria-label="Cerrar carrito">
              <FiX size={24} />
            </button>
          </div>

          {/* Contenido */}
          <div className="flex-1 px-4 py-6 sm:px-6">
            {cartItems.length > 0 ? (
              <ul className="-my-6 divide-y divide-gray-200">
                {cartItems.map(item => (
                  <li key={item.id} className="py-6 flex gap-4">
                    <div className="w-24 h-24 bg-gray-100 rounded-md flex items-center justify-center border">
                      <FiShoppingBag size={24} className="text-gray-400" />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between text-base text-gray-900 font-medium">
                        <h3 className="truncate">{item.name}</h3>
                        <span>{(item.price * item.quantity).toFixed(2)} €</span>
                      </div>
                      <p className="text-sm text-gray-500">{item.price.toFixed(2)} € / unidad</p>

                      <div className="flex justify-between items-center mt-2 text-sm">
                        <div className="flex items-center border rounded overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="px-2 py-1 text-gray-600 hover:text-[#E65100] transition"
                            aria-label="Disminuir cantidad"
                          >
                            <FiMinus />
                          </button>
                          <span className="px-3">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="px-2 py-1 text-gray-600 hover:text-[#E65100] transition"
                            aria-label="Aumentar cantidad"
                          >
                            <FiPlus />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 transition"
                          aria-label="Eliminar producto"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-16">
                <FiShoppingBag className="mx-auto text-gray-400" size={48} />
                <h3 className="text-lg font-medium text-gray-900 mt-4">Tu carrito está vacío</h3>
                <p className="text-sm text-gray-500 mt-1">Agrega productos para comenzar</p>
                <Link
                  href="/"
                  onClick={onClose}
                  className="inline-block mt-6 px-4 py-2 bg-[#E65100] text-white text-sm font-medium rounded hover:bg-[#D84315] transition"
                >
                  Continuar comprando
                </Link>
              </div>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-t px-4 py-6 sm:px-6">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>{cartTotal.toFixed(2)} €</p>
              </div>
              <p className="text-sm text-gray-500 mt-1 mb-4">Impuestos y envío se calculan al pagar.</p>
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/checkout"
                  onClick={onClose}
                  className="px-4 py-2 bg-[#E65100] text-white font-medium rounded-md text-center hover:bg-[#D84315] transition"
                >
                  Finalizar compra
                </Link>
                <button
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-md hover:bg-gray-100 transition"
                >
                  Seguir comprando
                </button>
              </div>

              {!user && (
                <p className="text-center text-sm text-gray-500 mt-6">
                  ¿Tienes una cuenta?{' '}
                  <Link
                    href="/login"
                    onClick={onClose}
                    className="text-[#E65100] hover:text-[#D84315] transition"
                  >
                    Inicia sesión
                  </Link>
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
// Asegurarse de que el componente se renderice solo en el cliente