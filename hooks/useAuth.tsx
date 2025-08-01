import { useEffect, useState } from "react"

// Simulated auth state (replace with real API logic)
export function useAuth() {
  const [user, setUser] = useState<null | { name: string; email: string }>(null)
  const [loading, setLoading] = useState(false)

  // Check session on mount
  useEffect(() => {
    setLoading(true)
    const session = localStorage.getItem("shopella_user")
    if (session) {
      setUser(JSON.parse(session))
    } else {
      setUser(null)
    }
    setLoading(false)
  }, [])

  // Simulate login (for demo, call this from login page)
  function login(userData: { name: string; email: string }) {
    setUser(userData)
    localStorage.setItem("shopella_user", JSON.stringify(userData))
  }

  // Simulate logout and clear session
  function logout() {
    setUser(null)
    localStorage.removeItem("shopella_user")
  }

  return { user, loading, login, logout }
}
