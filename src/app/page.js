'use client'

import Header from '@/components/Header'
import ProductCard from '@/components/ProductCard'
import CategoryNav from '@/components/CategoryNav'
import Footer from '@/components/Footer'
import { useState } from 'react'

// Datos de ejemplo para desarrollo
const productosEjemplo = [
  {
    id: 1,
    nombre: "Auriculares Bluetooth Inalámbricos",
    descripcion: "Auriculares con cancelación de ruido, resistentes al agua y larga duración de batería",
    precio: 29.99,
    imagen_url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
    original_price: 39.99,
    discount_percentage: 25,
    sales_count: 1245,
    categorias: { nombre: "Electrónica" }
  },
  {
    id: 2,
    nombre: "Vestido de Verano Floral",
    descripcion: "Vestido ligero con estampado floral, perfecto para el verano",
    precio: 19.50,
    imagen_url: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300&h=300&fit=crop",
    original_price: 35.00,
    discount_percentage: 44,
    sales_count: 879,
    categorias: { nombre: "Moda de Mujer" }
  },
  {
    id: 3,
    nombre: "Organizador de Maquillaje",
    descripcion: "Organizador de acrílico transparente con múltiples compartimentos",
    precio: 15.99,
    imagen_url: "https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=300&h=300&fit=crop",
    original_price: 24.99,
    discount_percentage: 36,
    sales_count: 567,
    categorias: { nombre: "Belleza y Salud" }
  },
  {
    id: 4,
    nombre: "Camiseta Deportiva Hombre",
    descripcion: "Camiseta transpirable de secado rápido para entrenamiento",
    precio: 12.99,
    imagen_url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop",
    original_price: 18.99,
    discount_percentage: 32,
    sales_count: 423,
    categorias: { nombre: "Moda de Hombre" }
  },
  {
    id: 5,
    nombre: "Lámpara LED de Escritorio",
    descripcion: "Lámpara con control táctil, 3 modos de luz y puerto USB",
    precio: 24.50,
    imagen_url: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=300&h=300&fit=crop",
    original_price: 32.99,
    discount_percentage: 26,
    sales_count: 298,
    categorias: { nombre: "Hogar y Jardín" }
  },
  {
    id: 6,
    nombre: "Peluche Oso de Felpa",
    descripcion: "Oso de peluche suave de 40cm, ideal para regalo",
    precio: 18.75,
    imagen_url: "https://images.unsplash.com/photo-1559715541-5daf8a0296d0?w=300&h=300&fit=crop",
    original_price: 25.00,
    discount_percentage: 25,
    sales_count: 187,
    categorias: { nombre: "Juguetes" }
  },
  {
    id: 7,
    nombre: "Botella de Agua Deportiva",
    descripcion: "Botella de acero inoxidable, mantiene bebidas frías por 24h",
    precio: 14.99,
    imagen_url: "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=300&h=300&fit=crop",
    original_price: 22.99,
    discount_percentage: 35,
    sales_count: 356,
    categorias: { nombre: "Deportes" }
  },
  {
    id: 8,
    nombre: "Smartwatch Resistente al Agua",
    descripcion: "Reloj inteligente con monitor cardíaco y notificaciones",
    precio: 45.99,
    imagen_url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
    original_price: 69.99,
    discount_percentage: 34,
    sales_count: 789,
    categorias: { nombre: "Electrónica" }
  },
  {
    id: 9,
    nombre: "Bolso Bandolera de Cuero",
    descripcion: "Bolso elegante con múltiples compartimentos y correa ajustable",
    precio: 32.50,
    imagen_url: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300&h=300&fit=crop",
    original_price: 49.99,
    discount_percentage: 35,
    sales_count: 245,
    categorias: { nombre: "Moda de Mujer" }
  },
  {
    id: 10,
    nombre: "Set de Sartenes Antiadherentes",
    descripcion: "Juego de 3 sartenes con revestimiento antiadherente",
    precio: 38.75,
    imagen_url: "https://images.unsplash.com/photo-1585837575652-267cbc187fc3?w=300&h=300&fit=crop",
    original_price: 59.99,
    discount_percentage: 35,
    sales_count: 178,
    categorias: { nombre: "Hogar y Jardín" }
  },
  {
    id: 11,
    nombre: "Zapatillas Running Hombre",
    descripcion: "Zapatillas ligeras con amortiguación y suela antideslizante",
    precio: 42.99,
    imagen_url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop",
    original_price: 64.99,
    discount_percentage: 34,
    sales_count: 432,
    categorias: { nombre: "Deportes" }
  },
  {
    id: 12,
    nombre: "Crema Hidratante Facial",
    descripcion: "Crema con ácido hialurónico y vitamina E para todo tipo de piel",
    precio: 16.50,
    imagen_url: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=300&h=300&fit=crop",
    original_price: 24.99,
    discount_percentage: 34,
    sales_count: 567,
    categorias: { nombre: "Belleza y Salud" }
  }
]

