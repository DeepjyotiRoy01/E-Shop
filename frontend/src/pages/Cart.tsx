import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { Product } from "@/components/products/ProductCard";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";

const Cart = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) navigate("/");
  }, [user, navigate]);
  const [cartItems, setCartItems] = useState<Product[]>(() => {
    const saved = localStorage.getItem('cartItems');
    return saved ? JSON.parse(saved) : [];
  });

  const handleRemoveFromCart = (productId: string) => {
    const updatedCart = cartItems.filter(item => item.id !== productId);
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        cartCount={cartItems.length}
        wishlistCount={0}
        onCategorySelect={() => {}}
        onSearchToggle={() => {}}
        isSearchOpen={false}
        searchQuery=""
        onSearchChange={() => {}}
      />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => navigate('/')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Shop
          </Button>
          <h1 className="text-3xl font-bold">Shopping Cart</h1>
        </div>

        {cartItems.length === 0 ? (
          <Card className="text-center py-16">
            <CardContent>
              <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">Add some products to get started!</p>
              <Button onClick={() => navigate('/')}>
                Continue Shopping
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id}>
                  <CardContent className="flex items-center gap-4 p-6">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <p className="text-muted-foreground">{item.category}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-2xl font-bold text-primary">
                          ${item.price}
                        </span>
                        {item.originalPrice && (
                          <span className="text-lg text-muted-foreground line-through">
                            ${item.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemoveFromCart(item.id)}
                      className="text-destructive hover:text-destructive-foreground hover:bg-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal ({cartItems.length} items)</span>
                    <span className="font-semibold">${getTotalPrice()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>${getTotalPrice()}</span>
                    </div>
                  </div>
                  <Button className="w-full" size="lg">
                    Proceed to Checkout
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Cart;