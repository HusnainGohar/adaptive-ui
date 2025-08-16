"use client";

import { useState } from "react";
import ProductCard from "../components/ProductCard";
import { useUser } from "../context/UserContext";
import { PERSONAS } from "../config/personas";
import { useProductsQuery } from "../hooks/products";
import { useCategoriesQuery } from "../hooks/categories";

export default function ProductList({
  onProductClick,
  selectedCategory = null,
}) {
  const { isPending, error, data: { products = [] } = {} } = useProductsQuery();
  const { data: categories = [] } = useCategoriesQuery();
  const { currentPersona } = useUser();
  const [sortBy, setSortBy] = useState("featured");
  const [filterCategory, setFilterCategory] = useState(
    selectedCategory || "all",
  );

  console.log(products);

  const getPageTitle = () => {
    if (selectedCategory) {
      return `${selectedCategory} Products`;
    }

    switch (currentPersona) {
      case PERSONAS.REVIEW_READER:
        return "Top Rated Products";
      case PERSONAS.DEAL_HUNTER:
        return "Best Deals & Discounts";
      case PERSONAS.WINDOW_SHOPPER:
        return "Trending & New Arrivals";
      case PERSONAS.IMPULSE_SHOPPER:
        return "Hot Picks Just for You";
      case PERSONAS.LOYAL_CUSTOMER:
        return "Exclusive Member Selections";
      case PERSONAS.PRACTICAL_SHOPPER:
        return "Best Value Products";
      case PERSONAS.ETHICAL_SHOPPER:
        return "Sustainable & Ethical Choices";
      case PERSONAS.GIFT_GIVER:
        return "Perfect Gift Ideas";
      default:
        return "Our Products";
    }
  };

  const getSortOptions = () => {
    switch (currentPersona) {
      case PERSONAS.REVIEW_READER:
        return [
          { value: "rating", label: "Highest Rated" },
          { value: "reviews", label: "Most Reviews" },
          { value: "featured", label: "Featured" },
        ];
      case PERSONAS.DEAL_HUNTER:
        return [
          { value: "discount", label: "Biggest Savings" },
          { value: "price-low", label: "Lowest Price" },
          { value: "featured", label: "Featured Deals" },
        ];
      case PERSONAS.WINDOW_SHOPPER:
        return [
          { value: "new", label: "Newest First" },
          { value: "trending", label: "Trending" },
          { value: "featured", label: "Featured" },
        ];
      default:
        return [
          { value: "featured", label: "Featured" },
          { value: "price-low", label: "Price: Low to High" },
          { value: "price-high", label: "Price: High to Low" },
          { value: "rating", label: "Customer Rating" },
        ];
    }
  };

  const filteredProducts = products.filter((product) => {
    if (filterCategory === "all") return true;
    return product.category === filterCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating;
      case "reviews":
        return b.reviewCount - a.reviewCount;
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "discount":
        return b.originalPrice - b.price - (a.originalPrice - a.price);
      case "new":
        return b.isNew - a.isNew;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 transition-all duration-500">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {getPageTitle()}
            </h1>
            <p className="text-gray-600">
              {sortedProducts.length} products found
              {selectedCategory && ` in ${selectedCategory}`}
            </p>
          </div>

          <div className="mt-4 lg:mt-0 flex gap-4">
            {/* Category Filter */}
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-white border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {getSortOptions().map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {sortedProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              No products found
            </h2>
            <p className="text-gray-600 mb-8">
              Try adjusting your filters or browse all categories.
            </p>
            <button
              onClick={() => setFilterCategory("all")}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              View All Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => onProductClick(product.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
