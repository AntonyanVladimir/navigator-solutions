import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { AppUserRole, persistUser, registerUser } from "@/lib/api/auth";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<AppUserRole>("RegularUser");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const user = await registerUser({ email, password, role });
      persistUser(user);
      toast.success("Account created successfully!");
      navigate(user.role === "Admin" ? "/admin" : "/");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to create account.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/40 to-background flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md border-border/60 shadow-xl">
        <CardHeader className="space-y-3">
          <CardTitle className="text-3xl font-semibold text-center">Create your account</CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            Register to start scheduling and managing your appointments.
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
                autoComplete="new-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                minLength={8}
                maxLength={100}
              />
              <p className="text-xs text-muted-foreground">
                Use at least 8 characters with a mix of letters and numbers.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <select
                id="role"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                value={role}
                onChange={(event) => setRole(event.target.value as AppUserRole)}
              >
                <option value="RegularUser">Regular User</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Creating account…" : "Create account"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-2 text-center text-sm text-muted-foreground">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-primary underline-offset-4 hover:underline">
              Sign in
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

export default Register;
