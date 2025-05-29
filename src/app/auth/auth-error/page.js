'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function AuthError() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-orange-50">
      <div className="w-full max-w-md px-8 py-8 mt-4 text-left bg-white shadow-xl rounded-xl">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <Image src="/temu.jpg" alt="Temu Logo" width={60} height={60} className="mx-auto" />
          </Link>
          <h3 className="text-3xl font-bold text-orange-600">Error de Autenticación</h3>
          <p className="text-gray-500 mt-2">Ha ocurrido un error durante el proceso de autenticación</p>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-gray-700 mb-4">
            Lo sentimos, ha ocurrido un problema durante el proceso de autenticación. 
            Por favor, intenta nuevamente.
          </p>
          
          <div className="flex flex-col space-y-3 mt-6">
            <Link 
              href="/login" 
              className="px-4 py-3 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-all duration-200"
            >
              Volver a Iniciar Sesión
            </Link>
            
            <Link 
              href="/registro" 
              className="px-4 py-3 bg-white text-orange-600 border border-orange-600 rounded-md hover:bg-orange-50 transition-all duration-200"
            >
              Crear una Cuenta
            </Link>
            
            <Link 
              href="/" 
              className="px-4 py-3 text-gray-600 hover:text-orange-600 transition-all duration-200"
            >
              Volver al Inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}