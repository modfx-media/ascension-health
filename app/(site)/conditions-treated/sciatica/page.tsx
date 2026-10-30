import type { Metadata } from "next";
import { withCmsMetadata } from "@/lib/cms/metadata";
import { ConditionStub } from "@/components/ConditionStub";

export async function generateMetadata(): Promise<Metadata> {
  return withCmsMetadata("/conditions-treated/sciatica/", {
  title: "Sciatica in Fernley, NV",
  description:
    "Sciatica treatment in Fernley, NV. Ascension Health treats sciatic nerve pain that radiates from the lower back down the legs with non-surgical care.",
  alternates: { canonical: "/conditions-treated/sciatica/" },
});
}

export default function Page() {
  return (
    <ConditionStub
      title="Sciatica"
      slug="sciatica"
      intro={'Sciatica is characterized by pain in the lower back that radiates down one or both legs. The pain is described as dull, achy, sharp, like \u201Cpins and needles\u201D or similar to electric shocks. Other symptoms associated with sciatica include burning, numbness and tingling sensations.'}
    />
  );
}
