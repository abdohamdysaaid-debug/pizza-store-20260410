import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Seo from '../components/shared/Seo'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const { loginAsAdmin, isLoading, error } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await loginAsAdmin(email, password)
    if (result.success) {
      navigate('/admin', { replace: true })
    }
  }

  const handleDemoLogin = async () => {
    const result = await loginAsAdmin('admin@pubspizza.com', 'admin123')
    if (result.success) {
      navigate('/admin', { replace: true })
    }
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <Seo
        title="Admin Login | Pub's Pizza"
        description="Admin panel login for Pub's Pizza management"
      />

      <div className="flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-black text-white">لوحة الإدارة</h1>
            <p className="mt-2 text-sm text-white/70">Admin Panel - Pub's Pizza</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            {/* Error Message */}
            {error && (
              <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {error}
              </div>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white/90">
                البريد الإلكتروني
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@pubspizza.com"
                className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-white/40 transition focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400/50"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white/90">
                كلمة المرور
              </label>
              <div className="relative mt-2">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 pr-10 text-white placeholder-white/40 transition focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400/50"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-white/60 hover:text-white"
                >
                  {showPassword ? (
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-4.803m5.596-3.856a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ) : (
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-gradient-to-r from-orange-400 to-orange-600 py-2 font-semibold text-white transition hover:from-orange-500 hover:to-orange-700 disabled:opacity-50"
            >
              {isLoading ? 'جاري دخول...' : 'دخول'}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
            <p className="text-xs font-semibold text-white/70 uppercase">بيانات التجربة</p>
            <p className="mt-2 text-sm text-white/80">
              <span className="block font-medium">البريد: admin@pubspizza.com</span>
              <span className="block font-medium">كلمة المرور: admin123</span>
            </p>
            <button
              onClick={handleDemoLogin}
              disabled={isLoading}
              className="mt-3 w-full rounded-lg border border-orange-400/50 bg-orange-500/10 py-2 font-medium text-orange-300 transition hover:bg-orange-500/20 disabled:opacity-50"
            >
              تسجيل دخول تجريبي
            </button>
          </div>

          {/* Back Button */}
          <button
            onClick={() => navigate('/')}
            className="w-full rounded-lg border border-white/10 py-2 font-medium text-white/70 transition hover:bg-white/5 hover:text-white"
          >
            العودة للرئيسية
          </button>
        </div>
      </div>
    </div>
  )
}
