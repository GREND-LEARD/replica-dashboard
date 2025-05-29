import Link from 'next/link'
import Image from 'next/image';
import { useState } from 'react';

export default function ProductCard({ producto }) {
  // Adaptamos las propiedades al formato que espera el componente
  const discountedPrice = producto?.precio ? producto.precio.toFixed(2) : 'N/A';
  const originalPrice = producto?.precioAnterior ? producto.precioAnterior.toFixed(2) : null;
  const discountPercentage = producto?.descuento ? producto.descuento : null;
  const [isHovered, setIsHovered] = useState(false);

  // Si no hay producto, no renderizamos nada
  if (!producto) return null;

  return (
    <div 
      className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col h-full bg-white animate-fade-in transform hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/products/${producto.id}`} className="flex flex-col h-full">
        {/* Product Image */}
        {producto.imagen && (
          <div className="relative w-full h-48 overflow-hidden">
            <Image
              src={producto.imagen}
              alt={producto.nombre}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={`object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
              priority={false}
            />
            {/* Discount Badge - Temu style with more prominence */}
            {discountPercentage && (
              <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md animate-pulse">
                -{discountPercentage}%
              </div>
            )}
            
            {/* Sales Count Badge - Temu often shows popularity */}
            {producto.ventas > 500 && (
              <div className="absolute bottom-2 left-2 bg-orange-500 bg-opacity-90 text-white text-xs px-2 py-1 rounded-sm transform transition-transform duration-300 hover:scale-105">
                ¡Popular! {producto.ventas}+ vendidos
              </div>
            )}

            {/* Quick view button on hover */}
            <div className={`absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
              <span className="bg-white text-gray-800 px-3 py-1 rounded-full text-sm font-medium shadow-lg transform transition-transform duration-300 hover:scale-105">
                Vista rápida
              </span>
            </div>
          </div>
        )}

        {/* Product Info */}
        <div className="flex flex-col p-3 flex-grow">
          <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-1 group-hover:text-blue-600 transition-colors duration-200">{producto.nombre}</h3>

          {/* Price and Discount Info - Temu style with more emphasis */}
          <div className="flex items-baseline mb-1">
            <p className="text-lg font-bold text-red-600">${discountedPrice}</p>
            {originalPrice && (
              <p className="text-xs text-gray-500 line-through ml-1">${originalPrice}</p>
            )}
          </div>

          {/* Discount Percentage - Temu often highlights the savings */}
          {discountPercentage && (
            <p className="text-xs font-semibold text-red-600 mb-1">¡Ahorras {discountPercentage}%!</p>
          )}

          {/* Rating and Sales Count */}
          <div className="flex items-center text-xs text-gray-500 mt-1">
            {/* Stars based on a hypothetical rating */}
            <div className="text-yellow-400">
              ★★★★★
            </div>
            <span className="ml-1">({producto.ventas || 0})</span>
          </div>

          {/* Category */}
          {producto.categorias && (
            <p className="text-xs text-gray-500 mt-1">{producto.categorias.nombre}</p>
          )}

          {/* Free Shipping Badge - Temu style */}
          <div className="mt-2 flex space-x-1">
            {producto.envioGratis && (
              <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-sm font-medium hover:bg-green-200 transition-colors duration-200">Envío gratis</span>
            )}
            <span className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded-sm font-medium hover:bg-purple-200 transition-colors duration-200">Garantía</span>
          </div>

          {/* Add to cart button that appears on hover */}
          <button 
            className={`mt-3 w-full bg-orange-500 text-white py-1.5 rounded-full font-medium text-sm transition-all duration-300 hover:bg-orange-600 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
          >
            Añadir al carrito
          </button>
        </div>
      </Link>
    </div>
  )
}