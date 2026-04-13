import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)

const storageKeys = {
  currentUser: 'pubs-pizza-current-user',
  adminAuth: 'pubs-pizza-admin-auth',
}

// معلومات المسؤول (كلمة المرور: admin123)
const ADMIN_CREDENTIALS = {
  email: 'admin@pubspizza.com',
  password: 'admin123',
  role: 'admin',
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem(storageKeys.currentUser)
    return saved ? JSON.parse(saved) : null
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(storageKeys.currentUser, JSON.stringify(currentUser))
    } else {
      localStorage.removeItem(storageKeys.currentUser)
    }
  }, [currentUser])

  const loginAsAdmin = async (email, password) => {
    setIsLoading(true)
    setError(null)
    
    try {
      // محاكاة تأخير الشبكة
      await new Promise(resolve => setTimeout(resolve, 500))
      
      if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
        const adminUser = {
          id: 'admin-1',
          email: ADMIN_CREDENTIALS.email,
          role: 'admin',
          name: 'Admin',
          loginTime: new Date().toISOString(),
        }
        setCurrentUser(adminUser)
        return { success: true }
      } else {
        setError('بيانات المسؤول غير صحيحة')
        return { success: false, error: 'Invalid admin credentials' }
      }
    } catch (err) {
      const errorMsg = 'حدث خطأ في تسجيل الدخول'
      setError(errorMsg)
      return { success: false, error: errorMsg }
    } finally {
      setIsLoading(false)
    }
  }

  const loginAsUser = async (phone, name) => {
    setIsLoading(true)
    setError(null)
    
    try {
      // محاكاة تأخير الشبكة
      await new Promise(resolve => setTimeout(resolve, 500))
      
      if (!phone || phone.length < 10) {
        setError('يرجى إدخال رقم هاتف صحيح')
        return { success: false, error: 'Invalid phone number' }
      }
      
      if (!name || name.trim().length < 2) {
        setError('يرجى إدخال اسم صحيح')
        return { success: false, error: 'Invalid name' }
      }

      const user = {
        id: `user-${Date.now()}`,
        phone,
        name: name.trim(),
        role: 'user',
        loginTime: new Date().toISOString(),
      }
      setCurrentUser(user)
      return { success: true }
    } catch (err) {
      const errorMsg = 'حدث خطأ في تسجيل الدخول'
      setError(errorMsg)
      return { success: false, error: errorMsg }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setCurrentUser(null)
    setError(null)
  }

  const isAdmin = () => currentUser?.role === 'admin'
  const isLoggedIn = () => currentUser !== null

  const value = {
    currentUser,
    isLoading,
    error,
    loginAsAdmin,
    loginAsUser,
    logout,
    isAdmin,
    isLoggedIn,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
