import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ShoppingCart,
  Heart,
  Search,
  User,
  Moon,
  Sun,
  Menu,
  Mail,
  Home,
  Grid3X3,
  X,
} from "lucide-react";
import { useTheme } from "next-themes";
import { LoginSignupModal } from "@/components/auth/LoginSignupModal";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onCategorySelect: (category: string) => void;
  onSearchToggle: () => void;
  isSearchOpen: boolean;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onHomeNavigation?: () => void;
}

const categories = [
  "Electronics",
  "Fashion",
  "Home & Garden",
  "Sports",
  "Books",
  "Beauty",
  "Automotive",
  "Toys",
];

export function Navbar({
  cartCount,
  wishlistCount,
  onCategorySelect,
  onSearchToggle,
  isSearchOpen,
  searchQuery,
  onSearchChange,
  onHomeNavigation,
}: NavbarProps) {
  const { theme, setTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const handleProtectedNav = (path: string) => {
    if (!user) {
      setLoginModalOpen(true);
    } else {
      navigate(path);
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur-md shadow-lg transition-all duration-300">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Enhanced Logo */}
            <div className="flex items-center space-x-3 group cursor-pointer hover:scale-105 transition-transform duration-300">
              <div className="relative p-2 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 group-hover:from-primary/30 group-hover:to-accent/30 transition-all duration-300">
                <ShoppingCart className="h-10 w-10 text-primary drop-shadow-lg" />
                <Mail className="absolute -top-1 -right-1 h-6 w-6 text-accent animate-pulse" />
              </div>
              <span className="text-3xl font-black bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent drop-shadow-sm tracking-tight">
                E-Shop
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Button 
                variant="ghost" 
                className="font-medium hover:text-primary transition-colors duration-200"
                onClick={() => {
                  navigate('/');
                  onHomeNavigation?.();
                }}
              >
                <Home className="mr-2 h-4 w-4" />
                Home
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="font-medium">
                    <Grid3X3 className="mr-2 h-4 w-4" />
                    Categories
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  {categories.map((category) => (
                    <DropdownMenuItem
                      key={category}
                      onClick={() => onCategorySelect(category)}
                      className="cursor-pointer"
                    >
                      {category}
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuItem
                    onClick={() => onCategorySelect("All")}
                    className="cursor-pointer font-medium"
                  >
                    All Categories
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="ghost" className="relative" onClick={() => handleProtectedNav('/wishlist')}>
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    {wishlistCount}
                  </Badge>
                )}
              </Button>

              <Button variant="ghost" onClick={onSearchToggle}>
                <Search className="h-5 w-5" />
              </Button>

              <Button variant="ghost" className="relative" onClick={() => handleProtectedNav('/cart')}>
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    {cartCount}
                  </Badge>
                )}
              </Button>

              <LoginSignupModal>
                <Button variant="ghost" onClick={() => setLoginModalOpen(true)}>
                  {user ? (
                    <span className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-lg font-bold text-white">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  ) : (
                    <User className="h-5 w-5" />
                  )}
                </Button>
              </LoginSignupModal>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="hover:bg-primary/10 transition-all duration-300 hover:scale-110"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5 text-amber-500 animate-[spin_2s_linear_infinite]" />
                ) : (
                  <Moon className="h-5 w-5 text-slate-600 dark:text-slate-300" />
                )}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="border-t bg-background/95 backdrop-blur-sm">
            <div className="container mx-auto px-4 py-4">
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="pl-10 pr-10"
                  autoFocus
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2"
                  onClick={onSearchToggle}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t bg-background/95 backdrop-blur-sm">
            <div className="container mx-auto px-4 py-4 space-y-4">
              <Button 
                variant="ghost" 
                className="w-full justify-start hover:text-primary transition-colors duration-200"
                onClick={() => {
                  navigate('/');
                  onHomeNavigation?.();
                  setIsMobileMenuOpen(false);
                }}
              >
                <Home className="mr-2 h-4 w-4" />
                Home
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="w-full justify-start">
                    <Grid3X3 className="mr-2 h-4 w-4" />
                    Categories
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  {categories.map((category) => (
                    <DropdownMenuItem
                      key={category}
                      onClick={() => {
                        onCategorySelect(category);
                        setIsMobileMenuOpen(false);
                      }}
                      className="cursor-pointer"
                    >
                      {category}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <div className="flex justify-between">
                <Button variant="ghost" className="relative" onClick={() => handleProtectedNav('/wishlist')}>
                  <Heart className="h-5 w-5" />
                  {wishlistCount > 0 && (
                    <Badge
                      variant="destructive"
                      className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                    >
                      {wishlistCount}
                    </Badge>
                  )}
                </Button>
                <Button variant="ghost" className="relative" onClick={() => handleProtectedNav('/cart')}>
                  <ShoppingCart className="h-5 w-5" />
                  {cartCount > 0 && (
                    <Badge
                      variant="destructive"
                      className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                    >
                      {cartCount}
                    </Badge>
                  )}
                </Button>
                <LoginSignupModal>
                  <Button variant="ghost" onClick={() => setLoginModalOpen(true)}>
                    {user ? (
                      <span className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-lg font-bold text-white">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    ) : (
                      <User className="h-5 w-5" />
                    )}
                  </Button>
                </LoginSignupModal>
                <Button
                  variant="ghost"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="hover:bg-primary/10 transition-all duration-300"
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? (
                    <Sun className="h-5 w-5 text-amber-500" />
                  ) : (
                    <Moon className="h-5 w-5 text-slate-600 dark:text-slate-300" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
      <LoginSignupModal>{null}</LoginSignupModal>
    </>
  );
}