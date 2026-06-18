import type { SocialIconName } from "@/types/social";

export const contact = {
  title: "Contact",
  summary: "Get in touch for collaboration, opportunities, or technical conversations.",
  intro:
    "Use the form below for collaboration, roles, or project ideas.",
  email: {
    address: "heyshahrukh007@gmail.com",
    href: "mailto:heyshahrukh007@gmail.com",
  },
  locationMap: {
    /** Google Maps embed URL — replace via Share → Embed a map on Google Maps */
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117634.71631265804!2d72.46478645!3d23.022505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848aba5bd149%3A0x4fcedd11614f9756!2sAhmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1718726400000!5m2!1sen!2sin",
    externalUrl: "https://www.google.com/maps/search/?api=1&query=Ahmedabad,+Gujarat,+India",
  },
} as const;

export const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/heyshahrukh007",
    icon: "github",
    enabled: true,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/heyshahrukh007",
    icon: "linkedin",
    enabled: true,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/heyshahrukh007",
    icon: "instagram",
    enabled: true,
  },
] as const satisfies readonly {
  label: string;
  href: string;
  icon: SocialIconName;
  enabled: boolean;
}[];
