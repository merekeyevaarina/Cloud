import type { Metadata } from "next";
import { AuthShell } from "@/src/auth/ui/auth-shell";
import { LoginForm } from "@/src/auth/ui/login-form";

export const metadata: Metadata = {
  title: "Вход — Cloud",
  description: "Войдите в личный кабинет Cloud.",
};

export default function LoginPage() {
  return (
    <AuthShell
      promoEyebrow="Рады видеть вас снова"
      promoTitle="Ваше пространство начинается здесь."
      promoDescription="Войдите, чтобы продолжить работу и держать важное под рукой."
    >
      <LoginForm />
    </AuthShell>
  );
}
