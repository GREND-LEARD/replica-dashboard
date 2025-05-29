'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [searchTerm, setSearchTerm] = useState('')
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const handleSearch = async (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      // Implementar la búsqueda cuando tengamos la página de búsqueda
      console.log('Searching for:', searchTerm)
      // router.push(`/search?q=${encodeURIComponent(searchTerm)}`)
    }
  }

  return (
    <header className="bg-red-600 text-white p-3 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
            <img src="/logo.png" alt="RepliTemu" className="h-8 mr-2" />
            <span className="font-bold text-xl hidden sm:inline">RepliTemu</span>
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex-grow mx-4 max-w-lg">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar productos..."
              className="w-full px-4 py-2 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500 border-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button 
              type="submit" 
              className="absolute right-0 top-0 h-full px-4 bg-orange-500 text-white rounded-r-full hover:bg-orange-600 transition duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </form>

        {/* Navigation Links - Desktop */}
        <nav className="hidden md:block">
          <ul className="flex space-x-6 text-sm items-center">
            <li>
              <Link href="/login" className="flex flex-col items-center hover:text-orange-200 transition duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Cuenta</span>
              </Link>
            </li>
            <li>
              <Link href="#" className="flex flex-col items-center hover:text-orange-200 transition duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span>Pedidos</span>
              </Link>
            </li>
            <li>
              <Link href="#" className="flex flex-col items-center hover:text-orange-200 transition duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Ayuda</span>
              </Link>
            </li>
            <li>
              <Link href="#" className="flex flex-col items-center hover:text-orange-200 transition duration-200 relative">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>Carrito</span>
                {/* Badge for cart items count */}
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">0</span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white focus:outline-none"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden bg-red-700 mt-2 p-4 rounded-lg shadow-lg animate-fade-in">
          <ul className="space-y-3">
            <li>
              <Link href="/login" className="flex items-center space-x-2 hover:text-orange-200 transition duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Cuenta</span>
              </Link>
            </li>
            <li>
              <Link href="#" className="flex items-center space-x-2 hover:text-orange-200 transition duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span>Pedidos</span>
              </Link>
            </li>
            <li>
              <Link href="#" className="flex items-center space-x-2 hover:text-orange-200 transition duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Ayuda</span>
              </Link>
            </li>
            <li>
              <Link href="#" className="flex items-center space-x-2 hover:text-orange-200 transition duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>Carrito (0)</span>
              </Link>
            </li>
            <li className="border-t border-red-500 pt-2 mt-2">
              <Link href="#" className="hover:text-orange-200 transition duration-200">Artículos más vendidos</Link>
            </li>
            <li>
              <Link href="#" className="hover:text-orange-200 transition duration-200">5 estrellas</Link>
            </li>
            <li>
              <Link href="#" className="hover:text-orange-200 transition duration-200">Semana Black</Link>
            </li>
            <li>
              <Link href="#" className="hover:text-orange-200 transition duration-200">Lo nuevo</Link>
            </li>
            <li>
              <Link href="#" className="hover:text-orange-200 transition duration-200">Categorías</Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}