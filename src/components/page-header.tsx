/** Title block at the top of every inner page. */
export function PageHeader({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <header className="shell pt-12 pb-12 sm:pt-16 sm:pb-16">
      <p className="mb-4 text-[13px] font-medium tracking-[0.12em] text-muted-foreground uppercase">
        {eyebrow}
      </p>
      <h1 className="max-w-225 font-serif text-[44px] leading-[1.05] tracking-[-1.5px] sm:text-[clamp(52px,6vw,80px)] sm:tracking-[-2px]">
        {title}
      </h1>
      {intro && (
        <p className="mt-6 max-w-160 text-base leading-normal text-muted-foreground sm:text-[17px]">{intro}</p>
      )}
      {children}
    </header>
  );
}
