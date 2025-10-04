"use client"
import { useCart } from "@/contexts/cart-context"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"

export function CartPanel({ onClose }: { onClose?: () => void }) {
  const { items, increment, decrement, remove, subtotal, delivery, total } = useCart()
  const router = useRouter()
  const { user } = useAuth()

  const goCheckout = () => {
    if (onClose) onClose()
    if (!user) {
      router.push("/login?redirect=/checkout")
      return
    }
    router.push("/checkout")
  }

  if (items.length === 0) {
    return <p className="text-muted-foreground">Your cart is empty.</p>
  }

  return (
    <div className="space-y-4">
      <ul className="space-y-3">
        {items.map((i) => (
          <li key={i.id} className="flex items-center justify-between rounded-lg border border-border p-3">
            <div>
              <p className="font-medium">{i.name}</p>
              <p className="text-sm text-muted-foreground">PKR {i.price.toFixed(0)}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="secondary" onClick={() => decrement(i.id)} aria-label="Decrease">
                -
              </Button>
              <span aria-live="polite" className="w-6 text-center">
                {i.quantity}
              </span>
              <Button variant="secondary" onClick={() => increment(i.id)} aria-label="Increase">
                +
              </Button>
              <Button variant="destructive" onClick={() => remove(i.id)} aria-label="Remove">
                Remove
              </Button>
            </div>
          </li>
        ))}
      </ul>

      <Separator />
      <div className="space-y-1 text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>PKR {subtotal.toFixed(0)}</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery</span>
          <span>PKR {delivery.toFixed(0)}</span>
        </div>
        <div className="flex justify-between font-semibold text-accent-foreground">
          <span className="text-accent">Total</span>
          <span className="text-accent">PKR {total.toFixed(0)}</span>
        </div>
      </div>
      <Button className="w-full bg-primary text-primary-foreground" onClick={goCheckout}>
        Proceed to Checkout
      </Button>
    </div>
  )
}
