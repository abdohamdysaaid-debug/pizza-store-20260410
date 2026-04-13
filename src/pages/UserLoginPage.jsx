import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Seo from '../components/shared/Seo'

export default function UserLoginPage() {
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')
  const [agreeTerms, setAgreeTerms] = useState(false)
  const { loginAsUser, isLoading, error } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!agreeTerms) {
      return
    }
    const result = await loginAsUser(phone, name)
    if (result.success) {
      navigate('/menu', { replace: true })
    }
  }

  const isFormValid = phone.trim().length >= 10 && name.trim().length >= 2 && agreeTerms

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <Seo
        title="تسجيل دخول | Pub's Pizza"
        description="تسجيل دخول سهل وسريع لموقع Pub's Pizza"
      />

      <div className="flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-black text-white">أهلاً وسهلاً</h1>
            <p className="mt-2 text-sm text-white/70">Welcome to Pub's Pizza</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            {/* Error Message */}
            {error && (
              <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {error}
              </div>
            )}

            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white/90">
                الاسم
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="أدخل اسمك الكامل"
                className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-white/40 transition focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400/50"
                required
              />
            </div>

            {/* Phone Field */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-white/90">
                رقم الهاتف
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                placeholder="01XXXXXXXXX"
                className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-white/40 transition focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400/50"
                required
              />
              <p className="mt-1 text-xs text-white/50">رقم هاتف صحيح بدون رموز</p>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-3">
              <input
                id="terms"
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-white/20 bg-white/5 text-orange-400 focus:ring-orange-400"
              />
              <label htmlFor="terms" className="text-sm text-white/80">
                أوافق على <span className="text-orange-400">الشروط والأحكام</span> وسياسة الخصوصية
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !isFormValid}
              className="w-full rounded-lg bg-gradient-to-r from-orange-400 to-orange-600 py-2 font-semibold text-white transition hover:from-orange-500 hover:to-orange-700 disabled:opacity-50"
            >
              {isLoading ? 'جاري التسجيل...' : 'تسجيل دخول'}
            </button>
          </form>

          {/* Info Box */}
          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
            <p className="flex items-start gap-2 text-sm text-white/80">
              <span className="mt-0.5 text-lg">ℹ️</span>
              <span>
                لا تحتاج إلى كلمة مرور. فقط أدخل اسمك ورقم هاتفك للبدء في الطلب.
              </span>
            </p>
          </div>

          {/* Admin Link */}
          <button
            onClick={() => navigate('/admin-login')}
            className="w-full rounded-lg border border-white/10 py-2 font-medium text-white/70 transition hover:bg-white/5 hover:text-white"
          >
            هل أنت مسؤول؟ دخول المسؤول
          </button>
        </div>
      </div>
    </div>
  )
}
