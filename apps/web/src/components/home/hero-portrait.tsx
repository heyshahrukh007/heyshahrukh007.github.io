import { PortraitFrame } from "@/components/shared/portrait-frame";
import { hero } from "@/lib/site";

type HeroPortraitProps = {
  className?: string;
  parallax?: boolean;
};

export function HeroPortrait({ className, parallax = false }: HeroPortraitProps) {
  return (
    <PortraitFrame
      src={hero.photo.src}
      alt={hero.photo.alt}
      className={className}
      size="hero"
      fetchPriority="high"
      parallax={parallax}
    />
  );
}
