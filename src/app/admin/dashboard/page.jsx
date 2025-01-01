import Link from "next/link";

const AdminDashboardPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex justify-center items-center h-full py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link href="./management/order">
            <div className="bg-white shadow rounded-lg p-6 flex flex-col items-center justify-center hover:shadow-lg cursor-pointer">
              <h2 className="text-xl font-semibold mb-2 text-blue-500">
                Manage Orders
              </h2>
              <p className="text-gray-600">View and update orders</p>
            </div>
          </Link>

          <Link href="./management/product">
            <div className="bg-white shadow rounded-lg p-6 flex flex-col items-center justify-center hover:shadow-lg cursor-pointer">
              <h2 className="text-xl font-semibold mb-2 text-blue-500">
                Manage Products
              </h2>
              <p className="text-gray-600">Add, edit, or remove products</p>
            </div>
          </Link>

          <Link href="./management/user">
            <div className="bg-white shadow rounded-lg p-6 flex flex-col items-center justify-center hover:shadow-lg cursor-pointer">
              <h2 className="text-xl font-semibold mb-2 text-blue-500">
                Manage User
              </h2>
              <p className="text-gray-600">View and update users</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
