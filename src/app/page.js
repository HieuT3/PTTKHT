import ProductList from "@/components/ProductList";
import Link from "next/link";

const HomePage = async () => {
  let phones = null;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/product`);
    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }
    phones = await res.json();
    phones = phones.slice(0, 10);
  } catch (error) {
    console.error("Error fetching phones:", error);
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20 text-center">
        <h2 className="text-4xl font-bold mb-4">Welcome to PhoneStore</h2>
        <p className="text-lg mb-6">
          Find the best smartphones at unbeatable prices.
        </p>
        <Link
          href="/product"
          className="bg-white text-blue-600 px-6 py-3 rounded-md font-medium hover:bg-gray-200"
        >
          Shop Now
        </Link>
      </section>

      {/* Product List */}
      <ProductList phones={phones} />

      {/* View More Button */}
      <div className="flex justify-center mt-6">
        <Link
          href="/product"
          className="bg-black text-white px-8 py-4 mb-10 text-lg rounded-md font-medium hover:bg-gray-800"
        >
          View More
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
