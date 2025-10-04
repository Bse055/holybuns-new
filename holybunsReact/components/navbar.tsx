"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { CartSheet } from "@/components/cart-sheet"
import { useState } from "react"
import { useCart } from "@/contexts/cart-context"

export function Navbar() {
  const { user, logout } = useAuth()
  const { items } = useCart()
  const [open, setOpen] = useState(false)

  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-secondary">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" aria-label="Holy Buns Home" className="flex items-center">
          <img src="/holybunslogo.png" alt="Holy Buns Logo" className="logo" />
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/" className="hb-nav-link">
            Home
          </Link>
          <Link href="/menu" className="hb-nav-link">
            Menu
          </Link>
          <Link href="/#about" scroll={true} className="hb-nav-link">
            About
          </Link>
          <Link href="/contact" className="hb-nav-link">
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <span className="text-sm hidden sm:inline">
                {"👤 "}Hi, {user.fullName}
              </span>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  logout()
                }}
                className="text-primary ml-2"
              >
                Logout
              </a>
            </>
          ) : (
            <Link href="/login">
              <Button variant="secondary">Login / Signup</Button>
            </Link>
          )}
          <a
            href="javascript:void(0)"
            className="cart-link bg-primary text-primary-foreground flex items-center"
            onClick={(e) => {
              e.preventDefault()
              setOpen(true)
            }}
            aria-label="Open cart"
          >
            {"🛒"}
            <span id="nav-cart-count" className="cart-count">
              {cartCount}
            </span>
          </a>
        </div>
      </div>
      <CartSheet open={open} onOpenChange={setOpen} />
    </header>
  )
}
