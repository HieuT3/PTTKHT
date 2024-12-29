"use client";

import { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch("/api/cart");
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        console.log("Cart items:", data.cart); // Kiểm tra dữ liệu giỏ hàng
        setCartItems(data.cart);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      if (cartItems.length > 0) {
        const ids = cartItems.map((item) => item.productId);
        try {
          const response = await fetch("/api/product/ids", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ids }),
          });
          if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
          }
          const data = await response.json();
          setProducts(data);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      }
    };

    fetchProducts();
  }, [cartItems]);

  const getProductDetails = (productId) => {
    return products.find((product) => product._id === productId);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const product = getProductDetails(item.productId);
      if (product) {
        return total + parseFloat(product.price) * item.quantity;
      }
      return total;
    }, 0);
  };

  const handleRemoveItem = async (productId) => {
    try {
      const response = await fetch("/api/cart", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.productId !== productId)
      );
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const handleUpdateQuantity = async (productId, quantity) => {
    try {
      const response = await fetch("/api/cart", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, quantity }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const updatedItem = await response.json();
      setCartItems(updatedItem.cart);
    } catch (error) {
      console.error("Error updating item quantity:", error);
    }
  };

  const handleCheckout = () => {
    if (!user) {
      router.push("/login");
    } else {
      router.push("/checkout");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg">
        <header className="px-4 py-5 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-700">
            Your Shopping Cart
          </h1>
        </header>
        <div className="p-4">
          {cartItems != undefined &&
          cartItems != null &&
          cartItems.length > 0 ? (
            <>
              {/* Cart Items */}
              <ul className="divide-y divide-gray-200">
                {cartItems.map((item, index) => {
                  const product = getProductDetails(item.productId);
                  if (!product) return null;
                  return (
                    <li key={product._id} className="flex items-center py-4">
                      <span className="mr-4">{index + 1}</span>{" "}
                      {/* Hiển thị chỉ số mảng */}
                      <img
                        src={product.imageurl}
                        alt="Product Thumbnail"
                        className="w-20 h-20 object-cover rounded-md border"
                      />
                      <div className="ml-4 flex-1">
                        <h2 className="text-lg font-semibold text-gray-800">
                          {product.title}
                        </h2>
                        <p className="text-sm text-gray-600">
                          {product.description}
                        </p>
                        <div className="mt-2 flex items-center space-x-4">
                          <div className="flex items-center">
                            <button
                              className="px-2 py-1 border rounded-l-md bg-gray-200 hover:bg-gray-300"
                              onClick={() => {
                                if (item.quantity > 1) {
                                  handleUpdateQuantity(
                                    item.productId,
                                    item.quantity - 1
                                  );
                                } else {
                                  handleRemoveItem(item.productId);
                                }
                              }}
                            >
                              -
                            </button>
                            <input
                              type="number"
                              className="w-12 text-center border-t border-b border-gray-300"
                              value={item.quantity || 0}
                              readOnly
                            />
                            <button
                              className="px-2 py-1 border rounded-r-md bg-gray-200 hover:bg-gray-300"
                              onClick={() =>
                                handleUpdateQuantity(
                                  item.productId,
                                  item.quantity + 1
                                )
                              }
                            >
                              +
                            </button>
                          </div>
                          <p className="text-lg font-bold text-gray-700">
                            ${product.price}
                          </p>
                        </div>
                      </div>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleRemoveItem(item.productId)}
                      >
                        Remove
                      </button>
                    </li>
                  );
                })}
              </ul>
              {/* Cart Summary */}
              <div className="mt-8">
                <div className="flex justify-between text-lg font-bold text-gray-800">
                  <span>Subtotal</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>Taxes</span>
                  <span>$29.99</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-800 mt-4">
                  <span>Total</span>
                  <span>${(calculateTotal() + 29.99).toFixed(2)}</span>
                </div>
                <button
                  className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                  onClick={handleCheckout}
                >
                  Checkout
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <h2 className="text-xl font-semibold text-gray-700">
                Your cart is empty
              </h2>
              <p className="text-gray-500 mt-2">
                Start adding items to your cart to see them here.
              </p>
              <button className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition duration-200">
                Shop Now
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
