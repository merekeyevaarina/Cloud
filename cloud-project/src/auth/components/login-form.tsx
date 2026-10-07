"use client";

import { Button } from "@/src/shared/ui/button";
import { Checkbox } from "@/src/shared/ui/checkbox";
import { Input } from "@/src/shared/ui/input";
import { Label } from "@/src/shared/ui/label";
import { Separator } from "@/src/shared/ui/separator";
import {useState} from "react";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

   async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault();

      setError("");

      const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
              email,
              password,
          }),
      })
        const data = await response.json();

      if(!response.ok) {
          setError(data.error);
          return;
      }
       window.location.href = "/";
   }

  return (
    <>
      <div className="mb-8">
        <p className="mb-3 text-sm font-medium text-[#756d80]">Личный кабинет</p>
        <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[#211b2d]">Войти в аккаунт</h2>
        <p className="mt-2 text-sm leading-6 text-[#77717f]">Введите данные, которые вы указали при регистрации.</p>
      </div>

      <form onSubmit={onSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-[#322b3d]">Логин</Label>
          <Input id="email" name="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Ваш логин" className="h-12 rounded-xl border-[#e4e1e9] bg-white px-4 text-sm text-[#211b2d] placeholder:text-[#aaa5b1] hover:border-[#c9c3d2] focus-visible:border-[#493365] focus-visible:ring-[#493365]/10" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-sm font-medium text-[#322b3d]">Пароль</Label>
            <a href="#forgot-password" className="text-xs font-medium text-[#594276] transition hover:text-[#281b3d]">Забыли пароль?</a>
          </div>
          <Input id="password" name="password" type="password" autoComplete="current-password" required placeholder="Введите пароль" value={password} onChange={(event) => setPassword(event.target.value)} className="h-12 rounded-xl border-[#e4e1e9] bg-white px-4 text-sm text-[#211b2d] placeholder:text-[#aaa5b1] hover:border-[#c9c3d2] focus-visible:border-[#493365] focus-visible:ring-[#493365]/10" />
        </div>
          {error && (
              <p className="text-sm text-red-600">
                  {error}
              </p>
          )}
        <Label className="flex cursor-pointer items-center gap-2.5 text-sm text-[#6f6879]">
          <Checkbox name="remember" />
          Запомнить меня
        </Label>
        <Button type="submit" className="h-12 w-full rounded-xl bg-[#302141] px-4 text-sm font-semibold text-white shadow-sm hover:bg-[#45305e] focus-visible:ring-[#493365]/25">Войти</Button>
      </form>

      <div className="my-7 flex items-center gap-4 text-xs text-[#a19ba8]">
        <Separator className="flex-1 bg-[#ece9ef]" />
        или
        <Separator className="flex-1 bg-[#ece9ef]" />
      </div>
      <p className="text-center text-sm text-[#77717f]">
        Ещё нет аккаунта? <a href="/register" className="font-semibold text-[#493365] transition hover:text-[#281b3d]">Зарегистрироваться</a>
      </p>
      <p className="mt-10 text-center text-xs leading-5 text-[#a19ba8]">Продолжая, вы соглашаетесь с условиями использования и политикой конфиденциальности.</p>
    </>
  );
}
