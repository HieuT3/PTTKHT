import Link from "next/link";

const OrderDetail = ({ isAdmin, order }) => {
  if (!order) {
    return <p>Loading...</p>;
  }

  const handleClickButton = async () => {
    try {
      let status = "";
      if (order.status === "WAITING VERIFY") status = "PREPARE";
      else if (order.status === "PREPARE") status = "SHIPPING";
      else status = "DONE";

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/order/${order._id}/update-status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );
      console.log("TESST");
      if (!response.ok) {
        console.log(response.statusText);
        return;
      }
      const data = await response.json();
      window.history.back();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Order Details</h2>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Order #{order._id}</h3>
        <p className="mb-2">
          <strong>Status:</strong> {order.status}
        </p>
        <p className="mb-2">
          <strong>Total Items:</strong>{" "}
          {order.items.reduce((total, item) => total + item.quantity, 0)}
        </p>
        <p className="mb-2">
          <strong>Amount:</strong> $
          {(
            order.total - (order.shippingMethod === "Standard" ? 5 : 10)
          ).toFixed(3)}
        </p>
        <p className="mb-2">
          <strong>Shipping Method:</strong> {order.shippingMethod}
        </p>
        <p className="mb-2">
          <strong>Shipping Cost:</strong> $
          {order.shippingMethod === "Standard" ? 5 : 10}
        </p>
        <p className="mb-2">
          <strong>Total:</strong> ${order.total.toFixed(3)}
        </p>

        <p className="mb-2">
          <strong>Order Date:</strong>{" "}
          {new Date(order.createdAt).toLocaleString()}
        </p>
        <p className="mb-2">
          <strong>Payment Method:</strong> {order.payment}
        </p>
        <p className="mb-2">
          <strong>Payment Method:</strong> {order.shipment}
        </p>
        <p className="mb-2">
          <strong>Customer Name:</strong> {order.fullname}
        </p>
        <p className="mb-2">
          <strong>Customer Email:</strong> {order.email}
        </p>
        <p className="mb-2">
          <strong>Customer Phone:</strong> {order.phone}
        </p>
        <p className="mb-2">
          <strong>Customer Address:</strong> {order.address}
        </p>
        <h4 className="text-lg font-semibold mt-6 mb-4">Items</h4>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border-b p-4 text-left text-gray-700">Item</th>
              <th className="border-b p-4 text-left text-gray-700">Quantity</th>
              <th className="border-b p-4 text-left text-gray-700">Price</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50">
                <td className="p-4 border-b text-gray-800 flex items-center">
                  <img
                    src={item.productId.imageurl}
                    alt={item.productId.name}
                    className="w-20 h-20 object-cover mr-4"
                  />
                  <Link
                    href={`/product/${item.productId._id}`}
                    className="text-blue-500 text-lg hover:underline"
                  >
                    {item.productId.title.includes("(")
                      ? item.productId.title.split("(")[0].trim()
                      : item.productId.title
                          .split(" ")
                          .slice(0, 4)
                          .join(" ")}{" "}
                  </Link>
                </td>
                <td className="p-4 border-b text-gray-800">{item.quantity}</td>
                <td className="p-4 border-b text-gray-800">
                  ${item.productId.price.replace(",", ".")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-6 flex justify-end">
          {isAdmin &&
            order.status !== "DONE" &&
            order.status !== "CANCELED" && (
              <button
                onClick={handleClickButton}
                type="button"
                className="bg-blue-500 mr-10 text-white px-4 py-2 rounded-lg hover:bg-gray-600 focus:outline-none"
              >
                {order.status === "WAITING VERIFY" && "Verify"}
                {order.status === "PREPARE" && "Shipping"}
                {order.status === "SHIPPING" && "DONE"}
              </button>
            )}
          <button
            type="button"
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 focus:outline-none"
            onClick={() => window.history.back()}
          >
            Back to Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
