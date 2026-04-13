import { ArrowRight, Flame, MapPin, Star, Truck, Clock3 } from 'lucide-react'
import { Link } from 'react-router-dom'
import SectionHeader from '../components/shared/SectionHeader'
import Seo from '../components/shared/Seo'
import { branches, testimonials } from '../data/menu'
import { t, ui } from '../data/ui'
import { useStore } from '../context/StoreContext'

function HomePage() {
  const { language, lastOrder, orderStatuses, menuItems, offers } = useStore()
  const featured = menuItems.filter((item) => ['pepperoni', 'mix-cheese', 'chicken-ranch'].includes(item.id))
  const premium = menuItems.filter((item) => item.category === 'premium')
  const activeOffers = offers.filter((offer) => offer.active)

  return (
    <div>
      <Seo
        title={language === 'en' ? "Pub's Pizza | Premium Pizza Delivery" : 'Pub\'s Pizza | توصيل بيتزا فاخر'}
        description={language === 'en' ? 'Modern bilingual restaurant ordering experience with premium pizzas, fast checkout, and branch delivery.' : 'تجربة طلب مطعم حديثة باللغتين مع بيتزا بريميوم وسلة سريعة وتوصيل للفروع.'}
      />

      <section className="relative overflow-hidden border-b border-white/10 bg-neutral-950">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1600&q=80"
            alt="Pizza background"
            className="h-full w-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,122,0,0.35),transparent_30%),linear-gradient(180deg,rgba(10,10,10,0.3),rgba(10,10,10,0.92))]" />
        </div>

        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-18 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8 lg:py-24">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/25 bg-orange-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-orange-200">
              <Flame size={14} /> Premium Restaurant Experience
            </div>
            <div className="space-y-5">
              <h1 className="max-w-3xl text-5xl font-black leading-tight tracking-tight text-white sm:text-6xl">
                {t(language, ui.slogan)}
              </h1>
              <p className="max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
                {language === 'en'
                  ? 'A refined ordering experience for Pub\'s Pizza with premium visuals, bilingual menu browsing, Firebase-ready ordering, and a smooth mobile-first flow.'
                  : 'تجربة طلب راقية لمطعم Pub\'s Pizza مع تصميم فاخر، منيو باللغتين، ربط جاهز بـ Firebase، وتدفق سلس للموبايل.'}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/menu" className="rounded-full bg-orange-500 px-6 py-3 text-sm font-black text-neutral-950 transition hover:bg-orange-400">
                {t(language, ui.nav.orderNow)}
              </Link>
              <Link to="/menu" className="rounded-full border border-white/15 bg-white/8 px-6 py-3 text-sm font-bold text-white">
                {t(language, ui.nav.viewMenu)}
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { icon: Truck, value: '30 min', label: language === 'en' ? 'Fast Delivery' : 'توصيل سريع' },
                { icon: Star, value: '4.9', label: language === 'en' ? 'Customer Rating' : 'تقييم العملاء' },
                { icon: Clock3, value: '12 PM - 2 AM', label: language === 'en' ? 'Open Daily' : 'نفتح يوميًا' },
              ].map((stat) => (
                <div key={stat.label} className="rounded-[1.75rem] border border-white/10 bg-white/8 p-5 backdrop-blur-md">
                  <stat.icon size={18} className="text-orange-300" />
                  <p className="mt-4 text-2xl font-black text-white">{stat.value}</p>
                  <p className="text-sm text-white/60">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 self-end">
            {activeOffers.slice(0, 2).map((offer) => (
              <div key={offer.id} className="rounded-[2rem] border border-white/10 bg-black/35 p-6 backdrop-blur-xl">
                <p className="text-sm font-bold text-orange-300">{t(language, offer.badge)}</p>
                <h3 className="mt-3 text-3xl font-black text-white">{t(language, offer.title)}</h3>
                <p className="mt-3 text-sm leading-7 text-white/60">{t(language, offer.description)}</p>
                <div className="mt-5 flex items-center justify-between text-sm text-white/65">
                  <span>{language === 'en' ? 'Live offer' : 'عرض نشط'}</span>
                  <Link to="/menu" className="inline-flex items-center gap-2 font-bold text-orange-300">
                    Explore <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow={language === 'en' ? 'Featured' : 'مختارات مميزة'}
          title={language === 'en' ? 'Best sellers guests keep coming back for' : 'الأصناف الأكثر طلبًا من عملائنا'}
          description={language === 'en' ? 'From pepperoni classics to creamy ranch favorites, each pizza is crafted to feel bold, hot, and premium.' : 'من البيبروني الكلاسيك إلى تشيكن رانش الكريمي، كل بيتزا مصممة لتكون غنية وساخنة ومميزة.'}
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {featured.map((item) => (
            <article key={item.id} className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04]">
              <img src={item.image} alt={t(language, item.name)} className="h-64 w-full object-cover" />
              <div className="space-y-3 p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="text-2xl font-black text-white">{t(language, item.name)}</h3>
                  </div>
                  <span className="rounded-full bg-orange-500 px-3 py-1 text-xs font-black text-neutral-950">{t(language, ui.labels.bestSeller)}</span>
                </div>
                <p className="text-sm leading-7 text-white/60">{t(language, item.subtitle)}</p>
                <p className="font-black text-white">EGP {item.sizes.M} - {item.sizes.F}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white/[0.03] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow={language === 'en' ? 'Premium Pizzas' : 'بيتزا بريميوم'}
            title={language === 'en' ? 'Luxury combinations for the brand signature menu' : 'توليفات فاخرة لقائمة Pub\'s Pizza المميزة'}
            description={language === 'en' ? 'Crafted for customers who want the richer crust, deeper flavor, and a stronger brand moment.' : 'مخصصة لمن يريد أطراف أغنى، طعم أعمق، وتجربة علامة تجارية أفخم.'}
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {premium.map((item) => (
              <div key={item.id} className="rounded-[2rem] border border-orange-500/15 bg-gradient-to-b from-orange-500/12 to-white/[0.04] p-6">
                <img src={item.image} alt={t(language, item.name)} className="h-48 w-full rounded-[1.5rem] object-cover" />
                <h3 className="mt-5 text-2xl font-black text-white">{t(language, item.name)}</h3>
                <p className="mt-2 text-sm leading-7 text-white/60">{t(language, item.subtitle)}</p>
                <p className="mt-4 font-black text-orange-300">EGP {item.sizes.L}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow={language === 'en' ? 'Branch Preview' : 'الفروع'}
          title={language === 'en' ? 'Find your nearest Pub\'s Pizza branch' : 'اختر أقرب فرع من فروع Pub\'s Pizza'}
          description={language === 'en' ? 'Two active branches with delivery coverage and direct Google Maps access.' : 'فرعان فعّالان مع تغطية توصيل وروابط مباشرة إلى خرائط جوجل.'}
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {branches.map((branch) => (
            <article key={branch.id} className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-black text-white">{t(language, branch.name)}</h3>
                  <p className="mt-2 text-sm text-white/60">{t(language, branch.address)}</p>
                </div>
                <MapPin className="text-orange-300" />
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={branch.mapUrl} target="_blank" rel="noreferrer" className="rounded-full bg-orange-500 px-4 py-2 text-sm font-black text-neutral-950">
                  {language === 'en' ? 'Open Maps' : 'افتح الخريطة'}
                </a>
                <a href={`tel:${branch.phone}`} className="rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white/80">
                  {branch.phone}
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white/[0.03] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow={language === 'en' ? 'Testimonials' : 'آراء العملاء'}
            title={language === 'en' ? 'Customers love the premium ordering flow' : 'العملاء أحبوا تجربة الطلب الراقية'}
            description={language === 'en' ? 'A blend of premium UI, quick ordering, and high-conviction food photography.' : 'مزيج من واجهة راقية، طلب سريع، وصور طعام قوية وواضحة.'}
            align="center"
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {testimonials.map((item) => (
              <article key={item.name} className="rounded-[2rem] border border-white/10 bg-neutral-900 p-6">
                <div className="flex gap-1 text-orange-300">{Array.from({ length: 5 }).map((_, index) => <Star key={index} size={16} fill="currentColor" />)}</div>
                <p className="mt-4 text-sm leading-7 text-white/70">“{t(language, item.quote)}”</p>
                <div className="mt-6">
                  <h4 className="font-black text-white">{item.name}</h4>
                  <p className="text-sm text-white/45">{item.role}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-orange-500/20 bg-gradient-to-br from-orange-500/10 to-white/[0.03] p-8">
          <SectionHeader
            eyebrow={t(language, ui.labels.tracking)}
            title={lastOrder ? `${lastOrder.id}` : language === 'en' ? 'No active order yet' : 'لا يوجد طلب نشط حتى الآن'}
            description={
              lastOrder
                ? `${t(language, orderStatuses[lastOrder.statusIndex])} • EGP ${lastOrder.total}`
                : language === 'en'
                  ? 'Place your first order and we will keep the status visible here.'
                  : 'أكمل أول طلب وسيظهر تتبعه هنا مباشرة.'
            }
          />
        </div>
      </section>
    </div>
  )
}

export default HomePage
