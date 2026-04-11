import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { defaultOffers, extraCatalog, menuItems, orderStatuses } from '../data/menu'
import { getFirebaseStatus, loadOrdersFromFirebase, saveOrderToFirebase } from '../lib/firebase'

const StoreContext = createContext(null)

const storageKeys = {
  language: 'pubs-pizza-language',
  cart: 'pubs-pizza-cart',
  order: 'pubs-pizza-last-order',
  menu: 'pubs-pizza-menu',
  offers: 'pubs-pizza-offers',
  orders: 'pubs-pizza-orders',
}

function readStorage(key, fallback) {
  const value = localStorage.getItem(key)
  return value ? JSON.parse(value) : fallback
}

function calculateExtrasPrice(extras) {
  return extras.reduce((sum, key) => sum + (extraCatalog[key]?.price || 0), 0)
}

export function StoreProvider({ children }) {
  const [language, setLanguage] = useState(() => localStorage.getItem(storageKeys.language) || 'en')
  const [cart, setCart] = useState(() => readStorage(storageKeys.cart, []))
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [lastOrder, setLastOrder] = useState(() => readStorage(storageKeys.order, null))
  const [menuData, setMenuData] = useState(() => readStorage(storageKeys.menu, menuItems))
  const [offers, setOffers] = useState(() => readStorage(storageKeys.offers, defaultOffers))
  const [orderHistory, setOrderHistory] = useState(() => readStorage(storageKeys.orders, []))
  const [firebaseEnabled] = useState(() => getFirebaseStatus())

  useEffect(() => {
    localStorage.setItem(storageKeys.language, language)
    document.documentElement.lang = language === 'ar' ? 'ar' : 'en'
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
  }, [language])

  useEffect(() => {
    localStorage.setItem(storageKeys.cart, JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    localStorage.setItem(storageKeys.order, JSON.stringify(lastOrder))
  }, [lastOrder])

  useEffect(() => {
    localStorage.setItem(storageKeys.menu, JSON.stringify(menuData))
  }, [menuData])

  useEffect(() => {
    localStorage.setItem(storageKeys.offers, JSON.stringify(offers))
  }, [offers])

  useEffect(() => {
    localStorage.setItem(storageKeys.orders, JSON.stringify(orderHistory))
  }, [orderHistory])

  useEffect(() => {
    if (!firebaseEnabled) {
      return
    }

    let active = true
    loadOrdersFromFirebase()
      .then((orders) => {
        if (active && orders.length) {
          setOrderHistory(orders)
        }
      })
      .catch(() => {})

    return () => {
      active = false
    }
  }, [firebaseEnabled])

  const addToCart = (item, config) => {
    const extras = config.extras || []
    const stuffedCost = config.cheeseStuffed ? 30 : 0
    const basePrice = item.sizes[config.size]
    const extrasPrice = calculateExtrasPrice(extras)
    const total = basePrice + stuffedCost + extrasPrice
    const cartItem = {
      cartId: `${item.id}-${config.size}-${extras.join(',')}-${config.cheeseStuffed ? 'stuffed' : 'classic'}-${Date.now()}`,
      itemId: item.id,
      name: item.name,
      image: item.image,
      size: config.size,
      extras,
      cheeseStuffed: config.cheeseStuffed,
      quantity: 1,
      unitPrice: total,
    }

    setCart((current) => [cartItem, ...current])
    setIsCartOpen(true)
  }

  const removeFromCart = (cartId) => {
    setCart((current) => current.filter((item) => item.cartId !== cartId))
  }

  const updateQuantity = (cartId, change) => {
    setCart((current) =>
      current
        .map((item) =>
          item.cartId === cartId ? { ...item, quantity: Math.max(item.quantity + change, 0) } : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  const clearCart = () => setCart([])

  const submitOrder = async (customer) => {
    const total = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0)
    const createdAt = new Date().toISOString()
    const statusIndex = 1
    const order = {
      id: `PUB-${Date.now().toString().slice(-6)}`,
      createdAt,
      customer,
      items: cart,
      total,
      statusIndex,
      status: orderStatuses[statusIndex],
    }

    let firebase = { saved: false, reason: 'missing_config' }
    try {
      firebase = await saveOrderToFirebase(order)
    } catch {
      firebase = { saved: false, reason: 'request_failed' }
    }

    const finalOrder = {
      ...order,
      firebase,
    }

    setLastOrder(finalOrder)
    setOrderHistory((current) => [finalOrder, ...current])
    clearCart()
    return finalOrder
  }

  const updateMenuItem = (itemId, updates) => {
    setMenuData((current) =>
      current.map((item) => (item.id === itemId ? { ...item, ...updates } : item))
    )
  }

  const updateOffer = (offerId, updates) => {
    setOffers((current) =>
      current.map((offer) => (offer.id === offerId ? { ...offer, ...updates } : offer))
    )
  }

  const addOffer = (offer) => {
    setOffers((current) => [
      {
        id: `offer-${Date.now()}`,
        active: true,
        ...offer,
      },
      ...current,
    ])
  }

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const cartTotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0)

  const filteredMenu = useMemo(() => {
    const query = search.trim().toLowerCase()
    return menuData.filter((item) => {
      const inCategory = category === 'all' ? true : item.category === category
      const inSearch =
        !query ||
        item.name.en.toLowerCase().includes(query) ||
        item.name.ar.toLowerCase().includes(query) ||
        item.subtitle.en.toLowerCase().includes(query) ||
        item.subtitle.ar.toLowerCase().includes(query)
      return inCategory && inSearch
    })
  }, [category, menuData, search])

  const value = {
    language,
    setLanguage,
    cart,
    cartCount,
    cartTotal,
    isCartOpen,
    setIsCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    search,
    setSearch,
    category,
    setCategory,
    filteredMenu,
    lastOrder,
    submitOrder,
    menuItems: menuData,
    extraCatalog,
    orderStatuses,
    offers,
    updateOffer,
    addOffer,
    updateMenuItem,
    orderHistory,
    firebaseEnabled,
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const context = useContext(StoreContext)
  if (!context) {
    throw new Error('useStore must be used within StoreProvider')
  }
  return context
}
