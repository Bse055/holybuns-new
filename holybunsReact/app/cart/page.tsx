import { CartPanel } from "@/components/cart/cart-panel"

export default function CartPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-primary mb-6">Your Cart</h2>
      <div className="max-w-xl">
        <CartPanel />
      </div>
    </div>
  )
}
