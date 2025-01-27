import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../contexts/CartContext";
import "./Home.css";
import "./LoadingSpinner.css";
import ProductDetailModal from "./ProductDetailModel";
import { auth } from "../config/firebase";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const { cartList, addToCart, removeFromCart } = useContext(CartContext);
  const [user, setUser] = useState(null);

  const fetchProductsByCat = async (cat) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.escuelajs.co/api/v1/categories/${cat.id}/products`
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
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/categories")
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

  const isInCart = (productId) =>
    cartList.some((item) => item.id === productId);

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
                key={category.id}
                className={`category ${
                  category === selectedCategory ? "active" : ""
                }`}
                onClick={() => handleCategoryChange(category)}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="category-image"
                />
                <span>{category.name}</span>
              </div>
            ))}
          </div>
          <div className="products">
            {products.map((product) => (
              <div
                key={product.id}
                className="product-card"
                onClick={() => setSelectedProductId(product.id)}
              >
                <img src={product.images[0]} alt={product.title} />
                <h3>{product.title}</h3>
                <p>${product.price}</p>
                {user ? ( 
                  isInCart(product.id) ? (
                    <button
                      className="remove-from-cart"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromCart(product.id);
                      }}
                    >
                      Remove from Cart
                    </button>
                  ) : (
                    <button
                      className="add-to-cart"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                    >
                      Add to Cart
                    </button>
                  )
                ) : (
                  <p className="login-warning">Login to add to cart</p> 
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      {selectedProductId && (
        <ProductDetailModal
          productId={selectedProductId}
          onClose={() => setSelectedProductId(null)}
        />
      )}
    </div>
  );
};

export default Home;
