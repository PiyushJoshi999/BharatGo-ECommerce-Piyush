import React, { useEffect, useState } from "react";
import "./ProductDetailModel.css";
import "./LoadingSpinner.css";

const ProductDetailModal = ({ productId, onClose }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(
          `https://api.escuelajs.co/api/v1/products/${productId}`
        );
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  return (
    <div>
      {loading ? (
        <div className="loading-container">
          <img
            className="loading-spinner"
            src="/assets/spinner.gif"
            alt="Loading..."
          />
        </div>
      ) : (
        <div className="modal" onClick={onClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={onClose}>
              &times;
            </button>
            <div className="product-details">
              <h2>{product.title}</h2>
              <p>{product.description}</p>
              <p className="product-price">Price: ${product.price}</p>
              <div className="product-images">
                {product.images.map((image, index) => (
                  <img key={index} src={image} alt={`Product ${index}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailModal;
