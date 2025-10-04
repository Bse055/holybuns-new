"use client"

import { useEffect } from "react"
import { MENU } from "@/lib/menu-data"
import { MenuItemCard } from "@/components/menu/menu-item-card"

export default function MenuPage() {
  useEffect(() => {
    const sections = document.querySelectorAll("section")

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
          }
        })
      },
      { threshold: 0.1 },
    )

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-black py-16 px-4">
      <div className="container mx-auto max-w-7xl space-y-16">
        <h1 className="text-5xl font-bold text-center text-cyan-400 mb-12">Our Menu</h1>

        {MENU.map((cat) => (
          <section key={cat.id} className="space-y-8 opacity-0 translate-y-8 transition-all duration-700">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-cyan-400">{cat.title}</h2>
            </div>

            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {cat.items.map((item) => (
                <MenuItemCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
