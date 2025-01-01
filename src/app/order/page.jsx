"use client";

import { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;

      try {
        const response = await fetch(`/api/order/user`);
        if (!response.ok) {
          console.log(response.statusText);
          return;
        }
        const data = await response.json();
        setOrders(data.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [user]);

  const handleViewDetails = (orderId) => {
    router.push(`/order/${orderId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          My Orders
        </h2>

        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border-b p-4 text-left text-gray-700">Order #</th>
              <th className="border-b p-4 text-left text-gray-700">
                Total Items
              </th>
              <th className="border-b p-4 text-left text-gray-700">
                Total Amount
              </th>
              <th className="border-b p-4 text-left text-gray-700">
                Order Date
              </th>
              <th className="border-b p-4 text-left text-gray-700">Status</th>
              <th className="border-b p-4 text-left text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id} className="hover:bg-gray-50">
                <td className="p-4 border-b text-gray-800">{index + 1}</td>
                <td className="p-4 border-b text-gray-800">
                  {order.items.reduce(
                    (total, item) => total + item.quantity,
                    0
                  )}
                </td>
                <td className="p-4 border-b text-gray-800">
                  ${order.total.toFixed(3)}
                </td>
                <td className="p-4 border-b text-gray-800">
                  {new Date(order.createdAt).toLocaleString()}
                </td>
                <td className="p-4 border-b text-gray-800">
                  <span
                    className={`px-2 py-1 rounded-full text-sm bg-yellow-100 text-yellow-700`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="p-4 border-b text-gray-800">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                    onClick={() => handleViewDetails(order._id)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderPage;
