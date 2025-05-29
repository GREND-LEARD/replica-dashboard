'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FiSearch, FiShoppingCart, FiUser, FiHeart, FiMenu, FiBell } from 'react-icons/fi'

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    // Implementar búsqueda
    console.log('Búsqueda:', searchQuery)
  }

  return (
    <header className="bg-red-600 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-white p-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <FiMenu className="h-6 w-6" />
          </button>

          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-shrink-0 mr-4"
          >
            <Link href="/" className="flex items-center">
              <Image src="/logo.png" alt="RepliTemu Logo" width={40} height={40} className="mr-2" />
              <span className="font-bold text-xl hidden sm:inline">RepliTemu</span>
            </Link>
          </motion.div>

          {/* Search bar */}
          <motion.form 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex-grow max-w-3xl mx-4 relative"
            onSubmit={handleSearchSubmit}
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar en RepliTemu..."
                className="w-full py-2 pl-4 pr-10 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-300"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <button
                type="submit"
                className="absolute right-0 top-0 h-full px-3 text-gray-600 hover:text-orange-500 transition-colors duration-200"
              >
                <FiSearch className="h-5 w-5" />
              </button>
            </div>
          </motion.form>

          {/* Navigation Icons */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center space-x-4"
          >
            <Link href="/login" className="hidden sm:flex flex-col items-center text-xs hover:text-orange-200 transition-colors duration-200">
              <FiUser className="h-6 w-6 mb-1" />
              <span>Cuenta</span>
            </Link>
            <Link href="/favorites" className="hidden sm:flex flex-col items-center text-xs hover:text-orange-200 transition-colors duration-200">
              <FiHeart className="h-6 w-6 mb-1" />
              <span>Favoritos</span>
            </Link>
            <Link href="/notifications" className="hidden sm:flex flex-col items-center text-xs hover:text-orange-200 transition-colors duration-200">
              <div className="relative">
                <FiBell className="h-6 w-6 mb-1" />
                <span className="absolute -top-1 -right-1 bg-yellow-400 text-xs text-gray-800 font-bold rounded-full h-4 w-4 flex items-center justify-center">3</span>
              </div>
              <span>Alertas</span>
            </Link>
            <Link href="/cart" className="flex flex-col items-center text-xs hover:text-orange-200 transition-colors duration-200">
              <div className="relative">
                <FiShoppingCart className="h-6 w-6 mb-1" />
                <span className="absolute -top-1 -right-1 bg-yellow-400 text-xs text-gray-800 font-bold rounded-full h-4 w-4 flex items-center justify-center">2</span>
              </div>
              <span>Carrito</span>
            </Link>
          </motion.div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-3 py-2 border-t border-red-500"
          >
            <nav className="flex flex-col space-y-2">
              <Link href="/login" className="flex items-center space-x-2 p-2 hover:bg-red-700 rounded-md transition-colors duration-200">
                <FiUser className="h-5 w-5" />
                <span>Mi Cuenta</span>
              </Link>
              <Link href="/favorites" className="flex items-center space-x-2 p-2 hover:bg-red-700 rounded-md transition-colors duration-200">
                <FiHeart className="h-5 w-5" />
                <span>Mis Favoritos</span>
              </Link>
              <Link href="/notifications" className="flex items-center space-x-2 p-2 hover:bg-red-700 rounded-md transition-colors duration-200">
                <FiBell className="h-5 w-5" />
                <span>Notificaciones</span>
                <span className="ml-auto bg-yellow-400 text-xs text-gray-800 font-bold rounded-full h-5 w-5 flex items-center justify-center">3</span>
              </Link>
              <Link href="/orders" className="flex items-center space-x-2 p-2 hover:bg-red-700 rounded-md transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span>Mis Pedidos</span>
              </Link>
            </nav>
          </motion.div>
        )}
      </div>

      {/* Promotional bar */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-yellow-400 text-gray-800 text-center text-sm py-1.5 px-4 font-medium"
      >
        🔥 ¡Ofertas Black Friday! Hasta 80% de descuento + Envío GRATIS en pedidos +$25 🔥
      </motion.div>
    </header>
  )
}