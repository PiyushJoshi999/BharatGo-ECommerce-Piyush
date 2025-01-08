import React, { useEffect, useState } from "react";
import "./Home.css";
import "./LoadingSpinner.css";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [cartList, setCartList] = useState(() => {
    const storedCart = sessionStorage.getItem("cartList");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const fetchProductsByCat = async (cat) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://fakestoreapi.com/products/category/${cat}`
      );
      const data = await response.json();

      if (data.length > 0) {
        setProducts(data);
      } else {
        alert("Error fetching Products List");
      }
    } catch (err) {
      alert("Error fetching Products List: ", err);
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
      .catch((err) => {
        console.error("Error fetching Categories List: ", err);
      });
  }, []);

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setProducts([]);
    fetchProductsByCat(cat);
  };

  const addToCart = (product) => {
    const updatedCart = [...cartList, product];
    setCartList(updatedCart);
    sessionStorage.setItem("cartList", JSON.stringify(updatedCart));
  };

  const removeFromCart = (productId) => {
    const updatedCart = cartList.filter((item) => item.id !== productId);
    setCartList(updatedCart);
    sessionStorage.setItem("cartList", JSON.stringify(updatedCart));
  };

  const isInCart = (productId) => {
    return cartList.some((item) => item.id === productId);
  };

  return (
    <div className="home">
      <div className="categories">
        {loading && (
          <div className="loading-container">
            <img
              className="loading-spinner"
              src="/assets/spinner.gif"
              alt="Loading..."
            />
          </div>
        )}
        {categories &&
          categories.map((category) => (
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
        {loading && (
          <div className="loading-container">
            <img
              className="loading-spinner"
              src="/assets/spinner.gif"
              alt="Loading..."
            />
          </div>
        )}
        {products &&
          !loading &&
          products.map((product) => (
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
  );
};

export default Home;
