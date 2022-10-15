import { useEffect, useState } from "react";
import "./App.css";
import Products from "./components/Products/Products";
const url = "https://fakestoreapi.com/products";

function App() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(url);
      const products = await response.json();
      console.log(products);
      setProducts(products);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div>
      <Products products={products} />
    </div>
  );
}

export default App;
