import { Product } from "@/components/products/ProductCard";

export const products: Product[] = [
  // Electronics
  {
    id: "1",
    name: "iPhone 15 Pro Max",
    price: 159900,
    originalPrice: 179900,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop",
    category: "Electronics",
    rating: 4.8,
    reviews: 1250,
    discount: 11,
    isNew: true,
    description: "Latest iPhone with titanium design and A17 Pro chip.",
  },
  {
    id: "2",
    name: "Samsung Galaxy S24 Ultra",
    price: 124999,
    originalPrice: 139999,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop",
    category: "Electronics",
    rating: 4.7,
    reviews: 890,
    discount: 11,
    description: "Premium Android phone with S Pen and incredible camera.",
  },
  {
    id: "3",
    name: "MacBook Pro 14-inch M3",
    price: 199900,
    originalPrice: 224900,
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop",
    category: "Electronics",
    rating: 4.9,
    reviews: 567,
    discount: 11,
    isNew: true,
    description: "Powerful laptop for professionals with M3 chip.",
  },
  {
    id: "4",
    name: "Sony WH-1000XM5 Headphones",
    price: 29990,
    originalPrice: 34990,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    category: "Electronics",
    rating: 4.6,
    reviews: 2340,
    discount: 14,
    description: "Industry-leading noise canceling wireless headphones.",
  },
  
  // Fashion
  {
    id: "5",
    name: "Nike Air Jordan 1 Retro",
    price: 12995,
    originalPrice: 14995,
    image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&h=400&fit=crop",
    category: "Fashion",
    rating: 4.5,
    reviews: 3420,
    discount: 13,
    description: "Classic basketball sneakers with iconic design.",
  },
  {
    id: "6",
    name: "Levi's 501 Original Jeans",
    price: 3999,
    originalPrice: 4999,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop",
    category: "Fashion",
    rating: 4.4,
    reviews: 1890,
    discount: 20,
    description: "Timeless straight leg jeans with authentic fit.",
  },
  {
    id: "7",
    name: "Ray-Ban Aviator Sunglasses",
    price: 8990,
    originalPrice: 10990,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop",
    category: "Fashion",
    rating: 4.7,
    reviews: 567,
    discount: 18,
    description: "Classic aviator sunglasses with premium lenses.",
  },
  {
    id: "8",
    name: "Casio G-Shock Watch",
    price: 15999,
    originalPrice: 18999,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    category: "Fashion",
    rating: 4.6,
    reviews: 1230,
    discount: 16,
    description: "Durable sports watch with shock resistance.",
  },

  // Home & Garden
  {
    id: "9",
    name: "Dyson V15 Detect Vacuum",
    price: 65900,
    originalPrice: 74900,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    category: "Home & Garden",
    rating: 4.8,
    reviews: 890,
    discount: 12,
    isNew: true,
    description: "Advanced cordless vacuum with laser dust detection.",
  },
  {
    id: "10",
    name: "Philips Air Fryer XXL",
    price: 19999,
    originalPrice: 24999,
    image: "https://images.unsplash.com/photo-1585515656973-a4ed4f353893?w=400&h=400&fit=crop",
    category: "Home & Garden",
    rating: 4.5,
    reviews: 2340,
    discount: 20,
    description: "Large capacity air fryer for healthier cooking.",
  },
  {
    id: "11",
    name: "IKEA Study Desk",
    price: 12999,
    originalPrice: 15999,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
    category: "Home & Garden",
    rating: 4.3,
    reviews: 456,
    discount: 19,
    description: "Minimalist desk perfect for home office setup.",
  },
  {
    id: "12",
    name: "Instant Pot Duo 7-in-1",
    price: 8999,
    originalPrice: 11999,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
    category: "Home & Garden",
    rating: 4.7,
    reviews: 3450,
    discount: 25,
    description: "Multi-functional pressure cooker for quick meals.",
  },

  // Sports
  {
    id: "13",
    name: "Yonex Badminton Racket",
    price: 4999,
    originalPrice: 6999,
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop",
    category: "Sports",
    rating: 4.4,
    reviews: 234,
    discount: 29,
    description: "Professional badminton racket for competitive play.",
  },
  {
    id: "14",
    name: "Adidas Football",
    price: 2499,
    originalPrice: 2999,
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop",
    category: "Sports",
    rating: 4.2,
    reviews: 567,
    discount: 17,
    description: "Official size football for matches and training.",
  },

  // Books
  {
    id: "15",
    name: "Atomic Habits by James Clear",
    price: 399,
    originalPrice: 599,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop",
    category: "Books",
    rating: 4.9,
    reviews: 12340,
    discount: 33,
    description: "Life-changing book about building good habits.",
  },
  {
    id: "16",
    name: "Think and Grow Rich",
    price: 299,
    originalPrice: 499,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    category: "Books",
    rating: 4.7,
    reviews: 8900,
    discount: 40,
    description: "Classic personal development book by Napoleon Hill.",
  },

  // Beauty
  {
    id: "17",
    name: "Lakme Eyeconic Kajal",
    price: 299,
    originalPrice: 399,
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop",
    category: "Beauty",
    rating: 4.3,
    reviews: 4560,
    discount: 25,
    description: "Smudge-proof kajal for long-lasting eye makeup.",
  },
  {
    id: "18",
    name: "Himalaya Face Wash",
    price: 89,
    originalPrice: 120,
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop",
    category: "Beauty",
    rating: 4.1,
    reviews: 2890,
    discount: 26,
    description: "Natural face wash with neem and turmeric.",
  },

  // Automotive
  {
    id: "19",
    name: "Car Mobile Holder",
    price: 599,
    originalPrice: 999,
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&h=400&fit=crop",
    category: "Automotive",
    rating: 4.2,
    reviews: 1230,
    discount: 40,
    description: "Universal car mount for smartphones and GPS.",
  },
  {
    id: "20",
    name: "Car Dashboard Camera",
    price: 3999,
    originalPrice: 5999,
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&h=400&fit=crop",
    category: "Automotive",
    rating: 4.4,
    reviews: 567,
    discount: 33,
    description: "HD dashboard camera with night vision.",
  },

  // Toys
  {
    id: "21",
    name: "LEGO Creator Expert Set",
    price: 8999,
    originalPrice: 11999,
    image: "https://images.unsplash.com/photo-1558877385-1c4b6e6ac6b8?w=400&h=400&fit=crop",
    category: "Toys",
    rating: 4.8,
    reviews: 890,
    discount: 25,
    description: "Advanced LEGO building set for ages 16+.",
  },
  {
    id: "22",
    name: "Remote Control Drone",
    price: 4999,
    originalPrice: 7999,
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&h=400&fit=crop",
    category: "Toys",
    rating: 4.3,
    reviews: 456,
    discount: 38,
    description: "Beginner-friendly drone with HD camera.",
  },
];