import { AuthPanel } from "@/src/widgets/auth-panel"

export function LoginScreen() {
  return (
    <main className="relative isolate flex min-h-screen flex-1 flex-col items-center justify-center overflow-hidden px-5 py-10 sm:px-8 sm:py-14">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-52 left-1/2 h-[490px] w-[680px] -translate-x-1/2 rounded-full bg-[#e7def2]/80 blur-[105px]" />
        <div className="absolute -bottom-64 -left-32 h-[460px] w-[460px] rounded-full bg-[#ece8f1]/90 blur-[110px]" />
        <div className="absolute -right-40 bottom-[-100px] h-[420px] w-[420px] rounded-full bg-[#e9e2f0]/70 blur-[110px]" />
        <div className="absolute inset-0 opacity-[0.16] [background-image:radial-gradient(#8a7a9c_0.6px,transparent_0.6px)] [background-size:22px_22px]" />
      </div>

      <AuthPanel />

      <p className="mt-7 text-center text-xs leading-5 text-muted-foreground/80">
        Надёжное пространство для ваших документов и воспоминаний.
      </p>
    </main>
  )
}
