import type { Metadata } from "next";
import { withCmsMetadata } from "@/lib/cms/metadata";
import { ConditionStub } from "@/components/ConditionStub";

export async function generateMetadata(): Promise<Metadata> {
  return withCmsMetadata("/conditions-treated/myofascial-release/", {
  title: "Myofascial Release in Fernley, NV",
  description:
    "Myofascial release therapy in Fernley, NV. Ascension Health uses myofascial release to relieve pain caused by fascia muscle restriction and chronic tension.",
  alternates: { canonical: "/conditions-treated/myofascial-release/" },
});
}

export default function Page() {
  return (
    <ConditionStub
      title="Myofascial Release"
      slug="myofascial-release"
      intro="If you have never undergone a myofascial release procedure before, you might wonder what will be done. There is no need to panic, it is a minor therapy intervention meant to alleviate pain that can result from fascia muscle restriction and tightness."
    />
  );
}
