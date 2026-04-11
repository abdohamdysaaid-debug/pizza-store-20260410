import { useState } from 'react'
import { useStore } from '../../context/StoreContext'
import { t, ui } from '../../data/ui'

const sizes = ['M', 'L', 'F']

function MenuCard({ item }) {
  const { language, addToCart, extraCatalog } = useStore()
  const [size, setSize] = useState('M')
  const [cheeseStuffed, setCheeseStuffed] = useState(false)
  const [selectedExtras, setSelectedExtras] = useState([])

  const toggleExtra = (key) => {
    setSelectedExtras((current) =>
      current.includes(key) ? current.filter((itemKey) => itemKey !== key) : [...current, key]
    )
  }

  const price = item.sizes[size] + (cheeseStuffed ? 30 : 0) + selectedExtras.reduce((sum, key) => sum + extraCatalog[key].price, 0)

  return (
    <article className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] shadow-[0_20px_80px_rgba(0,0,0,0.2)] transition hover:-translate-y-1 hover:border-orange-400/40">
      <div className="relative h-56 overflow-hidden">
        <img src={item.image} alt={t(language, item.name)} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/15 to-transparent" />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {item.bestSeller ? <span className="rounded-full bg-orange-500 px-3 py-1 text-xs font-black text-neutral-950">{t(language, ui.labels.bestSeller)}</span> : null}
          {item.premium ? <span className="rounded-full border border-white/15 bg-neutral-950/60 px-3 py-1 text-xs font-bold text-white">{t(language, ui.labels.premium)}</span> : null}
        </div>
      </div>

      <div className="space-y-5 p-5">
        <div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-black text-white">{item.name.en}</h3>
              <p className="text-sm font-semibold text-orange-300">{item.name.ar}</p>
            </div>
            <div className="rounded-full bg-white/5 px-3 py-1 text-sm font-bold text-white/70">EGP {price}</div>
          </div>
          <p className="mt-3 text-sm leading-7 text-white/55">{t(language, item.subtitle)}</p>
        </div>

        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {sizes.map((sizeKey) => (
              <button
                key={sizeKey}
                type="button"
                onClick={() => setSize(sizeKey)}
                className={`rounded-full px-4 py-2 text-sm font-bold ${size === sizeKey ? 'bg-orange-500 text-neutral-950' : 'bg-white/5 text-white/70'}`}
              >
                {sizeKey} - EGP {item.sizes[sizeKey]}
              </button>
            ))}
          </div>

          {item.allowsStuffed ? (
            <label className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/75">
              <span>{t(language, ui.labels.cheeseStuffed)} (+30)</span>
              <input type="checkbox" checked={cheeseStuffed} onChange={() => setCheeseStuffed((value) => !value)} className="h-4 w-4 accent-orange-500" />
            </label>
          ) : null}

          {item.availableExtras.length ? (
            <div className="flex flex-wrap gap-2">
              {item.availableExtras.map((extraKey) => (
                <button
                  key={extraKey}
                  type="button"
                  onClick={() => toggleExtra(extraKey)}
                  className={`rounded-full border px-3 py-2 text-xs font-bold transition ${
                    selectedExtras.includes(extraKey)
                      ? 'border-orange-400 bg-orange-500/15 text-orange-200'
                      : 'border-white/10 bg-white/5 text-white/60'
                  }`}
                >
                  {t(language, extraCatalog[extraKey])} (+{extraCatalog[extraKey].price})
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <button
          type="button"
          onClick={() => addToCart(item, { size, cheeseStuffed, extras: selectedExtras })}
          className="w-full rounded-full bg-orange-500 px-5 py-3 text-sm font-black text-neutral-950 transition hover:bg-orange-400"
        >
          {t(language, ui.labels.addToCart)}
        </button>
      </div>
    </article>
  )
}

export default MenuCard
