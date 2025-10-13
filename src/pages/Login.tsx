import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { loginUser, persistUser } from "@/lib/api/auth";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const user = await loginUser({ email, password });
      persistUser(user);
      toast.success("Successfully signed in!");
      navigate(user.role === "Admin" ? "/admin" : "/");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to sign in.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/40 to-background flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md border-border/60 shadow-xl">
        <CardHeader className="space-y-3">
          <CardTitle className="text-3xl font-semibold text-center">Welcome back</CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            Sign in to manage appointments and view your dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                maxLength={320}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                minLength={8}
                maxLength={100}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Signing in…" : "Sign in"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-2 text-center text-sm text-muted-foreground">
          <p>
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-primary underline-offset-4 hover:underline">
              Create one
            </Link>
          </p>
          <Link to="/" className="text-primary underline-offset-4 hover:underline">
            ← Back to home
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
