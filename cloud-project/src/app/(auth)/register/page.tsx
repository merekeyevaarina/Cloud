import type { Metadata } from "next";
import { AuthShell } from "@/src/auth/ui/auth-shell";

export const metadata: Metadata = {
  title: "Регистрация — Cloud",
  description: "Создайте аккаунт Cloud.",
};

function RegisterForm() {
  return null;
}

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
