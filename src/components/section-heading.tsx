export function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-8.5 flex flex-col items-start justify-between gap-10 sm:mb-12 md:flex-row md:items-end">
      <div>
        <p className="mb-3 text-[13px] font-medium tracking-[0.12em] text-muted-foreground uppercase">
          {eyebrow}
        </p>
        <h2 className="font-serif text-[42px] leading-[1.1] tracking-[-1.5px] sm:text-[clamp(42px,4.2vw,56px)]">
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}
