import { useMemo, useState } from 'react'
import SectionHeader from '../components/shared/SectionHeader'
import Seo from '../components/shared/Seo'
import { t, ui } from '../data/ui'
import { useStore } from '../context/StoreContext'

function AdminPage() {
  const { language, menuItems, offers, updateMenuItem, updateOffer, addOffer, orderHistory, firebaseEnabled } = useStore()
  const [newOffer, setNewOffer] = useState({
    titleEn: '',
    titleAr: '',
    descriptionEn: '',
    descriptionAr: '',
    badgeEn: '',
    badgeAr: '',
  })

  const recentOrders = useMemo(() => orderHistory.slice(0, 8), [orderHistory])

  const handleOfferSubmit = (event) => {
    event.preventDefault()
    addOffer({
      title: { en: newOffer.titleEn, ar: newOffer.titleAr },
      description: { en: newOffer.descriptionEn, ar: newOffer.descriptionAr },
      badge: { en: newOffer.badgeEn, ar: newOffer.badgeAr },
    })
    setNewOffer({ titleEn: '', titleAr: '', descriptionEn: '', descriptionAr: '', badgeEn: '', badgeAr: '' })
  }

  return (
    <div className="mx-auto max-w-7xl space-y-10 px-4 py-12 sm:px-6 lg:px-8">
      <Seo
        title={language === 'en' ? "Pub's Pizza Admin | Menu & Offers Dashboard" : 'لوحة إدارة Pub\'s Pizza | الأصناف والعروض'}
        description={language === 'en' ? 'Manage menu items, featured offers, and incoming order history for Pub\'s Pizza.' : 'إدارة أصناف المنيو والعروض وسجل الطلبات الواردة لمطعم Pub\'s Pizza.'}
      />

      <SectionHeader
        eyebrow={language === 'en' ? 'Dashboard' : 'لوحة التحكم'}
        title={language === 'en' ? 'Manage menu pricing, offers, and incoming orders' : 'إدارة الأسعار والعروض والطلبات الواردة'}
        description={language === 'en' ? 'Changes here are saved in browser storage immediately, and order sync becomes cloud-backed when Firebase keys are configured.' : 'التغييرات هنا تُحفظ مباشرة في المتصفح، وتتحول إلى مزامنة سحابية عند ضبط مفاتيح Firebase.'}
      />

      <div className={`rounded-[2rem] border px-5 py-4 text-sm ${firebaseEnabled ? 'border-emerald-400/30 bg-emerald-500/10 text-emerald-100' : 'border-white/10 bg-white/[0.04] text-white/70'}`}>
        {firebaseEnabled
          ? language === 'en'
            ? 'Firebase is connected. New orders can be pushed to Firestore.'
            : 'Firebase متصل، ويمكن إرسال الطلبات إلى Firestore.'
          : language === 'en'
            ? 'Firebase is not configured yet. Add your VITE_FIREBASE_* values in .env to activate cloud orders.'
            : 'Firebase غير مضبوط بعد. أضف قيم VITE_FIREBASE_* داخل ملف .env لتفعيل حفظ الطلبات سحابيًا.'}
      </div>

      <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
        <h2 className="text-2xl font-black text-white">{language === 'en' ? 'Menu items' : 'أصناف المنيو'}</h2>
        <div className="mt-6 grid gap-4 xl:grid-cols-2">
          {menuItems.map((item) => (
            <article key={item.id} className="rounded-[1.5rem] border border-white/10 bg-neutral-950/60 p-4">
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-black text-white">{t(language, item.name)}</h3>
                </div>
                <div className="flex gap-2 text-xs">
                  <button type="button" onClick={() => updateMenuItem(item.id, { bestSeller: !item.bestSeller })} className={`rounded-full px-3 py-1 font-bold ${item.bestSeller ? 'bg-orange-500 text-neutral-950' : 'bg-white/5 text-white/60'}`}>
                    {language === 'en' ? 'Best seller' : 'مميز'}
                  </button>
                  <button type="button" onClick={() => updateMenuItem(item.id, { premium: !item.premium })} className={`rounded-full px-3 py-1 font-bold ${item.premium ? 'bg-amber-300 text-neutral-950' : 'bg-white/5 text-white/60'}`}>
                    {language === 'en' ? 'Premium' : 'بريميوم'}
                  </button>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {['M', 'L', 'F'].map((sizeKey) => (
                  <label key={sizeKey} className="space-y-2 text-sm text-white/70">
                    <span>{sizeKey}</span>
                    <input
                      type="number"
                      value={item.sizes[sizeKey]}
                      onChange={(event) =>
                        updateMenuItem(item.id, {
                          sizes: {
                            ...item.sizes,
                            [sizeKey]: Number(event.target.value),
                          },
                        })
                      }
                      className="w-full rounded-2xl border border-white/10 bg-black/30 px-3 py-2 text-white outline-none"
                    />
                  </label>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-2xl font-black text-white">{language === 'en' ? 'Offers management' : 'إدارة العروض'}</h2>
          <div className="mt-6 space-y-4">
            {offers.map((offer) => (
              <article key={offer.id} className="rounded-[1.5rem] border border-white/10 bg-neutral-950/60 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-black text-white">{offer.title.en}</h3>
                    <p className="text-sm text-orange-300">{offer.title.ar}</p>
                  </div>
                  <button type="button" onClick={() => updateOffer(offer.id, { active: !offer.active })} className={`rounded-full px-3 py-1 text-xs font-bold ${offer.active ? 'bg-emerald-500 text-neutral-950' : 'bg-white/5 text-white/60'}`}>
                    {offer.active ? (language === 'en' ? 'Active' : 'نشط') : language === 'en' ? 'Inactive' : 'متوقف'}
                  </button>
                </div>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  <input value={offer.title.en} onChange={(event) => updateOffer(offer.id, { title: { ...offer.title, en: event.target.value } })} className="rounded-2xl border border-white/10 bg-black/30 px-3 py-2 text-white outline-none" />
                  <input value={offer.title.ar} onChange={(event) => updateOffer(offer.id, { title: { ...offer.title, ar: event.target.value } })} className="rounded-2xl border border-white/10 bg-black/30 px-3 py-2 text-white outline-none" />
                  <input value={offer.badge.en} onChange={(event) => updateOffer(offer.id, { badge: { ...offer.badge, en: event.target.value } })} className="rounded-2xl border border-white/10 bg-black/30 px-3 py-2 text-white outline-none" />
                  <input value={offer.badge.ar} onChange={(event) => updateOffer(offer.id, { badge: { ...offer.badge, ar: event.target.value } })} className="rounded-2xl border border-white/10 bg-black/30 px-3 py-2 text-white outline-none" />
                  <textarea value={offer.description.en} onChange={(event) => updateOffer(offer.id, { description: { ...offer.description, en: event.target.value } })} className="min-h-24 rounded-2xl border border-white/10 bg-black/30 px-3 py-2 text-white outline-none" />
                  <textarea value={offer.description.ar} onChange={(event) => updateOffer(offer.id, { description: { ...offer.description, ar: event.target.value } })} className="min-h-24 rounded-2xl border border-white/10 bg-black/30 px-3 py-2 text-white outline-none" />
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
            <h2 className="text-2xl font-black text-white">{language === 'en' ? 'Add new offer' : 'إضافة عرض جديد'}</h2>
            <form className="mt-6 space-y-3" onSubmit={handleOfferSubmit}>
              <input placeholder="Title EN" value={newOffer.titleEn} onChange={(event) => setNewOffer((current) => ({ ...current, titleEn: event.target.value }))} className="w-full rounded-2xl border border-white/10 bg-black/30 px-3 py-2 text-white outline-none" />
              <input placeholder="العنوان AR" value={newOffer.titleAr} onChange={(event) => setNewOffer((current) => ({ ...current, titleAr: event.target.value }))} className="w-full rounded-2xl border border-white/10 bg-black/30 px-3 py-2 text-white outline-none" />
              <input placeholder="Badge EN" value={newOffer.badgeEn} onChange={(event) => setNewOffer((current) => ({ ...current, badgeEn: event.target.value }))} className="w-full rounded-2xl border border-white/10 bg-black/30 px-3 py-2 text-white outline-none" />
              <input placeholder="الشارة AR" value={newOffer.badgeAr} onChange={(event) => setNewOffer((current) => ({ ...current, badgeAr: event.target.value }))} className="w-full rounded-2xl border border-white/10 bg-black/30 px-3 py-2 text-white outline-none" />
              <textarea placeholder="Description EN" value={newOffer.descriptionEn} onChange={(event) => setNewOffer((current) => ({ ...current, descriptionEn: event.target.value }))} className="min-h-24 w-full rounded-2xl border border-white/10 bg-black/30 px-3 py-2 text-white outline-none" />
              <textarea placeholder="الوصف AR" value={newOffer.descriptionAr} onChange={(event) => setNewOffer((current) => ({ ...current, descriptionAr: event.target.value }))} className="min-h-24 w-full rounded-2xl border border-white/10 bg-black/30 px-3 py-2 text-white outline-none" />
              <button type="submit" className="w-full rounded-full bg-orange-500 px-5 py-3 text-sm font-black text-neutral-950">{language === 'en' ? 'Add offer' : 'إضافة العرض'}</button>
            </form>
          </section>

          <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
            <h2 className="text-2xl font-black text-white">{language === 'en' ? 'Recent orders' : 'أحدث الطلبات'}</h2>
            <div className="mt-6 space-y-3">
              {recentOrders.length ? recentOrders.map((order) => (
                <article key={order.id} className="rounded-[1.5rem] border border-white/10 bg-neutral-950/60 p-4 text-sm text-white/70">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-black text-white">{order.id}</h3>
                    <span className="rounded-full bg-white/5 px-3 py-1 text-xs">EGP {order.total}</span>
                  </div>
                  <p className="mt-2">{order.customer?.name || '-'}</p>
                  <p className="text-xs text-white/45">{order.customer?.phone || '-'}</p>
                </article>
              )) : <p className="text-sm text-white/50">{language === 'en' ? 'No orders yet.' : 'لا توجد طلبات بعد.'}</p>}
            </div>
          </section>
        </div>
      </section>
    </div>
  )
}

export default AdminPage
