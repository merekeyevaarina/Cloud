import { Cloud, ShieldCheck } from "lucide-react"

import { SignInForm } from "@/src/features/sign-in"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/shared/ui/card"

export function AuthPanel() {
  return (
    <div className="w-full max-w-[440px]">
      <div className="mb-7 flex items-center justify-center gap-3">
        <div className="grid size-11 place-items-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/20">
          <Cloud aria-hidden="true" className="size-[22px]" strokeWidth={2.1} />
        </div>
        <div className="leading-none">
          <p className="text-[19px] font-semibold tracking-[-0.04em] text-foreground">
            Cloud <span className="font-normal text-muted-foreground">Drive</span>
          </p>
          <p className="mt-1.5 text-[10px] font-medium tracking-[0.19em] text-muted-foreground uppercase">
            Ваши файлы рядом
          </p>
        </div>
      </div>

      <Card className="gap-0 overflow-hidden rounded-[28px] border-white/80 bg-white py-0 shadow-[0_28px_80px_-40px_rgba(48,31,72,0.28),0_8px_24px_-16px_rgba(48,31,72,0.12)]">
        <CardHeader className="gap-2 px-8 pt-8 text-center sm:px-10 sm:pt-10">
          <div className="mx-auto mb-1 grid size-12 place-items-center rounded-2xl bg-[#f1edf7] text-primary ring-1 ring-primary/5">
            <ShieldCheck aria-hidden="true" className="size-[22px]" strokeWidth={1.8} />
          </div>
          <CardTitle className="text-[26px] font-semibold tracking-[-0.045em] text-foreground">
            С возвращением
          </CardTitle>
          <CardDescription className="mx-auto max-w-[285px] text-[14px] leading-6 text-muted-foreground">
            Войдите в аккаунт, чтобы открыть своё облачное хранилище.
          </CardDescription>
        </CardHeader>

        <CardContent className="px-8 pb-8 pt-7 sm:px-10 sm:pb-10">
          <SignInForm />

          <div className="mt-7 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck aria-hidden="true" className="size-3.5 text-primary/70" />
            <span>Ваши файлы доступны только вам</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
