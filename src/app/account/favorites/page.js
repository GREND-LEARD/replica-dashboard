'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'
import Image from 'next/image'
import { FiUser, FiShoppingCart, FiHeart, FiSettings, FiLogOut, FiTrash2, FiShoppingBag, FiStar } from 'react-icons/fi'
import { motion } from 'framer-motion'
import supabase from '@/lib/supabase'

// Importar la lista de productos de ejemplo (debe ser la misma que en page.js y product/[productId]/page.js)
// Idealmente, esto vendría de una fuente centralizada o una API, pero para el propósito del demo usamos el array hardcodeado.
const productosEjemplo = [
  {
    id: 1,
    nombre: 'Auriculares Bluetooth',
    precio: 19.99,
    precioAnterior: 39.99,
    imagen: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=60',
    ventas: 1200,
    descuento: 50,
    envioGratis: true,
    calificacion: 4.5,
    opiniones: 328
  },
  {
    id: 2,
    nombre: 'Smartwatch Deportivo',
    precio: 29.99,
    precioAnterior: 49.99,
    imagen: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=60',
    ventas: 890,
    descuento: 40,
    envioGratis: true,
    calificacion: 4.3,
    opiniones: 245
  },
  {
    id: 3,
    nombre: 'Cargador Inalámbrico',
    precio: 15.99,
    precioAnterior: 24.99,
    imagen: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?auto=format&fit=crop&w=500&q=60',
    ventas: 560,
    descuento: 36,
    envioGratis: false,
    calificacion: 4.0,
    opiniones: 180
  },
  {
    id: 4,
    nombre: 'Funda de Silicona para iPhone',
    precio: 9.99,
    precioAnterior: 14.99,
    imagen: 'https://images.unsplash.com/photo-1585060544211-7ad8b450a730?auto=format&fit=crop&w=500&q=60',
    ventas: 1500,
    descuento: 33,
    envioGratis: false,
    calificacion: 4.7,
    opiniones: 450
  },
  {
    id: 5,
    nombre: 'Lámpara LED de Escritorio',
    precio: 24.99,
    precioAnterior: 39.99,
    imagen: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=500&q=60',
    ventas: 320,
    descuento: 38,
    envioGratis: true,
    calificacion: 4.2,
    opiniones: 120
  },
  {
    id: 6,
    nombre: 'Mochila Impermeable',
    precio: 32.99,
    precioAnterior: 45.99,
    imagen: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=500&q=60',
    ventas: 750,
    descuento: 28,
    envioGratis: true,
    calificacion: 4.6,
    opiniones: 280
  },
  {
    id: 7,
    nombre: 'Teclado Mecánico RGB',
    precio: 49.99,
    precioAnterior: 79.99,
    imagen: 'https://images.unsplash.com/photo-1616400619175-5bd4f5c83367?auto=format&fit=crop&w=500&q=60',
    ventas: 420,
    descuento: 38,
    envioGratis: true,
    calificacion: 4.5,
    opiniones: 150
  },
  {
    id: 8,
    nombre: 'Botella de Agua Térmica',
    precio: 18.99,
    precioAnterior: 27.99,
    imagen: 'https://images.unsplash.com/photo-1591090504758-d99f363a80c8?auto=format&fit=crop&w=500&q=60',
    ventas: 980,
    descuento: 32,
    envioGratis: false,
    calificacion: 4.8,
    opiniones: 510
  },
  {
    id: 9,
    nombre: 'Zapatillas Deportivas',
    precio: 59.99,
    precioAnterior: 89.99,
    imagen: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=60',
    ventas: 1100,
    descuento: 33,
    envioGratis: true,
    calificacion: 4.7,
    opiniones: 620
  },
  {
    id: 10,
    nombre: 'Organizador de Escritorio',
    precio: 22.99,
    precioAnterior: 29.99,
    imagen: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=500&q=60',
    ventas: 340,
    descuento: 23,
    envioGratis: false,
    calificacion: 4.1,
    opiniones: 90
  },
  {
    id: 11,
    nombre: 'Altavoz Bluetooth Portátil',
    precio: 39.99,
    precioAnterior: 59.99,
    imagen: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=500&q=60',
    ventas: 670,
    descuento: 33,
    envioGratis: true,
    calificacion: 4.4,
    opiniones: 210
  },
  {
    id: 12,
    nombre: 'Set de Pinceles de Maquillaje',
    precio: 14.99,
    precioAnterior: 24.99,
    imagen: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=500&q=60',
    ventas: 890,
    descuento: 40,
    envioGratis: false,
    calificacion: 4.6,
    opiniones: 350
  },
  {
    id: 13,
    nombre: 'Silla Ergonómica de Oficina',
    precio: 120.00,
    precioAnterior: 180.00,
    imagen: 'https://images.unsplash.com/photo-1591090504758-d99f363a80c8?auto=format&fit=crop&w=500&q=60',
    ventas: 250,
    descuento: 33,
    envioGratis: true,
    calificacion: 4.3,
    opiniones: 110
  },
  {
    id: 14,
    nombre: 'Mesa Auxiliar de Noche',
    precio: 55.00,
    precioAnterior: 75.00,
    imagen: 'https://images.unsplash.com/photo-1587477000000-000000000000?auto=format&fit=crop&w=500&q=60',
    ventas: 180,
    descuento: 27,
    envioGratis: false,
    calificacion: 4.0,
    opiniones: 75
  },
  {
    id: 15,
    nombre: 'Kit de Herramientas Esencial',
    precio: 40.00,
    precioAnterior: 60.00,
    imagen: 'https://images.unsplash.com/photo-1600966294595-61f5297571e1?auto=format&fit=crop&w=500&q=60',
    ventas: 310,
    descuento: 33,
    envioGratis: true,
    calificacion: 4.5,
    opiniones: 140
  },
  {
    id: 16,
    nombre: 'Juego de Sartenes Antiadherentes',
    precio: 75.00,
    precioAnterior: 100.00,
    imagen: 'https://images.unsplash.com/photo-1610741095148-558656307dfc?auto=format&fit=crop&w=500&q=60',
    ventas: 450,
    descuento: 25,
    envioGratis: true,
    calificacion: 4.6,
    opiniones: 200
  },
  {
    id: 17,
    nombre: 'Set de Cuchillos de Cocina Profesionales',
    precio: 60.00,
    precioAnterior: 80.00,
    imagen: 'https://images.unsplash.com/photo-1587477000000-000000000000?auto=format&fit=crop&w=500&q=60',
    ventas: 290,
    descuento: 25,
    envioGratis: true,
    calificacion: 4.4,
    opiniones: 130
  },
  {
    id: 18,
    nombre: 'Tabla de Cortar de Bambú',
    precio: 25.00,
    precioAnterior: 35.00,
    imagen: 'https://images.unsplash.com/photo-1587477000000-000000000000?auto=format&fit=crop&w=500&q=60',
    ventas: 520,
    descuento: 28,
    envioGratis: false,
    calificacion: 4.7,
    opiniones: 190
  },
  {
    id: 19,
    nombre: 'Soporte para Laptop Ajustable',
    precio: 30.00,
    precioAnterior: 40.00,
    imagen: 'https://images.unsplash.com/photo-1593642632823-02e7900c4988?auto=format&fit=crop&w=500&q=60',
    ventas: 150,
    descuento: 25,
    envioGratis: false,
    calificacion: 4.4,
    opiniones: 80
  },
  {
    id: 20,
    nombre: 'Webcam Full HD 1080p',
    precio: 45.00,
    precioAnterior: 60.00,
    imagen: 'https://images.unsplash.com/photo-1564468960512-71a50f303b31?auto=format&fit=crop&w=500&q=60',
    ventas: 200,
    descuento: 25,
    envioGratis: true,
    calificacion: 4.2,
    opiniones: 70
  },
  {
    id: 21,
    nombre: 'Ratón Inalámbrico Ergonómico',
    precio: 20.00,
    precioAnterior: 30.00,
    imagen: 'https://images.unsplash.com/photo-1587477000000-000000000000?auto=format&fit=crop&w=500&q=60',
    ventas: 300,
    descuento: 33,
    envioGratis: false,
    calificacion: 4.5,
    opiniones: 110
  },
];

