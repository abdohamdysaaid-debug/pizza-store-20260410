import { Minus, Plus, Trash2, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useStore } from '../../context/StoreContext'
import { t, ui } from '../../data/ui'

function CartDrawer() {
  const {
    language,
    cart,
    cartTotal,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    extraCatalog,
  } = useStore()

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/60 transition ${isCartOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
        onClick={() => setIsCartOpen(false)}
      />
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-white/10 bg-neutral-950 shadow-2xl transition duration-300 ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div>
            <h3 className="text-lg font-black">{t(language, ui.labels.yourCart)}</h3>
            <p className="text-sm text-white/50">{cart.length} items</p>
          </div>
          <button type="button" onClick={() => setIsCartOpen(false)} className="rounded-full border border-white/10 p-2 text-white/70">
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
          {cart.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-white/10 bg-white/5 p-6 text-sm leading-7 text-white/60">
              {t(language, ui.labels.emptyCart)}
            </div>
          ) : (
            cart.map((item) => (
              <article key={item.cartId} className="rounded-3xl border border-white/10 bg-white/[0.04] p-4">
                <div className="flex gap-3">
                  <img src={item.image} alt={t(language, item.name)} className="h-20 w-20 rounded-2xl object-cover" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="font-bold text-white">{t(language, item.name)}</h4>
                        <p className="text-xs text-white/45">Size {item.size}</p>
                        {item.cheeseStuffed ? <p className="text-xs text-orange-300">{t(language, ui.labels.cheeseStuffed)}</p> : null}
                        {item.extras.length ? (
                          <p className="mt-1 text-xs text-white/50">
                            {item.extras.map((extra) => t(language, extraCatalog[extra])).join(', ')}
                          </p>
                        ) : null}
                      </div>
                      <button type="button" onClick={() => removeFromCart(item.cartId)} className="text-white/40 hover:text-red-300">
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3 py-2">
                        <button type="button" onClick={() => updateQuantity(item.cartId, -1)}><Minus size={14} /></button>
                        <span className="text-sm font-bold">{item.quantity}</span>
                        <button type="button" onClick={() => updateQuantity(item.cartId, 1)}><Plus size={14} /></button>
                      </div>
                      <p className="font-black text-orange-300">EGP {item.unitPrice * item.quantity}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>

        <div className="space-y-4 border-t border-white/10 p-5">
          <div className="flex items-center justify-between text-sm text-white/60">
            <span>{t(language, ui.labels.total)}</span>
            <strong className="text-2xl font-black text-white">EGP {cartTotal}</strong>
          </div>
          <Link
            to="/checkout"
            onClick={() => setIsCartOpen(false)}
            className="block rounded-full bg-orange-500 px-5 py-3 text-center text-sm font-black text-neutral-950 transition hover:bg-orange-400"
          >
            {t(language, ui.labels.checkout)}
          </Link>
        </div>
      </aside>
    </>
  )
}

export default CartDrawer
