import React from "react";
import Product from "../Product/Product";
import "./Products.css";

const Products = ({ products }) => {
  return (
    <div className="container">
      <div className="heading text-position">
        <h1>Let's introduce with our cat programmers!</h1>
      </div>
      <div className="cards">
        {products.map((product) => {
          return <Product key={product.id} {...product} />;
        })}
      </div>
    </div>
  );
};

export default Products;
