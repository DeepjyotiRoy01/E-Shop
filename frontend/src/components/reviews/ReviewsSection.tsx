import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Review {
  id: string;
  customerName: string;
  customerImage: string;
  rating: number;
  date: string;
  review: string;
  helpful: number;
  notHelpful: number;
  verified: boolean;
}

const reviews: Review[] = [
  {
    id: "1",
    customerName: "Priya Sharma",
    customerImage: "https://images.unsplash.com/photo-1494790108755-2616b612b791?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    date: "2024-01-15",
    review: "Absolutely amazing quality! The product exceeded my expectations. Fast delivery and excellent packaging. Will definitely order again!",
    helpful: 24,
    notHelpful: 2,
    verified: true,
  },
  {
    id: "2",
    customerName: "Rajesh Kumar",
    customerImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    rating: 4,
    date: "2024-01-10",
    review: "Good value for money. The product works as described. Shipping was quick and customer service was helpful when I had questions.",
    helpful: 18,
    notHelpful: 1,
    verified: true,
  },
  {
    id: "3",
    customerName: "Anita Desai",
    customerImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    date: "2024-01-08",
    review: "Love it! Perfect size and exactly what I was looking for. The quality is top-notch and it arrived earlier than expected.",
    helpful: 31,
    notHelpful: 0,
    verified: true,
  },
  {
    id: "4",
    customerName: "Vikram Singh",
    customerImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    rating: 4,
    date: "2024-01-05",
    review: "Very satisfied with the purchase. Great build quality and stylish design. Minor packaging issue but the product itself is excellent.",
    helpful: 15,
    notHelpful: 3,
    verified: false,
  },
  {
    id: "5",
    customerName: "Meera Patel",
    customerImage: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    date: "2024-01-02",
    review: "Outstanding product! Been using it for weeks now and it's holding up perfectly. Highly recommend to anyone considering this purchase.",
    helpful: 42,
    notHelpful: 1,
    verified: true,
  },
];

export function ReviewsSection() {
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-6 w-6",
                    i < Math.floor(averageRating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  )}
                />
              ))}
            </div>
            <span className="text-xl font-semibold">{averageRating.toFixed(1)}</span>
            <span className="text-muted-foreground">({reviews.length} reviews)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <Card key={review.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                {/* Customer Info */}
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={review.customerImage}
                    alt={review.customerName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{review.customerName}</h4>
                      {review.verified && (
                        <Badge variant="secondary" className="text-xs">
                          Verified
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {new Date(review.date).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-4 w-4",
                          i < review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium">{review.rating}/5</span>
                </div>

                {/* Review Text */}
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {review.review}
                </p>

                {/* Helpful Buttons */}
                <div className="flex items-center gap-4 pt-4 border-t">
                  <Button variant="ghost" size="sm" className="text-xs">
                    <ThumbsUp className="h-3 w-3 mr-1" />
                    Helpful ({review.helpful})
                  </Button>
                  <Button variant="ghost" size="sm" className="text-xs">
                    <ThumbsDown className="h-3 w-3 mr-1" />
                    ({review.notHelpful})
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            View All Reviews
          </Button>
        </div>
      </div>
    </section>
  );
}