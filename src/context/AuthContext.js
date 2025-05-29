'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { createClientClient } from '@/lib/supabase'

// Crear el contexto de autenticación
const AuthContext = createContext()

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider')
  }
  return context
}

// Proveedor del contexto de autenticación
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClientClient()

  // Cargar usuario al iniciar y configurar listener para cambios de autenticación
  useEffect(() => {
    // Verificar si hay una sesión activa
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        setUser(session?.user || null)
      } catch (error) {
        console.error('Error al verificar la sesión:', error)
      } finally {
        setLoading(false)
      }
    }

    // Ejecutar verificación inicial
    checkSession()

    // Configurar listener para cambios de autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null)
        setLoading(false)
      }
    )

    // Limpiar suscripción al desmontar
    return () => {
      subscription?.unsubscribe()
    }
  }, [supabase])

  // Función para cerrar sesión
  const signOut = async () => {
    try {
      await supabase.auth.signOut()
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    }
  }

  // Valor del contexto
  const value = {
    user,
    loading,
    signOut,
    supabase
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}