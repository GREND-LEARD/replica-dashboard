'use client'

import Link from 'next/link'

export default function CategoryNav() {
  // Categorías con iconos para un aspecto más similar a Temu
  const categories = [
    { name: 'Artículos más vendidos', href: '#', icon: '🔥' },
    { name: '5 ESTRELLAS', href: '#', icon: '⭐' },
    { name: 'Semana Black', href: '#', icon: '🏷️' },
    { name: 'Lo nuevo', href: '#', icon: '🆕' },
    { name: 'Moda de Mujer', href: '#', icon: '👚' },
    { name: 'Moda de Hombre', href: '#', icon: '👔' },
    { name: 'Electrónica', href: '#', icon: '📱' },
    { name: 'Hogar y Jardín', href: '#', icon: '🏠' },
    { name: 'Belleza y Salud', href: '#', icon: '💄' },
    { name: 'Juguetes', href: '#', icon: '🧸' },
    { name: 'Deportes', href: '#', icon: '⚽' },
  ];

  return (
    <nav className="bg-white shadow-sm text-gray-700 text-sm border-b border-gray-200 sticky top-16 z-40">
      <div className="container mx-auto flex items-center space-x-6 overflow-x-auto py-3 px-4 no-scrollbar scrollbar-hide">
        {/* Usando la clase scrollbar-hide en lugar de styled-jsx */}
        {categories.map((category) => (
          <Link key={category.name} href={category.href}>
            <span className="flex-shrink-0 cursor-pointer hover:text-orange-500 transition-colors duration-200 flex items-center">
              <span className="mr-1">{category.icon}</span>
              {category.name}
            </span>
          </Link>
        ))}
      </div>
      
      {/* Temu-style category grid for mobile - visible on smaller screens */}
      <div className="md:hidden grid grid-cols-5 gap-2 p-4 bg-gray-50 border-t border-gray-200">
        {categories.slice(0, 10).map((category) => (
          <Link key={`mobile-${category.name}`} href={category.href}>
            <div className="flex flex-col items-center">
              <span className="text-xl mb-1">{category.icon}</span>
              <span className="text-xs text-center line-clamp-1">{category.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </nav>
  )
}