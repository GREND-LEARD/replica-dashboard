import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-50 text-gray-800 pt-10 pb-6 mt-12 border-t border-gray-200">
      <div className="container mx-auto px-4">
        {/* App Download Section */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 p-4 bg-orange-50 rounded-lg shadow-sm">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-bold text-orange-600 mb-2">¡Descarga la app de RepliTemu!</h3>
            <p className="text-sm text-gray-700">Compra más rápido y recibe notificaciones exclusivas</p>
          </div>
          <div className="flex space-x-4">
            <button className="bg-black text-white px-4 py-2 rounded-lg flex items-center hover:bg-gray-900 transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" />
              </svg>
              App Store
            </button>
            <button className="bg-black text-white px-4 py-2 rounded-lg flex items-center hover:bg-gray-900 transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM5.94 5.5c.944-.945 2.56-.276 2.56 1.06V10l5.5-5.5a8.002 8.002 0 00-8.06 1z" clipRule="evenodd" />
              </svg>
              Google Play
            </button>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Section 1 */}
          <div>
            <h4 className="text-orange-700 text-lg font-semibold mb-4">Sobre RepliTemu</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-700 hover:text-orange-600 transition">Quiénes Somos</Link></li>
              <li><Link href="#" className="text-gray-700 hover:text-orange-600 transition">Carreras</Link></li>
              <li><Link href="#" className="text-gray-700 hover:text-orange-600 transition">Prensa</Link></li>
              <li><Link href="#" className="text-gray-700 hover:text-orange-600 transition">Blog</Link></li>
              <li><Link href="#" className="text-gray-700 hover:text-orange-600 transition">Contacto</Link></li>
            </ul>
          </div>

          {/* Section 2 */}
          <div>
            <h4 className="text-orange-700 text-lg font-semibold mb-4">Servicio al Cliente</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-700 hover:text-orange-600 transition">Ayuda y Soporte</Link></li>
              <li><Link href="#" className="text-gray-700 hover:text-orange-600 transition">Envíos</Link></li>
              <li><Link href="#" className="text-gray-700 hover:text-orange-600 transition">Devoluciones</Link></li>
              <li><Link href="#" className="text-gray-700 hover:text-orange-600 transition">Métodos de Pago</Link></li>
              <li><Link href="#" className="text-gray-700 hover:text-orange-600 transition">Preguntas Frecuentes</Link></li>
            </ul>
          </div>

          {/* Section 3 */}
          <div>
            <h4 className="text-orange-700 text-lg font-semibold mb-4">Políticas</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-700 hover:text-orange-600 transition">Política de Privacidad</Link></li>
              <li><Link href="#" className="text-gray-700 hover:text-orange-600 transition">Términos y Condiciones</Link></li>
              <li><Link href="#" className="text-gray-700 hover:text-orange-600 transition">Política de Cookies</Link></li>
              <li><Link href="#" className="text-gray-700 hover:text-orange-600 transition">Política de Devoluciones</Link></li>
              <li><Link href="#" className="text-gray-700 hover:text-orange-600 transition">Accesibilidad</Link></li>
            </ul>
          </div>

          {/* Section 4 */}
          <div>
            <h4 className="text-orange-700 text-lg font-semibold mb-4">Conéctate con Nosotros</h4>
            <div className="flex space-x-4 mb-4">
              <Link href="#" className="text-gray-600 hover:text-blue-600 transition"><svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="..." /></svg></Link>
              <Link href="#" className="text-gray-600 hover:text-pink-600 transition"><svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="..." /></svg></Link>
              <Link href="#" className="text-gray-600 hover:text-sky-500 transition"><svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="..." /></svg></Link>
            </div>
            <h5 className="text-gray-800 font-medium mb-2">Suscríbete a nuestro boletín</h5>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Tu correo electrónico" 
                className="px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-orange-500 flex-grow"
              />
              <button 
                type="submit" 
                className="bg-orange-600 text-white px-4 py-2 rounded-r-lg hover:bg-orange-700 transition"
              >
                Suscribir
              </button>
            </form>
          </div>
        </div>

        {/* Payments */}
        <div className="mt-10 pt-6 border-t border-gray-200">
          <h5 className="text-orange-700 font-medium mb-3">Métodos de Pago Aceptados</h5>
          <div className="flex flex-wrap gap-2">
            {['Visa', 'MasterCard', 'PayPal', 'Apple Pay', 'Google Pay'].map(method => (
              <div key={method} className="bg-white text-gray-700 px-3 py-1 rounded border border-gray-300 text-sm">{method}</div>
            ))}
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-600">
          <p>© 2023 RepliTemu. Todos los derechos reservados.</p>
          <p className="mt-2 text-gray-500">RepliTemu es un proyecto de demostración y no está afiliado con Temu.</p>
        </div>
      </div>
    </footer>
  )
}
