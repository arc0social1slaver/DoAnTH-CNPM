import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:5000/products/${id}`)
        .then((response) => response.json())
        .then((data) => setProduct(data))
        .catch((error) => {
            console.error("Error fetching product:", error);
            navigate('/user');
        });
    }, [id, navigate]);

    if (!product) {
        return <p>Đang tải thông tin sản phẩm...</p>;
    }

    return (
        <div className="container mx-auto p-4">
            <p className="text-lg mt-4">Sản phẩm ID: {id}</p>
            {/* Product Images */}
            <div className="flex">
                <div className="w-2/3 pr-4">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-auto"
                    />
                    <div className="mt-2 flex space-x-2">
                        {product.images.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={`Thumbnail ${index + 1}`}
                                className="w-16 h-16 object-cover cursor-pointer"
                            />
                        ))}
                    </div>
                
                    <button
                        onClick={() => navigator.clipboard.writeText(window.location.href)}
                        className="mt-4 p-2 bg-colors-gray-200 text-colors-gray-700"
                    >
                        Chia sẻ
                    </button>
                </div>

                {/* Product Info */}
                <div className="w-1/3 pl-4">
                    <h1 className="text-xl font-bold">{product.name}</h1>
                    <p className="text-lg text-green-700 mt-2">{product.price}</p>

                    {/* shipping */}
                    <div className="mt-4">
                        <p className="text-md">Vận chuyển:</p>
                        <p className="text-md inline-block">Từ: {product.shipping?.from}</p>
                        <p className="text-md inline-block ml-4">Đến: {product.shipping?.to}</p>
                        <p className="text-md mt-2">Phí vận chuyển: {product.shipping?.cost}</p>
                    </div>

                    {/* stock */}
                    <div className="mt-4">
                        <label htmlFor="quantity" className="text-md">Số lượng:</label>
                        <input
                            id="quantity"
                            type="number"
                            defaultValue="1"
                            className="w-16 p-2 border border-gray-400 rounded-md mt-2"
                        />
                    </div>
                </div>
            </div>

            {/* Seller */}
            <div className="mt-8 flex items-center">
                <img
                    src={product.user.avatar}
                    alt="Seller Avatar"
                    className="w-12 h-12 rounded-full"
                />
                <div className="ml-4">
                    <p className="text-lg font-bold">{product.user?.name}</p>
                    <p className="text-md text-gray-500">Online {product.user?.lastOnline}</p>
                    <p className="text-md">Đánh giá: {product.user?.rating}</p>
                </div>

                {/* Seller Button */}
                <div className="ml-auto flex space-x-2">
                    <button className="px-4 py-2 bg-green-500 text-white rounded-md">Chat ngay</button>
                    <button className="px-4 py-2 border border-gray-400 text-gray-700 rounded-md">Xem cửa hàng</button>
                </div>
            </div>

            {/* Product detail */}
            <div className="mt-8">
                <h2 className="text-lg font-semibold">Chi tiết sản phẩm</h2>
                <ul className="mt-2 space-y-2">
                    <li><strong>Danh mục:</strong> {product.category}</li>
                    <li><strong>Số lượng:</strong> {product.stock} sản phẩm</li>
                    <li><strong>Nhãn hàng:</strong> {product.brand}</li>
                    <li><strong>Tình trạng:</strong> {product.condition}</li>
                </ul>
            </div>

            {/* Description */}
            <div className="mt-8">
                <h2 className="text-lg font-semibold">Mô tả sản phẩm</h2>
                <textarea
                    value={product.description}
                    readOnly
                    className="w-full mt-2 p-4 border border-gray-400 rounded-md"
                ></textarea>
            </div>
        </div>
    );
};

export default ProductDetail;
