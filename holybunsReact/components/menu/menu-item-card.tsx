"use client"
import { Card, CardContent } from "@/components/ui/card"
import type { MenuItem } from "@/lib/menu-data"
import { useState } from "react"
import { MenuItemModal } from "./menu-item-modal"

export function MenuItemCard({ item }: { item: MenuItem }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Card
        role="button"
        tabIndex={0}
        onClick={() => setOpen(true)}
        onKeyDown={(e) => e.key === "Enter" && setOpen(true)}
        style={{ backgroundColor: "#2a2a2a", borderColor: "#2a2a2a" }}
        className="hover:border-cyan-400 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-cyan-400/20 group"
      >
        <CardContent className="p-6 flex flex-col justify-between min-h-[200px]">
          <div className="space-y-3 flex-1">
            <h4 style={{ color: "#00e0d6" }} className="font-bold text-lg group-hover:text-cyan-300 transition-colors">
              {item.name}
            </h4>
            {item.description && (
              <p style={{ color: "#ffd700" }} className="text-sm leading-relaxed">
                {item.description}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700">
            <p style={{ color: "#ffffff" }} className="font-semibold text-lg">
              Rs. {item.price.toFixed(0)}
            </p>
            <svg
              className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
        </CardContent>
      </Card>
      <MenuItemModal item={item} open={open} onOpenChange={setOpen} />
    </>
  )
}
