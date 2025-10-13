import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { loginUser } from "@/lib/api/auth";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const user = await loginUser({ email, password });
      setUser(user);
      toast.success(t("auth.login.success"));
      navigate(user.role === "Admin" ? "/admin" : "/");
    } catch (error) {
      const message =
        error instanceof Error && error.message.trim().length > 0
          ? error.message
          : t("auth.login.error");
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/40 to-background flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md border-border/60 shadow-xl">
        <CardHeader className="space-y-3">
          <CardTitle className="text-3xl font-semibold text-center">{t("auth.login.title")}</CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            {t("auth.login.subtitle")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email">{t("auth.email.label")}</Label>
              <Input
                id="email"
                type="email"
                placeholder={t("auth.email.placeholder")}
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                maxLength={320}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t("auth.password.label")}</Label>
              <Input
                id="password"
                type="password"
                placeholder={t("auth.password.placeholder")}
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                minLength={8}
                maxLength={100}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? t("auth.login.submitting") : t("auth.login.submit")}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-2 text-center text-sm text-muted-foreground">
          <p>
            {t("auth.login.noAccountPrompt")}{" "}
            <Link to="/register" className="text-primary underline-offset-4 hover:underline">
              {t("auth.login.createAccount")}
            </Link>
          </p>
          <Link to="/" className="text-primary underline-offset-4 hover:underline">
            {t("auth.login.backHome")}
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
