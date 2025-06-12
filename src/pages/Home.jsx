"use client"

import { useUser } from "../context/UserContext"
import ProductCard from "../components/ProductCard"
import { PERSONAS } from "../config/personas"
import { useProductsQuery } from "../hooks/products";
import { useCategoriesQuery } from "../hooks/categories";

export default function Home({ onNavigate, onProductClick, onCategoryClick }) {
  const { currentPersona } = useUser()
  const { data: products = [] } = useProductsQuery();
  const { data: categories = [] } = useCategoriesQuery();

  const getHeroContent = () => {
    switch (currentPersona) {
      case PERSONAS.REVIEW_READER:
        return {
          title: "Discover Top-Rated Products",
          subtitle: "Shop with confidence using verified reviews and detailed ratings",
          cta: "Browse Reviews",
        }
      case PERSONAS.DEAL_HUNTER:
        return {
          title: "Unbeatable Deals & Discounts",
          subtitle: "Save big with our exclusive offers and price guarantees",
          cta: "Find Deals",
        }
      case PERSONAS.WINDOW_SHOPPER:
        return {
          title: "Explore Trending Collections",
          subtitle: "Discover the latest styles and get inspired by our curated selections",
          cta: "Browse Trends",
        }
      case PERSONAS.IMPULSE_SHOPPER:
        return {
          title: "Hot Picks Just for You!",
          subtitle: "Limited-time offers on trending products you'll love",
          cta: "Shop Now",
        }
      case PERSONAS.LOYAL_CUSTOMER:
        return {
          title: "Welcome Back, VIP Member",
          subtitle: "Exclusive deals and early access to new arrivals just for you",
          cta: "View Exclusives",
        }
      case PERSONAS.PRACTICAL_SHOPPER:
        return {
          title: "Smart Shopping, Better Value",
          subtitle: "Quality products with detailed specs and best-in-class warranties",
          cta: "Compare Products",
        }
      case PERSONAS.ETHICAL_SHOPPER:
        return {
          title: "Shop with Purpose",
          subtitle: "Sustainable, ethical products that make a positive impact",
          cta: "Shop Responsibly",
        }
      case PERSONAS.GIFT_GIVER:
        return {
          title: "Perfect Gifts for Every Occasion",
          subtitle: "Find thoughtful presents with free gift wrapping and personalization",
          cta: "Find Gifts",
        }
      default:
        return {
          title: "Welcome to AdaptiveShop",
          subtitle: "Your personalized shopping experience",
          cta: "Start Shopping",
        }
    }
  }

  const heroContent = getHeroContent()
  const featuredProducts = products.slice(0, 6)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">{heroContent.title}</h1>
            <p className="text-xl mb-8 opacity-90">{heroContent.subtitle}</p>
            <button
              onClick={() => onNavigate("products")}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              {heroContent.cta}
            </button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our wide range of categories to find exactly what you're looking for
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <div
                key={category.id}
                onClick={() => onCategoryClick(category.name)}
                className="group cursor-pointer bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300"></div>
                  <div className="absolute top-4 left-4 text-3xl">{category.icon}</div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{category.name}</h3>
                  <p className="text-gray-600">{category.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our handpicked selection of popular and trending products
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} onClick={() => onProductClick(product.id)} />
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => onNavigate("products")}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              View All Products
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay in the Loop</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Get the latest updates on new products, exclusive deals, and personalized recommendations
          </p>
          <div className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-l-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-600 text-white px-6 py-3 rounded-r-lg hover:bg-blue-700 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
