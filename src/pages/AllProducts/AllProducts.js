import React from "react";
import { useEffect, useState } from "react";
import Product from "./../../components/Product/Product";
import "./AllProducts.css";
import axiosInstance from "../../services/axiosInstance";
import Pagination from "../../components/Pagination/Pagination";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [productsWithoutSorting, setProductsWithoutSorting] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(6);
  const [currentProducts, setCurrentProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [selectedSorting, setSelectedSorting] = useState("");

  //Get current products
  let indexOfLastProduct = currentPage * productsPerPage;
  let indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  useEffect(() => {
    if (products.length === 0) {
      axiosInstance
        .get("/products")
        .then((res) => {
          setProducts(res.data);
          console.log(res.data);
          setProductsWithoutSorting(res.data);

          let allCategories = res.data.map((product) => product.category);
          let uniqueCategories = [...new Set(allCategories)];

          if (categories.length <= 1) {
            setCategories([...categories, ...uniqueCategories]);
          }

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
    setSelectedSorting(value);
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

    if (value !== "All") {
      let filteredProduct = products.filter(
        (product) => product.category === value
      );

      setTotalProducts(filteredProduct.length);

      setCurrentProducts(
        filteredProduct.slice(indexOfFirstProduct, indexOfLastProduct)
      );
    }
  };

  const handleReset = () => {
    setSelectedCategory("All");
    setCurrentPage(1);
    setSelectedSorting("");
    setProducts([]);
  };

  return (
    <div className="container">
      <div className="heading text-position">
        <h1>Latest products</h1>
        <hr />
      </div>
      <div className="buttons text-center">
        {categories.map((category) => {
          return (
            <button
              className="btn btn-outline-dark me-2"
              value={category}
              onClick={(e) => handleFilter(e.target.value)}
              style={{
                background:
                  category === selectedCategory
                    ? "rgba(236, 183, 200, 0.953)"
                    : "",
              }}
            >
              {category}
            </button>
          );
        })}
        <button
          className="btn btn-outline-dark me-2"
          value="highToLow"
          onClick={(e) => handlePriceSorting(e.target.value)}
          style={{
            background:
              selectedSorting === "highToLow"
                ? "rgba(236, 183, 200, 0.953)"
                : "",
          }}
        >
          High to Low
        </button>
        <button
          className="btn btn-outline-dark me-2"
          value="lowToHigh"
          onClick={(e) => handlePriceSorting(e.target.value)}
          style={{
            background:
              selectedSorting === "lowToHigh"
                ? "rgba(236, 183, 200, 0.953)"
                : "",
          }}
        >
          Low to High
        </button>
        <button className="btn btn-outline-dark me-2" onClick={handleReset}>
          Reset
        </button>
      </div>
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
