import About from "@/components/about";
import { createPageMetadata } from "@/lib/seo";
import { about } from "@/lib/site";

export const metadata = createPageMetadata({
  title: about.title,
  description: about.summary[0],
  path: "/about",
});

export default function AboutPage() {
  return <About headingLevel={1} />;
}
