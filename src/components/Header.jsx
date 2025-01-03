"use client";

import Link from "next/link";
import { useUser } from "@/context/UserContext";
import { useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { usePathname } from "next/navigation";

export default function Header() {
  const { user, setUser } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch("/api/user/me");
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        if (data) {
          setUser(data);
        }
      } catch (error) {
        console.error("Error checking session:", error);
      }
    };

    checkSession();
  }, []);

  const handleLogout = async () => {
    try {
      setIsOpen(false);
      let response = null;
      if (pathname.includes("admin"))
        response = await fetch("/api/admin/logout");
      else response = await fetch("/api/user/logout");
      if (!response.ok) console.log("Logout error!");
      setUser(null);
      if (pathname.includes("admin")) router.push("/admin");
      else router.push("/");
      toast.success("Logout successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  if (pathname.endsWith("/admin")) return;
  else {
    return (
      <header className="bg-white shadow-md sticky top-0 z-10">
        {pathname.includes("admin") ? (
          <header className="bg-blue-600 text-white py-4 px-6 flex justify-between items-center">
            <Link href="/admin/dashboard">
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            </Link>
            <button
              onClick={handleLogout}
              className="bg-white text-green-500 px-4 py-2 rounded"
            >
              Logout
            </button>
          </header>
        ) : (
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" className="text-xl font-bold text-blue-600">
              PhoneStore
            </Link>
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="relative inline-block text-left">
                  {/* Button hiển thị tên người dùng */}
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-300"
                  >
                    {user.username}
                    <svg
                      className="ml-2 w-4 h-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {/* Dropdown hiển thị khi nhấn */}
                  {isOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                      <Link
                        onClick={() => setIsOpen(false)}
                        href={`/profile/${user.id}`}
                        className="block px-4 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-t-lg"
                      >
                        Profile
                      </Link>
                      <Link
                        onClick={() => setIsOpen(false)}
                        href="/order"
                        className="block px-4 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-t-lg"
                      >
                        My Order
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-t-lg"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Login
                </Link>
              )}
              <div className="relative">
                <Link href="/cart">
                  <FaShoppingCart className="text-gray-700 text-2xl hover:text-blue-600 transition cursor-pointer" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    );
  }
}
