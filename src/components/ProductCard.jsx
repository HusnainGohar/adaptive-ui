"use client";

import { useUser } from "../context/UserContext";
import { PERSONAS } from "../config/personas";

export default function ProductCard({ product, onClick }) {
  const { currentPersona } = useUser();

  const renderByPersona = () => {
    switch (currentPersona) {
      case PERSONAS.REVIEW_READER:
        return (
          <div
            className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 cursor-pointer"
            onClick={onClick}
          >
            <div className="relative">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              {product.onSale && (
                <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded">
                  SALE
                </span>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2">
                {product.name}
              </h3>
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-sm font-medium text-gray-900 ml-1">
                    {product.rating}
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  ({product.reviewCount} reviews)
                </span>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg font-bold text-gray-900">
                  ${product.price}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-sm text-gray-500 line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                View Reviews & Details
              </button>
            </div>
          </div>
        );

      case PERSONAS.DEAL_HUNTER:
        return (
          <div
            className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 cursor-pointer"
            onClick={onClick}
          >
            <div className="relative">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              {product.onSale && (
                <div className="absolute top-2 left-2">
                  <span className="bg-red-500 text-white px-2 py-1 text-xs rounded-t">
                    SAVE
                  </span>
                  <span className="bg-red-600 text-white px-2 py-1 text-xs rounded-b block">
                    ${(product.originalPrice - product.price).toFixed(2)}
                  </span>
                </div>
              )}
              {product.originalPrice > product.price && (
                <span className="absolute top-2 right-2 bg-yellow-400 text-black px-2 py-1 text-xs rounded font-bold">
                  {Math.round(
                    ((product.originalPrice - product.price) /
                      product.originalPrice) *
                      100,
                  )}
                  % OFF
                </span>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2">
                {product.name}
              </h3>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl font-bold text-red-600">
                  ${product.price}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-lg text-gray-500 line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
              <div className="text-sm text-green-600 font-medium mb-3">
                ✓ Best Price Guarantee
              </div>
              <button className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors font-bold">
                Grab This Deal!
              </button>
            </div>
          </div>
        );

      case PERSONAS.WINDOW_SHOPPER:
        return (
          <div
            className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer group"
            onClick={onClick}
          >
            <div className="relative overflow-hidden">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-56 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
              />
              {product.isNew && (
                <span className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 text-xs rounded">
                  NEW
                </span>
              )}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
            </div>
            <div className="p-4">
              <div className="text-sm text-gray-500 mb-1">{product.brand}</div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {product.name}
              </h3>
              <div className="text-lg font-medium text-gray-900 mb-3">
                ${product.price}
              </div>
              <div className="flex gap-2">
                <button className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                  Save for Later
                </button>
                <button className="flex-1 bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition-colors">
                  Quick View
                </button>
              </div>
            </div>
          </div>
        );

      case PERSONAS.IMPULSE_SHOPPER:
        return (
          <div
            className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg shadow-sm border-2 border-purple-200 hover:shadow-lg transition-all duration-300 cursor-pointer"
            onClick={onClick}
          >
            <div className="relative">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              {product.onSale && (
                <div className="absolute top-2 left-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 text-xs rounded-full font-bold animate-pulse">
                  LIMITED TIME!
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-bold text-gray-900 mb-2">{product.name}</h3>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl font-bold text-purple-600">
                  ${product.price}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-sm text-gray-500 line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
              <div className="text-sm text-orange-600 font-medium mb-3">
                🔥 Trending Now - {product.reviewCount} people bought this
                today!
              </div>
              <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-bold text-lg">
                BUY NOW!
              </button>
            </div>
          </div>
        );

      case PERSONAS.LOYAL_CUSTOMER:
        return (
          <div
            className="bg-white rounded-lg shadow-sm border-2 border-gold-200 hover:shadow-md transition-all duration-300 cursor-pointer"
            onClick={onClick}
          >
            <div className="relative">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <span className="absolute top-2 left-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-2 py-1 text-xs rounded font-bold">
                VIP MEMBER
              </span>
            </div>
            <div className="p-4">
              <div className="text-sm text-yellow-600 font-medium mb-1">
                ⭐ Recommended for you
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {product.name}
              </h3>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg font-bold text-gray-900">
                  ${product.price}
                </span>
                <span className="text-sm text-green-600 font-medium">
                  +{Math.floor(product.price * 0.05)} points
                </span>
              </div>
              <div className="text-sm text-blue-600 mb-3">
                💎 Free shipping • Early access
              </div>
              <button className="w-full bg-yellow-500 text-black py-2 rounded-lg hover:bg-yellow-600 transition-colors font-medium">
                Add to Cart
              </button>
            </div>
          </div>
        );

      case PERSONAS.PRACTICAL_SHOPPER:
        return (
          <div
            className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 cursor-pointer"
            onClick={onClick}
          >
            <div className="relative">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2">
                {product.name}
              </h3>
              <div className="text-sm text-gray-600 mb-3">
                <div>
                  ⭐ {product.rating}/5 ({product.reviewCount} reviews)
                </div>
                <div>
                  📦 {product.specifications?.Warranty || "1 year"} warranty
                </div>
                <div>🚚 Free shipping & returns</div>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg font-bold text-gray-900">
                  ${product.price}
                </span>
                <span className="text-sm text-green-600">Best value</span>
              </div>
              <button className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900 transition-colors">
                Compare & Buy
              </button>
            </div>
          </div>
        );

      case PERSONAS.ETHICAL_SHOPPER:
        return (
          <div
            className="bg-white rounded-lg shadow-sm border-2 border-green-200 hover:shadow-md transition-all duration-300 cursor-pointer"
            onClick={onClick}
          >
            <div className="relative">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              {product.sustainability?.carbonNeutral && (
                <span className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 text-xs rounded">
                  🌍 Carbon Neutral
                </span>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2">
                {product.name}
              </h3>
              <div className="text-sm text-green-700 mb-3">
                {product.sustainability?.ethicalSourcing && (
                  <div>✓ Ethically sourced</div>
                )}
                {product.sustainability?.recyclablePackaging && (
                  <div>✓ Recyclable packaging</div>
                )}
                {product.sustainability?.organicMaterial && (
                  <div>✓ Organic materials</div>
                )}
              </div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg font-bold text-gray-900">
                  ${product.price}
                </span>
              </div>
              <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
                Shop Responsibly
              </button>
            </div>
          </div>
        );

      case PERSONAS.GIFT_GIVER:
        return (
          <div
            className="bg-white rounded-lg shadow-sm border-2 border-pink-200 hover:shadow-md transition-all duration-300 cursor-pointer"
            onClick={onClick}
          >
            <div className="relative">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <span className="absolute top-2 left-2 bg-pink-500 text-white px-2 py-1 text-xs rounded">
                🎁 Perfect Gift
              </span>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2">
                {product.name}
              </h3>
              <div className="text-sm text-pink-600 mb-3">
                <div>🎀 Free gift wrapping</div>
                <div>📝 Custom message card</div>
                <div>📦 Direct shipping available</div>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg font-bold text-gray-900">
                  ${product.price}
                </span>
              </div>
              <button className="w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition-colors">
                Send as Gift
              </button>
            </div>
          </div>
        );

      default:
        return (
          <div
            className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 cursor-pointer"
            onClick={onClick}
          >
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2">
                {product.name}
              </h3>
              <div className="text-lg font-bold text-gray-900">
                ${product.price}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="transition-all duration-500 ease-in-out">
      {renderByPersona()}
    </div>
  );
}
