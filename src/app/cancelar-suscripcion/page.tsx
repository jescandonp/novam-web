import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { UnsubscribeForm } from "./UnsubscribeForm";

export const metadata: Metadata = {
  title: "Cancelar suscripción",
  description: "Deje de recibir correos comerciales de Nova Measurement.",
  robots: { index: false, follow: false },
};

export default async function CancelarSuscripcionPage({
  searchParams,
}: {
  searchParams: Promise<{ t?: string }>;
}) {
  const { t } = await searchParams;
  const token = t && /^[A-Za-z0-9_-]{22}$/.test(t) ? t : undefined;

  return (
    <>
      <PageHero
        size="compact"
        breadcrumb={[{ label: "Inicio", href: "/" }, { label: "Cancelar suscripción" }]}
        title="Cancelar suscripción"
        subtitle="Si ya no desea recibir estos correos electrónicos, confirme aquí y dejaremos de escribirle."
      />
      <SectionWrapper bg="white">
        <div className="max-w-xl">
          <UnsubscribeForm token={token} />
        </div>
      </SectionWrapper>
    </>
  );
}
