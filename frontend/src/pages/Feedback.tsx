import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Send, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function Feedback() {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !feedback || rating === 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields and provide a rating.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    toast({
      title: "Feedback Submitted!",
      description: "Thank you for your valuable feedback. We appreciate your time!",
    });

    // Reset form
    setName("");
    setEmail("");
    setFeedback("");
    setRating(0);
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to E-Shop
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">We Value Your Feedback</h1>
              <p className="text-muted-foreground">
                Help us improve your shopping experience
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-xl">
                Share Your Experience
              </CardTitle>
              <p className="text-center text-muted-foreground">
                Your feedback helps us serve you better
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Rating */}
                <div className="space-y-3">
                  <Label className="text-base font-medium">
                    How would you rate your overall experience?
                  </Label>
                  <div className="flex justify-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className="focus:outline-none transition-transform hover:scale-110"
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        onClick={() => setRating(star)}
                      >
                        <Star
                          className={cn(
                            "h-8 w-8 transition-colors",
                            (hoveredRating || rating) >= star
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300 hover:text-yellow-200"
                          )}
                        />
                      </button>
                    ))}
                  </div>
                  {rating > 0 && (
                    <p className="text-center text-sm text-muted-foreground">
                      {rating === 1 && "Poor - We'll work hard to improve"}
                      {rating === 2 && "Fair - There's room for improvement"}
                      {rating === 3 && "Good - A decent experience"}
                      {rating === 4 && "Very Good - We're glad you enjoyed it"}
                      {rating === 5 && "Excellent - Thank you for the great rating!"}
                    </p>
                  )}
                </div>

                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                {/* Feedback Text */}
                <div className="space-y-2">
                  <Label htmlFor="feedback">Your Feedback</Label>
                  <Textarea
                    id="feedback"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Tell us about your experience, suggestions for improvement, or any issues you encountered..."
                    rows={6}
                    required
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Submitting..."
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Submit Feedback
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Additional Information */}
          <div className="mt-8 text-center">
            <h3 className="text-lg font-semibold mb-3">Other Ways to Reach Us</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6 text-center">
                  <h4 className="font-medium mb-2">Email Support</h4>
                  <p className="text-sm text-muted-foreground">
                    support@eshop.com
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <h4 className="font-medium mb-2">Phone Support</h4>
                  <p className="text-sm text-muted-foreground">
                    +91 98765 43210
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <h4 className="font-medium mb-2">Live Chat</h4>
                  <p className="text-sm text-muted-foreground">
                    Available 24/7 on our website
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}