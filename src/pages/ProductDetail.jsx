"use client";

import { useState } from "react";
import { useUser } from "../context/UserContext";
import { PERSONAS } from "../config/personas";

export default function ProductDetail({ product, onBack }) {
  const { currentPersona, addToCart } = useUser();
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Product not found
          </h2>
          <button
            onClick={onBack}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const renderByPersona = () => {
    switch (currentPersona) {
      case PERSONAS.REVIEW_READER:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-6 h-6 ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-xl font-bold text-gray-900 ml-2">
                    {product.rating}
                  </span>
                </div>
                <span className="text-lg text-gray-600">
                  ({product.reviewCount} reviews)
                </span>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">
                  Customer Reviews Highlight
                </h3>
                <div className="space-y-3">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <p className="text-gray-700">
                      "Excellent build quality and performance. Exactly as
                      described!"
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      - Verified Buyer ⭐⭐⭐⭐⭐
                    </p>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-4">
                    <p className="text-gray-700">
                      "Great value for money. Would definitely recommend."
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      - Verified Buyer ⭐⭐⭐⭐⭐
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-gray-900">
                  ${product.price}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-xl text-gray-500 line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>

              {/* Quantity and Add to Cart */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-gray-700 font-medium">Quantity:</span>
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-medium text-lg">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className={`w-full py-3 rounded-lg font-semibold text-lg transition-colors ${
                  addedToCart
                    ? "bg-green-600 text-white"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {addedToCart ? "Added to Cart! ✓" : "Add to Cart"}
              </button>
            </div>
          </div>
        );

      case PERSONAS.DEAL_HUNTER:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div className="relative">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full rounded-lg shadow-lg"
                />
                {product.onSale && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-lg">
                    <div className="text-lg font-bold">
                      SAVE ${(product.originalPrice - product.price).toFixed(2)}
                    </div>
                    <div className="text-sm">
                      {Math.round(
                        ((product.originalPrice - product.price) /
                          product.originalPrice) *
                          100,
                      )}
                      % OFF
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-bold text-red-900 mb-3">
                  🔥 Limited Time Deal!
                </h3>
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-4xl font-bold text-red-600">
                    ${product.price}
                  </span>
                  {product.originalPrice > product.price && (
                    <div>
                      <span className="text-2xl text-gray-500 line-through">
                        ${product.originalPrice}
                      </span>
                      <div className="text-green-600 font-bold">
                        You Save: $
                        {(product.originalPrice - product.price).toFixed(2)}
                      </div>
                    </div>
                  )}
                </div>
                <div className="text-sm text-red-700">
                  ✓ Lowest price in 30 days
                  <br />✓ Price match guarantee
                  <br />✓ Free shipping included
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-yellow-800 mb-2">
                  💰 More Ways to Save:
                </h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Buy 2, get 5% off</li>
                  <li>• Sign up for newsletter: Extra 10% off</li>
                  <li>• Student discount available</li>
                </ul>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-gray-700 font-medium">Quantity:</span>
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-medium text-lg">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className={`w-full py-3 rounded-lg font-semibold text-lg transition-colors ${
                  addedToCart
                    ? "bg-green-600 text-white"
                    : "bg-red-600 text-white hover:bg-red-700"
                }`}
              >
                {addedToCart ? "Added to Cart! ✓" : "GRAB THIS DEAL NOW!"}
              </button>

              <div className="text-center text-sm text-gray-600">
                ⏰ Deal ends in 2 days, 14 hours, 23 minutes
              </div>
            </div>
          </div>
        );

      case PERSONAS.WINDOW_SHOPPER:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full rounded-lg shadow-lg"
              />
              <div className="grid grid-cols-3 gap-2">
                <img
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop&crop=left"
                  alt="View 2"
                  className="w-full h-24 object-cover rounded"
                />
                <img
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop&crop=right"
                  alt="View 3"
                  className="w-full h-24 object-cover rounded"
                />
                <img
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop&crop=center"
                  alt="View 4"
                  className="w-full h-24 object-cover rounded"
                />
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-2">{product.brand}</div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              <p className="text-gray-600 mb-6">{product.description}</p>

              <div className="text-2xl font-bold text-gray-900 mb-6">
                ${product.price}
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-purple-900 mb-4">
                  Style It With
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center">
                    <img
                      src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=80&h=80&fit=crop"
                      alt="Accessory 1"
                      className="w-full h-20 object-cover rounded mb-2"
                    />
                    <p className="text-xs text-gray-600">Matching Case</p>
                  </div>
                  <div className="text-center">
                    <img
                      src="https://images.unsplash.com/photo-1583394838336-acd977736f90?w=80&h=80&fit=crop"
                      alt="Accessory 2"
                      className="w-full h-20 object-cover rounded mb-2"
                    />
                    <p className="text-xs text-gray-600">Stand</p>
                  </div>
                  <div className="text-center">
                    <img
                      src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=80&h=80&fit=crop"
                      alt="Accessory 3"
                      className="w-full h-20 object-cover rounded mb-2"
                    />
                    <p className="text-xs text-gray-600">Cable</p>
                  </div>
                </div>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-gray-700 font-medium">Quantity:</span>
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-medium text-lg">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex gap-3 mb-4">
                <button className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                  Save to Wishlist
                </button>
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-3 rounded-lg font-semibold text-lg transition-colors ${
                    addedToCart
                      ? "bg-green-600 text-white"
                      : "bg-gray-900 text-white hover:bg-gray-800"
                  }`}
                >
                  {addedToCart ? "Added to Cart! ✓" : "Add to Cart"}
                </button>
              </div>
            </div>
          </div>
        );

      case PERSONAS.IMPULSE_SHOPPER:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div className="relative">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full rounded-lg shadow-lg"
                />
                <div className="absolute top-4 left-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg animate-pulse">
                  <div className="font-bold">LIMITED TIME!</div>
                  <div className="text-sm">Only 3 left!</div>
                </div>
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-lg p-6 mb-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-600 mb-2">
                    ${product.price}
                  </div>
                  {product.originalPrice > product.price && (
                    <div className="text-lg text-gray-500 line-through mb-2">
                      ${product.originalPrice}
                    </div>
                  )}
                  <div className="text-orange-600 font-bold text-lg mb-4">
                    🔥 {product.reviewCount} people bought this today!
                  </div>
                </div>
              </div>

              <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-4 mb-6">
                <h4 className="font-bold text-yellow-800 mb-2">
                  ⚡ Act Fast - Special Offers:
                </h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Free express shipping (today only)</li>
                  <li>• Buy now, pay later available</li>
                  <li>• 30-day money-back guarantee</li>
                </ul>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-gray-700 font-medium">Quantity:</span>
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-medium text-lg">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className={`w-full py-3 rounded-lg font-semibold text-lg transition-colors ${
                  addedToCart
                    ? "bg-green-600 text-white"
                    : "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700"
                }`}
              >
                {addedToCart ? "Added to Cart! ✓" : "BUY NOW - DON'T MISS OUT!"}
              </button>

              <div className="text-center">
                <div className="text-red-600 font-bold animate-pulse">
                  ⏰ Offer expires in 1 hour!
                </div>
                <div className="text-sm text-gray-600 mt-2">
                  Join 2,847 happy customers
                </div>
              </div>
            </div>
          </div>
        );

      case PERSONAS.LOYAL_CUSTOMER:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full rounded-lg shadow-lg"
              />
            </div>
            <div>
              <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-4 py-2 rounded-lg inline-block mb-4">
                <span className="font-bold">⭐ VIP Member Exclusive</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-yellow-800 mb-4">
                  💎 Your VIP Benefits
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Member Price:</span>
                    <span className="font-bold">${product.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Loyalty Points Earned:</span>
                    <span className="font-bold text-green-600">
                      +{Math.floor(product.price * 0.05)} points
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Free Express Shipping:</span>
                    <span className="text-green-600">✓ Included</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Extended Warranty:</span>
                    <span className="text-green-600">✓ 3 years</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-blue-800 mb-2">
                  📦 Based on your purchase history:
                </h4>
                <p className="text-sm text-blue-700">
                  You might also like our premium accessories bundle (20% off
                  for VIP members)
                </p>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-gray-700 font-medium">Quantity:</span>
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-medium text-lg">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className={`w-full py-3 rounded-lg font-semibold text-lg transition-colors ${
                  addedToCart
                    ? "bg-green-600 text-white"
                    : "bg-yellow-500 text-black hover:bg-yellow-600"
                }`}
              >
                {addedToCart ? "Added to Cart! ✓" : "Add to Cart - VIP Price"}
              </button>

              <div className="text-center text-sm text-gray-600">
                🎁 Early access to new arrivals • Priority customer support
              </div>
            </div>
          </div>
        );

      case PERSONAS.PRACTICAL_SHOPPER:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  📋 Product Specifications
                </h3>
                <div className="space-y-2 text-sm">
                  {Object.entries(product.specifications).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        className="flex justify-between border-b border-gray-200 pb-1"
                      >
                        <span className="text-gray-600">{key}:</span>
                        <span className="font-medium">{value}</span>
                      </div>
                    ),
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {product.rating}/5
                  </div>
                  <div className="text-sm text-gray-600">Customer Rating</div>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    ${product.price}
                  </div>
                  <div className="text-sm text-gray-600">Best Value</div>
                </div>
              </div>

              <div className="bg-gray-100 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-gray-800 mb-2">
                  ✓ What's Included:
                </h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Product with full warranty</li>
                  <li>• Free shipping & returns</li>
                  <li>• 24/7 customer support</li>
                  <li>• Setup guide & documentation</li>
                </ul>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-gray-700 font-medium">Quantity:</span>
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-medium text-lg">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className={`w-full py-3 rounded-lg font-semibold text-lg transition-colors ${
                  addedToCart
                    ? "bg-green-600 text-white"
                    : "bg-gray-800 text-white hover:bg-gray-900"
                }`}
              >
                {addedToCart ? "Added to Cart! ✓" : "Add to Cart - Best Value"}
              </button>
            </div>
          </div>
        );

      case PERSONAS.ETHICAL_SHOPPER:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-green-800 mb-4">
                  🌍 Sustainability Impact
                </h3>
                <div className="space-y-3">
                  {product.sustainability?.carbonNeutral && (
                    <div className="flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      <span className="text-sm">
                        Carbon neutral production and shipping
                      </span>
                    </div>
                  )}
                  {product.sustainability?.ethicalSourcing && (
                    <div className="flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      <span className="text-sm">
                        Ethically sourced materials
                      </span>
                    </div>
                  )}
                  {product.sustainability?.recyclablePackaging && (
                    <div className="flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      <span className="text-sm">100% recyclable packaging</span>
                    </div>
                  )}
                  {product.sustainability?.organicMaterial && (
                    <div className="flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      <span className="text-sm">
                        Made with organic materials
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-blue-800 mb-2">
                  🤝 Social Impact
                </h4>
                <p className="text-sm text-blue-700">
                  Every purchase supports fair trade practices and contributes
                  to community development programs.
                </p>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-gray-700 font-medium">Quantity:</span>
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-medium text-lg">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className={`w-full py-3 rounded-lg font-semibold text-lg transition-colors ${
                  addedToCart
                    ? "bg-green-600 text-white"
                    : "bg-green-600 text-white hover:bg-green-700"
                }`}
              >
                {addedToCart ? "Added to Cart! ✓" : "Shop Responsibly"}
              </button>

              <div className="text-center text-sm text-gray-600">
                🌱 Making a positive impact with every purchase
              </div>
            </div>
          </div>
        );

      case PERSONAS.GIFT_GIVER:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full rounded-lg shadow-lg"
              />
            </div>
            <div>
              <div className="bg-pink-500 text-white px-4 py-2 rounded-lg inline-block mb-4">
                <span className="font-bold">🎁 Perfect Gift Choice</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              <div className="bg-pink-50 border-2 border-pink-200 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-pink-800 mb-4">
                  🎀 Gift Services
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-pink-600">✓</span>
                    <span>Premium gift wrapping (free)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-pink-600">✓</span>
                    <span>Personalized message card</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-pink-600">✓</span>
                    <span>Direct shipping to recipient</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-pink-600">✓</span>
                    <span>Gift receipt (no prices shown)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-pink-600">✓</span>
                    <span>Easy returns for recipient</span>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-purple-800 mb-2">
                  💝 Perfect for:
                </h4>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-purple-200 text-purple-800 px-2 py-1 rounded text-xs">
                    Birthdays
                  </span>
                  <span className="bg-purple-200 text-purple-800 px-2 py-1 rounded text-xs">
                    Anniversaries
                  </span>
                  <span className="bg-purple-200 text-purple-800 px-2 py-1 rounded text-xs">
                    Holidays
                  </span>
                  <span className="bg-purple-200 text-purple-800 px-2 py-1 rounded text-xs">
                    Graduations
                  </span>
                </div>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-gray-700 font-medium">Quantity:</span>
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-medium text-lg">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className={`w-full py-3 rounded-lg font-semibold text-lg transition-colors ${
                  addedToCart
                    ? "bg-green-600 text-white"
                    : "bg-pink-600 text-white hover:bg-pink-700"
                }`}
              >
                {addedToCart ? "Added to Cart! ✓" : "Send as Gift"}
              </button>

              <div className="text-center text-sm text-gray-600">
                🚚 Express delivery available for last-minute gifts
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              <p className="text-gray-600 mb-6">{product.description}</p>
              <div className="text-2xl font-bold text-gray-900 mb-6">
                ${product.price}
              </div>

              {/* Quantity and Add to Cart */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-gray-700 font-medium">Quantity:</span>
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-medium text-lg">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className={`w-full py-3 rounded-lg font-semibold text-lg transition-colors ${
                  addedToCart
                    ? "bg-green-600 text-white"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {addedToCart ? "Added to Cart! ✓" : "Add to Cart"}
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 transition-all duration-500">
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Products
        </button>

        <div className="transition-all duration-500 ease-in-out">
          {renderByPersona()}
        </div>
      </div>
    </div>
  );
}
