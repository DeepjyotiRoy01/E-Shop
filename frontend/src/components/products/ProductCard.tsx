import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, ShoppingCart, Star, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  discount?: number;
  isNew?: boolean;
  description: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isInWishlist: boolean;
}

export function ProductCard({
  product,
  onAddToCart,
  onToggleWishlist,
  isInWishlist,
}: ProductCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { toast } = useToast();

  const handleAddToCart = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    onAddToCart(product);
    setIsLoading(false);
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleWishlistToggle = () => {
    onToggleWishlist(product);
    toast({
      title: isInWishlist ? "Removed from Wishlist" : "Added to Wishlist",
      description: `${product.name} has been ${
        isInWishlist ? "removed from" : "added to"
      } your wishlist.`,
    });
  };

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : product.discount;

  return (
    <Card className="group relative overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      {/* Wishlist Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 z-10 bg-white/80 hover:bg-white shadow-sm"
        onClick={handleWishlistToggle}
      >
        <Heart
          className={cn(
            "h-4 w-4 transition-colors duration-200",
            isInWishlist
              ? "fill-red-500 text-red-500"
              : "text-gray-600 hover:text-red-500"
          )}
        />
      </Button>

      {/* Badges */}
      <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
        {product.isNew && (
          <Badge variant="secondary" className="bg-accent text-accent-foreground">
            NEW
          </Badge>
        )}
        {discountPercentage && discountPercentage > 0 && (
          <Badge variant="destructive" className="bg-sale text-sale-foreground">
            -{discountPercentage}%
          </Badge>
        )}
      </div>

      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-muted animate-pulse" />
        )}
        <img
          src={product.image}
          alt={product.name}
          className={cn(
            "w-full h-full object-cover transition-transform duration-300 group-hover:scale-105",
            imageLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Button variant="secondary" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            Quick View
          </Button>
        </div>
      </div>

      <CardContent className="p-4">
        {/* Category */}
        <p className="text-sm text-muted-foreground mb-1">{product.category}</p>
        
        {/* Product Name */}
        <h3 className="font-semibold text-sm md:text-base mb-2 line-clamp-2 hover:text-primary transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-3 w-3",
                  i < Math.floor(product.rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                )}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            ({product.reviews})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="font-bold text-lg">₹{product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ₹{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            onClick={handleAddToCart}
            disabled={isLoading}
            className="flex-1"
          >
            {isLoading ? (
              "Adding..."
            ) : (
              <>
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </>
            )}
          </Button>
          <Button variant="outline" size="icon">
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}