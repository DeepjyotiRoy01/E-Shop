import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const deals = [
  {
    id: 1,
    title: "Super Sale Weekend",
    subtitle: "Up to 70% off on Electronics",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop",
    discount: "70% OFF",
    cta: "Shop Now",
  },
  {
    id: 2,
    title: "Fashion Fiesta",
    subtitle: "Latest trends at unbeatable prices",
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&h=400&fit=crop",
    discount: "50% OFF",
    cta: "Explore",
  },
  {
    id: 3,
    title: "Home Makeover",
    subtitle: "Transform your space with our deals",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=400&fit=crop",
    discount: "40% OFF",
    cta: "Shop Home",
  },
  {
    id: 4,
    title: "Tech Paradise",
    subtitle: "Latest gadgets and accessories",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&h=400&fit=crop",
    discount: "60% OFF",
    cta: "Discover",
  },
];

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % deals.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % deals.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + deals.length) % deals.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  return (
    <div className="relative h-[400px] md:h-[500px] overflow-hidden rounded-xl mx-4 md:mx-8 mt-4">
      {/* Slides */}
      <div
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {deals.map((deal) => (
          <div key={deal.id} className="min-w-full relative">
            <div
              className="h-full bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${deal.image})` }}
            >
              <div className="absolute inset-0 bg-black/40" />
              <div className="relative h-full flex items-center justify-start pl-8 md:pl-16">
                <div className="text-white max-w-lg">
                  <div className="inline-block bg-sale text-sale-foreground px-3 py-1 rounded-full text-sm font-semibold mb-4">
                    {deal.discount}
                  </div>
                  <h2 className="text-3xl md:text-5xl font-bold mb-2">
                    {deal.title}
                  </h2>
                  <p className="text-lg md:text-xl mb-6 opacity-90">
                    {deal.subtitle}
                  </p>
                  <Button
                    size="lg"
                    className="bg-white text-black hover:bg-white/90 font-semibold"
                  >
                    {deal.cta}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {deals.map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-3 h-3 rounded-full transition-all duration-300",
              currentSlide === index
                ? "bg-white"
                : "bg-white/50 hover:bg-white/70"
            )}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}