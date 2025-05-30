'use client'

import Link from 'next/link'
import Image from 'next/image'
import ProductCard from '@/components/ProductCard'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState, useEffect } from 'react'

// Productos de ejemplo
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
  },
  {
    id: 7,
    nombre: 'Teclado Mecánico RGB',
    precio: 49.99,
    precioAnterior: 79.99,
    imagen: 'https://images.unsplash.com/photo-1587477000000-000000000000?auto=format&fit=crop&w=500&q=60',
    ventas: 420,
    descuento: 38,
    envioGratis: true,
  },
  {
    id: 8,
    nombre: 'Botella de Agua Térmica',
    precio: 18.99,
    precioAnterior: 27.99,
    imagen: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=500&q=60',
    ventas: 980,
    descuento: 32,
    envioGratis: false,
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
  },
  {
    id: 10,
    nombre: 'Organizador de Escritorio',
    precio: 22.99,
    precioAnterior: 29.99,
    imagen: 'https://images.unsplash.com/photo-1587477000000-000000000000?auto=format&fit=crop&w=500&q=60',
    ventas: 340,
    descuento: 23,
    envioGratis: false,
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
  },
  {
    id: 13,
    nombre: 'Silla Ergonómica',
    precio: 120.00,
    precioAnterior: 180.00,
    imagen: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=500&q=60',
    ventas: 250,
    descuento: 33,
    envioGratis: true,
  },
  {
    id: 14,
    nombre: 'Mesa Auxiliar Moderna',
    precio: 55.00,
    precioAnterior: 75.00,
    imagen: 'https://images.unsplash.com/photo-1587477000000-000000000000?auto=format&fit=crop&w=500&q=60',
    ventas: 180,
    descuento: 27,
    envioGratis: false,
  },
  {
    id: 15,
    nombre: 'Kit de Herramientas Básico',
    precio: 40.00,
    precioAnterior: 60.00,
    imagen: 'https://images.unsplash.com/photo-1587477000000-000000000000?auto=format&fit=crop&w=500&q=60',
    ventas: 310,
    descuento: 33,
    envioGratis: true,
  },
  {
    id: 16,
    nombre: 'Juego de Sartenes Antiadherentes',
    precio: 75.00,
    precioAnterior: 100.00,
    imagen: 'https://images.unsplash.com/photo-1587477000000-000000000000?auto=format&fit=crop&w=500&q=60',
    ventas: 450,
    descuento: 25,
    envioGratis: true,
  },
  {
    id: 17,
    nombre: 'Set de Cuchillos de Cocina',
    precio: 60.00,
    precioAnterior: 80.00,
    imagen: 'https://images.unsplash.com/photo-1587477000000-000000000000?auto=format&fit=crop&w=500&q=60',
    ventas: 290,
    descuento: 25,
    envioGratis: true,
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
  },
  {
    id: 19,
    nombre: 'Cámara de Seguridad WiFi',
    precio: 45.99,
    precioAnterior: 69.99,
    imagen: 'https://images.unsplash.com/photo-1587502536263-2c3a2d9e7d09?auto=format&fit=crop&w=500&q=60',
    ventas: 530,
    descuento: 34,
    envioGratis: true,
  },
  {
    id: 20,
    nombre: 'Auriculares Gaming con Micrófono',
    precio: 35.00,
    precioAnterior: 55.00,
    imagen: 'https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=500&q=60',
    ventas: 710,
    descuento: 36,
    envioGratis: true,
  },
  {
    id: 21,
    nombre: 'Pulsera Inteligente de Actividad',
    precio: 25.50,
    precioAnterior: 39.99,
    imagen: 'https://images.unsplash.com/photo-1565372919416-bc6ff8d53c8a?auto=format&fit=crop&w=500&q=60',
    ventas: 1020,
    descuento: 36,
    envioGratis: false,
  },
  {
    id: 22,
    nombre: 'Plancha de Vapor para Ropa',
    precio: 40.00,
    precioAnterior: 65.00,
    imagen: 'https://images.unsplash.com/photo-1556909192-22b251367007?auto=format&fit=crop&w=500&q=60',
    ventas: 380,
    descuento: 38,
    envioGratis: true,
  },
  {
    id: 23,
    nombre: 'Juego de Mesa Estratégico',
    precio: 29.99,
    precioAnterior: 44.99,
    imagen: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=500&q=60',
    ventas: 440,
    descuento: 33,
    envioGratis: false,
  },
  {
    id: 24,
    nombre: 'Cámara Instantánea Analógica',
    precio: 65.00,
    precioAnterior: 90.00,
    imagen: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=500&q=60',
    ventas: 275,
    descuento: 28,
    envioGratis: true,
  },
];


