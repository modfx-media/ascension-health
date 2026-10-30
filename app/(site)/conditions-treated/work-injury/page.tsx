import type { Metadata } from "next";
import { withCmsMetadata } from "@/lib/cms/metadata";
import { ConditionStub } from "@/components/ConditionStub";

export async function generateMetadata(): Promise<Metadata> {
  return withCmsMetadata("/conditions-treated/work-injury/", {
  title: "Work Injury in Fernley, NV",
  description:
    "Work-injury care in Fernley, NV. Ascension Health treats both acute workplace injuries and the chronic repetitive-strain conditions caused by long-term physical demands.",
  alternates: { canonical: "/conditions-treated/work-injury/" },
});
}

export default function Page() {
  return (
    <ConditionStub
      title="Work Injury"
      slug="work-injury"
      intro="Workplace injuries don't only occur during traumatic slips and falls at work, more often, they are the result of repetitive movements and the physical demands of your job carried out over an extended period of time. These types of workplace injuries are all too common in today's workforce and are best identified by their symptoms."
    />
  );
}
