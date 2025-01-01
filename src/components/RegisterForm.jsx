"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useUser } from "@/context/UserContext";

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useUser();
  const router = useRouter();

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      const response = await fetch("/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }
      const data = await response.json();
      setUser(data);
      router.push("/");
      toast.success("Registered successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="h-screen flex items-center justify-center bg-gray-100">
      <div className="container max-w-4xl mx-auto flex flex-wrap bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left Column - Image */}
        <div className="hidden lg:flex w-1/2">
          <img
            src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            alt="Sample"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Right Column - Form */}
        <div className="w-full lg:w-1/2 p-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">
            Sign up to your account
          </h2>
          {error && <p className="text-red-500">{error}</p>}
          {/* Form Inputs */}
          <form onSubmit={handleSubmitForm}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                value={username}
                type="text"
                className="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                placeholder="Enter your username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                value={password}
                type="password"
                className="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                value={confirmPassword}
                type="password"
                className="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                placeholder="Enter confirm password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            {/* Remember Me and Terms */}
            <div className="flex items-center justify-between mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-600 rounded"
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Register
            </button>
          </form>

          {/* Switch to Login */}
          <p className="mt-4 text-center text-sm text-gray-600">
            Have an account?{" "}
            <Link className="text-blue-500 hover:underline" href="/login">
              Login{" "}
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
