import { useState, useMemo } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { HeroSlider } from "@/components/home/HeroSlider";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ReviewsSection } from "@/components/reviews/ReviewsSection";
import { Footer } from "@/components/layout/Footer";
import { AIChat } from "@/components/chatbot/AIChat";
import { products } from "@/data/products";
import { Product } from "@/components/products/ProductCard";
import { Link } from "react-router-dom";

const Index = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter products based on category and search
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [selectedCategory, searchQuery]);

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev; // Don't add duplicates for now
      }
      const updated = [...prev, product];
      localStorage.setItem('cartItems', JSON.stringify(updated));
      return updated;
    });
  };

  const handleToggleWishlist = (product: Product) => {
    setWishlistItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      let updated;
      if (existing) {
        updated = prev.filter((item) => item.id !== product.id);
      } else {
        updated = [...prev, product];
      }
      localStorage.setItem('wishlistItems', JSON.stringify(updated));
      return updated;
    });
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setSearchQuery(""); // Clear search when category changes
  };

  const handleHomeNavigation = () => {
    setSelectedCategory("All");
    setSearchQuery("");
    setIsSearchOpen(false);
  };

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isSearchOpen) {
      setSearchQuery(""); // Clear search when closing
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        cartCount={cartItems.length}
        wishlistCount={wishlistItems.length}
        onCategorySelect={handleCategorySelect}
        onSearchToggle={handleSearchToggle}
        isSearchOpen={isSearchOpen}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onHomeNavigation={handleHomeNavigation}
      />
      
      <main>
        {/* Hero Slider */}
        <HeroSlider />

        {/* Products Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                {selectedCategory === "All" 
                  ? "Featured Products" 
                  : `${selectedCategory} Products`}
              </h2>
              {searchQuery && (
                <p className="text-muted-foreground">
                  Showing results for "{searchQuery}" ({filteredProducts.length} products)
                </p>
              )}
            </div>
            
            <ProductGrid
              products={filteredProducts}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
              wishlistItems={wishlistItems}
            />
          </div>
        </section>

        {/* Customer Reviews */}
        <ReviewsSection />
      </main>

      <Footer />
      <AIChat />
      <div className="fixed bottom-2 left-2 z-50">
        <Link to="/reset-password" className="text-xs text-muted-foreground underline">Reset Password (test)</Link>
      </div>
    </div>
  );
};

export default Index;
