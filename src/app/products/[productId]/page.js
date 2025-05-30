'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FiShoppingCart, FiHeart, FiShare2, FiArrowLeft, FiStar, FiTruck, FiShield } from 'react-icons/fi'
import React from 'react'

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
    descripcion: 'Auriculares Bluetooth con cancelación de ruido, resistentes al agua y larga duración de batería. Perfectos para deportes y uso diario.',
    caracteristicas: [
      'Bluetooth 5.0',
      'Cancelación de ruido',
      'Resistente al agua IPX7',
      'Batería de 20 horas',
      'Micrófono incorporado'
    ],
    colores: ['Negro', 'Blanco', 'Azul'],
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
    descripcion: 'Smartwatch con monitor de ritmo cardíaco, contador de pasos, notificaciones y múltiples modos deportivos. Resistente al agua y con pantalla táctil a color.',
    caracteristicas: [
      'Pantalla táctil a color',
      'Monitor de ritmo cardíaco',
      'Resistente al agua IP68',
      'Batería de 7 días',
      'Múltiples modos deportivos'
    ],
    colores: ['Negro', 'Plata', 'Rosa'],
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
    descripcion: 'Cargador inalámbrico rápido compatible con múltiples dispositivos. Diseño compacto y elegante, ideal para el hogar o la oficina.',
    caracteristicas: [
      'Carga rápida de 15W',
      'Compatible con Qi',
      'Indicador LED',
      'Protección contra sobrecalentamiento'
    ],
    colores: ['Negro', 'Blanco'],
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
    descripcion: 'Funda de silicona suave para iPhone con ajuste perfecto y protección contra caídas. Disponible en varios colores vibrantes.',
    caracteristicas: [
      'Material de silicona suave',
      'Protección contra caídas',
      'Acceso a todos los puertos',
      'Acabado antideslizante'
    ],
    colores: ['Rojo', 'Azul', 'Verde', 'Rosa', 'Negro'],
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
    descripcion: 'Lámpara LED de escritorio con brazos ajustables y múltiples niveles de brillo. Ideal para leer, estudiar o trabajar.',
    caracteristicas: [
      'Iluminación LED regulable',
      'Brazos ajustables',
      'Base estable',
      'Bajo consumo de energía'
    ],
    colores: ['Negro', 'Blanco', 'Plata'],
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
    descripcion: 'Mochila impermeable duradera con múltiples compartimentos. Perfecta para viajes, senderismo o uso diario en cualquier clima.',
    caracteristicas: [
      'Material impermeable',
      'Gran capacidad',
      'Correas acolchadas',
      'Compartimento para laptop'
    ],
    colores: ['Negro', 'Azul Marino', 'Gris'],
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
    descripcion: 'Teclado mecánico con retroiluminación RGB personalizable y switches táctiles. Ideal para gaming y escritura.',
    caracteristicas: [
      'Switches mecánicos',
      'Retroiluminación RGB',
      'Anti-ghosting',
      'Diseño duradero'
    ],
    colores: ['Negro', 'Blanco'],
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
    descripcion: 'Botella de agua térmica de doble pared que mantiene tus bebidas frías o calientes por horas. Ideal para llevar al gimnasio, oficina o exteriores.',
    caracteristicas: [
      'Aislamiento de doble pared',
      'Acero inoxidable',
      'Libre de BPA',
      'Capacidad de 500ml'
    ],
    colores: ['Negro', 'Plata', 'Azul', 'Rosa'],
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
    descripcion: 'Zapatillas deportivas ligeras y transpirables para correr y entrenar. Suela con gran amortiguación para mayor comodidad.',
    caracteristicas: [
      'Tejido transpirable',
      'Suela con amortiguación',
      'Diseño ligero',
      'Ajuste cómodo'
    ],
    colores: ['Negro', 'Blanco', 'Rojo'],
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
    descripcion: 'Organizador multifuncional para mantener tu escritorio ordenado. Múltiples compartimentos para bolígrafos, notas y pequeños accesorios.',
    caracteristicas: [
      'Múltiples compartimentos',
      'Material resistente',
      'Diseño compacto',
      'Ideal para oficina y hogar'
    ],
    colores: ['Negro', 'Blanco', 'Gris'],
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
    descripcion: 'Altavoz Bluetooth con sonido potente y batería de larga duración. Resistente al agua, perfecto para exteriores y fiestas.',
    caracteristicas: [
      'Sonido de alta fidelidad',
      'Bluetooth 5.0',
      'Batería de 15 horas',
      'Resistente al agua IPX6'
    ],
    colores: ['Negro', 'Azul', 'Rojo'],
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
    descripcion: 'Set completo de pinceles de maquillaje profesionales para rostro y ojos. Cerdas suaves y de alta calidad para una aplicación perfecta.',
    caracteristicas: [
      'Set de 12 pinceles',
      'Cerdas sintéticas',
      'Mango ergonómico',
      'Incluye estuche de viaje'
    ],
    colores: ['Rosa', 'Negro', 'Blanco'],
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
    descripcion: 'Silla de oficina ergonómica con soporte lumbar ajustable y reposacabezas. Ideal para largas horas de trabajo.',
    caracteristicas: [
      'Soporte lumbar ajustable',
      'Reposacabezas',
      'Altura regulable',
      'Base giratoria'
    ],
    colores: ['Negro', 'Gris'],
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
    descripcion: 'Mesa auxiliar moderna ideal para la sala o como mesita de noche. Diseño minimalista y fácil montaje.',
    caracteristicas: [
      'Diseño moderno',
      'Material resistente',
      'Fácil montaje',
      'Tamaño compacto'
    ],
    colores: ['Blanco', 'Negro', 'Madera'],
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
    descripcion: 'Kit de herramientas básicas para reparaciones en el hogar. Incluye martillo, destornilladores, alicates y cinta métrica.',
    caracteristicas: [
      'Kit de 18 piezas',
      'Estuche organizador',
      'Herramientas duraderas',
      'Ideal para el hogar'
    ],
    colores: ['Rojo', 'Azul'],
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
    descripcion: 'Set de 3 sartenes antiadherentes de diferentes tamaños. Cocina sin que se pegue y limpia fácilmente.',
    caracteristicas: [
      'Set de 3 sartenes',
      'Recubrimiento antiadherente',
      'Mangos ergonómicos',
      'Aptas para lavavajillas'
    ],
    colores: ['Negro', 'Gris'],
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
    descripcion: 'Set de cuchillos de cocina de acero inoxidable de alta calidad. Incluye cuchillo de chef, pan, multiusos y pelador.',
    caracteristicas: [
      'Acero inoxidable',
      'Mango ergonómico',
      'Alta precisión',
      'Fácil de afilar'
    ],
    colores: ['Plata'],
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
    descripcion: 'Tabla de cortar de bambú ecológica y duradera. Superficie resistente a cortes y fácil de limpiar.',
    caracteristicas: [
      'Material de bambú',
      'Resistente a cortes',
      'Fácil de limpiar',
      'Ecológica'
    ],
    colores: ['Bambú'],
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
    descripcion: 'Soporte ajustable para laptop que mejora la postura y ventilación. Ligero y portátil.',
    caracteristicas: [
      'Altura ajustable',
      'Diseño plegable',
      'Mejora la ventilación',
      'Material de aluminio'
    ],
    colores: ['Plata', 'Gris'],
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
    descripcion: 'Webcam con resolución Full HD 1080p para videollamadas nítidas. Micrófono incorporado y fácil instalación.',
    caracteristicas: [
      'Resolución 1080p',
      'Micrófono integrado',
      'Clip universal',
      'Plug and Play'
    ],
    colores: ['Negro'],
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
    descripcion: 'Ratón inalámbrico con diseño ergonómico para comodidad durante todo el día. Conexión USB estable.',
    caracteristicas: [
      'Diseño ergonómico',
      'Conexión inalámbrica 2.4GHz',
      'Sensor óptico preciso',
      'Compatible con Windows y Mac'
    ],
    colores: ['Negro', 'Gris'],
    calificacion: 4.5,
    opiniones: 110
  },
];

