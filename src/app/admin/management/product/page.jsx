"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const ProductManagementPage = () => {
  const [phones, setPhones] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPhones = async () => {
      try {
        const response = await fetch("/api/product");
        if (!response.ok) {
          console.log(response.statusText);
          return;
        }
        const data = await response.json();
        setPhones(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPhones();
  }, []);

  const handleDeleteProduct = async (id) => {
    try {
      const response = await fetch(`/api/product/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        console.log(response.statusText);
        return;
      }
      setPhones((prev) => prev.filter((item) => item._id != id));
      router.push("./product");
      toast.success("Delete product successfully!");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Tabs */}
      <div className="bg-white shadow mt-4">
        <nav className="flex justify-around py-2">
          <button className="text-blue-500 font-medium hover:underline">
            All Products
          </button>
          <Link
            href="./product/add"
            className="text-gray-600 font-medium hover:underline"
          >
            Add Product
          </Link>
        </nav>
      </div>

      {/* Table */}
      <div className="p-6">
        <div className="bg-white shadow rounded p-4">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="border-b py-2 px-4 w-1/6">Product ID</th>
                <th className="border-b py-2 px-4 w-25/6">Product Name</th>
                <th className="border-b py-2 px-4 w-1/6">Price</th>
                <th className="border-b py-2 px-4 w-1/6">Stock</th>
                <th className="border-b py-2 px-4 w-1/6">Action</th>
              </tr>
            </thead>
            <tbody>
              {phones !== undefined &&
                phones.map((product) => (
                  <tr key={product._id}>
                    <td className="border-b py-2 px-4 text-blue-500 underline text-ellipsis overflow-hidden">
                      <Link href={`./product/${product._id}`}>
                        {product._id}
                      </Link>
                    </td>
                    <td className="border-b py-2 px-4 break-words">
                      {" "}
                      {product.title}
                    </td>
                    <td className="border-b py-2 px-4">
                      ${product.price.replace(",", ".")}
                    </td>
                    <td className="border-b py-2 px-4">{product.quantity}</td>
                    <td className="border-b py-2 px-4">
                      <Link
                        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                        href={`./product/${product._id}`}
                      >
                        Edit{" "}
                      </Link>
                      <button
                        onClick={() => handleDeleteProduct(product._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductManagementPage;
