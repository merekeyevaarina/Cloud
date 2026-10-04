import { Card, CardContent } from "@/src/shared/ui/card";
import { RegisterForm } from "./register-form";

export function RegisterPanel() {
  return (
    <Card className="flex items-center justify-center rounded-none border-0 bg-white py-10 shadow-none sm:py-12 lg:px-14">
      <CardContent className="w-full max-w-md px-6 sm:px-12 lg:px-0">
        <div className="mb-8 text-lg font-semibold tracking-wide lg:hidden">cloud</div>
        <div className="mb-6">
          <p className="mb-3 text-sm font-medium text-[#756d80]">Новый аккаунт</p>
          <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[#211b2d]">Регистрация</h2>
          <p className="mt-2 text-sm leading-6 text-[#77717f]">Заполните данные, чтобы создать аккаунт Cloud.</p>
        </div>
        <RegisterForm />
      </CardContent>
    </Card>
  );
}
