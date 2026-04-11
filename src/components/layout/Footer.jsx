import { Link } from 'react-router-dom'
import { Phone, MapPin, Clock3 } from 'lucide-react'
import { branches } from '../../data/menu'
import { ui, t } from '../../data/ui'
import { useStore } from '../../context/StoreContext'

function Footer() {
  const { language } = useStore()

  return (
    <footer className="border-t border-white/10 bg-neutral-950/95">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_1fr_1fr] lg:px-8">
        <div>
          <p className="text-2xl font-black">{ui.brand}</p>
          <p className="mt-3 max-w-md text-sm leading-7 text-white/60">{t(language, ui.slogan)}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link to="/menu" className="rounded-full bg-orange-500 px-4 py-2 text-sm font-bold text-neutral-950">
              {t(language, ui.nav.orderNow)}
            </Link>
            <Link to="/contact" className="rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white/80">
              {t(language, ui.nav.contact)}
            </Link>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 text-white/80"><Phone size={18} /> 0452134824</div>
          <div className="flex items-center gap-3 text-white/80"><Phone size={18} /> 01553981282</div>
          <div className="flex items-center gap-3 text-white/80"><Phone size={18} /> 01221433293</div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3 text-white/70"><MapPin size={18} className="mt-1" />{branches.map((branch) => t(language, branch.name)).join(' / ')}</div>
          <div className="flex items-center gap-3 text-white/70"><Clock3 size={18} />12 PM - 2 AM</div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
