import { useState, useEffect } from "react";
import ProductsCart from "../components/ProductsCart";
import Pagination from "../components/Pagination";

function Products() {
  const API = import.meta.env.VITE_PRODUCTS_API;
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10;

  

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(API);
      const json = await res.json();
      setProducts(json.products);
    };
    fetchData();
  }, []);

  const totalPages = Math.ceil(products.length / pageSize);
  const start = currentPage * pageSize;
  const end = start + pageSize;

  return (
    <>
    <div className="w-[90vw] h-fit mx-auto border bg-gray-500 p-3 my-1 text-wrap">
      Welcome to EcomStore, where exceptional quality meets unbeatable convenience.
Discover a world of carefully selected products, designed to inspire and delight. Whether you're searching for the latest trends, everyday essentials, or unique finds, EcomStore is your one-stop shop for everything you need and love. Shop with confidence through our secure platform and let us deliver a superior shopping experience straight to your doorstep
    </div>

    <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
    />
    
    
    <div className="flex flex-wrap justify-center">
        {products.slice(start, end).map((p) => (
          <ProductsCart
            key={p.id}
            image={p.thumbnail}
            title={p.title}
            description={p.description}
            price={p.price}
          />
        ))}
      </div>

      
  </>
  );
}

export default Products;

