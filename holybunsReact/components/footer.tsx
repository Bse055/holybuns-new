"use client"
import { Button } from "@/components/ui/button"
import type React from "react"

import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useState } from "react"

export function Footer() {
  const [email, setEmail] = useState("")
  const onSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      alert("Thank you for subscribing!")
      setEmail("")
    }
  }

  return (
    <footer className="border-t border-border mt-16 bg-secondary">
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-lg mx-auto text-center space-y-4">
          <h3 className="text-xl font-semibold text-primary">Subscribe to our Newsletter</h3>
          <p className="text-sm text-muted-foreground">
            Get the latest updates, offers & heavenly deals straight to your inbox!
          </p>
          <form className="flex gap-2" onSubmit={onSubscribe}>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-background text-foreground"
            />
            <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Subscribe
            </Button>
          </form>
        </div>

        <div className="mt-8 text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Phone:</strong>{" "}
            <a href="tel:03393001110" className="text-primary hover:underline">
              0339-300-1110
            </a>
          </p>
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Address:</strong> 124 NISHTAR BLOCK, Violet Block, Bahria Town, Lahore,
            53720
          </p>
          <div className="flex justify-center gap-4 mt-3">
            <Link
              href="https://www.facebook.com/people/Holy-Buns/61580238209890/#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline"
            >
              Facebook
            </Link>
            <Link
              href="https://www.instagram.com/theholybuns/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline"
            >
              Instagram
            </Link>
          </div>
        </div>
      </div>
      <div className="text-xs text-center text-muted-foreground pb-6">
        © {new Date().getFullYear()} Holy Buns. All rights reserved.
      </div>
    </footer>
  )
}
