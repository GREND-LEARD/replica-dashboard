import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function ProductCard({ producto }) {
  const [isHovered, setIsHovered] = useState(false);

  if (!producto) return null;

  const discountedPrice = producto.precio?.toFixed(2) ?? 'N/A';
  const originalPrice = producto.precioAnterior?.toFixed(2) ?? null;
  const discountPercentage = producto.descuento ?? null;
  const rating = producto.rating ?? 4.5; // Suponiendo rating 0–5
  const maxStock = producto.stock ?? 999;

  const renderStars = () => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    return (
      <div className="flex text-yellow-400">
        {'★'.repeat(fullStars)}
        {halfStar && '☆'}
        {'☆'.repeat(emptyStars)}
      </div>
    );
  };

  return (
    <div
      role="button"
      aria-label={`Ver detalles de ${producto.nombre}`}
      className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col h-full bg-white animate-fade-in transform hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/products/${producto.id}`} className="flex flex-col h-full">

        {/* Product Image */}
        <div className="relative w-full h-48 bg-gray-50 flex items-center justify-center overflow-hidden">
          {producto.imagen ? (
            <Image
              src={producto.imagen}
              alt={producto.nombre}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={`object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
            />
          ) : (
            <span className="text-gray-400 text-sm">Sin imagen</span>
          )}

          {/* Badges */}
          {discountPercentage && (
            <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md animate-pulse" title="Descuento">
              -{discountPercentage}%
            </div>
          )}

          {producto.ventas > 500 && (
            <div className="absolute bottom-2 left-2 bg-orange-500 bg-opacity-90 text-white text-xs px-2 py-1 rounded-sm" title="Producto popular">
              ¡Popular! {producto.ventas}+ vendidos
            </div>
          )}

          {/* Stock warning */}
          {maxStock < 10 && (
            <div className="absolute bottom-2 right-2 bg-yellow-300 text-yellow-900 text-xs px-2 py-1 rounded-sm" title="Bajo stock">
              ¡Últimas unidades!
            </div>
          )}

          {/* Quick view on hover */}
          <div className={`absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <span className="bg-white text-gray-800 px-3 py-1 rounded-full text-sm font-medium shadow-lg hover:scale-105 transition-transform" role="button">
              Vista rápida
            </span>
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col p-3 flex-grow">
          <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-1 group-hover:text-blue-600 transition-colors duration-200">
            {producto.nombre}
          </h3>

          <div className="flex items-baseline mb-1">
            <p className="text-lg font-bold text-red-600">${discountedPrice}</p>
            {originalPrice && <p className="text-xs text-gray-500 line-through ml-1">${originalPrice}</p>}
          </div>

          {discountPercentage && (
            <p className="text-xs font-semibold text-red-600 mb-1">¡Ahorras {discountPercentage}%!</p>
          )}

          <div className="flex items-center text-xs text-gray-500 mt-1 gap-1">
            {renderStars()}
            <span>({producto.ventas || 0})</span>
          </div>

          {producto.categorias && (
            <p className="text-xs text-gray-500 mt-1">{producto.categorias.nombre}</p>
          )}

          <div className="mt-2 flex gap-1 flex-wrap">
            {producto.envioGratis && (
              <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-sm font-medium hover:bg-green-200 transition-colors duration-200" title="Incluye envío gratuito">
                Envío gratis
              </span>
            )}
            <span className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded-sm font-medium hover:bg-purple-200 transition-colors duration-200" title="Compra segura">
              Garantía
            </span>
          </div>

          {/* Add to cart button */}
          <button
            type="button"
            title="Agregar al carrito"
            className={`mt-3 w-full bg-orange-500 text-white py-1.5 rounded-full font-medium text-sm transition-all duration-300 hover:bg-orange-600 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
          >
            Añadir al carrito
          </button>
        </div>
      </Link>
    </div>
  );
}
