import { useState, useEffect } from "react";
import ProductsCart from "../components/ProductsCart";
import Pagination from "../components/Pagination";
import Navbar from "../components/Navbar";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";

function Items() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();
  const pageSize = 10;
  const { addToCart } = useCart();
  
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
    <div className="min-h-screen bg-gray-50 pb-10">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 pt-6">
        <div className="flex justify-end mb-6">
          <button 
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-colors w-full sm:w-auto text-center" 
            onClick={() => { navigate('/cart') }}
          >
            Go to My Cart
          </button>
        </div>

        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => { setSelectedCategory(cat); setCurrentPage(0); }}
              className={`px-5 py-2 rounded-full font-semibold transition shadow-sm ${selectedCategory === cat ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600 border border-indigo-100 hover:bg-indigo-50'}`}
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
        
        <div className="flex flex-wrap justify-center gap-6 mt-8">
          {products.slice(start, end).map((p) => (
            <ProductsCart 
              key={p._id || p.id}
              image={p.thumbnail}
              title={p.title}
              description={p.description}
              price={p.price}
              showaddtocartbutton={true}
              onAddToCart={() => addToCart(p)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Items;
