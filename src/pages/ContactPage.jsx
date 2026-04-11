import { MapPin, Navigation, PhoneCall } from 'lucide-react'
import SectionHeader from '../components/shared/SectionHeader'
import Seo from '../components/shared/Seo'
import { branches } from '../data/menu'
import { t } from '../data/ui'
import { useStore } from '../context/StoreContext'

function ContactPage() {
  const { language } = useStore()

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Seo
        title={language === 'en' ? "Contact Pub's Pizza | Branches & Phone Numbers" : 'اتصل بـ Pub\'s Pizza | الفروع وأرقام الهاتف'}
        description={language === 'en' ? 'Call Pub\'s Pizza or open Kafr El-Dawar and Smouha branches directly in Google Maps.' : 'تواصل مع Pub\'s Pizza وافتح فروع كفر الدوار وسموحة مباشرة في خرائط جوجل.'}
      />

      <SectionHeader
        eyebrow={language === 'en' ? 'Contact' : 'اتصل بنا'}
        title={language === 'en' ? 'Call the team or open branch locations in Google Maps' : 'تواصل معنا أو افتح مواقع الفروع على خرائط جوجل'}
        description={language === 'en' ? 'Pub\'s Pizza keeps communication simple: direct calls, clear branch cards, and fast location access.' : 'يوفر Pub\'s Pizza تواصلًا مباشرًا وبطاقات فروع واضحة مع وصول سريع للخرائط.'}
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-[0.7fr_1.3fr]">
        <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
          <h3 className="text-2xl font-black text-white">{language === 'en' ? 'Phone Numbers' : 'أرقام الهاتف'}</h3>
          <div className="mt-6 space-y-4">
            {['0452134824', '01553981282', '01221433293'].map((phone) => (
              <a key={phone} href={`tel:${phone}`} className="flex items-center justify-between rounded-[1.5rem] border border-white/10 bg-neutral-900/70 px-4 py-4 text-white/80 transition hover:border-orange-400/40 hover:text-white">
                <span className="font-bold">{phone}</span>
                <PhoneCall size={18} className="text-orange-300" />
              </a>
            ))}
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          {branches.map((branch) => (
            <article key={branch.id} className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04]">
              <div className="h-48 bg-[radial-gradient(circle_at_top_left,_rgba(255,122,0,0.35),transparent_35%),linear-gradient(135deg,#262626,#111111)] p-6">
                <div className="inline-flex rounded-full bg-white/10 p-3 text-orange-300"><MapPin size={20} /></div>
                <h3 className="mt-16 text-2xl font-black text-white">{t(language, branch.name)}</h3>
                <p className="mt-2 text-sm text-white/60">{t(language, branch.address)}</p>
              </div>
              <div className="space-y-4 p-6">
                <a href={`tel:${branch.phone}`} className="flex items-center gap-3 text-sm font-bold text-white/80"><PhoneCall size={16} className="text-orange-300" /> {branch.phone}</a>
                <a href={branch.mapUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-4 py-2 text-sm font-black text-neutral-950">
                  <Navigation size={16} />
                  {language === 'en' ? 'Open Google Maps' : 'افتح خرائط جوجل'}
                </a>
              </div>
            </article>
          ))}
        </section>
      </div>
    </div>
  )
}

export default ContactPage
