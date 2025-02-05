
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [attempts, setAttempts] = useState(0);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual login logic
    if (email === "admin@example.com" && password === "admin") {
      navigate("/admin/dashboard");
      toast({
        title: "Login successful",
        description: "Welcome back, Admin!",
      });
    } else if (email === "user@example.com" && password === "user") {
      navigate("/dashboard");
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
    } else {
      setAttempts(prev => prev + 1);
      if (attempts >= 2) {
        toast({
          variant: "destructive",
          title: "Password Reset Required",
          description: "Too many failed attempts. Please reset your password.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: "Invalid email or password",
        });
      }
    }
  };

  const handleResetPassword = () => {
    toast({
      title: "Password Reset Email Sent",
      description: "Please check your email for further instructions.",
    });
  };

  return (
    <Card className="w-[350px] glass-morphism">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">Welcome Back</CardTitle>
        <CardDescription>Login to access your SOP dashboard</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full"
            />
          </div>
          <Button type="submit" className="w-full button-hover">
            Sign In
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button
          variant="link"
          onClick={handleResetPassword}
          className="text-sm text-muted-foreground hover:text-primary"
        >
          Forgot your password?
        </Button>
      </CardFooter>
    </Card>
  );
}
