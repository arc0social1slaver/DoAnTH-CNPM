import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import {useDispatch} from "react-redux";
import { addToCart } from "../redux/feature/cartSlice";
import { useFetchAllProdsQuery } from "../redux/feature/prodAPI";

const UserDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleAddProd = (product) => {
   dispatch(addToCart(product))
}
  // const [products, setProducts] = useState([]);
  // useEffect(() => {
  //   fetch("http://localhost:3000/api/products")
  //     .then((response) => response.json())
  //     .then((data) => {
  //     setProducts(data.products);
  //     // console.log('Products data:', data);
  //     })
  //     .catch((error) => console.error('Error fetching products:', error));
  // }, []);
  const { data: { products = [] } = {} } = useFetchAllProdsQuery();
  // console.log(productMess.products);
  
  

  return (
    <div className="flex flex-col items-center justify-center mx-auto p-2">
      <h1 className="text-2xl text-green-700 font-bold mt-8">GỢI Ý HÔM NAY</h1>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4 w-full md:max-w-5xl">
      <div className="col-span-full -mx-2 md:-mx-4 border-t-2 border-green-700 my-4"></div>
        {products.map((product, index) => (
          <div 
            // to={`/product/${product._id}`} 
            key={product._id}
            className="flex flex-col items-center w-48 md:w-48 space-y-4 mt-8 border border-colors-gray-200 p-4 h-auto"
          >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <h2 className="text-base text-center line-clamp-2">{product.name}</h2>
              <p className="text-base text-green-700 font-semibold text-center">{product.price}</p>
              <button onClick={() => handleAddProd(product)}
              className="w-full py-2 bg-green-700 text-white font-semibold text-sm rounded-md mt-auto hover:bg-green-800 transition-colors"
               >
             Add to Cart
            </button>
            <Link 
          to={`/user/product/${product._id}`} 
          className="text-green-700 font-semibold mt-2 hover:underline"
        >
          View Details
        </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;


