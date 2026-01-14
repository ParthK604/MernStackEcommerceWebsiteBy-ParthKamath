import { useState, useEffect } from "react";
import ProductsCart from "../components/ProductsCart";
import Pagination from "../components/Pagination";
import Navbar from "../components/Navbar";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";

function Items() {
  const API = import.meta.env.VITE_PRODUCTS_API;
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const navigate=useNavigate();
  const pageSize = 10;
  const {addToCart}=useCart();

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
   
    <Navbar/>

    <div className="mx-auto mt-2 w-fit border text-3xl p-2 bg-blue-400">
      <button className="cursor-pointer" onClick={()=>{navigate('/cart')}}>My Cart</button>
    </div>
    
    <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
    />
    
    
    <div className="flex flex-wrap justify-center ">
        {products.slice(start, end).map((p) => (
          < ProductsCart 
            key={p.id}
            image={p.thumbnail}
            title={p.title}
            description={p.description}
            price={p.price}
            showaddtocartbutton={true}
            onAddToCart={() => addToCart(p)}
          />
        ))}
      </div>
</>
  );
}

export default Items;