export default function Favorites() {
  const { user, signOut } = useAuth()
  const [favoritedProducts, setFavoritedProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true)
      // Obtener el usuario del contexto de autenticación si está disponible
      // const { data: { user } } = await supabase.auth.getUser(); // Ya lo tenemos del contexto

      if (user) {
        const { data: favoriteEntries, error } = await supabase
          .from('favoritos')
          .select('product_id')
          .eq('user_id', user.id)

        if (error) {
          console.error('Error fetching favorites:', error)
          setError('Error al cargar favoritos.')
        } else if (favoriteEntries) {
          // Extraer los product_id del resultado de Supabase
          const favoritedProductIds = favoriteEntries.map(entry => entry.product_id)
          // Filtrar los productos de ejemplo que coinciden con los IDs favoritos
          // ¡Usar productosEjemplo en lugar del estado local 'favorites'!'
          const productsDetails = productosEjemplo.filter(product =>
            favoritedProductIds.includes(product.id)
          )
          setFavoritedProducts(productsDetails)
        }
      } else {
        // Usuario no autenticado, podrías redirigir o mostrar un mensaje
        // Ya se maneja en el renderizado si !user
        setFavoritedProducts([]) // Limpiar la lista si no hay usuario
      }
      setLoading(false)
    }

    // Solo ejecutar la carga si el usuario está definido (viene del contexto)
    if (user !== null) { // Verificar explícitamente si user es null (no solo truthy)
      fetchFavorites()
    }
  }, [user]) // Depender del objeto user del contexto

  const handleRemoveFavorite = async (productIdToRemove) => {
    if (!user) return
    setLoading(true)

    const { error } = await supabase
      .from('favoritos')
      .delete()
      .eq('user_id', user.id)
      .eq('product_id', productIdToRemove)

    if (error) {
      console.error('Error removing favorite:', error)
      alert('Error al eliminar producto de favoritos.')
    } else {
      setFavoritedProducts(prevProducts =>
        prevProducts.filter(product => product.id !== productIdToRemove)
      )
    }
    setLoading(false)
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Acceso no autorizado</h1>
          <p className="text-gray-600 mb-4">Debes iniciar sesión para acceder a esta página.</p>
          <Link 
            href="/login"
            className="bg-[#E65100] text-white px-4 py-2 rounded hover:bg-[#D84315] transition-colors duration-200"
          >
            Iniciar sesión
          </Link>
        </div>
      </div>
    )
  }

  if (loading) {
    return <div className="text-center py-8">Cargando favoritos...</div>
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">{error}</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Mi cuenta</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar de navegación */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex flex-col space-y-2">
            <Link 
              href="/account/dashboard"
              className="flex items-center p-3 hover:bg-gray-100 rounded-md transition-colors duration-200"
            >
              <FiUser className="mr-2" /> Dashboard
            </Link>
            <Link 
              href="/account/orders"
              className="flex items-center p-3 hover:bg-gray-100 rounded-md transition-colors duration-200"
            >
              <FiShoppingCart className="mr-2" /> Mis pedidos
            </Link>
            <Link 
              href="/account/favorites"
              className="flex items-center p-3 bg-[#FFF3E0] text-[#E65100] rounded-md"
            >
              <FiHeart className="mr-2" /> Favoritos
            </Link>
            <Link 
              href="/account/settings"
              className="flex items-center p-3 hover:bg-gray-100 rounded-md transition-colors duration-200"
            >
              <FiSettings className="mr-2" /> Configuración
            </Link>
            <button 
              onClick={signOut}
              className="flex items-center p-3 hover:bg-gray-100 rounded-md transition-colors duration-200 text-red-600"
            >
              <FiLogOut className="mr-2" /> Cerrar sesión
            </button>
          </div>
        </div>
        
        {/* Contenido principal */}
        <div className="bg-white rounded-lg shadow-md p-6 md:col-span-3">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Mis favoritos</h2>
            <p className="text-gray-500">{favoritedProducts.length} productos</p>
          </div>
          
          {favoritedProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoritedProducts.map((product) => (
                <motion.div 
                  key={product.id} 
                  className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative h-48 w-full bg-gray-100">
                    <Image 
                      src={product.imagen}
                      alt={product.nombre}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                    {product.descuento > 0 && (
                      <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded z-10">
                        -{product.descuento}%
                      </div>
                    )}
                    <motion.button
                      className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-md hover:bg-gray-100 z-10"
                      onClick={() => handleRemoveFavorite(product.id)}
                      whileTap={{ scale: 0.9 }}
                      title="Eliminar de favoritos"
                    >
                      <FiTrash2 className="w-5 h-5 text-red-600" />
                    </motion.button>
                  </div>
                  <div className="p-4 flex flex-col justify-between flex-grow">
                    <div>
                      <Link href={`/products/${product.id}`}>
                        <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 hover:text-red-600 transition-colors">{product.nombre}</h3>
                      </Link>
                      <div className="mt-2 flex items-baseline">
                        <span className="text-xl font-bold text-red-600">${product.precio.toFixed(2)}</span>
                        {product.precioAnterior && (
                          <span className="ml-2 text-sm text-gray-500 line-through">${product.precioAnterior.toFixed(2)}</span>
                        )}
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <FiStar className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                        <span>{product.calificacion} ({product.opiniones} opiniones)</span>
                      </div>
                      <div className="flex space-x-2">
                        <Link href={`/products/${product.id}`} className="flex-1">
                          <button className="w-full border border-gray-300 text-gray-700 py-2 rounded-md text-sm hover:bg-gray-100 transition-colors">
                            Ver detalles
                          </button>
                        </Link>
                        <button className="w-full bg-red-600 text-white py-2 rounded-md text-sm hover:bg-red-700 transition-colors">
                          Añadir al carrito
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 p-8 rounded-md text-center">
              <FiHeart className="mx-auto text-4xl text-gray-400 mb-4" />
              <h3 className="text-xl font-medium text-gray-700 mb-2">No tienes favoritos</h3>
              <p className="text-gray-500 mb-4">Añade productos a tus favoritos para verlos aquí.</p>
              <Link 
                href="/"
                className="inline-block bg-[#E65100] text-white px-4 py-2 rounded hover:bg-[#D84315] transition-colors duration-200"
              >
                Explorar productos
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}