export function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f3f2f6] px-4 py-10 font-sans text-[#211b2d] sm:px-6">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-[28px] bg-white shadow-[0_24px_80px_-32px_rgba(35,24,57,0.28)] lg:min-h-[630px] lg:grid-cols-[1fr_1fr]">
        <section className="relative hidden flex-col justify-between overflow-hidden bg-[#281b3d] p-12 text-white lg:flex">
          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full border border-white/10" />
          <div className="absolute -right-10 -top-10 h-52 w-52 rounded-full border border-white/10" />
          <div className="absolute -bottom-40 -left-28 h-96 w-96 rounded-full bg-[#604b7c]/35 blur-2xl" />
          <div className="relative flex items-center gap-3">
            <span className="text-lg font-semibold tracking-wide">Cloud</span>
          </div>
          <div className="relative max-w-sm">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-[#cfc4df]">Рады видеть вас снова</p>
            <h1 className="text-4xl font-semibold leading-tight tracking-[-0.04em]">Ваше пространство начинается здесь.</h1>
            <p className="mt-5 text-base leading-7 text-[#d2cadd]">Войдите, чтобы продолжить работу и держать важное под рукой.</p>
          </div>
          <p className="relative text-sm text-[#b8acc7]">© 2026 Cloud</p>
        </section>

        <section className="flex items-center justify-center px-6 py-10 sm:px-12 lg:px-14">
          <div className="w-full max-w-md">
            <div className="mb-10 lg:hidden">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#281b3d] text-lg font-bold text-white">n</span>
                <span className="text-lg font-semibold tracking-wide">Cloud</span>
              </div>
            </div>
            <div className="mb-8">
              <p className="mb-3 text-sm font-medium text-[#756d80]">Личный кабинет</p>
              <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[#211b2d]">Войти в аккаунт</h2>
              <p className="mt-2 text-sm leading-6 text-[#77717f]">Введите данные, которые вы указали при регистрации.</p>
            </div>

            <form action="#" className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="username" className="text-sm font-medium text-[#322b3d]">Логин</label>
                <input id="username" name="username" autoComplete="username" required placeholder="Ваш логин" className="h-12 w-full rounded-xl border border-[#e4e1e9] bg-white px-4 text-sm text-[#211b2d] outline-none transition placeholder:text-[#aaa5b1] hover:border-[#c9c3d2] focus:border-[#493365] focus:ring-4 focus:ring-[#493365]/10" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-medium text-[#322b3d]">Пароль</label>
                  <a href="#forgot-password" className="text-xs font-medium text-[#594276] transition hover:text-[#281b3d]">Забыли пароль?</a>
                </div>
                <input id="password" name="password" type="password" autoComplete="current-password" required placeholder="Введите пароль" className="h-12 w-full rounded-xl border border-[#e4e1e9] bg-white px-4 text-sm text-[#211b2d] outline-none transition placeholder:text-[#aaa5b1] hover:border-[#c9c3d2] focus:border-[#493365] focus:ring-4 focus:ring-[#493365]/10" />
              </div>
              <label className="flex cursor-pointer items-center gap-2.5 text-sm text-[#6f6879]">
                <input type="checkbox" name="remember" className="h-4 w-4 rounded border-[#d5d0dc] accent-[#39284f]" />
                Запомнить меня
              </label>
              <button type="submit" className="h-12 w-full rounded-xl bg-[#302141] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#45305e] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#493365]/25">Войти</button>
            </form>

            <div className="my-7 flex items-center gap-4 text-xs text-[#a19ba8]">
              <span className="h-px flex-1 bg-[#ece9ef]" />
              или
              <span className="h-px flex-1 bg-[#ece9ef]" />
            </div>

            <p className="text-center text-sm text-[#77717f]">
              Ещё нет аккаунта? <a href="/register" className="font-semibold text-[#493365] transition hover:text-[#281b3d]">Зарегистрироваться</a>
            </p>
            <p className="mt-10 text-center text-xs leading-5 text-[#a19ba8]">Продолжая, вы соглашаетесь с условиями использования и политикой конфиденциальности.</p>
          </div>
        </section>
      </div>
    </main>
  );
}
