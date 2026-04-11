import { useMemo, useState } from 'react'
import { Navigate } from 'react-router-dom'
import SectionHeader from '../components/shared/SectionHeader'
import Seo from '../components/shared/Seo'
import { branches } from '../data/menu'
import { t, ui } from '../data/ui'
import { useStore } from '../context/StoreContext'

const initialState = {
  name: '',
  phone: '',
  address: '',
  branch: 'kafr',
  paymentMethod: 'cash',
}

function CheckoutPage() {
  const { language, cart, cartTotal, submitOrder, lastOrder, extraCatalog, firebaseEnabled } = useStore()
  const [form, setForm] = useState(initialState)
  const [completedOrder, setCompletedOrder] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const summary = useMemo(
    () =>
      cart.map((item) => ({
        ...item,
        extrasText: item.extras.map((key) => t(language, extraCatalog[key])).join(', '),
      })),
    [cart, extraCatalog, language]
  )

  if (!cart.length && !completedOrder && !lastOrder) {
    return <Navigate to="/menu" replace />
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitting(true)
    const order = await submitOrder(form)
    setCompletedOrder(order)
    setForm(initialState)
    setSubmitting(false)
  }

  const activeOrder = completedOrder || lastOrder

  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
      <Seo
        title={language === 'en' ? "Pub's Pizza Checkout | Confirm your order" : 'إتمام الطلب | Pub\'s Pizza'}
        description={language === 'en' ? 'Enter customer details, choose a branch, and place your Pub\'s Pizza order.' : 'أدخل بيانات العميل واختر الفرع وأكمل طلب Pub\'s Pizza.'}
      />

      <section className="space-y-6 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
        <SectionHeader
          eyebrow={t(language, ui.labels.checkout)}
          title={language === 'en' ? 'Delivery details' : 'بيانات التوصيل'}
          description={language === 'en' ? 'Enter your customer information, choose the branch, and place your order.' : 'أدخل بياناتك، اختر الفرع، ثم أكمل الطلب.'}
        />

        <div className={`rounded-[1.5rem] border px-4 py-3 text-sm ${firebaseEnabled ? 'border-emerald-400/20 bg-emerald-500/10 text-emerald-100' : 'border-white/10 bg-white/5 text-white/65'}`}>
          {firebaseEnabled
            ? language === 'en'
              ? 'Orders will be synced to Firebase automatically.'
              : 'سيتم مزامنة الطلبات مع Firebase تلقائيًا.'
            : language === 'en'
              ? 'Firebase keys are not configured yet, so orders are stored locally in this browser.'
              : 'مفاتيح Firebase غير مضبوطة بعد، لذلك يتم حفظ الطلبات محليًا في هذا المتصفح.'}
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {[
            { name: 'name', type: 'text', labelEn: 'Full name', labelAr: 'الاسم الكامل' },
            { name: 'phone', type: 'tel', labelEn: 'Phone number', labelAr: 'رقم الهاتف' },
            { name: 'address', type: 'text', labelEn: 'Delivery address', labelAr: 'عنوان التوصيل' },
          ].map((field) => (
            <label key={field.name} className="block space-y-2">
              <span className="text-sm font-bold text-white">{language === 'en' ? field.labelEn : field.labelAr}</span>
              <input
                required
                name={field.name}
                type={field.type}
                value={form[field.name]}
                onChange={handleChange}
                className="w-full rounded-2xl border border-white/10 bg-neutral-950 px-4 py-3 text-white outline-none placeholder:text-white/25"
              />
            </label>
          ))}

          <label className="block space-y-2">
            <span className="text-sm font-bold text-white">{t(language, ui.labels.branch)}</span>
            <select name="branch" value={form.branch} onChange={handleChange} className="w-full rounded-2xl border border-white/10 bg-neutral-950 px-4 py-3 text-white outline-none">
              {branches.map((branch) => (
                <option key={branch.id} value={branch.id}>{t(language, branch.name)}</option>
              ))}
            </select>
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-bold text-white">{language === 'en' ? 'Payment method' : 'طريقة الدفع'}</span>
            <input
              readOnly
              value={t(language, ui.labels.payment)}
              className="w-full rounded-2xl border border-white/10 bg-neutral-950 px-4 py-3 text-white/75 outline-none"
            />
          </label>

          <button type="submit" disabled={submitting} className="w-full rounded-full bg-orange-500 px-5 py-3 text-sm font-black text-neutral-950 transition hover:bg-orange-400 disabled:opacity-60">
            {submitting ? (language === 'en' ? 'Placing order...' : 'جارٍ تأكيد الطلب...') : language === 'en' ? 'Place Order' : 'تأكيد الطلب'}
          </button>
        </form>
      </section>

      <section className="space-y-6 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
        <SectionHeader
          eyebrow={language === 'en' ? 'Order Summary' : 'ملخص الطلب'}
          title={activeOrder ? activeOrder.id : language === 'en' ? 'Review your items' : 'راجع الطلب'}
          description={activeOrder ? `${t(language, activeOrder.status)} • EGP ${activeOrder.total}` : `EGP ${cartTotal}`}
        />

        <div className="space-y-4">
          {(completedOrder ? completedOrder.items : summary).map((item) => (
            <article key={item.cartId} className="rounded-[1.75rem] border border-white/10 bg-neutral-950/70 p-4">
              <div className="flex items-center gap-4">
                <img src={item.image} alt={t(language, item.name)} className="h-20 w-20 rounded-2xl object-cover" />
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-black text-white">{t(language, item.name)}</h3>
                      <p className="text-sm text-white/45">Size {item.size} × {item.quantity}</p>
                      {item.cheeseStuffed ? <p className="text-xs text-orange-300">{t(language, ui.labels.cheeseStuffed)}</p> : null}
                      {item.extrasText || item.extras?.length ? <p className="text-xs text-white/50">{item.extrasText || item.extras.map((key) => t(language, extraCatalog[key])).join(', ')}</p> : null}
                    </div>
                    <p className="font-black text-orange-300">EGP {item.unitPrice * item.quantity}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {activeOrder ? (
          <div className="rounded-[1.75rem] border border-orange-500/20 bg-orange-500/10 p-5">
            <h3 className="text-lg font-black text-white">{language === 'en' ? 'Basic tracking' : 'تتبع الطلب'}</h3>
            <p className="mt-2 text-sm text-white/65">{t(language, activeOrder.status)}</p>
            <p className="mt-2 text-xs text-white/50">
              {activeOrder.firebase?.saved
                ? language === 'en'
                  ? `Saved to Firebase with id ${activeOrder.firebase.id}`
                  : `تم حفظ الطلب في Firebase بالمعرّف ${activeOrder.firebase.id}`
                : language === 'en'
                  ? 'Stored locally until Firebase is configured.'
                  : 'تم حفظ الطلب محليًا لحين ضبط Firebase.'}
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-4">
              {['received', 'preparing', 'baking', 'on_the_way'].map((key, index) => {
                const active = index <= activeOrder.statusIndex
                const labels = {
                  received: { en: 'Received', ar: 'استلام' },
                  preparing: { en: 'Preparing', ar: 'تجهيز' },
                  baking: { en: 'Oven', ar: 'الفرن' },
                  on_the_way: { en: 'On the way', ar: 'في الطريق' },
                }
                return (
                  <div key={key} className={`rounded-2xl border px-3 py-4 text-center text-xs font-bold ${active ? 'border-orange-400 bg-orange-500 text-neutral-950' : 'border-white/10 bg-white/5 text-white/45'}`}>
                    {t(language, labels[key])}
                  </div>
                )
              })}
            </div>
          </div>
        ) : null}
      </section>
    </div>
  )
}

export default CheckoutPage
