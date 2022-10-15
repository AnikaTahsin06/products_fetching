import React from "react";
import "./Product.css";

const Product = ({ id, title, image, price, description, rating }) => {
  return (
    <div className="card">
      <div className="card-img">
        <img src={image} alt="I am Pinki" />
      </div>
      <div className="card-body text-position">
        <h2>{title}</h2>
        <h3>{price}</h3>
        <p>{description}</p>
        <p>
          {rating.rate} {rating.count}
        </p>
      </div>
    </div>
  );
};

export default Product;
