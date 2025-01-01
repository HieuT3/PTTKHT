"use client";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  const fetchDataUser = async () => {
    try {
      const response = await fetch("/api/user/me");
      if (!response.ok) console.log("Get user error!");
      else {
        const data = await response.json();
        setUser(data);
        const cart = response.cart;
        if (cart) setCart(cart);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDataUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, cart, setCart }}>
      {children}
    </UserContext.Provider>
  );
};
