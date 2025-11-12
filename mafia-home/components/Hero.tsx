interface HeroProps {
  title: string;
  subtitle: string;
}

export function Hero({ title, subtitle }: HeroProps) {
  return (
    <header className="space-y-2 text-center sm:text-left">
      <p className="text-sm uppercase tracking-widest text-slate-400">{subtitle}</p>
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
    </header>
  );
}
