'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import CategoryNav from '@/components/CategoryNav'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'

// Datos de ejemplo para desarrollo
const productosEjemplo = [
  {
    id: 1,
    nombre: "Auriculares Bluetooth Inalámbricos",
    descripcion: "Auriculares con cancelación de ruido, resistentes al agua y larga duración de batería. Estos auriculares ofrecen una experiencia de audio premium con graves profundos y agudos nítidos. La batería dura hasta 20 horas con una sola carga y son compatibles con todos los dispositivos Bluetooth. Incluyen estuche de carga y diferentes tamaños de almohadillas para un ajuste perfecto.",
    precio: 29.99,
    imagen_url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
    original_price: 39.99,
    discount_percentage: 25,
    sales_count: 1245,
    stock: 42,
    categorias: { nombre: "Electrónica" }
  },
  {
    id: 2,
    nombre: "Vestido de Verano Floral",
    descripcion: "Vestido ligero con estampado floral, perfecto para el verano. Confeccionado en tejido de algodón transpirable que te mantendrá fresca en los días más calurosos. El diseño incluye un elegante escote en V y un corte que favorece a todo tipo de siluetas. Disponible en varios colores y tallas.",
    precio: 19.50,
    imagen_url: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300&h=300&fit=crop",
    original_price: 35.00,
    discount_percentage: 44,
    sales_count: 879,
    stock: 25,
    categorias: { nombre: "Moda de Mujer" }
  },
  {
    id: 3,
    nombre: "Organizador de Maquillaje",
    descripcion: "Organizador de acrílico transparente con múltiples compartimentos. Este organizador es perfecto para mantener tu maquillaje y productos de belleza ordenados y fácilmente accesibles. Cuenta con diferentes secciones para lápices, pinceles, bases y más. Su diseño elegante y transparente combina con cualquier decoración.",
    precio: 15.99,
    imagen_url: "https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=300&h=300&fit=crop",
    original_price: 24.99,
    discount_percentage: 36,
    sales_count: 567,
    stock: 18,
    categorias: { nombre: "Belleza y Salud" }
  },
  {
    id: 4,
    nombre: "Camiseta Deportiva Hombre",
    descripcion: "Camiseta transpirable de secado rápido para entrenamiento. Fabricada con tecnología que absorbe el sudor y te mantiene seco durante tus entrenamientos más intensos. El tejido ligero y elástico proporciona libertad de movimiento. Disponible en varios colores y tallas.",
    precio: 12.99,
    imagen_url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop",
    original_price: 18.99,
    discount_percentage: 32,
    sales_count: 423,
    stock: 50,
    categorias: { nombre: "Moda de Hombre" }
  },
  {
    id: 5,
    nombre: "Lámpara LED de Escritorio",
    descripcion: "Lámpara con control táctil, 3 modos de luz y puerto USB. Esta lámpara moderna y funcional es perfecta para tu espacio de trabajo o estudio. Cuenta con diferentes niveles de brillo y temperatura de color para adaptarse a tus necesidades. El puerto USB integrado te permite cargar tus dispositivos mientras trabajas.",
    precio: 24.50,
    imagen_url: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=300&h=300&fit=crop",
    original_price: 32.99,
    discount_percentage: 26,
    sales_count: 298,
    stock: 15,
    categorias: { nombre: "Hogar y Jardín" }
  },
  {
    id: 6,
    nombre: "Peluche Oso de Felpa",
    descripcion: "Oso de peluche suave de 40cm, ideal para regalo. Este adorable oso de peluche está hecho con materiales de alta calidad, suaves al tacto y seguros para niños de todas las edades. Es el compañero perfecto para dormir y jugar, y un regalo que seguramente será apreciado por cualquier persona.",
    precio: 18.75,
    imagen_url: "https://images.unsplash.com/photo-1559715541-5daf8a0296d0?w=300&h=300&fit=crop",
    original_price: 25.00,
    discount_percentage: 25,
    sales_count: 187,
    stock: 30,
    categorias: { nombre: "Juguetes" }
  },
  {
    id: 7,
    nombre: "Botella de Agua Deportiva",
    descripcion: "Botella de acero inoxidable, mantiene bebidas frías por 24h. Esta botella de alta calidad está diseñada para mantener tus bebidas a la temperatura ideal durante todo el día. Fabricada con acero inoxidable de grado alimenticio, es duradera, resistente a golpes y no transfiere sabores. Perfecta para deportes, oficina o viajes.",
    precio: 14.99,
    imagen_url: "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=300&h=300&fit=crop",
    original_price: 22.99,
    discount_percentage: 35,
    sales_count: 356,
    stock: 40,
    categorias: { nombre: "Deportes" }
  },
  {
    id: 8,
    nombre: "Smartwatch Resistente al Agua",
    descripcion: "Reloj inteligente con monitor cardíaco y notificaciones. Este smartwatch de última generación te permite realizar un seguimiento completo de tu actividad física, monitorear tu ritmo cardíaco y recibir notificaciones de tu smartphone. Es resistente al agua hasta 50 metros y tiene una batería que dura hasta 7 días.",
    precio: 45.99,
    imagen_url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
    original_price: 69.99,
    discount_percentage: 34,
    sales_count: 789,
    stock: 12,
    categorias: { nombre: "Electrónica" }
  },
  {
    id: 9,
    nombre: "Bolso Bandolera de Cuero",
    descripcion: "Bolso elegante con múltiples compartimentos y correa ajustable. Este bolso de cuero genuino combina estilo y funcionalidad. Cuenta con varios bolsillos interiores y exteriores para mantener tus pertenencias organizadas. La correa ajustable te permite llevarlo cómodamente a la altura que prefieras.",
    precio: 32.50,
    imagen_url: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300&h=300&fit=crop",
    original_price: 49.99,
    discount_percentage: 35,
    sales_count: 245,
    stock: 8,
    categorias: { nombre: "Moda de Mujer" }
  },
  {
    id: 10,
    nombre: "Set de Sartenes Antiadherentes",
    descripcion: "Juego de 3 sartenes con revestimiento antiadherente. Este set incluye sartenes de diferentes tamaños, perfectos para todas tus necesidades culinarias. El revestimiento antiadherente de alta calidad permite cocinar con menos aceite y facilita la limpieza. Los mangos ergonómicos proporcionan un agarre seguro y cómodo.",
    precio: 38.75,
    imagen_url: "https://images.unsplash.com/photo-1585837575652-267cbc187fc3?w=300&h=300&fit=crop",
    original_price: 59.99,
    discount_percentage: 35,
    sales_count: 178,
    stock: 20,
    categorias: { nombre: "Hogar y Jardín" }
  },
  {
    id: 11,
    nombre: "Zapatillas Running Hombre",
    descripcion: "Zapatillas ligeras con amortiguación y suela antideslizante. Diseñadas para corredores de todos los niveles, estas zapatillas ofrecen el equilibrio perfecto entre comodidad y rendimiento. La tecnología de amortiguación absorbe los impactos, mientras que la suela antideslizante proporciona tracción en diversas superficies.",
    precio: 42.99,
    imagen_url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop",
    original_price: 64.99,
    discount_percentage: 34,
    sales_count: 432,
    stock: 15,
    categorias: { nombre: "Deportes" }
  },
  {
    id: 12,
    nombre: "Crema Hidratante Facial",
    descripcion: "Crema con ácido hialurónico y vitamina E para todo tipo de piel. Esta fórmula avanzada proporciona hidratación profunda y duradera. El ácido hialurónico ayuda a retener la humedad, mientras que la vitamina E protege la piel contra los radicales libres. Adecuada para uso diario, deja la piel suave, tersa y radiante.",
    precio: 16.50,
    imagen_url: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=300&h=300&fit=crop",
    original_price: 24.99,
    discount_percentage: 34,
    sales_count: 567,
    stock: 25,
    categorias: { nombre: "Belleza y Salud" }
  }
]

