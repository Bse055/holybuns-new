"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import type { MenuItem } from "@/lib/menu-data"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"
import { useState } from "react"

const SOFT_DRINK_OPTIONS = ["Pepsi", "7Up", "Fanta", "Sprite", "CocaCola"]

export function MenuItemModal({
  item,
  open,
  onOpenChange,
}: {
  item: MenuItem
  open: boolean
  onOpenChange: (v: boolean) => void
}) {
  const { addItem } = useCart()
  const { toast } = useToast()
  const [selectedDrink, setSelectedDrink] = useState<string>("")

  const isSoftDrink = item.category === "Drinks" && item.name.includes("Soft Soda Drink")

  const add = () => {
    if (isSoftDrink && !selectedDrink) {
      toast({
        title: "Please select a drink",
        description: "Choose one of the available soft drink options.",
        duration: 2000,
      })
      return
    }

    const itemName = isSoftDrink ? `${item.name} (${selectedDrink})` : item.name
    addItem({ id: item.id, name: itemName, price: item.price }, 1)
    toast({
      title: "Added to cart!",
      description: `${itemName} has been added to your cart.`,
      duration: 2000,
    })
    setSelectedDrink("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-[#2a2a2a] border-cyan-400/30">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold" style={{ color: "#00e0d6" }}>
            {item.name}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="relative w-full h-64 rounded-lg overflow-hidden bg-gray-800">
            <Image
              src={item.image || "/placeholder.svg?height=400&width=600&query=delicious burger"}
              alt={item.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>

          <p className="text-base leading-relaxed" style={{ color: "#ffd700" }}>
            {item.description}
          </p>

          {isSoftDrink && (
            <div className="space-y-3">
              <p className="font-semibold" style={{ color: "#00e0d6" }}>
                Select your drink:
              </p>
              <div className="space-y-2">
                {SOFT_DRINK_OPTIONS.map((drink) => (
                  <div key={drink} className="flex items-center space-x-2">
                    <Checkbox
                      id={drink}
                      checked={selectedDrink === drink}
                      onCheckedChange={(checked) => {
                        setSelectedDrink(checked ? drink : "")
                      }}
                    />
                    <Label
                      htmlFor={drink}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      style={{ color: "#ffffff" }}
                    >
                      {drink}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          )}

          <p className="text-2xl font-bold" style={{ color: "#ffffff" }}>
            Rs. {item.price.toFixed(0)}
          </p>
          <Button
            className="w-full font-semibold py-6 text-lg"
            style={{ backgroundColor: "#00e0d6", color: "#000000" }}
            onClick={add}
          >
            <svg
              className="w-5 h-5 mr-2"
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
            Add to Cart
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
