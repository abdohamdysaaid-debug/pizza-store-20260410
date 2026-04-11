export const ui = {
  brand: "Pub's Pizza",
  slogan: {
    en: 'Fresh & Hot Pizza Delivered Fast',
    ar: 'بيتزا طازجة وساخنة توصل بسرعة'
  },
  nav: {
    home: { en: 'Home', ar: 'الرئيسية' },
    menu: { en: 'Menu', ar: 'المنيو' },
    checkout: { en: 'Checkout', ar: 'الدفع' },
    contact: { en: 'Contact', ar: 'اتصل بنا' },
    admin: { en: 'Admin', ar: 'الإدارة' },
    orderNow: { en: 'Order Now', ar: 'اطلب الآن' },
    viewMenu: { en: 'View Menu', ar: 'شاهد المنيو' },
    cart: { en: 'Cart', ar: 'السلة' },
    language: { en: 'AR', ar: 'EN' }
  },
  labels: {
    bestSeller: { en: 'Best Seller', ar: 'الأكثر طلبًا' },
    premium: { en: 'Premium', ar: 'بريميوم' },
    cheeseStuffed: { en: 'Cheese Stuffed', ar: 'أطراف جبنة' },
    addToCart: { en: 'Add to Cart', ar: 'أضف للسلة' },
    search: { en: 'Search your cravings', ar: 'ابحث عن طلبك' },
    checkout: { en: 'Checkout', ar: 'الدفع' },
    total: { en: 'Total', ar: 'الإجمالي' },
    yourCart: { en: 'Your cart', ar: 'سلتك' },
    emptyCart: { en: 'Your cart is empty. Start with a signature pizza.', ar: 'السلة فارغة. ابدأ ببيتزا مميزة.' },
    branch: { en: 'Choose branch', ar: 'اختر الفرع' },
    payment: { en: 'Cash on Delivery', ar: 'الدفع عند الاستلام' },
    tracking: { en: 'Track your latest order', ar: 'تتبع آخر طلب' },
    whatsapp: { en: 'Order on WhatsApp', ar: 'اطلب عبر واتساب' },
    firebaseReady: { en: 'Firebase connected', ar: 'Firebase متصل' },
    firebasePending: { en: 'Firebase setup required', ar: 'يلزم إعداد Firebase' },
  }
}

export function t(language, value) {
  return value?.[language] ?? value?.en ?? ''
}
