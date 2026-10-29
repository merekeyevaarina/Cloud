import type { ReactNode } from "react";
import Link from "next/link";

type AuthShellProps = {
  children: ReactNode;
  promoEyebrow: string;
  promoTitle: string;
  promoDescription: string;
};

export function AuthShell({
  children,
  promoEyebrow,
  promoTitle,
  promoDescription,
}: AuthShellProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-8 font-sans text-foreground sm:px-6 sm:py-10">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-[28px] bg-card shadow-[0_24px_80px_-32px_rgba(35,24,57,0.28)] lg:min-h-[630px] lg:grid-cols-2">
        <aside className="relative hidden flex-col justify-between overflow-hidden bg-primary p-12 text-primary-foreground lg:flex">
          <div aria-hidden="true" className="absolute -right-24 -top-24 size-80 rounded-full border border-white/10" />
          <div aria-hidden="true" className="absolute -right-10 -top-10 size-52 rounded-full border border-white/10" />
          <div aria-hidden="true" className="absolute -bottom-40 -left-28 size-96 rounded-full bg-white/10 blur-2xl" />
          <Link href="/" className="relative text-lg font-semibold tracking-wide">cloud</Link>
          <div className="relative max-w-sm">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-white/70">{promoEyebrow}</p>
            <h1 className="text-4xl font-semibold leading-tight tracking-[-0.04em]">{promoTitle}</h1>
            <p className="mt-5 text-base leading-7 text-white/75">{promoDescription}</p>
          </div>
          <p className="relative text-sm text-white/60">© 2026 Cloud</p>
        </aside>

        <section className="flex items-center justify-center bg-card py-10 sm:py-12 lg:px-14">
          <div className="w-full max-w-md px-6 sm:px-12 lg:px-0">
            <Link href="/" className="mb-8 inline-block text-lg font-semibold tracking-wide lg:hidden">cloud</Link>
            {children}
          </div>
        </section>
      </div>
    </main>
  );
}
