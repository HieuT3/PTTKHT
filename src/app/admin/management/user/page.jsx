"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const UserManagementPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/user");
        if (!response.ok) {
          console.log(response.statusText);
          return;
        }
        const data = await response.json();
        setUsers(data.users);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = (id) => {
    console.log(`Delete user with id: ${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Table */}
      <div className="p-6">
        <div className="bg-white shadow rounded-lg p-4">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="border-b py-2 px-4 w-1/6">User ID</th>
                <th className="border-b py-2 px-4 w-1/6">Username</th>
                <th className="border-b py-2 px-4 w-1/6">Full Name</th>
                <th className="border-b py-2 px-4 w-1/6">Email</th>
                <th className="border-b py-2 px-4 w-1/6">Role</th>
                <th className="border-b py-2 px-4 w-1/6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map((user) => (
                  <tr key={user._id}>
                    <td className="border-b py-2 px-4 underline text-blue-500">
                      <Link href={`./user/${user._id}`}>{user._id}</Link>
                    </td>
                    <td className="border-b py-2 px-4">{user.username}</td>
                    <td className="border-b py-2 px-4">
                      {user.fullname || "Empty"}
                    </td>
                    <td className="border-b py-2 px-4">
                      {user.email || "Empty"}
                    </td>
                    <td className="border-b py-2 px-4">{user.role}</td>
                    <td className="border-b py-2 px-4">
                      <Link
                        href={`./user/${user._id}`}
                        className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
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

export default UserManagementPage;
