import ContactSection from "@/components/contact-section";
import { createPageMetadata } from "@/lib/seo";
import { contact } from "@/lib/site";

export const metadata = createPageMetadata({
  title: contact.title,
  description: contact.summary,
  path: "/contact",
});

export default function ContactPage() {
  return <ContactSection headingLevel={1} />;
}
