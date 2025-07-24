import { ProductCard, Product } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistItems: Product[];
}

export function ProductGrid({
  products,
  onAddToCart,
  onToggleWishlist,
  wishlistItems,
}: ProductGridProps) {
  const isInWishlist = (productId: string) => {
    return wishlistItems.some((item) => item.id === productId);
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-lg font-semibold mb-2">No products found</h3>
        <p className="text-muted-foreground">
          Try adjusting your search or filter criteria
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          onToggleWishlist={onToggleWishlist}
          isInWishlist={isInWishlist(product.id)}
        />
      ))}
    </div>
  );
}