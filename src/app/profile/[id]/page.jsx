"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";

const ProfileUserPage = () => {
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/user/${params.id}`);
        if (!response.ok) {
          console.log(response.statusText);
          return;
        }
        const data = await response.json();
        setUser(data.user);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      if (password !== confirmPassword) {
        toast.error("Password does not match!");
        return;
      }
      const updateUser = {
        username: user.username,
        fullname: user.fullname,
        email: user.email,
        password: password,
        role: "",
      };
      const response = await fetch(`/api/user/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateUser),
      });

      if (!response.ok) {
        console.log(response.statusText);
        return;
      }
      const data = await response.json();
      setUser(data.user);
      setPassword("");
      setConfirmPassword("");
      toast.success("Update user successfully!");
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Form */}
      {user && (
        <div className="p-6 flex justify-center">
          <div className="bg-white shadow rounded-lg p-6 w-full max-w-3xl">
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                User ID
              </label>
              <input
                type="text"
                name="id"
                value={user._id}
                disabled
                className="w-full px-4 py-2 border rounded-lg bg-gray-200 cursor-not-allowed"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={user.username}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="fullname"
                value={user.fullname}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmpassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
              />
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

export default ProfileUserPage;
