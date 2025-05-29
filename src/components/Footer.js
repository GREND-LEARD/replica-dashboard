import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 pt-10 pb-6 mt-12 border-t border-gray-200">
      <div className="container mx-auto px-4">
        {/* App Download Section - Common on Temu */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 p-4 bg-white rounded-lg shadow-sm">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-bold mb-2">¡Descarga la app de RepliTemu!</h3>
            <p className="text-sm text-gray-600">Compra más rápido y recibe notificaciones exclusivas</p>
          </div>
          <div className="flex space-x-4">
            <button className="bg-black text-white px-4 py-2 rounded-lg flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" />
              </svg>
              App Store
            </button>
            <button className="bg-black text-white px-4 py-2 rounded-lg flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM5.94 5.5c.944-.945 2.56-.276 2.56 1.06V10l5.5-5.5a8.002 8.002 0 00-8.06 1z" clipRule="evenodd" />
              </svg>
              Google Play
            </button>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Section 1: About */}
          <div>
            <h4 className="text-gray-900 text-lg font-semibold mb-4">Sobre RepliTemu</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-600 hover:text-orange-500 transition-colors duration-200">Quiénes Somos</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-orange-500 transition-colors duration-200">Carreras</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-orange-500 transition-colors duration-200">Prensa</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-orange-500 transition-colors duration-200">Blog</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-orange-500 transition-colors duration-200">Contacto</Link></li>
            </ul>
          </div>

          {/* Section 2: Customer Service */}
          <div>
            <h4 className="text-gray-900 text-lg font-semibold mb-4">Servicio al Cliente</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-600 hover:text-orange-500 transition-colors duration-200">Ayuda y Soporte</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-orange-500 transition-colors duration-200">Envíos</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-orange-500 transition-colors duration-200">Devoluciones</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-orange-500 transition-colors duration-200">Métodos de Pago</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-orange-500 transition-colors duration-200">Preguntas Frecuentes</Link></li>
            </ul>
          </div>

          {/* Section 3: Policies */}
          <div>
            <h4 className="text-gray-900 text-lg font-semibold mb-4">Políticas</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-600 hover:text-orange-500 transition-colors duration-200">Política de Privacidad</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-orange-500 transition-colors duration-200">Términos y Condiciones</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-orange-500 transition-colors duration-200">Política de Cookies</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-orange-500 transition-colors duration-200">Política de Devoluciones</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-orange-500 transition-colors duration-200">Accesibilidad</Link></li>
            </ul>
          </div>

          {/* Section 4: Connect */}
          <div>
            <h4 className="text-gray-900 text-lg font-semibold mb-4">Conéctate con Nosotros</h4>
            {/* Social media links with icons */}
            <div className="flex space-x-4 mb-4">
              <Link href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </Link>
              <Link href="#" className="text-gray-600 hover:text-pink-600 transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </Link>
              <Link href="#" className="text-gray-600 hover:text-blue-400 transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </Link>
            </div>
            
            {/* Newsletter Signup */}
            <h5 className="text-gray-900 font-medium mb-2">Suscríbete a nuestro boletín</h5>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Tu correo electrónico" 
                className="px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-orange-500 flex-grow"
              />
              <button 
                type="submit" 
                className="bg-orange-500 text-white px-4 py-2 rounded-r-lg hover:bg-orange-600 transition-colors duration-200"
              >
                Suscribir
              </button>
            </form>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h5 className="text-gray-900 font-medium mb-3">Métodos de Pago Aceptados</h5>
          <div className="flex flex-wrap gap-2">
            <div className="bg-white p-2 rounded border border-gray-200">Visa</div>
            <div className="bg-white p-2 rounded border border-gray-200">MasterCard</div>
            <div className="bg-white p-2 rounded border border-gray-200">PayPal</div>
            <div className="bg-white p-2 rounded border border-gray-200">Apple Pay</div>
            <div className="bg-white p-2 rounded border border-gray-200">Google Pay</div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-600">
          <p>© 2023 RepliTemu. Todos los derechos reservados.</p>
          <p className="mt-2">RepliTemu es un proyecto de demostración y no está afiliado con Temu.</p>
        </div>
      </div>
    </footer>
  );
}