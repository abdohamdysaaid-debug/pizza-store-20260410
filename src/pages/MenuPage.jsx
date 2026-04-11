import MenuFilters from '../components/menu/MenuFilters'
import MenuCard from '../components/menu/MenuCard'
import SectionHeader from '../components/shared/SectionHeader'
import Seo from '../components/shared/Seo'
import { useStore } from '../context/StoreContext'
import { t, ui } from '../data/ui'

function MenuPage() {
  const { language, search, setSearch, category, setCategory, filteredMenu, offers } = useStore()
  const primaryOffer = offers.find((offer) => offer.active)

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Seo
        title={language === 'en' ? "Pub's Pizza Menu | Pizza, Pasta, Sides & Drinks" : 'منيو Pub\'s Pizza | بيتزا ومكرونة ومشروبات'}
        description={language === 'en' ? 'Browse the bilingual Pub\'s Pizza menu with sizes, stuffed crust, extras, and a smart cart flow.' : 'تصفح منيو Pub\'s Pizza باللغتين مع المقاسات وأطراف الجبن والإضافات وسلة ذكية.'}
      />

      <SectionHeader
        eyebrow={language === 'en' ? 'Menu Experience' : 'تجربة المنيو'}
        title={language === 'en' ? 'Build your meal with sizes, extras, and stuffed crust' : 'كوّن طلبك بالمقاس والإضافات وأطراف الجبن'}
        description={language === 'en' ? 'Search, filter, and customize your meal exactly the way a modern ordering flow should feel.' : 'ابحث وفلتر وخصص طلبك بالطريقة التي تشبه تطبيقات المطاعم الحديثة.'}
      />

      {primaryOffer ? (
        <div className="mt-8 rounded-[2rem] border border-orange-500/20 bg-gradient-to-r from-orange-500/12 to-transparent p-5 text-sm leading-7 text-white/70">
          <span className="mr-3 inline-flex rounded-full bg-orange-500 px-3 py-1 text-xs font-black text-neutral-950">{t(language, primaryOffer.badge)}</span>
          {t(language, primaryOffer.description)}
        </div>
      ) : null}

      <div className="mt-8">
        <MenuFilters
          language={language}
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          searchLabel={t(language, ui.labels.search)}
        />
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-2">
        {filteredMenu.map((item) => (
          <MenuCard key={item.id} item={item} />
        ))}
      </div>

      {!filteredMenu.length ? (
        <div className="mt-10 rounded-[2rem] border border-dashed border-white/10 bg-white/[0.03] p-10 text-center text-white/55">
          {language === 'en' ? 'No items match your search right now.' : 'لا توجد أصناف مطابقة للبحث الحالي.'}
        </div>
      ) : null}
    </div>
  )
}

export default MenuPage
