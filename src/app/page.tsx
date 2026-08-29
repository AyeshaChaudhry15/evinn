import Hero from "../../components/hero";
import Category from "../../components/catagory";
import TopBrands from "../../components/topbrands";


export default function Home() {
  return (
    <main className="min-h-screen bg-[#0B0F0C]">
      <Hero />
     <Category/>
    <TopBrands/>
    </main>
  );
}