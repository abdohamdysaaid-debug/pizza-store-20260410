import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom'
import { Globe2, ShieldCheck, ShoppingBag, LogOut, User } from 'lucide-react'
import { useState } from 'react'
import { useStore } from '../../context/StoreContext'
import { useAuth } from '../../context/AuthContext'
import { ui, t } from '../../data/ui'

const navLinks = [
  { to: '/', label: ui.nav.home },
  { to: '/menu', label: ui.nav.menu },
  { to: '/checkout', label: ui.nav.checkout },
  { to: '/contact', label: ui.nav.contact },
]

function Navbar() {
  const { language, setLanguage, cartCount, setIsCartOpen, firebaseEnabled } = useStore()
  const { currentUser, logout, isAdmin } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [showUserMenu, setShowUserMenu] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-neutral-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/pizza-store-20260410/brand-logo.jpeg"
            alt="Pub's Pizza logo"
            className="h-14 w-14 rounded-2xl object-cover shadow-[0_10px_30px_rgba(255,122,0,0.25)]"
          />
          <div>
            <p className="text-lg font-black tracking-wide">{ui.brand}</p>
            <p className="text-xs text-white/55">{t(language, ui.slogan)}</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-semibold transition ${
                  isActive ? 'bg-orange-500 text-neutral-950' : 'text-white/75 hover:bg-white/8 hover:text-white'
                }`
              }
            >
              {t(language, link.label)}
            </NavLink>
          ))}
          {isAdmin() && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-semibold transition ${
                  isActive ? 'bg-orange-500 text-neutral-950' : 'text-white/75 hover:bg-white/8 hover:text-white'
                }`
              }
            >
              {t(language, ui.nav.admin)}
            </NavLink>
          )}
        </nav>

        <div className="flex items-center gap-2">
          <div className={`hidden items-center gap-2 rounded-full border px-3 py-2 text-xs font-bold lg:inline-flex ${firebaseEnabled ? 'border-emerald-400/30 bg-emerald-500/10 text-emerald-200' : 'border-white/10 bg-white/5 text-white/55'}`}>
            <ShieldCheck size={14} />
            {firebaseEnabled ? t(language, ui.labels.firebaseReady) : t(language, ui.labels.firebasePending)}
          </div>
          <button
            type="button"
            onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            <Globe2 size={16} />
            {t(language, ui.nav.language)}
          </button>
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="relative inline-flex items-center gap-2 rounded-full bg-orange-500 px-4 py-2 text-sm font-bold text-neutral-950 transition hover:bg-orange-400"
          >
            <ShoppingBag size={16} />
            {t(language, ui.nav.cart)}
            <span className="rounded-full bg-neutral-950/90 px-2 py-0.5 text-xs text-white">{cartCount}</span>
          </button>

          <div className="relative">
            {currentUser ? (
              <>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  <User size={16} />
                  <span className="hidden sm:inline text-xs">{currentUser.name || currentUser.email}</span>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 rounded-xl border border-white/10 bg-neutral-900 shadow-lg z-50">
                    <div className="border-b border-white/10 px-4 py-3">
                      <p className="text-xs text-white/60">
                        {isAdmin() ? 'مسؤول' : 'مستخدم'}
                      </p>
                      <p className="font-semibold">{currentUser.name || currentUser.email}</p>
                      <p className="text-xs text-white/50">{currentUser.phone || currentUser.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        logout()
                        setShowUserMenu(false)
                        navigate('/')
                      }}
                      className="flex w-full items-center gap-2 px-4 py-3 text-sm font-medium text-red-400 hover:bg-white/5"
                    >
                      <LogOut size={16} />
                      تسجيل خروج
                    </button>
                  </div>
                )}
              </>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="inline-flex items-center gap-2 rounded-full border border-orange-400/50 bg-orange-500/10 px-4 py-2 text-sm font-semibold text-orange-300 transition hover:bg-orange-500/20"
              >
                <User size={16} />
                <span className="hidden sm:inline">دخول</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-white/5 px-4 py-2 md:hidden">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto pb-1">
          {navLinks.map((link) => {
            const active = location.pathname === link.to
            return (
              <NavLink
                key={link.to}
                to={link.to}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition ${
                  active ? 'bg-orange-500 text-neutral-950' : 'bg-white/5 text-white/70'
                }`}
              >
                {t(language, link.label)}
              </NavLink>
            )
          })}
          {isAdmin() && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition ${
                  isActive ? 'bg-orange-500 text-neutral-950' : 'bg-white/5 text-white/70'
                }`
              }
            >
              {t(language, ui.nav.admin)}
            </NavLink>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar
