import Link from "next/link";
import accessoriesData from "../../../accessories-data/accessories.json"; 

export default async function AccessoryDetail({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  
  const resolvedParams = await params;
  const currentSlug = resolvedParams.slug;

  const accessory = accessoriesData.accessories.find(
    (item) => 
      String(item.id) === String(currentSlug) ||
      item.name.toLowerCase().replace(/\s+/g, '-') === currentSlug.toLowerCase()
  );

  if (!accessory) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#07151d] text-white">
        <h1 className="mb-4 text-3xl font-bold">Accessory Not Found</h1>
        <p className="text-gray-400 mb-4">Searching for Slug: {currentSlug}</p> 
        <Link href="/accessories" className="text-blue-400 underline hover:text-blue-300">
          Go back to Accessories
        </Link>
      </div>
    );
  }

  return (
    <section className="min-h-screen w-full bg-[#07151d] px-6 py-12 md:px-10">
      <div className="mx-auto max-w-5xl">
        
        <div className="mb-8">
          <Link 
            href="/accessories" 
            className="inline-flex items-center text-sm font-medium text-gray-400 transition-colors hover:text-white"
          >
            <span className="mr-2">←</span> Back to Accessories
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          
          <div className="flex h-[400px] items-center justify-center rounded-xl border border-[#1c3039] bg-[#0b1b24] p-8 lg:h-[500px]">
            <img
              src={accessory.image}
              alt={accessory.name}
              className="max-h-full w-auto object-contain drop-shadow-xl"
            />
          </div>

          <div className="flex flex-col justify-center pt-4 lg:pt-0">
            <h1 className="text-4xl font-bold text-white md:text-5xl">
              {accessory.name}
            </h1>
            
            <p className="mt-4 text-3xl font-semibold text-[#8fdf0d]">
              {accessory.priceText}
            </p>

            <p className="mt-6 text-base leading-relaxed text-gray-400">
              {accessory.description}
            </p>

            {accessory.features && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-[#8fdf0d] mb-2">Key Features:</h3>
                <ul className="list-inside list-disc text-gray-400 space-y-1 text-sm">
                  {accessory.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <button className="flex-1 rounded-lg bg-[#8fdf0d] px-8 py-3.5 text-center text-sm font-bold text-black transition-transform hover:scale-105 active:scale-95">
                Add to Cart
              </button>
              
              <button className="flex-1 rounded-lg border border-[#31444c] bg-[#10232d] px-8 py-3.5 text-center text-sm font-bold text-[#8fdf0d] transition-colors hover:bg-[#1c3039]">
                Buy Now
              </button>
            </div>
            
            <div className="mt-8 border-t border-[#1c3039] pt-6">
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <span className="font-semibold text-gray-300">Availability: </span> 
                  {accessory.inStock ? (
                    <span className="text-green-500">In Stock</span>
                  ) : (
                    <span className="text-red-500">Out of Stock</span>
                  )}
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}