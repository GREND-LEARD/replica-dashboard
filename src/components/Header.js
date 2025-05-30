'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FiSearch, FiShoppingCart, FiUser, FiHeart, FiMenu, FiBell, FiChevronDown, FiHelpCircle, FiLogOut } from 'react-icons/fi'
import { useAuth } from '@/context/AuthContext'
import ShoppingCart from './ShoppingCart'

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const [visible, setVisible] = useState(true)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const debounceTimeout = useRef(null)
  
  
  const { user, signOut } = useAuth()

  // Función para manejar el cierre de sesión
  const handleSignOut = async () => {
    try {
      await signOut()
      setIsUserMenuOpen(false)
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    }
  }

  // Función  nombre de usuario para mostrar
  const getUserDisplayName = () => {
    if (!user) return 'Invitado'
    
    // Si el usuario tiene un nombre, mostrarlo
    if (user.user_metadata && user.user_metadata.full_name) {
      return user.user_metadata.full_name
    }
    
    // Si no hay nombre, mostrar el email parcialmente oculto
    if (user.email) {
      const [username, domain] = user.email.split('@')
      if (username.length <= 3) return user.email
      return `${username.substring(0, 1)}***${username.substring(username.length - 2)}`
    }
    
    return 'Usuario'
  }

  // Controlar la visibilidad del header al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY
      
      // Determinar si el usuario está haciendo scroll hacia arriba o hacia abajo
      const isScrollingDown = currentScrollPos > prevScrollPos
      
      // Actualizar la visibilidad basada en la dirección del scroll
      setVisible(!isScrollingDown || currentScrollPos < 10)
      
      // Actualizar el estado de scroll para cambiar el tamaño
      setScrolled(currentScrollPos > 10)
      
      // Guardar la posición actual para la próxima comparación
      setPrevScrollPos(currentScrollPos)
    }

    const debouncedHandleScroll = () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current)
      }
      debounceTimeout.current = setTimeout(() => {
        handleScroll()
      }, 50) // Ajusta el tiempo de debounce si es necesario (50ms es un buen punto de partida)
    }

    window.addEventListener('scroll', debouncedHandleScroll)
    return () => {
      window.removeEventListener('scroll', debouncedHandleScroll)
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current)
      }
    }
  }, [prevScrollPos])

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    // Implementar búsqueda
    console.log('Búsqueda:', searchQuery)
  }

  return (
    <header 
      className={`bg-[#FF6D00] text-white shadow-md sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'py-1' : 'py-2'} ${!visible ? '-translate-y-full' : 'translate-y-0'}`}
    >
      {/* Top navigation bar - Solo visible cuando no hay scroll */}
      {!scrolled && (
        <div className="bg-[#E65100] py-1 px-4">
          <div className="container mx-auto flex items-center justify-between text-sm">
            <div className="flex items-center space-x-6">
              <Link href="/populares" className="flex items-center hover:text-[#FFF0E6] transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                Artículos más vendidos
              </Link>
              <Link href="/5estrellas" className="flex items-center hover:text-[#FFF0E6] transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
                5 estrellas
              </Link>
              <Link href="/nuevo" className="hover:text-[#FFF0E6] transition-colors duration-200">
                Lo nuevo
              </Link>
              <div className="relative group">
                <button className="flex items-center hover:text-[#FFF0E6] transition-colors duration-200">
                  Categorías
                  <FiChevronDown className="ml-1 h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center relative">
                <span className="mr-2">Hola, {getUserDisplayName()}</span>
                <button 
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="hover:text-[#FFF0E6] transition-colors duration-200 flex items-center"
                >
                  {user ? 'Mi cuenta' : 'Iniciar sesión'}
                  <FiChevronDown className="ml-1 h-4 w-4" />
                </button>
                
                {/* Menú desplegable de usuario */}
                {isUserMenuOpen && (
                  <div className="absolute top-full right-0 mt-1 w-48 bg-white rounded-md shadow-lg py-1 z-50 text-gray-800">
                    {user ? (
                      <>
                        <Link 
                          href="/account/dashboard" 
                          className="block px-4 py-2 text-sm hover:bg-gray-100 transition-colors duration-200"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <FiUser className="inline mr-2" /> Dashboard
                        </Link>
                        <Link 
                          href="/account/orders" 
                          className="block px-4 py-2 text-sm hover:bg-gray-100 transition-colors duration-200"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <FiShoppingCart className="inline mr-2" /> Mis pedidos
                        </Link>
                        <button 
                          onClick={handleSignOut}
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors duration-200 text-red-600"
                        >
                          <FiLogOut className="inline mr-2" /> Cerrar sesión
                        </button>
                      </>
                    ) : (
                      <>
                        <Link 
                          href="/login" 
                          className="block px-4 py-2 text-sm hover:bg-gray-100 transition-colors duration-200"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          Iniciar sesión
                        </Link>
                        <Link 
                          href="/registro" 
                          className="block px-4 py-2 text-sm hover:bg-gray-100 transition-colors duration-200"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          Crear cuenta
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>
              <Link href="/help" className="hover:text-[#FFF0E6] transition-colors duration-200 flex items-center">
                <FiHelpCircle className="mr-1 h-4 w-4" />
                Ayuda
              </Link>
              <div className="flex items-center bg-[#FFAB00] text-black px-2 py-0.5 rounded hover:bg-[#FFB300] transition-colors duration-200">
                <span className="font-medium">ES</span>
                <FiChevronDown className="ml-1 h-3 w-3" />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4">
        <div className={`flex items-center justify-between ${scrolled ? 'py-1' : 'py-2'}`}>
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
            className={`flex-shrink-0 mr-4 transition-all duration-300 ${scrolled ? 'scale-90' : ''}`}
          >
            <Link href="/" className="flex items-center">
              <Image src="/temu.jpg" alt="Temu Logo" width={scrolled ? 35 : 40} height={scrolled ? 35 : 40} className="mr-2" />
              <span className={`font-bold text-xl hidden sm:inline transition-all duration-300 ${scrolled ? 'text-lg' : 'text-xl'}`}>RepliTemu</span>
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
                className={`w-full rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#FF5F1F] transition-all duration-300 ${scrolled ? 'py-1.5 pl-3 pr-8 text-sm' : 'py-2 pl-4 pr-10'}`}
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <button
                type="submit"
                className="absolute right-0 top-0 h-full px-3 text-gray-600 hover:text-[#FF5F1F] transition-colors duration-200"
              >
                <FiSearch className={`transition-all duration-300 ${scrolled ? 'h-4 w-4' : 'h-5 w-5'}`} />
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
            <Link href="/login" className="hidden sm:flex flex-col items-center text-xs hover:text-[#FFF0E6] transition-colors duration-200">
              <FiUser className={`transition-all duration-300 ${scrolled ? 'h-5 w-5 mb-0.5' : 'h-6 w-6 mb-1'}`} />
              <span className={`transition-all duration-300 ${scrolled ? 'text-[10px]' : 'text-xs'}`}>Cuenta</span>
            </Link>
            <Link href="/favorites" className="hidden sm:flex flex-col items-center text-xs hover:text-[#FFF0E6] transition-colors duration-200">
              <FiHeart className={`transition-all duration-300 ${scrolled ? 'h-5 w-5 mb-0.5' : 'h-6 w-6 mb-1'}`} />
              <span className={`transition-all duration-300 ${scrolled ? 'text-[10px]' : 'text-xs'}`}>Favoritos</span>
            </Link>
            <Link href="/notifications" className="hidden sm:flex flex-col items-center text-xs hover:text-[#FFF0E6] transition-colors duration-200">
              <div className="relative">
                <FiBell className={`transition-all duration-300 ${scrolled ? 'h-5 w-5 mb-0.5' : 'h-6 w-6 mb-1'}`} />
                <span className="absolute -top-1 -right-1 bg-[#FFAB00] text-xs text-gray-800 font-bold rounded-full h-4 w-4 flex items-center justify-center">3</span>
              </div>
              <span className={`transition-all duration-300 ${scrolled ? 'text-[10px]' : 'text-xs'}`}>Alertas</span>
            </Link>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="flex flex-col items-center text-xs hover:text-[#FFF0E6] transition-colors duration-200"
            >
              <div className="relative">
                <FiShoppingCart className={`transition-all duration-300 ${scrolled ? 'h-5 w-5 mb-0.5' : 'h-6 w-6 mb-1'}`} />
                <span className="absolute -top-1 -right-1 bg-[#FFAB00] text-xs text-gray-800 font-bold rounded-full h-4 w-4 flex items-center justify-center">2</span>
              </div>
              <span className={`transition-all duration-300 ${scrolled ? 'text-[10px]' : 'text-xs'}`}>Carrito</span>
            </button>
          </motion.div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-3 py-2 border-t border-[#FF8A33]"
          >
            <nav className="flex flex-col space-y-2">
              <Link href="/login" className="flex items-center space-x-2 p-2 hover:bg-[#E65100] rounded-md transition-colors duration-200">
                <FiUser className="h-5 w-5" />
                <span>Mi Cuenta</span>
              </Link>
              <Link href="/favorites" className="flex items-center space-x-2 p-2 hover:bg-[#E65100] rounded-md transition-colors duration-200">
                <FiHeart className="h-5 w-5" />
                <span>Mis Favoritos</span>
              </Link>
              <Link href="/notifications" className="flex items-center space-x-2 p-2 hover:bg-[#E65100] rounded-md transition-colors duration-200">
                <FiBell className="h-5 w-5" />
                <span>Notificaciones</span>
                <span className="ml-auto bg-[#FFAB00] text-xs text-gray-800 font-bold rounded-full h-5 w-5 flex items-center justify-center">3</span>
              </Link>
              <Link href="/orders" className="flex items-center space-x-2 p-2 hover:bg-[#E65100] rounded-md transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span>Mis Pedidos</span>
              </Link>
            </nav>
          </motion.div>
        )}
      </div>

      {/* Promotional bar - Solo visible cuando no hay scroll */}
      {!scrolled && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-[#FFAB00] text-gray-800 text-center text-sm py-1.5 px-4 font-medium"
        >
          🔥 ¡Ofertas Black Friday! Hasta 80% de descuento + Envío GRATIS en pedidos +$25 🔥
        </motion.div>
      )}

      {/* Shopping Cart Sidebar */}
      {isCartOpen && (
        <ShoppingCart onClose={() => setIsCartOpen(false)} />
      )}
    </header>
  )
}