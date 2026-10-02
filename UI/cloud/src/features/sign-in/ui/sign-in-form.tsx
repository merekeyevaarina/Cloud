"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Eye, EyeOff } from "lucide-react"

import { Button, buttonVariants } from "@/src/shared/ui/button"
import { Input } from "@/src/shared/ui/input"
import { Label } from "@/src/shared/ui/label"
import { cn } from "@/src/shared/lib/utils"

export function SignInForm() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  return (
    <form className="space-y-5" onSubmit={(event) => event.preventDefault()}>
      <div className="space-y-2.5">
        <Label htmlFor="email">Электронная почта</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          required
        />
      </div>

      <div className="space-y-2.5">
        <Label htmlFor="password">Пароль</Label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={isPasswordVisible ? "text" : "password"}
            placeholder="Введите пароль"
            autoComplete="current-password"
            className="pr-12"
            required
          />
          <button
            type="button"
            aria-label={isPasswordVisible ? "Скрыть пароль" : "Показать пароль"}
            aria-pressed={isPasswordVisible}
            onClick={() => setIsPasswordVisible((visible) => !visible)}
            className="absolute inset-y-0 right-2 flex w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {isPasswordVisible ? (
              <EyeOff aria-hidden="true" className="size-[18px]" />
            ) : (
              <Eye aria-hidden="true" className="size-[18px]" />
            )}
          </button>
        </div>
      </div>

      <Button
        type="submit"
        className="h-12 w-full rounded-xl bg-primary px-5 text-[15px] font-semibold text-primary-foreground shadow-lg shadow-primary/15 transition-all hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/20"
      >
        <span>Войти</span>
        <ArrowRight aria-hidden="true" data-icon="inline-end" className="size-4" />
      </Button>

      <div className="flex items-center gap-3 pt-1">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted-foreground">Впервые в Cloud Drive?</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <Link
        href="/register"
        className={cn(
          buttonVariants({ variant: "outline", size: "lg" }),
          "h-12 w-full rounded-xl border-border bg-white text-sm font-semibold text-foreground transition-colors hover:border-primary/25 hover:bg-primary/[0.035] hover:text-primary",
        )}
      >
        Зарегистрироваться
      </Link>
    </form>
  )
}
