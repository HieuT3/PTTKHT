"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { toast } from "react-toastify";
import { usePathname } from "next/navigation";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { setUser } = useUser();
  const pathname = usePathname();
  const adminPage = pathname.includes("admin");

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const path = adminPage ? "/api/admin/login" : "/api/user/login";
      const response = await fetch(`${path}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        setError("Invalid Credentials");
        return;
      }
      const data = await response.json();
      console.log(data);
      setUser(data.username);
      if (adminPage) router.push("/admin/dashboard");
      else router.push("/");
      toast.success("Login Successfully!");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="h-screen flex items-center justify-center bg-gray-100">
      <div className="container max-w-4xl mx-auto flex flex-wrap bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left Column - Image */}
        <div className="hidden lg:flex w-1/2 bg-cover bg-center">
          <img
            src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            alt="Sample"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Right Column - Form */}
        <div className="w-full lg:w-1/2 p-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">
            Sign in to your account {adminPage ? "admin" : ""}
          </h2>
          {error && <p className="text-red-500">{error}</p>}
          <form onSubmit={handleSubmitForm}>
            <input
              value={username}
              type="text"
              placeholder="User name"
              className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              value={password}
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Remember Me and Forgot Password */}
            {!adminPage && (
              <div className="flex items-center justify-between mb-6">
                <label className="inline-flex items-center">
                  <input type="checkbox" className="form-checkbox h-5 w-5" />
                  <span className="ml-2 text-sm text-gray-600">
                    Remember me
                  </span>
                </label>
                <Link
                  className="text-sm text-blue-500 hover:underline"
                  href="/forgot-password"
                >
                  Forgot password?
                </Link>
              </div>
            )}
            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>

          {/* Register Link */}
          {!adminPage && (
            <p className="mt-4 text-center text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-blue-500 hover:underline">
                Register here
              </Link>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
