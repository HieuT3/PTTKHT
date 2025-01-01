"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";

const EditProductPage = () => {
  const [product, setProduct] = useState(null);
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/product/${params.id}`);
        if (!response.ok) {
          console.log(response.statusText);
          return;
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/product/${product._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        console.log(response.statusText);
        return;
      }

      const data = await response.json();
      setProduct(data);
      router.push("./");
      toast.success("Update product successfully!");
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Form */}
      {product && (
        <div className="p-6 flex justify-center">
          <div className="bg-white shadow rounded-lg p-6 w-full max-w-3xl">
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Product ID
              </label>
              <input
                type="text"
                name="_id"
                value={product._id}
                disabled
                className="w-full px-4 py-2 border rounded-lg bg-gray-200 cursor-not-allowed"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Product Name
              </label>
              <textarea
                name="title"
                value={product.title}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Price
              </label>
              <input
                type="number"
                name="price"
                value={product.price.replace(",", ".")}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Stock
              </label>
              <input
                type="number"
                name="quantity"
                value={product.quantity}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Product Image URL
              </label>
              <input
                type="text"
                value={product.imageurl}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
              {product.imageurl && (
                <div className="mt-4">
                  <img
                    src={product.imageurl}
                    alt="Product Preview"
                    className="w-full max-h-64 object-contain border rounded-lg"
                  />
                </div>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Description
              </label>
              <textarea
                name="description"
                className="w-full px-4 py-2 border rounded-lg"
                rows="4"
                defaultValue="Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Doloribus architecto ratione nostrum soluta, iure reprehenderit
                doloremque nulla commodi consequuntur repellendus harum quis
                quam quo in non laboriosam adipisci. Laborum, quod."
              ></textarea>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProductPage;
