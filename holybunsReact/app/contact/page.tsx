"use client"
import { useState } from "react"
import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ContactPage() {
  const [email, setEmail] = useState("")

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
    alert(`Subscribed with email: ${email}`)
    setEmail("")
  }

  return (
    <div className="container mx-auto px-4 py-12 space-y-12">
      {/* Contact Info Section */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-center text-primary">Contact Us</h2>
        <div className="max-w-4xl mx-auto space-y-3 text-center">
          <p className="text-muted-foreground">
            <strong className="text-foreground">Address:</strong> 124 NISHTAR BLOCK, Violet Block, Bahria Town, Lahore,
            53720
          </p>
          <p className="text-muted-foreground">
            <strong className="text-foreground">Phone:</strong>{" "}
            <a href="tel:03393001110" className="text-primary hover:underline">
              0339-300-1110
            </a>
          </p>
          <p className="text-muted-foreground">
            <strong className="text-foreground">Hours:</strong> Open ⋅ Closes 3 am
          </p>
        </div>

        <div className="max-w-4xl mx-auto mt-8">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3402.0!2d74.193!3d31.354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391904b6e289e4d9%3A0x123456789abcdef!2s124%20Nishtar%20Block%2C%20Bahria%20Town%2C%20Lahore!5e0!3m2!1sen!2s!4v1695471234567"
            width="100%"
            height="400"
            style={{ border: 0, borderRadius: "12px" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Holy Buns Location - 124 NISHTAR BLOCK, Violet Block, Bahria Town, Lahore"
            className="shadow-lg"
          />
        </div>
      </section>

      <section className="bg-card border border-border rounded-lg p-8 max-w-2xl mx-auto text-center space-y-4">
        <h3 className="text-2xl font-bold text-primary">Subscribe to our Newsletter</h3>
        <p className="text-muted-foreground">Get the latest updates, offers & heavenly deals straight to your inbox!</p>
        <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 bg-background border-border"
          />
          <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
            Subscribe
          </Button>
        </form>
      </section>
    </div>
  )
}
