"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ProductDetailPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [phone, setPhone] = useState(null);
  const params = useParams();
  const router = useRouter();

  const handleQuantityChange = (value) => {
    if (value >= 1) {
      setQuantity(value);
    }
  };

  const handleAddPhone = async () => {
    const productId = params.id;
    const data = { productId, quantity };
    console.log(JSON.stringify(data));
    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Cart updated:", result.cart);
      router.push("/cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/product/${params.id}`);

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      setPhone(data);
    } catch (err) {
      console.error("Failed to fetch data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Product Detail Section */}
      <section className="container mx-auto px-4 py-10">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {phone && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product Image */}
              <div className="p-6">
                <Image
                  src={phone.imageurl}
                  alt="Product"
                  width={400}
                  height={300}
                  className="max-w-lg h-auto rounded-md"
                />
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  {phone.title}
                </h2>
                <p className="text-gray-600 mb-6">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Vivamus lacinia odio vitae vestibulum vestibulum. Cras
                  venenatis euismod malesuada.
                </p>
                <span className="text-2xl font-bold text-blue-600 mb-6 block">
                  ${phone.price}
                </span>

                {/* Quantity Selector */}
                <div className="flex items-center space-x-4 mb-6">
                  <label className="text-gray-700 font-medium">Quantity:</label>
                  <button
                    className="bg-gray-300 text-gray-800 px-2 py-1 rounded-md hover:bg-gray-400"
                    onClick={() => handleQuantityChange(quantity - 1)}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) =>
                      handleQuantityChange(Number(e.target.value))
                    }
                    className="w-12 text-center border border-gray-300 rounded-md"
                  />
                  <button
                    className="bg-gray-300 text-gray-800 px-2 py-1 rounded-md hover:bg-gray-400"
                    onClick={() => handleQuantityChange(quantity + 1)}
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddPhone}
                  className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProductDetailPage;
