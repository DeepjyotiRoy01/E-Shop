import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Send, X, Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatMessage {
  id: string;
  type: "user" | "bot";
  message: string;
  timestamp: Date;
}

const FAQ: { q: string | RegExp; a: string; followups?: string[] }[] = [
  { q: /hello|hi|hey/i, a: "Hello! 👋 How can I help you today?", followups: ["What can you do?", "What are your store hours?"] },
  { q: /what can you do|help|assist/i, a: "I can help you with product info, order tracking, returns, and more! What would you like to know?", followups: ["How do I track my order?", "How do I return a product?"] },
  { q: /store hours|open|close/i, a: "We are open 9am to 9pm, 7 days a week. Anything else you want to ask?", followups: ["How do I contact support?", "What payment methods do you accept?"] },
  { q: /reset.*password/i, a: "No worries! Click 'Forgot password' on the login page and follow the instructions.", followups: ["How do I contact support?"] },
  { q: /contact.*support|customer service/i, a: "You can email us at support@example.com or call 123-456-7890. We're here to help!", followups: ["What are your store hours?", "How do I return a product?"] },
  { q: /return|refund/i, a: "We have a 30-day return policy on most items. Would you like to start a return?", followups: ["How do I start a return?", "How long do refunds take?"] },
  { q: /shipping|delivery/i, a: "We offer free shipping on orders above ₹999. Delivery takes 2-5 business days. Want to know more?", followups: ["How do I track my order?", "What are your store hours?"] },
  { q: /order.*track|track.*order/i, a: "Check your email for tracking info or contact support if you need help. Anything else?", followups: ["How do I contact support?", "How long does delivery take?"] },
  { q: /payment|pay/i, a: "We accept credit/debit cards, UPI, and net banking. Need help with payment?", followups: ["How do I use UPI?", "Is cash on delivery available?"] },
  { q: /categories|products/i, a: "You can browse our categories or use the search bar to find products. Looking for something specific?", followups: ["Show me electronics", "Show me fashion"] },
  { q: /thank/i, a: "You're welcome! 😊 Let me know if you have more questions.", followups: ["What can you do?"] },
  { q: /how are you/i, a: "I'm just a bot, but I'm here to help you! How can I assist?", followups: ["What can you do?"] },
];
const defaultBotResponse = "I'm not sure I understand, but I'm learning! Try asking about orders, returns, or store info.";
const defaultFollowups = ["What can you do?", "How do I track my order?", "How do I return a product?", "How do I contact support?"];

export function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "bot",
      message: "Hi there! Welcome to E-Shop! 👋 How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>(defaultFollowups);

  const handleSendMessage = (msg?: string) => {
    const messageToSend = typeof msg === "string" ? msg : inputMessage;
    if (!messageToSend.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      message: messageToSend,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);
    setSuggestions([]);

    // Rule-based bot response
    setTimeout(() => {
      let botAnswer = defaultBotResponse;
      let followups = defaultFollowups;
      for (const { q, a, followups: f } of FAQ) {
        if (typeof q === "string" && messageToSend.toLowerCase().includes(q.toLowerCase())) {
          botAnswer = a;
          followups = f || defaultFollowups;
          break;
        } else if (q instanceof RegExp && q.test(messageToSend)) {
          botAnswer = a;
          followups = f || defaultFollowups;
          break;
        }
      }
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        message: botAnswer,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setSuggestions(followups);
      setIsTyping(false);
    }, 800 + Math.random() * 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 z-50 rounded-full w-16 h-16 shadow-2xl bg-gradient-to-br from-primary to-accent hover:scale-110 transition-all duration-300 border-4 border-white",
          isOpen && "hidden"
        )}
      >
        <MessageCircle className="h-8 w-8 text-white" />
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 z-50 w-96 h-[32rem] shadow-2xl border-2 border-primary rounded-3xl overflow-hidden animate-fade-in">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-primary to-accent text-white rounded-t-3xl">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <Bot className="h-5 w-5 text-white animate-bounce" />
              E-Shop Assistant
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-7 w-7 text-white hover:bg-accent/30"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="flex flex-col h-full p-0 bg-gradient-to-br from-background to-accent/10">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {messages.map((message, idx) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex items-start gap-2",
                    message.type === "user" ? "flex-row-reverse" : "flex-row"
                  )}
                >
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-base shadow-md",
                      message.type === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-gradient-to-br from-primary/80 to-accent/80 text-white"
                    )}
                  >
                    {message.type === "user" ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Bot className="h-4 w-4 animate-pulse" />
                    )}
                  </div>
                  <div
                    className={cn(
                      "max-w-[70%] p-3 rounded-2xl text-sm shadow-sm",
                      message.type === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-white/90 text-primary border border-primary/10"
                    )}
                  >
                    {message.message}
                  </div>
                </div>
              ))}
              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/80 to-accent/80 flex items-center justify-center animate-pulse">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div className="bg-white/90 p-3 rounded-2xl border border-primary/10">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* Suggestions */}
            {suggestions.length > 0 && !isTyping && (
              <div className="px-4 pb-2 flex flex-wrap gap-2">
                {suggestions.map((s, i) => (
                  <Button
                    key={i}
                    variant="outline"
                    size="sm"
                    className="rounded-full border-primary/30 text-primary/90 bg-white/80 hover:bg-primary/10 transition-all"
                    onClick={() => handleSendMessage(s)}
                  >
                    {s}
                  </Button>
                ))}
              </div>
            )}
            {/* Input */}
            <div className="p-4 border-t bg-white/80 rounded-b-3xl">
              <div className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="text-sm border-primary/30 focus:border-primary"
                  disabled={isTyping}
                />
                <Button size="sm" onClick={() => handleSendMessage()} disabled={isTyping || !inputMessage.trim()} className="bg-gradient-to-br from-primary to-accent text-white shadow-md">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}