export default function Home() {
  // Por ahora usamos los datos de ejemplo en lugar de cargar de Supabase
  const [products] = useState(productosEjemplo)
  const [loading] = useState(false)
  const [error] = useState(null)

  // Usamos los datos de ejemplo para las secciones
  const flashDealsProducts = products.slice(0, 8)
  const mainProducts = products.slice(0) // Mostramos todos los productos en la sección principal

  if (loading) {
    return <p className="text-center mt-8">Cargando productos...</p>
  }

  if (error) {
    return <p className="text-center text-red-500 mt-8">{error}</p>
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header />
      <CategoryNav />

      {/* Temu-like Hero/Banner Section - Styled based on the Black Friday image */}
      {/* This section would ideally be a dynamic carousel or distinct promotional blocks */}
      <section className="bg-gradient-to-b from-red-700 to-red-900 text-white py-12 md:py-20 relative overflow-hidden border-b-4 border-orange-400">
        {/* Background elements (simplified placeholders) */}
        <div className="absolute inset-0 z-0 opacity-30" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/confetti-transparent.png')", backgroundSize: 'cover' }}></div>
         {/* More specific background elements like large bokeh/circles would require actual image assets or complex CSS/SVG */}

        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-2 animate-fade-in-down drop-shadow-lg">AHORRA EN GRANDE</h2>
          <h3 className="text-2xl md:text-4xl font-bold mb-8 animate-fade-in-up text-orange-300 drop-shadow-lg">EN LA <span className="text-orange-400">SEMANA BLACK</span></h3>

          {/* Placeholder for dynamic banner images or content - could be carousels or specific promotions */}
           {/* Replace with a dedicated Banner Carousel component later (needs Client Component) */}
           <div className="mt-8 flex justify-center items-center space-x-4 md:space-x-8 overflow-x-auto pb-4 no-scrollbar scrollbar-hide">
               {/* Imágenes de banner reales */}
               <img src="/banners/moda-banner.jpg" alt="Banner Moda" className="rounded-lg shadow-lg flex-shrink-0 w-4/5 md:w-1/3 max-w-sm" />
               <img src="/banners/electronica-banner.jpg" alt="Banner Electronica" className="rounded-lg shadow-lg flex-shrink-0 w-4/5 md:w-1/3 max-w-sm" />
               <img src="/banners/hogar-banner.jpg" alt="Banner Hogar" className="rounded-lg shadow-lg flex-shrink-0 w-4/5 md:w-1/3 max-w-sm" />
           </div>
           {/* Placeholder for Call to Action Button */}
            <button className="mt-10 px-8 py-3 bg-orange-500 text-white text-xl font-bold rounded-full shadow-lg hover:bg-orange-600 transition duration-300 animate-pulse">{'COMPRA YA >'}</button>
           {/* Add more visual elements like gift boxes, sparks etc. using absolute positioning and images/SVGs */}
            {/* Placeholder gift box 1 */}
            <img src="https://via.placeholder.com/80x80?text=Gift" alt="Gift Box" className="absolute bottom-10 left-5 md:left-10 w-16 h-16 md:w-20 md:h-20 object-contain transform rotate-12 opacity-90 hidden sm:block" />
             {/* Placeholder gift box 2 */}
            <img src="https://via.placeholder.com/80x80?text=Gift" alt="Gift Box" className="absolute top-10 right-5 md:right-10 w-14 h-14 md:w-16 md:h-16 object-contain transform -rotate-6 opacity-90 hidden sm:block" />

        </div>
      </section>

      {/* Temu-like Info Bar */}
      <section className="bg-green-600 text-white py-2.5 shadow-md">
         <div className="container mx-auto flex flex-wrap items-center justify-around text-sm text-center">
            <span className="flex items-center justify-center w-1/2 md:w-auto mb-2 md:mb-0"><span className="mr-1 text-lg">✅</span> ¿Por qué elegir RepliTemu?</span>
            <span className="flex items-center justify-center w-1/2 md:w-auto mb-2 md:mb-0"><span className="mr-1 text-lg">🔒</span> Privacidad segura</span>
            <span className="flex items-center justify-center w-1/2 md:w-auto"><span className="mr-1 text-lg">💳</span> Pagos seguros</span>
            <span className="flex items-center justify-center w-1/2 md:w-auto"><span className="mr-1 text-lg">🚚</span> Entrega garantizada</span>
            <span className="flex items-center cursor-pointer hover:underline">Ver <span className="ml-1">→</span></span>
         </div>
      </section>

      {/* Temu-like Flash Deals Section */}
      {flashDealsProducts.length > 0 && (
       <section className="container mx-auto mt-6 px-4">
           <h2 className="text-2xl font-bold mb-4 text-gray-800">✨ Ofertas relámpago <span className="text-orange-500 font-semibold text-lg">Por tiempo limitado</span></h2>
           {/* This grid could also be a horizontal scrollable list for a more Temu-like feel on mobile */}
           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
               {/* Map flash deals products here */} 
               {flashDealsProducts.map((product) => (
                 <ProductCard key={`flash-${product.id}`} product={product} />
               ))}
           </div>
       </section>
        )}

      {/* Main Products Grid */}
       {mainProducts.length > 0 && (
         <div className="container mx-auto p-4 mt-4 flex-grow">
           <h2 className="text-2xl font-bold mb-4 text-gray-800">Productos populares</h2>
           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
             {mainProducts.map((product) => (
               <ProductCard key={product.id} product={product} />
             ))}
           </div>
         </div>
       )}

      <Footer />
    </div>
  )
}
