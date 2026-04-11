import { NavLink, Link, useLocation } from 'react-router-dom'
import { Globe2, ShieldCheck, ShoppingBag } from 'lucide-react'
import { useStore } from '../../context/StoreContext'
import { ui, t } from '../../data/ui'

const navLinks = [
  { to: '/', label: ui.nav.home },
  { to: '/menu', label: ui.nav.menu },
  { to: '/checkout', label: ui.nav.checkout },
  { to: '/contact', label: ui.nav.contact },
  { to: '/admin', label: ui.nav.admin },
]

function Navbar() {
  const { language, setLanguage, cartCount, setIsCartOpen, firebaseEnabled } = useStore()
  const location = useLocation()

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
        </div>
      </div>
    </header>
  )
}

export default Navbar
