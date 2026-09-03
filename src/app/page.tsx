import Category from "../../components/catagory";
import Hero from "../../components/hero";
import Brands from "../../components/brands";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0B0F0C]">
      <Hero />
      <Brands />
      <Category />
    </main>
  );
}
