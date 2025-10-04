"use client"
import { useRouter } from "next/navigation"
import type React from "react"

import { useAuth } from "@/contexts/auth-context"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function ForgotPasswordPage() {
  const router = useRouter()
  const { requestPasswordReset, resetPassword } = useAuth()

  const [step, setStep] = useState<"request" | "reset">("request")
  const [email, setEmail] = useState("")
  const [code, setCode] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setLoading(true)

    if (!email) {
      setError("Please enter your email address")
      setLoading(false)
      return
    }

    const result = await requestPasswordReset(email)
    setLoading(false)

    if (result.success) {
      setSuccess("Reset code sent! Check your console/alert for the code.")
      setStep("reset")
    } else {
      setError(result.error || "Failed to send reset code")
    }
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setLoading(true)

    if (!code || !newPassword || !confirmPassword) {
      setError("Please fill in all fields")
      setLoading(false)
      return
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long")
      setLoading(false)
      return
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match")
      setLoading(false)
      return
    }

    const result = await resetPassword(email, code, newPassword)
    setLoading(false)

    if (result.success) {
      setSuccess("Password reset successful! Redirecting to login...")
      setTimeout(() => router.push("/login"), 2000)
    } else {
      setError(result.error || "Failed to reset password")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-primary mb-2">Forgot Password</h2>
          <p className="text-muted-foreground">
            {step === "request" ? "Enter your email to receive a reset code" : "Enter the code and your new password"}
          </p>
        </div>

        {step === "request" ? (
          <form onSubmit={handleRequestReset} className="space-y-6 bg-card border border-border rounded-lg p-8">
            {error && (
              <div className="bg-destructive/10 border border-destructive text-destructive px-4 py-3 rounded">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-primary/10 border border-primary text-primary px-4 py-3 rounded">{success}</div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full bg-primary text-primary-foreground" disabled={loading}>
              {loading ? "Sending..." : "Send Reset Code"}
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              Remember your password?{" "}
              <Link href="/login" className="text-primary hover:underline font-medium">
                Login
              </Link>
            </div>
          </form>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-6 bg-card border border-border rounded-lg p-8">
            {error && (
              <div className="bg-destructive/10 border border-destructive text-destructive px-4 py-3 rounded">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-primary/10 border border-primary text-primary px-4 py-3 rounded">{success}</div>
            )}

            <div className="space-y-2">
              <Label htmlFor="code">Reset Code</Label>
              <Input
                id="code"
                type="text"
                placeholder="123456"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                placeholder="••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full bg-primary text-primary-foreground" disabled={loading}>
              {loading ? "Resetting..." : "Reset Password"}
            </Button>

            <button
              type="button"
              onClick={() => setStep("request")}
              className="w-full text-sm text-muted-foreground hover:text-primary"
            >
              Back to email entry
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
