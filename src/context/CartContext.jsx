import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { getShippingCost, roundCurrency } from '../../shared/commerce.js'

const STORAGE_KEY = 'markarte-cart-v1'
const CartContext = createContext(null)

function readStoredCart() {
  if (typeof window === 'undefined') return []

  try {
    const stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? '[]')
    if (!Array.isArray(stored)) return []

    return stored
      .filter((item) => (
        item
        && typeof item.id === 'string'
        && Number.isInteger(item.quantity)
        && item.quantity > 0
      ))
      .map((item) => ({
        id: item.id,
        name: String(item.name ?? 'Producto'),
        category: String(item.category ?? ''),
        price: Number(item.price) || 0,
        image: String(item.image ?? ''),
        quantity: Math.min(99, item.quantity),
      }))
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readStoredCart)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // Storage can be unavailable in private browsing or restricted contexts.
    }
  }, [items])

  const addItem = (product) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id)

      if (existingItem) {
        return currentItems.map((item) => (
          item.id === product.id
            ? { ...item, quantity: Math.min(99, item.quantity + 1) }
            : item
        ))
      }

      return [
        ...currentItems,
        {
          id: product.id,
          name: product.name,
          category: product.category,
          price: product.price,
          image: product.image,
          quantity: 1,
        },
      ]
    })
  }

  const updateQuantity = (id, quantity) => {
    const nextQuantity = Math.max(1, Math.min(99, Number(quantity) || 1))
    setItems((currentItems) => currentItems.map((item) => (
      item.id === id ? { ...item, quantity: nextQuantity } : item
    )))
  }

  const removeItem = (id) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id))
  }

  const clearCart = () => {
    setItems([])
  }

  const itemCount = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items],
  )

  const subtotal = useMemo(
    () => roundCurrency(items.reduce((total, item) => total + item.price * item.quantity, 0)),
    [items],
  )

  const shipping = useMemo(() => getShippingCost(subtotal), [subtotal])
  const total = useMemo(() => roundCurrency(subtotal + shipping), [subtotal, shipping])

  const value = useMemo(() => ({
    items,
    itemCount,
    subtotal,
    shipping,
    total,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
  }), [items, itemCount, subtotal, shipping, total])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart debe usarse dentro de CartProvider.')
  }
  return context
}
