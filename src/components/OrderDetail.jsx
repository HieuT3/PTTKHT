import Link from "next/link";

const OrderDetail = ({ order }) => {
  if (!order) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Order Details</h2>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Order #{order._id}</h3>
        <p className="mb-2">
          <strong>Status:</strong> Processing
        </p>
        <p className="mb-2">
          <strong>Total Items:</strong>{" "}
          {order.items.reduce((total, item) => total + item.quantity, 0)}
        </p>
        <p className="mb-2">
          <strong>Total Amount:</strong> ${order.total.toFixed(2)}
        </p>
        <p className="mb-2">
          <strong>Order Date:</strong>{" "}
          {new Date(order.createdAt).toLocaleString()}
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
                  ${item.productId.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-6 flex justify-end">
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
