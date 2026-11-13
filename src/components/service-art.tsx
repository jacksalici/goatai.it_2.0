/**
 * Illustrations for the service cards: 2x WebP renders of the SVG sources in
 * /public/services, so the grain is baked into pixels and stays still on hover.
 */

export type ServiceArtName = "loop" | "roots" | "terrain";

export function ServiceArt({ name, className }: { name: ServiceArtName; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={`/services/${name}.webp`} alt="" width={360} height={200} className={className} />
  );
}
