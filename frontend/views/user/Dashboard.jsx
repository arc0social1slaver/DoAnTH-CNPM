import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 

const UserDashboard = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((response) => response.json())
      .then((data) => {
      setProducts(data);
      console.log('Products data:', data);
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center mx-auto p-2">
      <h1 className="text-2xl text-green-700 font-bold mt-8">GỢI Ý HÔM NAY</h1>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4 w-full md:max-w-5xl">
      <div className="col-span-full -mx-2 md:-mx-4 border-t-2 border-green-700 my-4"></div>
        {products.map((product) => (
          <Link 
            to={`/product/${product.id}`} 
            key={product.id}
            className="block w-48 md:w-48 space-x-4 mt-8 border border-colors-gray-200"
          >
              <img
                src={product.image}
                alt={product.name}
                className="w-48 h-48 object-cover"
              />
              <h2 className="text-base my-2 mx-2 line-clamp-2">{product.name}</h2>
              <p className="text-base text-green-700 font-semibold mx-2 my-2">{product.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;


