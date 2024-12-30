"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const OrderManagementPage = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("WAITING VERIFY");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/order");
        if (!response.ok) {
          console.log(response.statusText);
          return;
        }
        const data = await response.json();
        setOrders(data.orders);
        setFilteredOrders(
          data.orders.filter((order) => order.status === statusFilter)
        );
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    setFilteredOrders(orders.filter((order) => order.status === statusFilter));
  }, [statusFilter, orders]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Tabs */}
      <h1 className="text-5xl font-bold text-center py-10">Order Management</h1>
      <div className="bg-white shadow mt-4">
        <nav className="flex justify-around py-2">
          <button
            className={`font-medium hover:underline ${
              statusFilter === "WAITING VERIFY"
                ? "text-blue-500"
                : "text-gray-600"
            }`}
            onClick={() => setStatusFilter("WAITING VERIFY")}
          >
            Waiting Verify
          </button>
          <button
            className={`font-medium hover:underline ${
              statusFilter === "PREPARE" ? "text-blue-500" : "text-gray-600"
            }`}
            onClick={() => setStatusFilter("PREPARE")}
          >
            Prepare
          </button>
          <button
            className={`font-medium hover:underline ${
              statusFilter === "SHIPPING" ? "text-blue-500" : "text-gray-600"
            }`}
            onClick={() => setStatusFilter("SHIPPING")}
          >
            Shipping
          </button>
          <button
            className={`font-medium hover:underline ${
              statusFilter === "DONE" ? "text-blue-500" : "text-gray-600"
            }`}
            onClick={() => setStatusFilter("DONE")}
          >
            Done
          </button>
          <button
            className={`font-medium hover:underline ${
              statusFilter === "CANCELLED" ? "text-blue-500" : "text-gray-600"
            }`}
            onClick={() => setStatusFilter("CANCELLED")}
          >
            Cancelled
          </button>
        </nav>
      </div>

      <div className="p-6">
        <div className="bg-white shadow rounded p-4">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="border-b py-2 px-4">Order ID</th>
                <th className="border-b py-2 px-4">Order Date</th>
                <th className="border-b py-2 px-4">Total Quantity</th>
                <th className="border-b py-2 px-4">Total Amount</th>
                <th className="border-b py-2 px-4">Payment Type</th>
                <th className="border-b py-2 px-4">Shipment Type</th>
                <th className="border-b py-2 px-4">Status</th>
                <th className="border-b py-2 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order._id}>
                  <td className="border-b py-2 px-4 text-blue-500">
                    <Link href={`./order/${order._id}`}>{order._id}</Link>
                  </td>
                  <td className="border-b py-2 px-4">
                    {new Date(order.createdAt).toLocaleString()}
                  </td>
                  <td className="border-b py-2 px-4">
                    {order.items.reduce(
                      (total, item) => total + item.quantity,
                      0
                    )}
                  </td>
                  <td className="border-b py-2 px-4">
                    ${order.total.toFixed(2)}
                  </td>
                  <td className="border-b py-2 px-4">{order.payment}</td>
                  <td className="border-b py-2 px-4">{order.shipment}</td>
                  <td className="border-b py-2 px-4 text-yellow-500">
                    {order.status}
                  </td>
                  <td className="border-b py-2 px-4">
                    <Link
                      href={`./order/${order._id}`}
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      View Details
                    </Link>
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

export default OrderManagementPage;
