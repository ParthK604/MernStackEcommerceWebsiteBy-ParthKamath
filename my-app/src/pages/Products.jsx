import { useState, useEffect } from "react";
import ProductsCart from "../components/ProductsCart";
import Pagination from "../components/Pagination";

function Products() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10;

  const categories = ["All", "Mobile", "TV", "Refrigerator", "Laptop", "Washing Machine", "Air Conditioner", "Headphones", "Smartwatch"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchData = async () => {
      let url = "http://localhost:3000/api/products";
      if (selectedCategory !== "All") {
        url += `?category=${selectedCategory}`;
      }
      const res = await fetch(url);
      const json = await res.json();
      setProducts(json.products);
    };
    fetchData();
  }, [selectedCategory]);

  const totalPages = Math.ceil(products.length / pageSize);
  const start = currentPage * pageSize;
  const end = start + pageSize;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="w-full text-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl shadow-lg p-6 mb-8 text-lg font-medium leading-relaxed">
        Welcome to EcomStore, where exceptional quality meets unbeatable convenience.
        Discover a world of carefully selected products, designed to inspire and delight.
        Shop with confidence through our secure platform and let us deliver a superior shopping experience straight to your doorstep!
      </div>

      <div className="flex flex-wrap gap-3 justify-center mb-10">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => { setSelectedCategory(cat); setCurrentPage(0); }}
            className={`px-5 py-2 rounded-full font-semibold transition shadow-md ${selectedCategory === cat ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600 hover:bg-indigo-50'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    
      <div className="flex flex-wrap justify-center gap-6 mt-6">
        {products.slice(start, end).map((p) => (
          <ProductsCart
            key={p._id || p.id}
            id={p._id || p.id}
            image={p.thumbnail}
            title={p.title}
            description={p.description}
            price={p.price}
          />
        ))}
      </div>
    </div>
  );
}

export default Products;
