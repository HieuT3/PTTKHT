"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ProductCard = ({ phone, id }) => {
  const router = useRouter();

  const handleAddToCart = async () => {
    const productId = phone._id;
    const quantity = 1;

    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, quantity }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      router.push("/cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };
  return (
    <div
      key={phone._id}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <Image
        src={phone.imageurl}
        alt={phone.title || "Product Image"}
        width={300}
        height={100}
        className="w-full h-auto object-cover rounded-md"
        priority
      />
      <div className="p-4">
        <Link
          href={`/product/${phone._id}`}
          className="text-lg font-bold text-gray-800"
        >
          {phone.title.includes("(")
            ? phone.title.split("(")[0].trim()
            : phone.title.split(" ").slice(0, 4).join(" ")}
        </Link>
        <div className="flex justify-between items-center mt-4">
          <span className="text-blue-600 font-bold">${phone.price}</span>
          <button
            onClick={handleAddToCart}
            className="bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
