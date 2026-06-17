import Experience from "@/components/experience";
import ResumeSection from "@/components/resume-section";
import Skills from "@/components/skills";

export default function ResumePage() {
  return (
    <div className="flex flex-col gap-12 sm:gap-16">
      <ResumeSection />
      <Experience headingLevel={2} />
      <Skills headingLevel={2} />
    </div>
  );
}
