import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartList, setCartList] = useState(() => {
    const storedCart = sessionStorage.getItem("cartList");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    sessionStorage.setItem("cartList", JSON.stringify(cartList));
  }, [cartList]);

  const addToCart = (product) => {
    const updatedCart = [...cartList, product];
    setCartList(updatedCart);
  };

  const removeFromCart = (productId) => {
    const updatedCart = cartList.filter((item) => item.id !== productId);
    setCartList(updatedCart);
  };

  const updateQuantity = (productId, quantity) => {
    const updatedCart = cartList.map((item) =>
      item.id === productId ? { ...item, quantity: parseInt(quantity) } : item
    );
    setCartList(updatedCart);
  };

  return (
    <CartContext.Provider value={{ cartList, addToCart, removeFromCart, updateQuantity, setCartList }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
