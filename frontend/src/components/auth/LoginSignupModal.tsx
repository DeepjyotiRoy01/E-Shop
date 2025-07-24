import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface LoginSignupModalProps {
  children: React.ReactNode;
}

export function LoginSignupModal({ children }: LoginSignupModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const { toast } = useToast();
  const [loginData, setLoginData] = useState({ email: "", password: "", rememberMe: false });
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { user, login, signup, logout, deleteAccount, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      toast({ title: "Error", description: "Please fill in all fields", variant: "destructive" });
      return;
    }
    try {
      await login(loginData.email, loginData.password);
      toast({ title: "Login Successful", description: "Welcome back to E-Shop!" });
      setIsOpen(false);
      setLoginData({ email: "", password: "", rememberMe: false });
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupData.name || !signupData.email || !signupData.password) {
      toast({ title: "Error", description: "Please fill in all fields", variant: "destructive" });
      return;
    }
    if (signupData.password !== signupData.confirmPassword) {
      toast({ title: "Error", description: "Passwords do not match", variant: "destructive" });
      return;
    }
    try {
      await signup(signupData.name, signupData.email, signupData.password);
      toast({ title: "Account Created", description: "You can now log in." });
      setActiveTab("login");
      setSignupData({ name: "", email: "", password: "", confirmPassword: "" });
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Welcome to E-Shop
          </DialogTitle>
        </DialogHeader>
        {user ? (
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-3xl font-bold text-white">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="text-lg font-semibold">{user.name}</div>
            <div className="text-sm text-muted-foreground">{user.email}</div>
            <Button onClick={logout} className="w-full">Logout</Button>
            <Button variant="destructive" onClick={deleteAccount} className="w-full">Delete Account</Button>
          </div>
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="login" className="space-y-4">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="Enter your email"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="Enter your password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember-me"
                      checked={loginData.rememberMe}
                      onCheckedChange={(checked) => setLoginData({ ...loginData, rememberMe: checked === true })}
                    />
                    <Label htmlFor="remember-me" className="text-sm">Remember me</Label>
                  </div>
                  <Button variant="link" className="p-0 h-auto text-xs" type="button" onClick={() => { setIsOpen(false); navigate("/reset-password"); }}>
                    Forgot password?
                  </Button>
                </div>
                <Button type="submit" className="w-full" disabled={loading}>Login</Button>
                <div className="text-center text-sm text-muted-foreground">
                  New to E-Shop?{" "}
                  <Button variant="link" className="p-0 h-auto text-sm" onClick={() => setActiveTab("signup")}>Create an account</Button>
                </div>
              </form>
            </TabsContent>
            <TabsContent value="signup" className="space-y-4">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">Full Name</Label>
                  <Input
                    id="signup-name"
                    placeholder="Enter your full name"
                    value={signupData.name}
                    onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="Enter your email"
                    value={signupData.email}
                    onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="Create a password"
                    value={signupData.password}
                    onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                  />
                </div>
                <Label htmlFor="signup-confirm">Confirm Password</Label>
                <Input
                  id="signup-confirm"
                  type="password"
                  placeholder="Confirm your password"
                  value={signupData.confirmPassword}
                  onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                />
                <Button type="submit" className="w-full" disabled={loading}>Create Account</Button>
                <div className="text-center text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Button variant="link" className="p-0 h-auto text-sm" onClick={() => setActiveTab("login")}>Sign in</Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        )}
      </DialogContent>
    </Dialog>
  );
}