import type { Metadata } from "next";
import { withCmsMetadata } from "@/lib/cms/metadata";
import { ConditionStub } from "@/components/ConditionStub";

export async function generateMetadata(): Promise<Metadata> {
  return withCmsMetadata("/conditions-treated/headaches-migraines/", {
  title: "Headaches & Migraines in Fernley, NV",
  description:
    "Headache and migraine treatment in Fernley, NV. Ascension Health helps the nine out of ten Americans who deal with headaches find lasting relief.",
  alternates: { canonical: "/conditions-treated/headaches-migraines/" },
});
}

export default function Page() {
  return (
    <ConditionStub
      title="Headaches / Migraines"
      slug="headaches-migraines"
      intro="Nine out of ten Americans say that they suffer from headaches. Some of these people experience headaches frequently. Some experience constant headaches that are very painful. These can even make a person nauseous."
    />
  );
}
