import React from "react";
import { useEffect, useState } from "react";
import Product from "./../../components/Product/Product";
import "./AllProducts.css";
import axiosInstance from "../../services/axiosInstance";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const categories = ["All"];

  useEffect(() => {
    axiosInstance
      .get("/products")
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  products.forEach((product) => {
    if (!categories.includes(product.category)) {
      categories.push(product.category);
    }
  });

  function compareHighToLow(a, b) {
    return b.price - a.price;
  }
  function compareLowToHigh(a, b) {
    return a.price - b.price;
  }

  const handlePriceSorting = (value) => {
    if (value === "highToLow") {
      let sortHighToLow = products.sort(compareHighToLow);
      setProducts([...sortHighToLow]);
    } else if (value === "lowToHigh") {
      let sortLowToHigh = products.sort(compareLowToHigh);
      setProducts([...sortLowToHigh]);
    }
  };

  const handleFilter = (value) =>
    setProducts([...products.filter((product) => product.category === value)]);

  return (
    <div className="container">
      <div className="heading text-position">
        <h1>Let's introduce with our cat programmers!</h1>
      </div>
      <div>
        <label htmlFor="price">Filter according to price:</label>
        <select
          name="price"
          id="price"
          onChange={(e) => handlePriceSorting(e.target.value)}
        >
          <option value="">Select</option>
          <option value="highToLow">High to Low</option>
          <option value="lowToHigh">Low to High</option>
        </select>
      </div>
      <div>
        <label htmlFor="categories">Filter according to categories:</label>
        <select
          name="categories"
          id="categories"
          onChange={(e) => handleFilter(e.target.value)}
        >
          {categories.map((category) => {
            return <option value={category}>{category}</option>;
          })}
        </select>
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
