'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FiShoppingCart, FiHeart, FiShare2, FiArrowLeft, FiStar, FiTruck, FiShield } from 'react-icons/fi'

// Productos de ejemplo
const productosEjemplo = [
  {
    id: 1,
    nombre: 'Auriculares Bluetooth',
    precio: 19.99,
    precioAnterior: 39.99,
    imagen: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D',
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
    imagen: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D',
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
  // Más productos...
];

export default function ProductDetail({ params }) {
  const router = useRouter();
  const { productId } = params;
  
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