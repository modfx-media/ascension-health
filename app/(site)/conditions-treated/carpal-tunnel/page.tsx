import type { Metadata } from "next";
import { withCmsMetadata } from "@/lib/cms/metadata";
import { ConditionStub } from "@/components/ConditionStub";

export async function generateMetadata(): Promise<Metadata> {
  return withCmsMetadata("/conditions-treated/carpal-tunnel/", {
  title: "Carpal Tunnel in Fernley, NV",
  description:
    "Carpal tunnel syndrome care in Fernley, NV. Ascension Health offers non-surgical chiropractic care for carpal tunnel and other repetitive-strain conditions.",
  alternates: { canonical: "/conditions-treated/carpal-tunnel/" },
});
}

export default function Page() {
  return (
    <ConditionStub
      title="Carpal Tunnel"
      slug="carpal-tunnel"
      intro="Carpal tunnel syndrome (CTS) should be diagnosed and treated early. During your consultation, you will receive a standard physical examination of the hands, arms, shoulders and neck to help determine if your symptoms are related to daily activities or to an underlying disorder."
    />
  );
}
