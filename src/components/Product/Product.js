import React from "react";
import "./Product.css";

const Product = ({ id, title, image, price, description, rating }) => {
  return (
    <div className="card ">
      <div className="card-img">
        <img src={image} alt="I am Pinki" />
      </div>
      <div className="card-body text-position">
        <h2>
          <b>{title}</b>
        </h2>
        <h3>
          <b>${price}</b>
        </h3>
        <p>{description}</p>
        <p className="lead fw-bolder">
          Rating {rating && rating.rate}
          <i className="fa fa-star"></i> ({rating.count})
        </p>
      </div>
    </div>
  );
};

export default Product;
