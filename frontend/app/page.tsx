import { getStrapiData } from "@/lib/strapi";

export default async function Home() {
  const strapiData = await getStrapiData('/api/home-page')

  console.log(strapiData)

  const { title, description } = strapiData.data

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">{title}</h1>
      <p className="text-lg">{description}</p>
    </main>
  );
}
 