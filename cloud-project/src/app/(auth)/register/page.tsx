import type { Metadata } from "next";
import { AuthShell } from "@/src/auth/ui/auth-shell";
import { RegisterForm } from "@/src/auth/ui/register-form";

export const metadata: Metadata = {
  title: "Регистрация — Cloud",
  description: "Создайте аккаунт Cloud.",
};


export default function RegisterPage() {
  return (
    <AuthShell
      promoEyebrow="Начните с Cloud"
      promoTitle="Создайте аккаунт и организуйте работу."
      promoDescription="Все ваши файлы и задачи будут собраны в одном месте."
    >
      <RegisterForm />
    </AuthShell>
  );
}
