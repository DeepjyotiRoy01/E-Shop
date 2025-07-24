import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Heart,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">E-Shop</h3>
            <p className="text-sm text-muted-foreground">
              Your trusted online shopping destination for electronics, fashion,
              and more. Quality products at unbeatable prices.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link
                to="/"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Home
              </Link>
              <Link
                to="/categories"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Categories
              </Link>
              <Link
                to="/wishlist"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Wishlist
              </Link>
              <Link
                to="/cart"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Cart
              </Link>
            </nav>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Customer Service</h3>
            <nav className="flex flex-col space-y-2">
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Help Center
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Returns & Exchanges
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Shipping Info
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Track Your Order
              </a>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  +91 98765 43210
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  support@eshop.com
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Mumbai, Maharashtra, India
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t">
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold mb-2">
              Subscribe to Our Newsletter
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get the latest deals and updates delivered to your inbox
            </p>
            <div className="flex max-w-md mx-auto gap-2">
              <Input placeholder="Enter your email" type="email" />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>

        {/* Developer Section */}
        <div className="mt-8 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Developer Info with Husky */}
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                <span className="text-2xl">🐕</span>
              </div>
              <div>
                <p className="text-sm font-medium">Developer: Deepjyoti Roy</p>
                <p className="text-xs text-muted-foreground">
                  Built with <Heart className="inline h-3 w-3 fill-red-500 text-red-500" /> using React & TypeScript
                </p>
              </div>
            </div>

            {/* Feedback Link */}
            <Link to="/feedback">
              <Button variant="outline" size="sm">
                Feedback
              </Button>
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-4 border-t text-center">
          <p className="text-xs text-muted-foreground">
            © 2024 E-Shop. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </div>
      </div>
    </footer>
  );
}