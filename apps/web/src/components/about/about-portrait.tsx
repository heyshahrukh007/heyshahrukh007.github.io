import { PortraitFrame } from "@/components/shared/portrait-frame";
import { about } from "@/lib/site";

type AboutPortraitProps = {
  className?: string;
};

export function AboutPortrait({ className }: AboutPortraitProps) {
  return (
    <PortraitFrame
      src={about.photo.src}
      alt={about.photo.alt}
      className={className}
      size="about"
    />
  );
}
