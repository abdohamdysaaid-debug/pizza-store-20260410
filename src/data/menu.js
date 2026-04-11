export const categories = ['pizza', 'premium', 'pasta', 'sides', 'drinks', 'extras']

export const branches = [
  {
    id: 'kafr',
    name: { en: 'Kafr El-Dawar', ar: 'كفر الدوار' },
    phone: '0452134824',
    address: { en: 'Downtown, Kafr El-Dawar', ar: 'وسط البلد، كفر الدوار' },
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Kafr+El+Dawar'
  },
  {
    id: 'smouha',
    name: { en: 'Smouha', ar: 'سموحة' },
    phone: '01553981282',
    address: { en: 'Smouha Square, Alexandria', ar: 'ميدان سموحة، الإسكندرية' },
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Smouha+Alexandria'
  }
]

export const testimonials = [
  {
    name: 'Mariam Adel',
    role: 'Food Blogger',
    quote: {
      en: 'The dough is premium, the packaging is clean, and the order flow feels like a real app.',
      ar: 'العجينة ممتازة، والتغليف مرتب، وتجربة الطلب فعلًا تشبه تطبيق مطاعم حقيقي.'
    }
  },
  {
    name: 'Karim Samy',
    role: 'Regular Customer',
    quote: {
      en: 'Chicken Ranch and Cheesy Crunch are outstanding. Fast delivery and smart checkout.',
      ar: 'تشيكن رانش وتشيزي كرنش ممتازين جدًا، والتوصيل سريع والطلب منظم.'
    }
  },
  {
    name: 'Nour Tarek',
    role: 'Student',
    quote: {
      en: 'I love the bilingual menu and the mobile layout. Everything is clear and smooth.',
      ar: 'أحببت القائمة باللغتين وتصميم الموبايل. كل شيء واضح وسلس.'
    }
  }
]

export const orderStatuses = [
  { key: 'received', en: 'Order received', ar: 'تم استلام الطلب' },
  { key: 'preparing', en: 'Preparing your order', ar: 'جارٍ تجهيز الطلب' },
  { key: 'baking', en: 'In the oven', ar: 'الطلب داخل الفرن' },
  { key: 'on_the_way', en: 'Out for delivery', ar: 'الطلب في الطريق' }
]

export const defaultOffers = [
  {
    id: 'offer-weekend',
    title: { en: 'Weekend Combo', ar: 'كومبو الويك إند' },
    description: {
      en: 'Buy 2 large pizzas and get mozzarella sticks free.',
      ar: 'اطلب 2 بيتزا لارج واحصل على موزاريلا ستيكس مجانًا.'
    },
    badge: { en: 'Hot Deal', ar: 'عرض ساخن' },
    active: true
  },
  {
    id: 'offer-pasta',
    title: { en: 'Pasta Boost', ar: 'عرض المكرونة' },
    description: {
      en: '15% off any pasta when you add a premium pizza.',
      ar: 'خصم 15% على أي مكرونة عند إضافة بيتزا بريميوم.'
    },
    badge: { en: 'Save 15%', ar: 'وفر 15%' },
    active: true
  }
]

