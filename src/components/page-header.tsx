/** Title block at the top of every inner page: h1 with serif accent, no eyebrow. */
export function PageHeader({
  title,
  intro,
  children,
}: {
  title: React.ReactNode;
  intro?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <header className="shell pt-12 pb-12 sm:pt-16 sm:pb-16">
      <h1 className="max-w-225 text-balance font-medium tracking-[-0.035em] text-[44px] leading-[1.05] sm:text-[clamp(52px,6vw,80px)]">
        {title}
      </h1>
      {intro && (
        <p className="mt-6 max-w-160 text-base leading-normal text-muted-foreground sm:text-[17px]">{intro}</p>
      )}
      {children}
    </header>
  );
}
