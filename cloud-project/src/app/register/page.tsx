import type { Metadata } from "next";
import { RegisterPage } from "../../auth/components/register-page";

export const metadata: Metadata = {
  title: "Регистрация — Cloud",
  description: "Создайте аккаунт Cloud.",
};

export default function Page() {
  return <RegisterPage />;
}
