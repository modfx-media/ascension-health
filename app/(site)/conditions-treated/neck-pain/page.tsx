import type { Metadata } from "next";
import { withCmsMetadata } from "@/lib/cms/metadata";
import { ConditionStub } from "@/components/ConditionStub";

export async function generateMetadata(): Promise<Metadata> {
  return withCmsMetadata("/conditions-treated/neck-pain/", {
  title: "Neck Pain in Fernley, NV",
  description:
    "Neck pain treatment in Fernley, NV. Ascension Health offers non-surgical care for chronic and acute neck pain, chiropractic, decompression and soft-tissue therapy.",
  alternates: { canonical: "/conditions-treated/neck-pain/" },
});
}

export default function Page() {
  return (
    <ConditionStub
      title="Neck Pain"
      slug="neck-pain"
      intro="Having neck pain can be extremely painful and uncomfortable. You forget how important your neck health is until you begin having neck pain."
    />
  );
}
