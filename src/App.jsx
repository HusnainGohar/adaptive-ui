"use client";

import { useState } from "react";
import { getProductById } from "./data/products";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import { PersonaProvider } from "./context/PersonaContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function App() {
  const [currentView, setCurrentView] = useState("home");
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const selectedProduct = selectedProductId
    ? getProductById(selectedProductId)
    : null;

  const handleNavigate = (view) => {
    setCurrentView(view);
    if (view !== "detail") {
      setSelectedProductId(null);
    }
    if (view !== "products") {
      setSelectedCategory(null);
    }
  };

  const handleProductClick = (productId) => {
    setSelectedProductId(productId);
    setCurrentView("detail");
  };

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
    setCurrentView("products");
  };

  const handleBackToProducts = () => {
    setCurrentView("products");
    setSelectedProductId(null);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case "home":
        return (
          <Home
            onNavigate={handleNavigate}
            onProductClick={handleProductClick}
            onCategoryClick={handleCategoryClick}
          />
        );
      case "products":
        return (
          <ProductList
            onProductClick={handleProductClick}
            selectedCategory={selectedCategory}
          />
        );
      case "detail":
        return (
          <ProductDetail
            product={selectedProduct}
            onBack={handleBackToProducts}
          />
        );
      case "cart":
        return <Cart onNavigate={handleNavigate} />;
      case "signin":
        return <SignIn onNavigate={handleNavigate} />;
      case "signup":
        return <SignUp onNavigate={handleNavigate} />;
      case "profile":
        return <Profile onNavigate={handleNavigate} />;
      default:
        return (
          <Home
            onNavigate={handleNavigate}
            onProductClick={handleProductClick}
            onCategoryClick={handleCategoryClick}
          />
        );
    }
  };

  const showHeaderFooter = !["signin", "signup"].includes(currentView);

  const queryClient = new QueryClient();

  return (
    <PersonaProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <div className="min-h-screen bg-gray-50">
            {showHeaderFooter && (
              <Header currentView={currentView} onNavigate={handleNavigate} />
            )}
            <main className="transition-all duration-500 ease-in-out">
              {renderCurrentView()}
            </main>
            {showHeaderFooter && <Footer />}
          </div>
        </QueryClientProvider>
      </AuthProvider>
    </PersonaProvider>
  );
}
