import { HeroVisual } from "@/components/hero-visual";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <>
      <section className="shell pt-12 pb-10 text-center sm:pt-16 sm:pb-13">
        <h1 className="leading-[1.03] tracking-[-1px] sm:leading-[0.95] sm:tracking-[-2px]">
          <span className="block text-[42px] font-medium sm:text-[clamp(52px,6.1vw,88px)]">
            Artificial Intelligence
          </span>
          <em className="mt-1 block font-serif text-[47px] sm:mt-0 sm:text-[clamp(54px,6.1vw,88px)]">
            powered by humans.
          </em>
        </h1>
        <p className="mt-7 px-2.5 text-base leading-normal text-muted-foreground sm:text-[17px]">
          Born in a university lab in Modena, we build AI and computer vision tailored to your needs.
        </p>
        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild size="lg" className="w-60 sm:w-auto">
            <a href="#ask">Start building with us</a>
          </Button>
          <Button asChild size="lg" variant="secondary" className="w-60 sm:w-auto">
            <a href="#services">How it works</a>
          </Button>
        </div>
      </section>
      <HeroVisual />
    </>
  );
}
