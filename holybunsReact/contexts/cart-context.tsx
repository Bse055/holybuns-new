"use client"
import { createContext, useContext, useEffect, useMemo, useState } from "react"
import type React from "react"

export type CartItem = {
  id: string
  name: string
  price: number
  quantity: number
}

type CartContextValue = {
  items: CartItem[]
  addItem: (item: Omit<CartItem, "quantity">, qty?: number) => void
  increment: (id: string) => void
  decrement: (id: string) => void
  remove: (id: string) => void
  clear: () => void
  subtotal: number
  gst: number
  delivery: number
  total: number
}

const CartContext = createContext<CartContextValue | undefined>(undefined)
const LS_KEY = "hb_cart_v1"
const DELIVERY_FLAT = 150 // PKR
const GST_RATE = 0.18 // 18%

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY)
      if (raw) setItems(JSON.parse(raw))
    } catch {}
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(items))
    } catch {}
  }, [items])

  const addItem = (item: Omit<CartItem, "quantity">, qty = 1) => {
    setItems((prev) => {
      const idx = prev.findIndex((p) => p.id === item.id)
      if (idx >= 0) {
        const copy = [...prev]
        copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + qty }
        return copy
      }
      return [...prev, { ...item, quantity: qty }]
    })
  }

  const increment = (id: string) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i)))

  const decrement = (id: string) =>
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i)).filter((i) => i.quantity > 0),
    )

  const remove = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id))
  const clear = () => setItems([])

  const subtotal = useMemo(() => items.reduce((sum, i) => sum + i.price * i.quantity, 0), [items])
  const gst = useMemo(() => subtotal * GST_RATE, [subtotal])
  const delivery = items.length ? DELIVERY_FLAT : 0
  const total = subtotal + gst + delivery

  const value = useMemo(
    () => ({ items, addItem, increment, decrement, remove, clear, subtotal, gst, delivery, total }),
    [items, subtotal, gst, delivery, total],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within CartProvider")
  return ctx
}
