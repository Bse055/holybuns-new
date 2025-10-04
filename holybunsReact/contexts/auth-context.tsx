"use client"
import { createContext, useContext, useEffect, useMemo, useState } from "react"
import type React from "react"

type User = {
  email: string
  fullName: string
  phone: string
}

type AuthContextValue = {
  user: User | null
  login: (email: string, password: string, rememberMe?: boolean) => Promise<{ success: boolean; error?: string }>
  signup: (
    email: string,
    password: string,
    fullName: string,
    phone: string,
  ) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  requestPasswordReset: (email: string) => Promise<{ success: boolean; error?: string }>
  resetPassword: (email: string, code: string, newPassword: string) => Promise<{ success: boolean; error?: string }>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)
const LS_USER_KEY = "hb_auth_user"
const LS_USERS_DB_KEY = "hb_users_db" // Mock database
const LS_RESET_CODES_KEY = "hb_reset_codes" // Mock reset codes

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hashBuffer = await crypto.subtle.digest("SHA-256", data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_USER_KEY)
      if (raw) setUser(JSON.parse(raw))
    } catch {}
  }, [])

  const persist = (u: User | null) => {
    if (u) localStorage.setItem(LS_USER_KEY, JSON.stringify(u))
    else localStorage.removeItem(LS_USER_KEY)
  }

  const getUsersDB = (): Record<string, { email: string; passwordHash: string; fullName: string; phone: string }> => {
    try {
      const raw = localStorage.getItem(LS_USERS_DB_KEY)
      return raw ? JSON.parse(raw) : {}
    } catch {
      return {}
    }
  }

  const saveUsersDB = (db: Record<string, any>) => {
    localStorage.setItem(LS_USERS_DB_KEY, JSON.stringify(db))
  }

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      login: async (email, password, rememberMe = false) => {
        const db = getUsersDB()
        const userRecord = db[email.toLowerCase()]

        if (!userRecord) {
          return { success: false, error: "No account found with this email. Please sign up first." }
        }

        const passwordHash = await hashPassword(password)
        if (userRecord.passwordHash !== passwordHash) {
          return { success: false, error: "Incorrect password. Please try again." }
        }

        const u: User = {
          email: userRecord.email,
          fullName: userRecord.fullName,
          phone: userRecord.phone,
        }
        setUser(u)
        if (rememberMe) {
          persist(u)
        }
        return { success: true }
      },

      signup: async (email, password, fullName, phone) => {
        const db = getUsersDB()
        const emailLower = email.toLowerCase()

        if (db[emailLower]) {
          return { success: false, error: "An account with this email already exists. Please login instead." }
        }

        const passwordHash = await hashPassword(password)
        db[emailLower] = {
          email,
          passwordHash,
          fullName,
          phone,
        }
        saveUsersDB(db)

        const u: User = { email, fullName, phone }
        setUser(u)
        persist(u)
        return { success: true }
      },

      logout: () => {
        setUser(null)
        persist(null)
      },

      requestPasswordReset: async (email) => {
        const db = getUsersDB()
        const emailLower = email.toLowerCase()

        if (!db[emailLower]) {
          return { success: false, error: "No account found with this email." }
        }

        // Generate a 6-digit code
        const code = Math.floor(100000 + Math.random() * 900000).toString()

        // Store reset code (in production, this would be sent via email)
        try {
          const resetCodes = JSON.parse(localStorage.getItem(LS_RESET_CODES_KEY) || "{}")
          resetCodes[emailLower] = { code, expires: Date.now() + 15 * 60 * 1000 } // 15 min expiry
          localStorage.setItem(LS_RESET_CODES_KEY, JSON.stringify(resetCodes))

          // In production, send email here
          console.log(`[v0] Password reset code for ${email}: ${code}`)
          alert(`Password reset code (check console): ${code}`)

          return { success: true }
        } catch {
          return { success: false, error: "Failed to generate reset code." }
        }
      },

      resetPassword: async (email, code, newPassword) => {
        const emailLower = email.toLowerCase()

        try {
          const resetCodes = JSON.parse(localStorage.getItem(LS_RESET_CODES_KEY) || "{}")
          const resetData = resetCodes[emailLower]

          if (!resetData) {
            return { success: false, error: "No reset code found. Please request a new one." }
          }

          if (Date.now() > resetData.expires) {
            return { success: false, error: "Reset code has expired. Please request a new one." }
          }

          if (resetData.code !== code) {
            return { success: false, error: "Invalid reset code." }
          }

          // Update password
          const db = getUsersDB()
          if (!db[emailLower]) {
            return { success: false, error: "Account not found." }
          }

          const passwordHash = await hashPassword(newPassword)
          db[emailLower].passwordHash = passwordHash
          saveUsersDB(db)

          // Clear reset code
          delete resetCodes[emailLower]
          localStorage.setItem(LS_RESET_CODES_KEY, JSON.stringify(resetCodes))

          return { success: true }
        } catch {
          return { success: false, error: "Failed to reset password." }
        }
      },
    }),
    [user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
