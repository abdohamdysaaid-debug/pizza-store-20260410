import { Search } from 'lucide-react'
import { categories } from '../../data/menu'

const categoryTitles = {
  all: { en: 'All', ar: 'الكل' },
  pizza: { en: 'Pizza', ar: 'بيتزا' },
  premium: { en: 'Premium', ar: 'بريميوم' },
  pasta: { en: 'Pasta', ar: 'مكرونة' },
  sides: { en: 'Sides', ar: 'مقبلات' },
  drinks: { en: 'Drinks', ar: 'مشروبات' },
  extras: { en: 'Extras', ar: 'إضافات' },
}

function MenuFilters({ language, search, setSearch, category, setCategory, searchLabel }) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-4 sm:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <label className="relative block lg:max-w-md lg:flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/35" size={18} />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={searchLabel}
            className="w-full rounded-full border border-white/10 bg-neutral-900 px-12 py-3 text-sm text-white outline-none ring-0 placeholder:text-white/30"
          />
        </label>
        <div className="flex flex-wrap gap-2">
          {['all', ...categories].map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setCategory(key)}
              className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                category === key ? 'bg-orange-500 text-neutral-950' : 'bg-white/5 text-white/70 hover:bg-white/10'
              }`}
            >
              {categoryTitles[key][language]}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MenuFilters