// Categorías de ejemplo
const categorias = [
  { id: 1, nombre: 'Electrónica', icono: '📱' },
  { id: 2, nombre: 'Hogar', icono: '🏠' },
  { id: 3, nombre: 'Moda', icono: '👕' },
  { id: 4, nombre: 'Belleza', icono: '💄' },
  { id: 5, nombre: 'Deportes', icono: '⚽' },
  { id: 6, nombre: 'Juguetes', icono: '🧸' },
  { id: 7, nombre: 'Mascotas', icono: '🐶' },
  { id: 8, nombre: 'Jardín', icono: '🌱' },
  { id: 9, nombre: 'Libros', icono: '📚' },
  { id: 10, nombre: 'Cocina', icono: '🍳' },
];

export default function Home() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const [bannerIndex, setBannerIndex] = useState(0);
  const banners = [
    '/banners/moda-banner.jpg',
    '/banners/electronica-banner.jpg',
    '/banners/hogar-banner.jpg'
  ];

  // Cambiar banner automáticamente cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setBannerIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length]);

  // Variantes para animaciones
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Banner principal */}
      <div className="relative overflow-hidden h-48 sm:h-64 md:h-80 bg-gray-200">
        <motion.div 
          className="w-full h-full relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {banners.map((banner, index) => (
            <motion.div
              key={index}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: bannerIndex === index ? 1 : 0,
                zIndex: bannerIndex === index ? 10 : 1 
              }}
              transition={{ duration: 0.8 }}
          >
            <Image
                src={banner} 
                alt={`Banner promocional ${index + 1}`} 
                fill 
                style={{ objectFit: 'cover' }} 
                priority={index === 0}
              />
            </motion.div>
          ))}
          <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
            <motion.div 
              className="text-center text-white px-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h1 className="text-2xl md:text-4xl font-bold mb-2 drop-shadow-lg">¡Ofertas Black Friday!</h1>
              <p className="text-lg md:text-xl mb-4 drop-shadow-md">Hasta 80% de descuento en miles de productos</p>
              <motion.button 
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Ver ofertas
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Indicadores del banner */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {banners.map((_, index) => (
            <motion.button
              key={index}
              className={`h-2 rounded-full ${bannerIndex === index ? 'w-6 bg-red-600' : 'w-2 bg-white bg-opacity-60'}`}
              onClick={() => setBannerIndex(index)}
              whileHover={{ scale: 1.2 }}
              transition={{ duration: 0.2 }}
            />
          ))}
        </div>
      </div>

      {/* Categorías */}
      <motion.section 
        className="py-6 bg-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-bold mb-4">Categorías populares</h2>
          <motion.div 
            className="grid grid-cols-5 md:grid-cols-10 gap-2"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {categorias.map((categoria) => (
              <motion.div 
                key={categoria.id} 
                className="flex flex-col items-center p-2 hover:bg-gray-50 rounded-lg transition-colors duration-200 cursor-pointer"
                variants={itemVariants}
                whileHover={{ scale: 1.05, backgroundColor: '#f9fafb' }}
              >
                <span className="text-2xl mb-1">{categoria.icono}</span>
                <span className="text-xs text-center">{categoria.nombre}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Banner promocional */}
      <motion.section 
        className="py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between">
            <motion.div 
              className="flex-1 min-w-[200px] mb-4 md:mb-0"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-bold mb-1">¡Envío gratis en tu primer pedido!</h3>
              <p className="text-sm">En pedidos superiores a $15</p>
            </motion.div>
            <div className="flex space-x-4">
              <motion.div 
                className="flex items-center bg-white bg-opacity-20 rounded-lg p-3"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.3)' }}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <Image src="https://images.unsplash.com/photo-1612837017391-4b6b7b0b2b0b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGdpZnR8ZW58MHx8MHx8fDA%3D" alt="Regalo" width={80} height={80} className="mr-3 rounded" />
                <div>
                  <p className="font-bold">Cupón de $5</p>
                  <p className="text-xs">Para nuevos usuarios</p>
                </div>
              </motion.div>
              <motion.div 
                className="flex items-center bg-white bg-opacity-20 rounded-lg p-3"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.3)' }}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <Image src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z2lmdHxlbnwwfHwwfHx8MA%3D%3D" alt="Regalo" width={80} height={80} className="mr-3 rounded" />
                <div>
                  <p className="font-bold">15% descuento</p>
                  <p className="text-xs">En tu próxima compra</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Productos destacados */}
      <section className="py-8 bg-gray-50" ref={ref}>
        <div className="container mx-auto px-4">
          <motion.div 
            className="flex justify-between items-center mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold">Productos destacados</h2>
            <Link href="/products" className="text-red-600 hover:text-red-700 font-medium">Ver todos</Link>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {productosEjemplo.map((producto, index) => (
              <motion.div 
                key={producto.id}
                variants={itemVariants}
                custom={index}
              >
                <ProductCard producto={producto} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Sección de ventajas */}
      <motion.section 
        className="py-8 bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-center">¿Por qué comprar en RepliTemu?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div 
              className="bg-gray-50 p-6 rounded-lg text-center"
              whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="text-4xl mb-4 text-red-600 mx-auto">🚚</div>
              <h3 className="text-xl font-bold mb-2">Envío rápido</h3>
              <p className="text-gray-600">Entrega en 24-48 horas en pedidos realizados antes de las 17:00</p>
            </motion.div>
            
            <motion.div 
              className="bg-gray-50 p-6 rounded-lg text-center"
              whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="text-4xl mb-4 text-red-600 mx-auto">💰</div>
              <h3 className="text-xl font-bold mb-2">Mejores precios</h3>
              <p className="text-gray-600">Garantizamos los precios más bajos del mercado en todos nuestros productos</p>
            </motion.div>
            
            <motion.div 
              className="bg-gray-50 p-6 rounded-lg text-center"
              whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="text-4xl mb-4 text-red-600 mx-auto">⭐</div>
              <h3 className="text-xl font-bold mb-2">Calidad garantizada</h3>
              <p className="text-gray-600">Todos nuestros productos pasan por estrictos controles de calidad</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Footer con newsletter */}
      <motion.footer 
        className="bg-gray-800 text-white py-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-xl font-bold mb-4">¡Suscríbete a nuestra newsletter!</h3>
              <p className="mb-4 text-gray-300">Recibe las mejores ofertas y novedades directamente en tu email.</p>
              
              <form className="flex">
                <input 
                  type="email" 
                  placeholder="Tu email" 
                  className="flex-grow px-4 py-2 rounded-l-lg focus:outline-none text-gray-800" 
                />
                <motion.button 
                  type="submit" 
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-r-lg font-medium transition-colors duration-200"
                  whileHover={{ backgroundColor: '#e53e3e' }}
                  whileTap={{ scale: 0.95 }}
                >
                  Suscribirse
                </motion.button>
              </form>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-2 gap-4"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div>
                <h4 className="font-bold mb-4">Enlaces rápidos</h4>
                <ul className="space-y-2">
                  <li><Link href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Sobre nosotros</Link></li>
                  <li><Link href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Contacto</Link></li>
                  <li><Link href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Ayuda & FAQ</Link></li>
                  <li><Link href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Política de privacidad</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">Categorías</h4>
                <ul className="space-y-2">
                  <li><Link href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Electrónica</Link></li>
                  <li><Link href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Moda</Link></li>
                  <li><Link href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Hogar</Link></li>
                  <li><Link href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Belleza</Link></li>
                </ul>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            className="pt-6 mt-6 border-t border-gray-700 text-center text-gray-400 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <p>© 2023 RepliTemu. Todos los derechos reservados.</p>
          </motion.div>
    </div>
      </motion.footer>
    </main>
  )
}
