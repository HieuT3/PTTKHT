"use client";

import OrderDetail from "@/components/OrderDetail";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

const OrderDetailPage = () => {
  const [order, setOrder] = useState(null);
  const params = useParams();

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const id = params.id;
        const response = await fetch(`/api/order/${id}`);
        if (!response.ok) {
          console.log(response.statusText);
          return;
        }
        const data = await response.json();
        setOrder(data.order);
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };

    fetchOrderData();
  }, []);

  return <OrderDetail order={order} />;
};

export default OrderDetailPage;
