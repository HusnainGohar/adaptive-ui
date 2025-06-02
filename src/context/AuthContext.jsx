"use client"

import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const signIn = async (email, password) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock authentication - in real app, this would be an API call
    const mockUser = {
      id: 1,
      email,
      name: email.split("@")[0],
      avatar: `https://ui-avatars.com/api/?name=${email.split("@")[0]}&background=3B82F6&color=fff`,
      joinDate: new Date().toISOString(),
      loyaltyPoints: Math.floor(Math.random() * 1000) + 500,
      isVip: Math.random() > 0.5,
    }

    setUser(mockUser)
    localStorage.setItem("user", JSON.stringify(mockUser))
    return mockUser
  }

  const signUp = async (name, email, password) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock user creation
    const newUser = {
      id: Date.now(),
      email,
      name,
      avatar: `https://ui-avatars.com/api/?name=${name}&background=3B82F6&color=fff`,
      joinDate: new Date().toISOString(),
      loyaltyPoints: 100, // Welcome bonus
      isVip: false,
    }

    setUser(newUser)
    localStorage.setItem("user", JSON.stringify(newUser))
    return newUser
  }

  const signOut = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  const updateProfile = (updates) => {
    const updatedUser = { ...user, ...updates }
    setUser(updatedUser)
    localStorage.setItem("user", JSON.stringify(updatedUser))
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signIn,
        signUp,
        signOut,
        updateProfile,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
