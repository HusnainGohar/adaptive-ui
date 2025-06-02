"use client"

import { useState } from "react"
import { useUser } from "../context/UserContext"
import { useAuth } from "../context/AuthContext"
import PersonaSwitcher from "./PersonaSwitcher"

export default function Header({ currentView, onNavigate }) {
  const { getCartItemCount } = useUser()
  const { user, signOut } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  const handleSignOut = () => {
    signOut()
    setIsUserMenuOpen(false)
    onNavigate("home")
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => onNavigate("home")}
            className="flex items-center gap-2 text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
          >
            <span className="text-blue-600">🛍️</span>
            AdaptiveShop
          </button>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => onNavigate("home")}
              className={`font-medium transition-colors ${
                currentView === "home" ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
              }`}
            >
              Home
            </button>
            <button
              onClick={() => onNavigate("products")}
              className={`font-medium transition-colors ${
                currentView === "products" ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
              }`}
            >
              Products
            </button>
            <button
              onClick={() => onNavigate("categories")}
              className={`font-medium transition-colors ${
                currentView === "categories" ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
              }`}
            >
              Categories
            </button>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <PersonaSwitcher />

            {/* Cart */}
            <button
              onClick={() => onNavigate("cart")}
              className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
                />
              </svg>
              {getCartItemCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getCartItemCount()}
                </span>
              )}
            </button>

            {/* User Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="w-8 h-8 rounded-full" />
                  <span className="hidden md:block font-medium text-gray-700">{user.name}</span>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <div className="p-4 border-b border-gray-200">
                      <div className="flex items-center gap-3">
                        <img
                          src={user.avatar || "/placeholder.svg"}
                          alt={user.name}
                          className="w-12 h-12 rounded-full"
                        />
                        <div>
                          <div className="font-semibold text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                          {user.isVip && (
                            <div className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded mt-1 inline-block">
                              VIP Member
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="p-2">
                      <button
                        onClick={() => {
                          onNavigate("profile")
                          setIsUserMenuOpen(false)
                        }}
                        className="w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        My Profile
                      </button>
                      <button
                        onClick={() => {
                          onNavigate("orders")
                          setIsUserMenuOpen(false)
                        }}
                        className="w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        My Orders
                      </button>
                      <button
                        onClick={() => {
                          onNavigate("wishlist")
                          setIsUserMenuOpen(false)
                        }}
                        className="w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        Wishlist
                      </button>
                      <div className="border-t border-gray-200 my-2"></div>
                      <button
                        onClick={handleSignOut}
                        className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onNavigate("signin")}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => onNavigate("signup")}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Sign Up
                </button>
              </div>
            )}

            {/* Mobile menu button */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-gray-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col gap-4">
              <button
                onClick={() => {
                  onNavigate("home")
                  setIsMenuOpen(false)
                }}
                className="text-left font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => {
                  onNavigate("products")
                  setIsMenuOpen(false)
                }}
                className="text-left font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                Products
              </button>
              <button
                onClick={() => {
                  onNavigate("categories")
                  setIsMenuOpen(false)
                }}
                className="text-left font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                Categories
              </button>
              {!user && (
                <>
                  <button
                    onClick={() => {
                      onNavigate("signin")
                      setIsMenuOpen(false)
                    }}
                    className="text-left font-medium text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => {
                      onNavigate("signup")
                      setIsMenuOpen(false)
                    }}
                    className="text-left font-medium bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
