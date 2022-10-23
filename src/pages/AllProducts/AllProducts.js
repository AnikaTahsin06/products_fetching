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
  const [currentProducts, setCurrentProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);

  //Get current products
  let indexOfLastProduct = currentPage * productsPerPage;
  let indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  useEffect(() => {
    if (products.length === 0) {
      axiosInstance
        .get("/products")
        .then((res) => {
          setProducts(res.data);

          let allCategories = res.data.map((product) => product.category);
          let uniqueCategories = [...new Set(allCategories)];

          setCategories([...categories, ...uniqueCategories]);

          setTotalProducts(res.data.length);

          setCurrentProducts(
            res.data.slice(indexOfFirstProduct, indexOfLastProduct)
          );
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      if (selectedCategory === "All") {
        setTotalProducts(products.length);
        setCurrentProducts(
          products.slice(indexOfFirstProduct, indexOfLastProduct)
        );
      } else {
        let filteredProduct = products.filter(
          (product) => product.category === selectedCategory
        );
        setTotalProducts(filteredProduct.length);
        setCurrentProducts(
          filteredProduct.slice(indexOfFirstProduct, indexOfLastProduct)
        );
      }
    }
  }, [indexOfFirstProduct, indexOfLastProduct, products, selectedCategory]);

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

    setCurrentPage(1);

    let filteredProduct = products.filter(
      (product) => product.category === value
    );

    setTotalProducts(filteredProduct.length);

    setCurrentProducts(
      filteredProduct.slice(indexOfFirstProduct, indexOfLastProduct)
    );
  };

  return (
    <div className="container">
      <div className="heading text-position">
        <h1>Latest products</h1>
        <hr />
      </div>
      <div className="buttons">
        {categories.map((category) => {
          return (
            <button
              className="btn btn-outline-dark me-2"
              value={category}
              onClick={(e) => handleFilter(e.target.value)}
            >
              {category}
            </button>
          );
        })}
        <button
          className="btn btn-outline-dark me-2"
          value="highToLow"
          onClick={(e) => handlePriceSorting(e.target.value)}
        >
          High to Low
        </button>
        <button
          className="btn btn-outline-dark me-2"
          value="lowToHigh"
          onClick={(e) => handlePriceSorting(e.target.value)}
        >
          Low to High
        </button>
      </div>
      {/* <div>
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
      </div> */}
      {/* <div>
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
      </div> */}
      <div className="cards">
        {currentProducts.map((product) => {
          return <Product key={product.id} {...product} />;
        })}
      </div>
      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={totalProducts}
        paginate={paginate}
      />
    </div>
  );
};

export default AllProducts;
