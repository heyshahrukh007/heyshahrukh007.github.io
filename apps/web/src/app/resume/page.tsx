import Experience from "@/components/experience";
import ResumeSection from "@/components/resume-section";
import { ScrollReveal } from "@/components/scroll-reveal";
import Skills from "@/components/skills";
import { createPageMetadata } from "@/lib/seo";
import { resume } from "@/lib/site";

export const metadata = createPageMetadata({
  title: resume.title,
  description: resume.summary,
  path: "/resume",
});

export default function ResumePage() {
  return (
    <div className="flex flex-col gap-12 sm:gap-16">
      <ResumeSection />
      <ScrollReveal>
        <Experience headingLevel={2} />
      </ScrollReveal>
      <ScrollReveal delay={50}>
        <Skills headingLevel={2} />
      </ScrollReveal>
    </div>
  );
}
