import { Link } from "react-router-dom"; 

const UserDashboard = () => {
  const products = [
    {
      id: 1,
      name: "Áo Thun Nâu Local Brand",
      price: "100,000 VND",
      image: "https://i.pinimg.com/736x/95/d2/71/95d271edf1d4d46380991c18a444860f.jpg",
    },
    {
      id: 2,
      name: "Giáo Trình Triết Học Mác-Lênin",
      price: "30,000 VND",
      image: "https://i.pinimg.com/736x/88/8f/d2/888fd2ca8ecf53336b2797daf03d62f3.jpg",
    },
    {
      id: 3,
      name: "MacBook Air",
      price: "8,000,000 VND",
      image: "https://i.pinimg.com/736x/38/65/94/386594135756b1c8572b20991e9dd963.jpg",
    },
    {
      id: 4,
      name: "Đầm Cúp Ngực Hồng Nơ Trắng New 99% Còn Nguyên Tag",
      price: "200,000 VND",
      image: "https://i.pinimg.com/736x/cc/b7/3a/ccb73a8a9197ce873993afd8b9d88b71.jpg",
    },
    {
      id: 5,
      name: "MacBook Air",
      price: "8,000,000 VND",
      image: "https://i.pinimg.com/736x/38/65/94/386594135756b1c8572b20991e9dd963.jpg",
    },
    {
      id: 6,
      name: "MacBook Air",
      price: "8,000,000 VND",
      image: "https://i.pinimg.com/736x/38/65/94/386594135756b1c8572b20991e9dd963.jpg",
    },
  ];

  return (
    <div className="container mx-auto p-2">
      <h1 className="text-2xl text-green-700 font-bold mt-8">GỢI Ý HÔM NAY</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-2">
        {products.map((product) => (
          <div key={product.id} className="w-48 space-x-4 mt-8">
          <Link to={`/product/${product.id}`}>
            <img
              src={product.image}
              alt={product.name}
              className="w-48 h-48 object-cover rounded-md"
            />
            <h2 className="text-base mt-2 line-clamp-2">{product.name}</h2>
            <p className="text-base text-green-700 font-semibold mt-4">{product.price}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;


