import React, { useContext } from "react";
import "./Cart.css";
import { CartContext } from "../contexts/CartContext";

const Cart = () => {
  const { cartList, removeFromCart, updateQuantity } = useContext(CartContext);

  const calculateTotalAmount = () => {
    return cartList
      .reduce((total, item) => {
        const itemTotal = item.quantity
          ? item.quantity * item.price
          : item.price;
        return total + itemTotal;
      }, 0)
      .toFixed(2);
  };

  const handleBuyNow = () => {
    if (cartList.length === 0) {
      alert("Please add at least one product to the cart to purchase.");
      return;
    }

    const storedOrderList = sessionStorage.getItem("orderList");
    const orderList = storedOrderList ? JSON.parse(storedOrderList) : [];

    const processedCartList = cartList.map((item) => ({
      ...item,
      quantity: item.quantity || 1,
      updatedAmount: ((item.quantity || 1) * item.price).toFixed(2),
    }));

    const updatedOrderList = [...orderList, ...processedCartList];
    sessionStorage.setItem("orderList", JSON.stringify(updatedOrderList));

    alert("Demo purchase successful!");
  };

  return (
    <div className="cart-page">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "50%",
        }}
      >
        <h2>Your Cart</h2>
        <h3>Total: ${calculateTotalAmount()}</h3>
      </div>
      {cartList.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cartList.map((product) => (
            <div key={product.id} className="cart-item">
              <img src={product.image} alt={product.title} />
              <div className="cart-details">
                <h3>{product.title}</h3>
                <p>Price: ${product.price}</p>
                <div className="cart-quantity">
                  <label>Quantity:</label>
                  <input
                    type="number"
                    min="1"
                    value={product.quantity || 1}
                    onChange={(e) =>
                      updateQuantity(product.id, e.target.value)
                    }
                  />
                </div>
                <p>
                  Amount: $
                  {((product.quantity || 1) * product.price).toFixed(2)}
                </p>
                <button
                  className="remove-button"
                  onClick={() => removeFromCart(product.id)}
                >
                  Remove from Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {cartList.length > 0 && (
        <div className="cart-footer">
          <div className="cart-actions">
            <button className="buy-now-button" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;