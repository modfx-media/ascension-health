import type { Metadata } from "next";
import { withCmsMetadata } from "@/lib/cms/metadata";
import { ConditionStub } from "@/components/ConditionStub";

export async function generateMetadata(): Promise<Metadata> {
  return withCmsMetadata("/conditions-treated/intersegmental-traction/", {
  title: "Intersegmental Traction in Fernley, NV",
  description:
    "Intersegmental traction therapy in Fernley, NV. Ascension Health uses intersegmental traction to speed recovery from back injuries and chronic back pain.",
  alternates: { canonical: "/conditions-treated/intersegmental-traction/" },
});
}

export default function Page() {
  return (
    <ConditionStub
      title="Intersegmental Traction"
      slug="intersegmental-traction"
      intro="Intersegmental traction has been proven to quicken the recovery period for back injuries and for those suffering from back pain caused by trauma, stress, or age. This machine works wonders in relaxing your body and is often used alongside other chiropractic therapies."
    />
  );
}