export default function ProductDetail({ params }) {
  const router = useRouter();
  
  // Usar React.use() para acceder a los parámetros de forma segura
  const unwrappedParams = React.use(params);
  const { productId } = unwrappedParams;
  
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [colorSeleccionado, setColorSeleccionado] = useState('');
  const [imagenPrincipal, setImagenPrincipal] = useState('');
  const [productosRelacionados, setProductosRelacionados] = useState([]);

  useEffect(() => {
    // Simulamos la carga de datos
    const fetchProducto = () => {
      setLoading(true);
      try {
        // Convertimos el ID a número para buscar en el array
        const id = parseInt(productId);
        const productoEncontrado = productosEjemplo.find(p => p.id === id);
        
        if (productoEncontrado) {
          setProducto(productoEncontrado);
          setImagenPrincipal(productoEncontrado.imagen);
          if (productoEncontrado.colores && productoEncontrado.colores.length > 0) {
            setColorSeleccionado(productoEncontrado.colores[0]);
          }
          
          // Simulamos productos relacionados (simplemente otros productos del array)
          setProductosRelacionados(productosEjemplo.filter(p => p.id !== id).slice(0, 4));
        } else {
          setError('Producto no encontrado');
        }
      } catch (err) {
        setError('Error al cargar el producto: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducto();
  }, [productId]);

  const handleCantidadChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= 10) {
      setCantidad(value);
    }
  };

  const incrementarCantidad = () => {
    if (cantidad < 10) {
      setCantidad(cantidad + 1);
    }
  };

  const decrementarCantidad = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  };

  const handleColorChange = (color) => {
    setColorSeleccionado(color);
  };

  const handleAddToCart = () => {
    // Aquí iría la lógica para añadir al carrito
    alert(`Añadido al carrito: ${cantidad} unidades de ${producto.nombre} en color ${colorSeleccionado}`);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-screen">
        <motion.div 
          className="w-16 h-16 border-t-4 border-red-600 border-solid rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-700 mb-6">{error}</p>
          <button 
            onClick={() => router.push('/')}
            className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition-colors duration-300"
          >
            Volver a la página principal
          </button>
        </motion.div>
      </div>
    );
  }

  if (!producto) {
    return null;
  }

  // Calculamos el precio total
  const precioTotal = (producto.precio * cantidad).toFixed(2);

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Barra de navegación superior */}
      <div className="bg-white shadow-sm py-3 sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center">
            <motion.button 
              onClick={() => router.push('/')}
              className="mr-4 text-gray-600 hover:text-red-600 transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiArrowLeft className="w-5 h-5" />
            </motion.button>
            <h1 className="text-lg font-medium truncate">{producto.nombre}</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="md:flex">
            {/* Columna de imágenes */}
            <div className="md:w-1/2 p-4">
              <motion.div 
                className="relative h-80 md:h-96 bg-gray-100 rounded-lg overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Image 
                  src={imagenPrincipal} 
                  alt={producto.nombre}
                  fill
                  style={{ objectFit: 'contain' }}
                  className="p-4"
                />
                
                {/* Badge de descuento */}
                {producto.descuento > 0 && (
                  <motion.div 
                    className="absolute top-4 left-4 bg-red-600 text-white text-sm font-bold px-2 py-1 rounded-md"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: 'spring' }}
                  >
                    -{producto.descuento}%
                  </motion.div>
                )}
              </motion.div>
              
              {/* Acciones rápidas */}
              <motion.div 
                className="flex justify-center space-x-4 mt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200">
                  <FiHeart className="w-6 h-6 text-gray-600" />
                </button>
                <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200">
                  <FiShare2 className="w-6 h-6 text-gray-600" />
                </button>
              </motion.div>
            </div>
            
            {/* Columna de información */}
            <div className="md:w-1/2 p-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-2xl font-bold text-gray-800 mb-2">{producto.nombre}</h1>
                
                {/* Calificación y ventas */}
                <div className="flex items-center mb-4">
                  <div className="flex items-center mr-4">
                    <FiStar className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="ml-1 text-sm font-medium">{producto.calificacion}</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {producto.opiniones} opiniones | {producto.ventas} vendidos
                  </div>
                </div>
                
                {/* Precios */}
                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-red-600">${producto.precio}</span>
                    {producto.precioAnterior && (
                      <span className="ml-2 text-gray-500 line-through">${producto.precioAnterior}</span>
                    )}
                  </div>
                  {producto.envioGratis && (
                    <div className="mt-1 text-green-600 text-sm font-medium flex items-center">
                      <FiTruck className="mr-1" /> Envío gratis
                    </div>
                  )}
                </div>
                
                {/* Descripción */}
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-2">Descripción</h2>
                  <p className="text-gray-700">{producto.descripcion}</p>
                </div>
                
                {/* Selección de color */}
                {producto.colores && producto.colores.length > 0 && (
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-2">Color</h2>
                    <div className="flex space-x-2">
                      {producto.colores.map((color) => (
                        <motion.button
                          key={color}
                          className={`px-3 py-1 border rounded-md ${colorSeleccionado === color ? 'border-red-600 bg-red-50' : 'border-gray-300'}`}
                          onClick={() => handleColorChange(color)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {color}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Cantidad */}
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-2">Cantidad</h2>
                  <div className="flex items-center">
                    <motion.button 
                      className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-l-md bg-gray-100"
                      onClick={decrementarCantidad}
                      whileTap={{ scale: 0.9 }}
                      disabled={cantidad <= 1}
                    >
                      -
                    </motion.button>
                    <input 
                      type="number" 
                      min="1" 
                      max="10" 
                      value={cantidad} 
                      onChange={handleCantidadChange}
                      className="w-12 h-8 text-center border-t border-b border-gray-300 focus:outline-none"
                    />
                    <motion.button 
                      className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-r-md bg-gray-100"
                      onClick={incrementarCantidad}
                      whileTap={{ scale: 0.9 }}
                      disabled={cantidad >= 10}
                    >
                      +
                    </motion.button>
                  </div>
                </div>
                
                {/* Precio total */}
                <div className="mb-6">
                  <h2 className="text-lg font-semibold">Total</h2>
                  <div className="text-2xl font-bold text-red-600">${precioTotal}</div>
                </div>
                
                {/* Botones de acción */}
                <div className="flex space-x-4">
                  <motion.button 
                    className="flex-1 bg-red-600 text-white py-3 rounded-full font-bold flex items-center justify-center"
                    onClick={handleAddToCart}
                    whileHover={{ backgroundColor: '#e53e3e' }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FiShoppingCart className="mr-2" />
                    Añadir al carrito
                  </motion.button>
                  <motion.button 
                    className="flex-1 border border-red-600 text-red-600 py-3 rounded-full font-bold"
                    whileHover={{ backgroundColor: '#fff5f5' }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Comprar ahora
                  </motion.button>
                </div>
                
                {/* Garantía */}
                <motion.div 
                  className="mt-6 flex items-center text-sm text-gray-600"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <FiShield className="mr-2" />
                  Garantía de devolución de 30 días
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* Características del producto */}
        {producto.caracteristicas && producto.caracteristicas.length > 0 && (
          <motion.div 
            className="mt-8 bg-white rounded-lg shadow-sm p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h2 className="text-xl font-bold mb-4">Características</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {producto.caracteristicas.map((caracteristica, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-center text-gray-700"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + (index * 0.1), duration: 0.3 }}
                >
                  <span className="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
                  {caracteristica}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
        
        {/* Productos relacionados */}
        {productosRelacionados.length > 0 && (
          <motion.div 
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h2 className="text-xl font-bold mb-4">También te puede interesar</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {productosRelacionados.map((producto) => (
                <motion.div 
                  key={producto.id} 
                  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
                  whileHover={{ y: -5 }}
                >
                  <Link href={`/products/${producto.id}`}>
                    <div className="relative h-40 bg-gray-100">
                      <Image 
                        src={producto.imagen} 
                        alt={producto.nombre}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                      {producto.descuento > 0 && (
                        <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                          -{producto.descuento}%
                        </div>
                      )}
                    </div>
                    <div className="p-3">
                      <h3 className="text-sm font-medium text-gray-800 line-clamp-2">{producto.nombre}</h3>
                      <div className="mt-2 flex items-baseline">
                        <span className="text-lg font-bold text-red-600">${producto.precio}</span>
                        {producto.precioAnterior && (
                          <span className="ml-1 text-xs text-gray-500 line-through">${producto.precioAnterior}</span>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}