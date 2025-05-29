'use client'

import { useState } from 'react'
import { createClientClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

export default function Registro() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)
  const router = useRouter()
  const supabase = createClientClient()

  const handleSignUp = async (e) => {
    e.preventDefault()
    setError(null)
    setMessage(null)

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      setError(error.message)
    } else {
      setMessage('¡Revisa tu email para confirmar tu cuenta!')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-orange-50">
      <div className="w-full max-w-md px-8 py-8 mt-4 text-left bg-white shadow-xl rounded-xl">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <Image src="/temu.jpg" alt="Temu Logo" width={60} height={60} className="mx-auto" />
          </Link>
          <h3 className="text-3xl font-bold text-orange-600">Crear Cuenta</h3>
          <p className="text-gray-500 mt-2">Únete a RepliTemu hoy mismo</p>
        </div>
        <form onSubmit={handleSignUp}>
          <div className="mt-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="tu@email.com"
                className="w-full px-4 py-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mt-6">
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">Contraseña</label>
              <input
                type="password"
                placeholder="********"
                className="w-full px-4 py-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <p className="text-xs text-gray-500 mt-2">La contraseña debe tener al menos 6 caracteres</p>
            </div>
            {error && <p className="text-red-500 text-sm mt-4 bg-red-50 p-3 rounded-md">{error}</p>}
            {message && <p className="text-green-600 text-sm mt-4 bg-green-50 p-3 rounded-md">{message}</p>}
            <div className="mt-8">
              <button type="submit" className="w-full px-6 py-3 text-white bg-orange-600 rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition-all duration-200 font-medium">Registrarse</button>
            </div>
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                ¿Ya tienes cuenta? <Link href="/login" className="text-orange-600 hover:text-orange-800 font-medium transition-colors duration-200">Inicia sesión aquí</Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}