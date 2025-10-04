"use client"
import { getFeaturedItems } from "@/lib/menu-data"
import { Card, CardContent } from "@/components/ui/card"

export function FeaturedCarousel() {
  const featured = getFeaturedItems()
  // Double the items for seamless infinite scroll
  const items = [...featured, ...featured]

  return (
    <div className="relative overflow-hidden py-8">
      <div className="flex gap-6 animate-scroll">
        {items.map((item, idx) => (
          <Card
            key={`${item.id}-${idx}`}
            className="flex-shrink-0 w-72 border-border bg-card hover:border-primary transition-all duration-300"
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">⭐</span>
                <h4 className="font-semibold text-foreground">{item.name}</h4>
              </div>
              <p className="text-sm hb-accent-text line-clamp-2 mb-3">{item.description}</p>
              <p className="text-primary font-bold text-lg">Rs. {item.price.toFixed(0)}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
