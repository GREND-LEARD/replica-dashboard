import Link from 'next/link'
import Image from 'next/image';

export default function ProductCard({ product }) {
  // Assuming product object might have original_price and discount_percentage
  const discountedPrice = product.precio ? product.precio.toFixed(2) : 'N/A';
  const originalPrice = product.original_price ? product.original_price.toFixed(2) : null;
  const discountPercentage = product.discount_percentage ? product.discount_percentage : null;

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer flex flex-col h-full bg-white animate-fade-in">
      <Link href={`/products/${product.id}`} className="flex flex-col h-full">
        {/* Product Image */}
        {product.imagen_url && (
          <div className="relative w-full h-48">
            <Image
              src={product.imagen_url}
              alt={product.nombre}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover hover:scale-105 transition-transform duration-300"
              priority={false}
            />
            {/* Discount Badge - Temu style with more prominence */}
            {discountPercentage && (
              <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full transform rotate-0 shadow-md">
                -{discountPercentage}%
              </div>
            )}
            
            {/* Sales Count Badge - Temu often shows popularity */}
            {product.sales_count > 500 && (
              <div className="absolute bottom-2 left-2 bg-orange-500 bg-opacity-90 text-white text-xs px-2 py-1 rounded-sm">
                ¡Popular! {product.sales_count}+ vendidos
              </div>
            )}
          </div>
        )}

        {/* Product Info */}
        <div className="flex flex-col p-3 flex-grow">
          <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-1">{product.nombre}</h3>

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
            <span className="ml-1">({product.sales_count || 0})</span>
          </div>

          {/* Category */}
          {product.categorias && (
            <p className="text-xs text-gray-500 mt-1">{product.categorias.nombre}</p>
          )}

          {/* Free Shipping Badge - Temu style */}
          <div className="mt-2 flex space-x-1">
            <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-sm font-medium">Envío gratis</span>
            <span className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded-sm font-medium">Garantía</span>
          </div>
        </div>
      </Link>
    </div>
  )
}