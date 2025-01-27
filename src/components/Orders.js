import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Orders.css";
import { CartContext } from "../contexts/CartContext";
const Orders = () => {
  const { addToCart } = useContext(CartContext);
  const [orderList, setOrderList] = useState(() => {
    const storedOrderList = sessionStorage.getItem("orderList");
    return storedOrderList ? JSON.parse(storedOrderList) : [];
  });

  const navigate = useNavigate();

  const handleReorder = (product) => {
    addToCart({ ...product });
    navigate("/cart");
  };

  return (
    <div className="orders-page">
      <h2>Your Orders</h2>
      {orderList.length === 0 ? (
        <p>Your order list is empty.</p>
      ) : (
        <div className="order-items">
          {orderList.map((product, index) => (
            <div key={index} className="order-item">
              <img src={product.images[0]} alt={product.title} />
              <div className="order-details">
                <h3>{product.title}</h3>
                <p>Quantity: {product.quantity}</p>
                <p>Total Amount: ${product.updatedAmount}</p>
                <button
                  className="reorder-button"
                  onClick={() => handleReorder(product)}
                >
                  Reorder
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
