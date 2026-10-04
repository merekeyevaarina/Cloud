"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/src/shared/ui/button";
import { Input } from "@/src/shared/ui/input";
import { Label } from "@/src/shared/ui/label";

const passwordPattern = "(?=.*[A-Za-z])(?=.*[0-9]).{8,}";

export function RegisterForm() {
  const [passwordError, setPasswordError] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const password = String(formData.get("password") ?? "");
    const passwordRepeat = String(formData.get("passwordRepeat") ?? "");

    if (password !== passwordRepeat) {
      setPasswordError("Пароли не совпадают.");
      return;
    }

    setPasswordError("");
    setMessage("Данные заполнены корректно. Отправка регистрации пока не подключена.");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="firstName" className="text-sm font-medium text-[#322b3d]">Имя</Label>
        <Input id="firstName" name="firstName" autoComplete="given-name" required placeholder="Ваше имя" className="h-11 rounded-xl border-[#e4e1e9] bg-white px-4 text-sm text-[#211b2d] placeholder:text-[#aaa5b1] hover:border-[#c9c3d2] focus-visible:border-[#493365] focus-visible:ring-[#493365]/10" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="lastName" className="text-sm font-medium text-[#322b3d]">Фамилия</Label>
        <Input id="lastName" name="lastName" autoComplete="family-name" required placeholder="Ваша фамилия" className="h-11 rounded-xl border-[#e4e1e9] bg-white px-4 text-sm text-[#211b2d] placeholder:text-[#aaa5b1] hover:border-[#c9c3d2] focus-visible:border-[#493365] focus-visible:ring-[#493365]/10" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium text-[#322b3d]">Email</Label>
        <Input id="email" name="email" type="email" autoComplete="email" required placeholder="name@example.com" className="h-11 rounded-xl border-[#e4e1e9] bg-white px-4 text-sm text-[#211b2d] placeholder:text-[#aaa5b1] hover:border-[#c9c3d2] focus-visible:border-[#493365] focus-visible:ring-[#493365]/10" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-medium text-[#322b3d]">Пароль</Label>
        <Input id="password" name="password" type="password" autoComplete="new-password" required minLength={8} pattern={passwordPattern} title="Минимум 8 символов, включая латинскую букву и цифру" aria-describedby="password-help" placeholder="Придумайте пароль" className="h-11 rounded-xl border-[#e4e1e9] bg-white px-4 text-sm text-[#211b2d] placeholder:text-[#aaa5b1] hover:border-[#c9c3d2] focus-visible:border-[#493365] focus-visible:ring-[#493365]/10" />
        <p id="password-help" className="text-xs leading-5 text-[#8a8491]">Минимум 8 символов, латинская буква и цифра.</p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="passwordRepeat" className="text-sm font-medium text-[#322b3d]">Повторите пароль</Label>
        <Input id="passwordRepeat" name="passwordRepeat" type="password" autoComplete="new-password" required aria-invalid={Boolean(passwordError)} onChange={() => setPasswordError("")} placeholder="Введите пароль ещё раз" className="h-11 rounded-xl border-[#e4e1e9] bg-white px-4 text-sm text-[#211b2d] placeholder:text-[#aaa5b1] hover:border-[#c9c3d2] focus-visible:border-[#493365] focus-visible:ring-[#493365]/10" />
        {passwordError ? <p role="alert" className="text-xs text-red-600">{passwordError}</p> : null}
      </div>
      <Button type="submit" className="h-12 w-full rounded-xl bg-[#302141] px-4 text-sm font-semibold text-white shadow-sm hover:bg-[#45305e] focus-visible:ring-[#493365]/25">Создать аккаунт</Button>
      {message ? <p role="status" className="text-center text-sm text-[#594276]">{message}</p> : null}
      <p className="pt-2 text-center text-sm text-[#77717f]">
        Уже есть аккаунт? <a href="/login" className="font-semibold text-[#493365] transition hover:text-[#281b3d]">Войти</a>
      </p>
    </form>
  );
}
