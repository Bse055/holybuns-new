"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function CheckoutPage() {
  const { user } = useAuth()
  const { items, subtotal, gst, delivery, total, clear } = useCart()
  const router = useRouter()

  const [deliveryAddress, setDeliveryAddress] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  })
  const [paymentMethod, setPaymentMethod] = useState("cod")
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    transactionId: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

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
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!user) {
      router.push("/login?redirect=/checkout")
    }
  }, [user, router])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!deliveryAddress.fullName.trim()) {
      newErrors.fullName = "Full name is required"
    }
    if (!deliveryAddress.phone.trim()) {
      newErrors.phone = "Phone number is required"
    }
    if (!deliveryAddress.address.trim()) {
      newErrors.address = "Address is required"
    }
    if (!deliveryAddress.city.trim()) {
      newErrors.city = "City is required"
    }
    if (!deliveryAddress.postalCode.trim()) {
      newErrors.postalCode = "Postal code is required"
    }

    if (paymentMethod === "card") {
      if (!paymentDetails.cardNumber.trim()) {
        newErrors.cardNumber = "Card number is required"
      }
      if (!paymentDetails.expiryDate.trim()) {
        newErrors.expiryDate = "Expiry date is required"
      }
      if (!paymentDetails.cvv.trim()) {
        newErrors.cvv = "CVV is required"
      }
    }

    if (paymentMethod === "online") {
      if (!paymentDetails.transactionId.trim()) {
        newErrors.transactionId = "Transaction ID is required"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    await new Promise((resolve) => setTimeout(resolve, 1500))

    clear()
    router.push("/order-success")
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto max-w-6xl px-4">
        <h1 className="hb-section-title mb-8">Checkout</h1>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Delivery & Payment Form */}
          <section className="lg:col-span-2 space-y-6 opacity-0 transition-all duration-700 translate-y-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Delivery Address */}
              <div className="hb-card-surface rounded-lg border border-border p-6">
                <h2 className="text-2xl font-semibold text-primary mb-4">Delivery Address</h2>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      value={deliveryAddress.fullName}
                      onChange={(e) => setDeliveryAddress({ ...deliveryAddress, fullName: e.target.value })}
                      className={errors.fullName ? "border-destructive" : ""}
                    />
                    {errors.fullName && <p className="text-sm text-destructive mt-1">{errors.fullName}</p>}
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={deliveryAddress.phone}
                      onChange={(e) => setDeliveryAddress({ ...deliveryAddress, phone: e.target.value })}
                      className={errors.phone ? "border-destructive" : ""}
                    />
                    {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <Label htmlFor="address">Street Address *</Label>
                    <Textarea
                      id="address"
                      value={deliveryAddress.address}
                      onChange={(e) => setDeliveryAddress({ ...deliveryAddress, address: e.target.value })}
                      className={errors.address ? "border-destructive" : ""}
                      rows={3}
                    />
                    {errors.address && <p className="text-sm text-destructive mt-1">{errors.address}</p>}
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={deliveryAddress.city}
                        onChange={(e) => setDeliveryAddress({ ...deliveryAddress, city: e.target.value })}
                        className={errors.city ? "border-destructive" : ""}
                      />
                      {errors.city && <p className="text-sm text-destructive mt-1">{errors.city}</p>}
                    </div>

                    <div>
                      <Label htmlFor="postalCode">Postal Code *</Label>
                      <Input
                        id="postalCode"
                        value={deliveryAddress.postalCode}
                        onChange={(e) => setDeliveryAddress({ ...deliveryAddress, postalCode: e.target.value })}
                        className={errors.postalCode ? "border-destructive" : ""}
                      />
                      {errors.postalCode && <p className="text-sm text-destructive mt-1">{errors.postalCode}</p>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="hb-card-surface rounded-lg border border-border p-6">
                <h2 className="text-2xl font-semibold text-primary mb-4">Payment Method</h2>

                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                  <div className="flex items-center space-x-2 rounded-lg border border-border p-4 hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod" className="flex-1 cursor-pointer">
                      <div className="font-medium">Cash on Delivery (COD)</div>
                      <div className="text-sm text-muted-foreground">Pay when you receive your order</div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2 rounded-lg border border-border p-4 hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex-1 cursor-pointer">
                      <div className="font-medium">Credit/Debit Card</div>
                      <div className="text-sm text-muted-foreground">Pay securely with your card</div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2 rounded-lg border border-border p-4 hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value="online" id="online" />
                    <Label htmlFor="online" className="flex-1 cursor-pointer">
                      <div className="font-medium">Online Payment</div>
                      <div className="text-sm text-muted-foreground">EasyPaisa, JazzCash, UPI, Wallet</div>
                    </Label>
                  </div>
                </RadioGroup>

                {paymentMethod === "card" && (
                  <div className="mt-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div>
                      <Label htmlFor="cardNumber">Card Number *</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={paymentDetails.cardNumber}
                        onChange={(e) => setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value })}
                        className={errors.cardNumber ? "border-destructive" : ""}
                        maxLength={19}
                      />
                      {errors.cardNumber && <p className="text-sm text-destructive mt-1">{errors.cardNumber}</p>}
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <Label htmlFor="expiryDate">Expiry Date *</Label>
                        <Input
                          id="expiryDate"
                          placeholder="MM/YY"
                          value={paymentDetails.expiryDate}
                          onChange={(e) => setPaymentDetails({ ...paymentDetails, expiryDate: e.target.value })}
                          className={errors.expiryDate ? "border-destructive" : ""}
                          maxLength={5}
                        />
                        {errors.expiryDate && <p className="text-sm text-destructive mt-1">{errors.expiryDate}</p>}
                      </div>

                      <div>
                        <Label htmlFor="cvv">CVV *</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          type="password"
                          value={paymentDetails.cvv}
                          onChange={(e) => setPaymentDetails({ ...paymentDetails, cvv: e.target.value })}
                          className={errors.cvv ? "border-destructive" : ""}
                          maxLength={4}
                        />
                        {errors.cvv && <p className="text-sm text-destructive mt-1">{errors.cvv}</p>}
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === "online" && (
                  <div className="mt-6 animate-in fade-in slide-in-from-top-2 duration-300">
                    <Label htmlFor="transactionId">Transaction ID / Reference Number *</Label>
                    <Input
                      id="transactionId"
                      placeholder="Enter your transaction ID"
                      value={paymentDetails.transactionId}
                      onChange={(e) => setPaymentDetails({ ...paymentDetails, transactionId: e.target.value })}
                      className={errors.transactionId ? "border-destructive" : ""}
                    />
                    {errors.transactionId && <p className="text-sm text-destructive mt-1">{errors.transactionId}</p>}
                    <p className="text-sm text-muted-foreground mt-2">
                      Complete payment via EasyPaisa/JazzCash and enter the transaction ID here
                    </p>
                  </div>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground text-lg py-6"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Place Order"}
              </Button>
            </form>
          </section>

          {/* Order Summary */}
          <section className="opacity-0 transition-all duration-700 translate-y-8">
            <div className="hb-card-surface rounded-lg border border-border p-6 sticky top-24">
              <h2 className="text-2xl font-semibold text-primary mb-4">Order Summary</h2>

              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.name} × {item.quantity}
                    </span>
                    <span className="font-medium">PKR {(item.price * item.quantity).toFixed(0)}</span>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">PKR {subtotal.toFixed(0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">GST (18%)</span>
                  <span className="font-medium">PKR {gst.toFixed(0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery Charges</span>
                  <span className="font-medium">PKR {delivery.toFixed(0)}</span>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between text-lg font-bold">
                <span className="text-accent">Total Payable</span>
                <span className="text-accent">PKR {total.toFixed(0)}</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