export default function ProductDetail({ params }) {
  const { productId } = params
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState(null)
  const [selectedSize, setSelectedSize] = useState(null)

  useEffect(() => {
    try {
      // Verificar que productId sea un número válido
      const parsedId = parseInt(productId)
      
      if (isNaN(parsedId)) {
        setError('ID de producto inválido')
        setLoading(false)
        return
      }
      
      // Buscar el producto por ID en el array de productos de ejemplo
      const foundProduct = productosEjemplo.find(p => p.id === parsedId)
      
      if (foundProduct) {
        setProduct(foundProduct)
      } else {
        setError('Producto no encontrado')
      }
    } catch (err) {
      console.error('Error al cargar el producto:', err)
      setError('Error al cargar el producto')
    } finally {
      setLoading(false)
    }
  }, [productId])

  if (loading) {
    return <p className="text-center mt-8">Cargando detalles del producto...</p>
  }

  if (error || !product) {
    return <p className="text-center text-red-500 mt-8">{error || 'Producto no encontrado'}</p>
  }

  // Use fetched data or placeholder if not available
  const originalPrice = product.original_price ? parseFloat(product.original_price).toFixed(2) : null;
  const discountPercentage = product.discount_percentage ? product.discount_percentage : null;
  const stock = product.stock !== undefined && product.stock !== null ? product.stock : 10;
  const salesCount = product.sales_count || 0;

  // Example variations placeholder
  const colorVariations = [
    { id: 'color-red', tipo_variacion: 'Color', valor: 'Rojo' },
    { id: 'color-blue', tipo_variacion: 'Color', valor: 'Azul' },
    { id: 'color-black', tipo_variacion: 'Color', valor: 'Negro' },
  ];

  const sizeVariations = [
    { id: 'size-s', tipo_variacion: 'Talla', valor: 'S' },
    { id: 'size-m', tipo_variacion: 'Talla', valor: 'M' },
    { id: 'size-l', tipo_variacion: 'Talla', valor: 'L' },
    { id: 'size-xl', tipo_variacion: 'Talla', valor: 'XL' },
  ];

  // Productos relacionados (usando los mismos datos de ejemplo)
  const relatedProducts = productosEjemplo
    .filter(p => p.id !== product.id && p.categorias.nombre === product.categorias.nombre)
    .slice(0, 5);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header />
      <CategoryNav />

      <main className="container mx-auto p-4 flex-grow">
        {/* Breadcrumb Navigation */}
        <nav className="text-sm mb-4 text-gray-500">
          <ol className="flex flex-wrap items-center">
            <li className="flex items-center">
              <Link href="/" className="hover:text-orange-500">Inicio</Link>
              <span className="mx-2">/</span>
            </li>
            <li className="flex items-center">
              <Link href="#" className="hover:text-orange-500">{product.categorias.nombre}</Link>
              <span className="mx-2">/</span>
            </li>
            <li className="text-gray-700 truncate">{product.nombre}</li>
          </ol>
        </nav>

        <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Image Gallery */}
            <div className="space-y-4">
              <div className="relative rounded-lg overflow-hidden border border-gray-200 h-80 md:h-96">
                {/* Main Product Image */}
                <Image 
                  src={product.imagen_url} 
                  alt={product.nombre}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                
                {/* Discount Badge */}
                {discountPercentage && (
                  <div className="absolute top-4 left-4 bg-orange-500 text-white text-sm font-bold px-2 py-1 rounded-full">
                    -{discountPercentage}%
                  </div>
                )}
                
                {/* Share and Favorite Buttons */}
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button className="bg-white p-2 rounded-full shadow-sm hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                  </button>
                  <button className="bg-white p-2 rounded-full shadow-sm hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Thumbnail Gallery - Placeholder */}
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {[1, 2, 3, 4].map((_, index) => (
                  <div key={index} className="flex-shrink-0 w-20 h-20 border border-gray-200 rounded-md overflow-hidden cursor-pointer hover:border-orange-500">
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                      <span className="text-xs">Imagen {index + 1}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-4">
              <h1 className="text-2xl font-bold text-gray-800">{product.nombre}</h1>
              
              {/* Rating and Sales Count */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="text-yellow-400 flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">5.0</span>
                </div>
                <span className="text-sm text-gray-500">{salesCount}+ vendidos</span>
              </div>
              
              {/* Price Information */}
              <div className="space-y-1">
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-orange-600">${parseFloat(product.precio).toFixed(2)}</span>
                  {originalPrice && (
                    <span className="ml-2 text-lg text-gray-500 line-through">${originalPrice}</span>
                  )}
                </div>
                {discountPercentage && (
                  <p className="text-sm text-orange-600 font-medium">¡Ahorras ${(parseFloat(originalPrice) - parseFloat(product.precio)).toFixed(2)} ({discountPercentage}% de descuento)!</p>
                )}
                <div className="mt-2">
                  <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-sm">Envío gratis</span>
                </div>
              </div>
              
              {/* Description */}
              <div className="text-sm text-gray-700 border-t border-b border-gray-200 py-4 my-4">
                <h3 className="font-medium mb-2">Descripción:</h3>
                <p>{product.descripcion}</p>
              </div>
              
              {/* Stock Information */}
              <div className="text-sm">
                {stock > 0 ? (
                  <p className="text-green-600">
                    <span className="font-medium">En stock:</span> {stock} unidades disponibles
                  </p>
                ) : (
                  <p className="text-red-600 font-medium">Agotado</p>
                )}
              </div>
              
              {/* Color Variation */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-900">Color:</h3>
                <div className="flex space-x-2">
                  {colorVariations.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => setSelectedColor(color.id)}
                      className={`px-3 py-1 border rounded-full text-sm ${selectedColor === color.id ? 'border-orange-500 bg-orange-50 text-orange-700' : 'border-gray-300 text-gray-700 hover:border-gray-400'}`}
                    >
                      {color.valor}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Size Variation */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-900">Talla:</h3>
                <div className="flex flex-wrap gap-2">
                  {sizeVariations.map((size) => (
                    <button
                      key={size.id}
                      onClick={() => setSelectedSize(size.id)}
                      className={`px-3 py-1 border rounded-md text-sm ${selectedSize === size.id ? 'border-orange-500 bg-orange-50 text-orange-700' : 'border-gray-300 text-gray-700 hover:border-gray-400'}`}
                    >
                      {size.valor}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Quantity Selector */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-900">Cantidad:</h3>
                <div className="flex items-center border border-gray-300 rounded-md w-32">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 text-gray-600 hover:text-orange-500"
                  >
                    -
                  </button>
                  <input 
                    type="number" 
                    value={quantity} 
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    min="1"
                    max={stock}
                    className="w-full text-center border-0 focus:ring-0"
                  />
                  <button 
                    onClick={() => setQuantity(Math.min(stock, quantity + 1))}
                    className="px-3 py-1 text-gray-600 hover:text-orange-500"
                  >
                    +
                  </button>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 pt-4">
                <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-full font-medium flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Añadir al carrito
                </button>
                <button className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-full font-medium">
                  Comprar ahora
                </button>
              </div>
              
              {/* Guarantee Information */}
              <div className="mt-6 text-sm text-gray-600 border-t border-gray-200 pt-4">
                <div className="flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span>Garantía de 30 días</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span>Devoluciones sin complicaciones</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <section className="mt-8 mb-12">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Productos relacionados</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 bg-white">
                  <Link href={`/products/${relatedProduct.id}`} className="block">
                    <div className="relative h-40">
                      <Image 
                        src={relatedProduct.imagen_url} 
                        alt={relatedProduct.nombre}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 20vw"
                      />
                      {relatedProduct.discount_percentage && (
                        <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                          -{relatedProduct.discount_percentage}%
                        </div>
                      )}
                    </div>
                    <div className="p-3">
                      <h3 className="text-sm font-medium text-gray-800 line-clamp-2">{relatedProduct.nombre}</h3>
                      <div className="flex items-baseline mt-1">
                        <p className="text-md font-bold text-orange-600">${parseFloat(relatedProduct.precio).toFixed(2)}</p>
                        {relatedProduct.original_price && (
                          <p className="text-xs text-gray-500 line-through ml-1">${parseFloat(relatedProduct.original_price).toFixed(2)}</p>
                        )}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}