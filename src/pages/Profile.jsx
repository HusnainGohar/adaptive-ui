"use client"

import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { useUser } from "../context/UserContext"

export default function Profile({ onNavigate }) {
  const { user, updateProfile } = useAuth()
  const { currentPersona, setCurrentPersona } = useUser()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  })

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please sign in to view your profile</h2>
          <button
            onClick={() => onNavigate("signin")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Sign In
          </button>
        </div>
      </div>
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    updateProfile(formData)
    setIsEditing(false)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-sm">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white p-8 rounded-t-lg">
            <div className="flex items-center gap-6">
              <img
                src={user.avatar || "/placeholder.svg"}
                alt={user.name}
                className="w-24 h-24 rounded-full border-4 border-white"
              />
              <div>
                <h1 className="text-3xl font-bold">{user.name}</h1>
                <p className="text-blue-100">{user.email}</p>
                <div className="flex items-center gap-4 mt-2">
                  {user.isVip && (
                    <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold">
                      VIP Member
                    </span>
                  )}
                  <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">
                    {user.loyaltyPoints} Points
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Profile Information */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    {isEditing ? "Cancel" : "Edit"}
                  </button>
                </div>

                {isEditing ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Save Changes
                    </button>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Full Name</label>
                      <p className="text-gray-900">{user.name}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Email</label>
                      <p className="text-gray-900">{user.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Member Since</label>
                      <p className="text-gray-900">{new Date(user.joinDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Account Stats */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Account Overview</h2>
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-blue-900">Loyalty Points</h3>
                        <p className="text-blue-700">{user.loyaltyPoints} points available</p>
                      </div>
                      <div className="text-3xl text-blue-600">💎</div>
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-green-900">Member Status</h3>
                        <p className="text-green-700">{user.isVip ? "VIP Member" : "Regular Member"}</p>
                      </div>
                      <div className="text-3xl text-green-600">{user.isVip ? "⭐" : "👤"}</div>
                    </div>
                  </div>

                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-purple-900">Shopping Persona</h3>
                        <p className="text-purple-700">
                          {currentPersona.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                        </p>
                      </div>
                      <div className="text-3xl text-purple-600">🎭</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => onNavigate("orders")}
                  className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="text-2xl">📦</div>
                  <div className="text-left">
                    <div className="font-medium text-gray-900">My Orders</div>
                    <div className="text-sm text-gray-500">View order history</div>
                  </div>
                </button>

                <button
                  onClick={() => onNavigate("wishlist")}
                  className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="text-2xl">❤️</div>
                  <div className="text-left">
                    <div className="font-medium text-gray-900">Wishlist</div>
                    <div className="text-sm text-gray-500">Saved items</div>
                  </div>
                </button>

                <button
                  onClick={() => onNavigate("products")}
                  className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="text-2xl">🛍️</div>
                  <div className="text-left">
                    <div className="font-medium text-gray-900">Continue Shopping</div>
                    <div className="text-sm text-gray-500">Browse products</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
