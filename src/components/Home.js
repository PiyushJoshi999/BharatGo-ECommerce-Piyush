import React, { useEffect, useState } from "react";
import "./Home.css";
import './LoadingSpinner.css';

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);

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
    }finally{
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
      }).catch((err) => {
        alert('Error fetching Categories List: ', err)
    });
  }, []);

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setProducts([]);
    fetchProductsByCat(cat);
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
        {categories && categories.map((category) => (
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
        {products && !loading && products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
