import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, ShoppingCart, ArrowLeft, Trash2 } from "lucide-react";
import { Product } from "@/components/products/ProductCard";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";

const Wishlist = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) navigate("/");
  }, [user, navigate]);
  const [wishlistItems, setWishlistItems] = useState<Product[]>(() => {
    const saved = localStorage.getItem('wishlistItems');
    return saved ? JSON.parse(saved) : [];
  });

  const handleRemoveFromWishlist = (productId: string) => {
    const updatedWishlist = wishlistItems.filter(item => item.id !== productId);
    setWishlistItems(updatedWishlist);
    localStorage.setItem('wishlistItems', JSON.stringify(updatedWishlist));
  };

  const handleAddToCart = (product: Product) => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const exists = cartItems.find((item: Product) => item.id === product.id);
    
    if (!exists) {
      const updatedCart = [...cartItems, product];
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        cartCount={0}
        wishlistCount={wishlistItems.length}
        onCategorySelect={() => {}}
        onSearchToggle={() => {}}
        isSearchOpen={false}
        searchQuery=""
        onSearchChange={() => {}}
        onHomeNavigation={() => {}}
      />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => navigate('/')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Shop
          </Button>
          <h1 className="text-3xl font-bold">My Wishlist</h1>
        </div>

        {wishlistItems.length === 0 ? (
          <Card className="text-center py-16">
            <CardContent>
              <Heart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Your wishlist is empty</h2>
              <p className="text-muted-foreground mb-6">Save items you love for later!</p>
              <Button onClick={() => navigate('/')}>
                Start Shopping
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              <Card key={item.id} className="group hover:shadow-lg transition-all duration-300">
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm"
                    onClick={() => handleRemoveFromWishlist(item.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">{item.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{item.category}</p>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xl font-bold text-primary">
                      ${item.price}
                    </span>
                    {item.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        ${item.originalPrice}
                      </span>
                    )}
                  </div>
                  <Button 
                    className="w-full"
                    onClick={() => handleAddToCart(item)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Wishlist;