import React from "react";
import { useEffect, useState } from "react";
import Product from "./../../components/Product/Product";
import "./AllProducts.css";
import axiosInstance from "../../services/axiosInstance";
import Pagination from "../../components/Pagination/Pagination";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(6);

  useEffect(() => {
    axiosInstance
      .get("/products")
      .then((res) => {
        setProducts(res.data);

        let allCategories = res.data.map((product) => product.category);
        let uniqueCategories = [...new Set(allCategories)];

        setCategories([...categories, ...uniqueCategories]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //Get current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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

  const handleFilter = (value) => {
    setSelectedCategory(value);
  };

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
        {selectedCategory === "All"
          ? currentProducts.map((product) => {
              return <Product key={product.id} {...product} />;
            })
          : products
              .filter((product) => product.category === selectedCategory)
              .map((product) => {
                return <Product key={product.id} {...product} />;
              })}
      </div>
      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={products.length}
        paginate={paginate}
      />
    </div>
  );
};

export default AllProducts;