export const menuItems = [
  {
    id: 'margherita',
    category: 'pizza',
    bestSeller: true,
    image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=1200&q=80',
    name: { en: 'Margherita', ar: 'مارجريتا' },
    subtitle: { en: 'Classic mozzarella and basil', ar: 'موزاريلا كلاسيك مع ريحان' },
    sizes: { M: 165, L: 225, F: 315 },
    allowsStuffed: true,
    availableExtras: ['cheese', 'jalapeno', 'ranch']
  },
  {
    id: 'mix-cheese',
    category: 'pizza',
    bestSeller: true,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80',
    name: { en: 'Mix Cheese', ar: 'ميكس تشيز' },
    subtitle: { en: 'Loaded with melted cheese blend', ar: 'خليط جبن غني ومذاب' },
    sizes: { M: 185, L: 255, F: 345 },
    allowsStuffed: true,
    availableExtras: ['cheese', 'jalapeno', 'bbq']
  },
  {
    id: 'chicken-ranch',
    category: 'pizza',
    bestSeller: true,
    image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=1200&q=80',
    name: { en: 'Chicken Ranch', ar: 'تشيكن رانش' },
    subtitle: { en: 'Grilled chicken with creamy ranch', ar: 'دجاج مشوي مع رانش كريمي' },
    sizes: { M: 205, L: 285, F: 375 },
    allowsStuffed: true,
    availableExtras: ['cheese', 'ranch', 'chicken']
  },
  {
    id: 'chicken-bbq',
    category: 'pizza',
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=1200&q=80',
    name: { en: 'Chicken BBQ', ar: 'تشيكن باربكيو' },
    subtitle: { en: 'Smoky BBQ sauce and tender chicken', ar: 'صوص باربكيو مدخن مع دجاج طري' },
    sizes: { M: 210, L: 290, F: 385 },
    allowsStuffed: true,
    availableExtras: ['bbq', 'cheese', 'chicken']
  },
  {
    id: 'crispy-chicken',
    category: 'pizza',
    image: 'https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?auto=format&fit=crop&w=1200&q=80',
    name: { en: 'Crispy Chicken', ar: 'كريسبي تشيكن' },
    subtitle: { en: 'Crunchy chicken bites and signature sauce', ar: 'قطع دجاج كريسبي وصوص خاص' },
    sizes: { M: 215, L: 295, F: 390 },
    allowsStuffed: true,
    availableExtras: ['cheese', 'ranch', 'chicken']
  },
  {
    id: 'pepperoni',
    category: 'pizza',
    image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=1200&q=80',
    name: { en: 'Pepperoni', ar: 'بيبروني' },
    subtitle: { en: 'Spicy pepperoni with mozzarella', ar: 'بيبروني حار مع موزاريلا' },
    sizes: { M: 220, L: 300, F: 395 },
    allowsStuffed: true,
    availableExtras: ['cheese', 'jalapeno', 'bbq']
  },
  {
    id: 'pastrami',
    category: 'pizza',
    image: 'https://images.unsplash.com/photo-1548365328-9f547fb0953f?auto=format&fit=crop&w=1200&q=80',
    name: { en: 'Pastrami', ar: 'بسطرمة' },
    subtitle: { en: 'Beef pastrami with roasted peppers', ar: 'بسطرمة مع فلفل مشوي' },
    sizes: { M: 210, L: 288, F: 382 },
    allowsStuffed: true,
    availableExtras: ['cheese', 'jalapeno']
  },
  {
    id: 'shrimp',
    category: 'pizza',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1200&q=80',
    name: { en: 'Shrimp', ar: 'جمبري' },
    subtitle: { en: 'Seafood flavor with garlic kick', ar: 'نكهة بحرية بلمسة ثوم' },
    sizes: { M: 245, L: 330, F: 425 },
    allowsStuffed: true,
    availableExtras: ['cheese', 'shrimp', 'ranch']
  },
  {
    id: 'sea-ranch',
    category: 'pizza',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=1200&q=80',
    name: { en: 'Sea Ranch', ar: 'سي رانش' },
    subtitle: { en: 'Creamy ranch with seafood mix', ar: 'رانش كريمي مع مكس بحري' },
    sizes: { M: 248, L: 334, F: 430 },
    allowsStuffed: true,
    availableExtras: ['shrimp', 'ranch', 'cheese']
  },
  {
    id: 'veggie',
    category: 'pizza',
    image: 'https://images.unsplash.com/photo-1594007654729-407eedc4be65?auto=format&fit=crop&w=1200&q=80',
    name: { en: 'Veggie', ar: 'خضار' },
    subtitle: { en: 'Colorful veggies and olives', ar: 'خضار طازجة مع زيتون' },
    sizes: { M: 175, L: 240, F: 325 },
    allowsStuffed: true,
    availableExtras: ['cheese', 'jalapeno']
  },
  {
    id: 'super-beef',
    category: 'pizza',
    image: 'https://images.unsplash.com/photo-1511689660979-10d2b1aada49?auto=format&fit=crop&w=1200&q=80',
    name: { en: 'Super Beef', ar: 'سوبر بيف' },
    subtitle: { en: 'Seasoned beef, onions, and cheese', ar: 'لحم متبل وبصل وجبن' },
    sizes: { M: 225, L: 310, F: 405 },
    allowsStuffed: true,
    availableExtras: ['cheese', 'bbq', 'chicken']
  },
  {
    id: 'cheesy-crunch',
    category: 'premium',
    premium: true,
    bestSeller: true,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80',
    name: { en: 'Cheesy Crunch', ar: 'تشيزي كرنش' },
    subtitle: { en: 'Crunchy crust with rich molten cheese', ar: 'أطراف كرنشي مع جبن سايح' },
    sizes: { M: 235, L: 320, F: 420 },
    allowsStuffed: true,
    availableExtras: ['cheese', 'jalapeno', 'ranch']
  },
  {
    id: 'premium-cheese',
    category: 'premium',
    premium: true,
    image: 'https://images.unsplash.com/photo-1520201163981-8cc95007dd2e?auto=format&fit=crop&w=1200&q=80',
    name: { en: 'Premium Cheese', ar: 'بريميوم تشيز' },
    subtitle: { en: 'Luxury cheese layers and creamy finish', ar: 'طبقات جبن فاخرة بلمسة كريمية' },
    sizes: { M: 240, L: 325, F: 428 },
    allowsStuffed: true,
    availableExtras: ['cheese', 'jalapeno']
  },
  {
    id: 'chicken-pesto',
    category: 'premium',
    premium: true,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80',
    name: { en: 'Chicken Pesto', ar: 'تشيكن بيستو' },
    subtitle: { en: 'Pesto cream, grilled chicken, and parmesan', ar: 'بيستو كريمي مع دجاج وبارميزان' },
    sizes: { M: 245, L: 332, F: 435 },
    allowsStuffed: true,
    availableExtras: ['cheese', 'chicken', 'ranch']
  },
  {
    id: 'penne-arrabbiata',
    category: 'pasta',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=1200&q=80',
    name: { en: 'Penne Arrabbiata', ar: 'بيني أرابياتا' },
    subtitle: { en: 'Spicy tomato sauce with herbs', ar: 'صوص طماطم حار مع أعشاب' },
    sizes: { M: 120, L: 155, F: 190 },
    allowsStuffed: false,
    availableExtras: ['cheese', 'jalapeno']
  },
  {
    id: 'alfredo',
    category: 'pasta',
    image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023882c?auto=format&fit=crop&w=1200&q=80',
    name: { en: 'Alfredo', ar: 'ألفريدو' },
    subtitle: { en: 'Creamy white sauce with mushrooms', ar: 'صوص أبيض كريمي مع مشروم' },
    sizes: { M: 145, L: 180, F: 220 },
    allowsStuffed: false,
    availableExtras: ['cheese', 'chicken']
  },
  {
    id: 'mac-cheese',
    category: 'pasta',
    image: 'https://images.unsplash.com/photo-1543332164-6e82f355badc?auto=format&fit=crop&w=1200&q=80',
    name: { en: 'Mac & Cheese', ar: 'ماك آند تشيز' },
    subtitle: { en: 'Comforting mac with cheddar blend', ar: 'مكرونة بالجبن الشيدر' },
    sizes: { M: 140, L: 178, F: 215 },
    allowsStuffed: false,
    availableExtras: ['cheese', 'jalapeno']
  },
  {
    id: 'chinese-chicken-pasta',
    category: 'pasta',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1200&q=80',
    name: { en: 'Chinese Chicken Pasta', ar: 'مكرونة تشيكن صيني' },
    subtitle: { en: 'Asian-style chicken with creamy pasta', ar: 'دجاج بصوص صيني مع مكرونة كريمية' },
    sizes: { M: 150, L: 188, F: 225 },
    allowsStuffed: false,
    availableExtras: ['chicken', 'bbq']
  },
  {
    id: 'shrimp-pasta',
    category: 'pasta',
    image: 'https://images.unsplash.com/photo-1563379091339-03246963d51a?auto=format&fit=crop&w=1200&q=80',
    name: { en: 'Shrimp Pasta', ar: 'مكرونة جمبري' },
    subtitle: { en: 'Garlic shrimp with rose sauce', ar: 'جمبري بصوص روزيه وثوم' },
    sizes: { M: 170, L: 210, F: 248 },
    allowsStuffed: false,
    availableExtras: ['shrimp', 'cheese']
  },
  {
    id: 'fries',
    category: 'sides',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=1200&q=80',
    name: { en: 'Fries', ar: 'بطاطس' },
    subtitle: { en: 'Golden crispy fries', ar: 'بطاطس ذهبية مقرمشة' },
    sizes: { M: 55, L: 75, F: 95 },
    allowsStuffed: false,
    availableExtras: ['cheese', 'bbq']
  },
  {
    id: 'mozzarella-sticks',
    category: 'sides',
    image: 'https://images.unsplash.com/photo-1541599188778-cdc73298e8fc?auto=format&fit=crop&w=1200&q=80',
    name: { en: 'Mozzarella Sticks', ar: 'موزاريلا ستيكس' },
    subtitle: { en: 'Crunchy outside, cheesy inside', ar: 'مقرمشة من الخارج وجبنة من الداخل' },
    sizes: { M: 85, L: 110, F: 135 },
    allowsStuffed: false,
    availableExtras: ['ranch', 'bbq']
  },
  {
    id: 'onion-rings',
    category: 'sides',
    image: 'https://images.unsplash.com/photo-1639024471283-03518883512d?auto=format&fit=crop&w=1200&q=80',
    name: { en: 'Onion Rings', ar: 'أونيون رينجز' },
    subtitle: { en: 'Crispy onion rings with dip', ar: 'حلقات بصل مقرمشة مع صوص' },
    sizes: { M: 70, L: 92, F: 118 },
    allowsStuffed: false,
    availableExtras: ['bbq', 'ranch']
  },
  {
    id: 'coleslaw',
    category: 'sides',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80',
    name: { en: 'Coleslaw', ar: 'كول سلو' },
    subtitle: { en: 'Fresh creamy cabbage salad', ar: 'سلطة ملفوف كريمية طازجة' },
    sizes: { M: 40, L: 52, F: 65 },
    allowsStuffed: false,
    availableExtras: []
  },
  {
    id: 'soft-drinks',
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1581006852262-e4307cf6283a?auto=format&fit=crop&w=1200&q=80',
    name: { en: 'Soft Drinks', ar: 'مشروبات غازية' },
    subtitle: { en: 'Choose your favorite chilled can', ar: 'اختر مشروبك المفضل باردًا' },
    sizes: { M: 25, L: 35, F: 45 },
    allowsStuffed: false,
    availableExtras: []
  },
  {
    id: 'water',
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1564419320461-6870880221ad?auto=format&fit=crop&w=1200&q=80',
    name: { en: 'Water', ar: 'مياه' },
    subtitle: { en: 'Still water bottle', ar: 'زجاجة مياه' },
    sizes: { M: 10, L: 15, F: 20 },
    allowsStuffed: false,
    availableExtras: []
  },
  {
    id: 'extra-cheese',
    category: 'extras',
    image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=1200&q=80',
    name: { en: 'Cheese', ar: 'جبنة إضافية' },
    subtitle: { en: 'Rich cheese topping', ar: 'إضافة جبنة غنية' },
    sizes: { M: 20, L: 30, F: 40 },
    allowsStuffed: false,
    availableExtras: []
  },
  {
    id: 'extra-jalapeno',
    category: 'extras',
    image: 'https://images.unsplash.com/photo-1625944524162-20491c02f8a3?auto=format&fit=crop&w=1200&q=80',
    name: { en: 'Jalapeno', ar: 'هالبينو' },
    subtitle: { en: 'Spicy sliced jalapeno', ar: 'شرائح هالبينو حارة' },
    sizes: { M: 15, L: 22, F: 28 },
    allowsStuffed: false,
    availableExtras: []
  },
  {
    id: 'extra-ranch',
    category: 'extras',
    image: 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?auto=format&fit=crop&w=1200&q=80',
    name: { en: 'Ranch', ar: 'رانش' },
    subtitle: { en: 'Creamy ranch dip', ar: 'صوص رانش كريمي' },
    sizes: { M: 18, L: 24, F: 30 },
    allowsStuffed: false,
    availableExtras: []
  },
  {
    id: 'extra-bbq',
    category: 'extras',
    image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1200&q=80',
    name: { en: 'BBQ Sauce', ar: 'صوص باربكيو' },
    subtitle: { en: 'Sweet smoky BBQ dip', ar: 'صوص باربكيو مدخن' },
    sizes: { M: 18, L: 24, F: 30 },
    allowsStuffed: false,
    availableExtras: []
  }
]

export const extraCatalog = {
  cheese: { en: 'Extra Cheese', ar: 'جبنة إضافية', price: 25 },
  jalapeno: { en: 'Jalapeno', ar: 'هالبينو', price: 15 },
  ranch: { en: 'Ranch', ar: 'رانش', price: 18 },
  bbq: { en: 'BBQ Sauce', ar: 'صوص باربكيو', price: 18 },
  chicken: { en: 'Chicken Topping', ar: 'إضافة دجاج', price: 35 },
  shrimp: { en: 'Shrimp Topping', ar: 'إضافة جمبري', price: 45 }
}
