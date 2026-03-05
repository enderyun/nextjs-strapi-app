import { getHomePage } from "@/lib/strapi";
import { HeroSection } from "@/components/hero-section";  

export async function generateMetadata() {
  const strapiData = await getHomePage()
  return { 
    title: strapiData?.title,
    description: strapiData?.description
  }
}


export default async function Home() {
  const strapiData = await getHomePage()

  const { title, description } = strapiData

  const [heroSection] = strapiData?.sections || []

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <HeroSection data={heroSection} />
    </main>
  );
}
 