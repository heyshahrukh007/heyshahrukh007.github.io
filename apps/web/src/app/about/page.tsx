import About from "@/components/about";
import ContactSection from "@/components/contact-section";

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-12 sm:gap-16">
      <About headingLevel={1} />
      <ContactSection headingLevel={2} />
    </div>
  );
}
