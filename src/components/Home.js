import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../contexts/CartContext";
import "./Home.css";
import "./LoadingSpinner.css";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const { cartList, addToCart, removeFromCart } = useContext(CartContext);

  const fetchProductsByCat = async (cat) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://fakestoreapi.com/products/category/${cat}`
      );
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      alert("Error fetching Products List");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        if (data.length > 0) setSelectedCategory(data[0]);
        fetchProductsByCat(data[0]);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setProducts([]);
    fetchProductsByCat(cat);
  };

  const isInCart = (productId) => {
    return cartList.some((item) => item.id === productId);
  };

  return (
    <div className="home-container">
      {loading ? (
        <div className="loading-container">
          <img
            className="loading-spinner"
            src="/assets/spinner.gif"
            alt="Loading..."
          />
        </div>
      ) : (
        <div className="home-content">
          <div className="categories">
            {categories.map((category) => (
              <div
                key={category}
                className={`category ${
                  category === selectedCategory ? "active" : ""
                }`}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </div>
            ))}
          </div>
          <div className="products">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <img src={product.image} alt={product.title} />
                <h3>{product.title}</h3>
                <p>${product.price}</p>
                {isInCart(product.id) ? (
                  <button
                    className="remove-from-cart"
                    onClick={() => removeFromCart(product.id)}
                  >
                    Remove from Cart
                  </button>
                ) : (
                  <button
                    className="add-to-cart"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
