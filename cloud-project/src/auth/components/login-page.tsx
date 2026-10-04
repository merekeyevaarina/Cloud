import { LoginPanel } from "./login-panel";

export function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f3f2f6] px-4 py-10 font-sans text-[#211b2d] sm:px-6">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-[28px] bg-white shadow-[0_24px_80px_-32px_rgba(35,24,57,0.28)] lg:min-h-[630px] lg:grid-cols-2">
        <section className="relative hidden flex-col justify-between overflow-hidden bg-[#281b3d] p-12 text-white lg:flex">
          <div aria-hidden="true" className="absolute -right-24 -top-24 h-80 w-80 rounded-full border border-white/10" />
          <div aria-hidden="true" className="absolute -right-10 -top-10 h-52 w-52 rounded-full border border-white/10" />
          <div aria-hidden="true" className="absolute -bottom-40 -left-28 h-96 w-96 rounded-full bg-[#604b7c]/35 blur-2xl" />
          <div className="relative flex items-center gap-3">
            <span className="text-lg font-semibold tracking-wide">cloud</span>
          </div>
          <div className="relative max-w-sm">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-[#cfc4df]">Рады видеть вас снова</p>
            <h1 className="text-4xl font-semibold leading-tight tracking-[-0.04em]">Ваше пространство начинается здесь.</h1>
            <p className="mt-5 text-base leading-7 text-[#d2cadd]">Войдите, чтобы продолжить работу и держать важное под рукой.</p>
          </div>
          <p className="relative text-sm text-[#b8acc7]">© 2026 Cloud</p>
        </section>

        <LoginPanel />
      </div>
    </main>
  );
}
