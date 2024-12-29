"use client";

import { useState, useEffect } from "react";
import ProductList from "@/components/ProductList";

const ProductPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [phones, setPhones] = useState([]);
  const [filteredPhones, setFilteredPhones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhones = async () => {
      try {
        const response = await fetch("/api/product");
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setPhones(data);
        setFilteredPhones(data);
      } catch (error) {
        console.error("Error fetching phones:", error);
      }
    };

    fetchPhones();
  }, []);

  useEffect(() => {
    const results = phones.filter((phone) =>
      phone.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPhones(results);
  }, [searchTerm, phones]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <ProductList phones={filteredPhones} />
      </div>
    </div>
  );
};

export default ProductPage;
