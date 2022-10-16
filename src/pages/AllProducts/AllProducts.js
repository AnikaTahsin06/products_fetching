import React from "react";
import { useEffect, useState } from "react";
import Product from "./../../components/Product/Product";
import "./AllProducts.css";
import axiosInstance from "../../services/axiosInstance";

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axiosInstance
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
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

export default AllProducts;
