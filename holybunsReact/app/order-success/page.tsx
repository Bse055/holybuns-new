"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"

export default function OrderSuccessPage() {
  const router = useRouter()

  useEffect(() => {
    const section = document.querySelector("section")
    if (section) {
      section.classList.add("visible")
    }
  }, [])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4">
      <section className="opacity-0 transition-all duration-700 translate-y-8">
        <div className="hb-card-surface rounded-lg border border-border p-8 md:p-12 max-w-md mx-auto text-center">
          {/* Success Icon */}
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-primary/10 p-4">
              <CheckCircle2 className="w-16 h-16 text-primary" />
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">Order Placed Successfully!</h1>

          <p className="text-lg text-muted-foreground mb-8">Your order is being processed</p>

          {/* Hourglass Animation */}
          <div className="mb-8 flex justify-center">
            <div className="hourglass-container">
              <svg
                className="hourglass"
                width="80"
                height="100"
                viewBox="0 0 80 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Hourglass outline */}
                <path
                  d="M10 5 L70 5 L70 15 L50 40 L50 60 L70 85 L70 95 L10 95 L10 85 L30 60 L30 40 L10 15 Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  className="text-primary"
                />

                {/* Top sand */}
                <path
                  d="M15 10 L65 10 L65 15 L50 35 L30 35 L15 15 Z"
                  fill="currentColor"
                  className="text-accent sand-top"
                />

                {/* Bottom sand */}
                <path
                  d="M15 90 L65 90 L65 85 L50 65 L30 65 L15 85 Z"
                  fill="currentColor"
                  className="text-accent sand-bottom"
                />

                {/* Falling sand particles */}
                <circle cx="40" cy="45" r="1.5" fill="currentColor" className="text-accent sand-particle-1" />
                <circle cx="40" cy="50" r="1.5" fill="currentColor" className="text-accent sand-particle-2" />
                <circle cx="40" cy="55" r="1.5" fill="currentColor" className="text-accent sand-particle-3" />
              </svg>
            </div>
          </div>

          {/* Order Details */}
          <div className="bg-muted/30 rounded-lg p-4 mb-6 text-sm">
            <p className="text-muted-foreground">
              We'll send you a confirmation email with your order details and tracking information shortly.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={() => router.push("/")} variant="outline" className="flex-1">
              Back to Home
            </Button>
            <Button onClick={() => router.push("/menu")} className="flex-1 bg-primary text-primary-foreground">
              Continue Shopping
            </Button>
          </div>
        </div>
      </section>

      <style jsx>{`
        .hourglass-container {
          animation: rotate 3s ease-in-out infinite;
        }

        @keyframes rotate {
          0%,
          100% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(180deg);
          }
        }

        .sand-top {
          animation: sand-fall-top 3s ease-in-out infinite;
          transform-origin: center;
        }

        .sand-bottom {
          animation: sand-fall-bottom 3s ease-in-out infinite;
          transform-origin: center;
        }

        @keyframes sand-fall-top {
          0% {
            opacity: 1;
            transform: scaleY(1);
          }
          50% {
            opacity: 0.3;
            transform: scaleY(0.2);
          }
          100% {
            opacity: 1;
            transform: scaleY(1);
          }
        }

        @keyframes sand-fall-bottom {
          0% {
            opacity: 0.3;
            transform: scaleY(0.2);
          }
          50% {
            opacity: 1;
            transform: scaleY(1);
          }
          100% {
            opacity: 0.3;
            transform: scaleY(0.2);
          }
        }

        .sand-particle-1 {
          animation: particle-fall 1.5s ease-in infinite;
        }

        .sand-particle-2 {
          animation: particle-fall 1.5s ease-in 0.2s infinite;
        }

        .sand-particle-3 {
          animation: particle-fall 1.5s ease-in 0.4s infinite;
        }

        @keyframes particle-fall {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateY(10px);
          }
        }

        .visible {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </div>
  )
}
