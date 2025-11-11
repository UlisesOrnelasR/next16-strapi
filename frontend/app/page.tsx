import { Suspense } from "react";
import { HeroSection } from "@/components/hero-section";
import { getHomePage } from "@/lib/strapi";

export async function generateMetadata() {
  const strapiData = await getHomePage();

  return {
    title: strapiData?.title ?? "Inicio",
    description: strapiData?.description ?? "Página principal",
  };
}

// --- componente asíncrono separado ---
async function HeroSectionServer() {
  const strapiData = await getHomePage();
  const [heroSection] = strapiData?.sections || [];

  return <HeroSection data={heroSection} />;
}

// --- página principal ---
export default function Home() {
  return (
    <main className="container mx-auto py-10 text-center">
      <Suspense
        fallback={
          <p className="text-gray-500 text-lg animate-pulse">
            ⏳ Cargando contenido...
          </p>
        }
      >
        <HeroSectionServer />
      </Suspense>
    </main>
  );
}
