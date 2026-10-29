"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/src/shared/ui/button";
import { Input } from "@/src/shared/ui/input";
import { Label } from "@/src/shared/ui/label";

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
    window.location.href = "/drive";
  }

  return (
    <>
      <div className="mb-8">
        <p className="mb-3 text-sm font-medium text-muted-foreground">Личный кабинет</p>
        <h2 className="text-3xl font-semibold tracking-[-0.04em] text-foreground">Войти в аккаунт</h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">Введите данные, которые вы указали при регистрации.</p>
      </div>

      <form onSubmit={onSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" autoComplete="email" required placeholder="name@example.com" value={email} onChange={(event) => setEmail(event.target.value)}/>
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Пароль</Label>
          <Input id="password" name="password" type="password" autoComplete="current-password" required placeholder="Введите пароль"  value={password} onChange={(event) => setPassword(event.target.value)}/>
        </div>
        {error && (
            <p className="text-sm text-red-600">
              {error}
            </p>
        )}        <Button type="submit" className="h-12 w-full rounded-xl text-sm font-semibold">
          Войти
        </Button>
      </form>

      <p className="mt-7 text-center text-sm text-muted-foreground">
        Ещё нет аккаунта? <Link href="/register" className="font-semibold text-primary hover:underline">Зарегистрироваться</Link>
      </p>
    </>
  );
}
