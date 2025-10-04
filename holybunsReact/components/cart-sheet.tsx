"use client"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { CartPanel } from "@/components/cart/cart-panel"

export function CartSheet({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="text-primary">Your Cart</SheetTitle>
        </SheetHeader>
        <div className="mt-4">
          <CartPanel onClose={() => onOpenChange(false)} />
        </div>
      </SheetContent>
    </Sheet>
  )
}
