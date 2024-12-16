import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Currency from "../components/user/Currency";


const ProductDetail = () => {
    const { id } = useParams();
    
    console.log(id);
    
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);
    const navigate = useNavigate();

    const addToCart = (product) => {
    
        console.log('Đã thêm vào giỏ hàng:', product);
    }
    const buyNow = (product) => {
        navigate('/checkout');
        console.log('Mua ngay:', product);
    }
    const handleCopy = () => {
        navigator.clipboard.writeText(window.location.href)
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 1000);
            })
            .catch(err => console.error('Failed to copy: ', err));
    };

    useEffect(() => {
        fetch(`http://localhost:3000/products/${id}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Sản phẩm không tồn tại!");
            }
            return response.json()
        })
        .then((data) => {
            console.log("Dữ liệu sản phẩm:", data);
            setProduct(data);
        })
        .catch((error) => {
            console.error("Error fetching product:", error);
        })
        .finally(() => {
            setLoading(false);
        });
    }, [id, navigate]);
    if (loading) {
        return <p>Đang tải thông tin sản phẩm...</p>;
    }
    if (!product) {
        return <p>Không tìm thấy sản phẩm.</p>;
    }

    return (
        <div className="py-12">
            {/* Product Images */}
            <div className="container flex w-full mx-auto">
                <div className="w-1/2 px-12">
                    <div className="flex items-center justify-center w-full aspect-square overflow-hidden rounded-lg bg-gray-50">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="h-full object-cover object-center"
                        />
                    </div>
                    <button
                        onClick={handleCopy}
                        className="flex items-center mt-4 p-2 bg-green-100 text-colors-black hover:bg-green-700 rounded-lg"
                    >
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 24 24" 
                            fill="currentColor" 
                            className="size-4 mr-2"
                        >
                            <path 
                                fillRule="evenodd" 
                                d="M15.75 4.5a3 3 0 1 1 .825 2.066l-8.421 4.679a3.002 3.002 0 0 1 0 1.51l8.421 4.679a3 3 0 1 1-.729 1.31l-8.421-4.678a3 3 0 1 1 0-4.132l8.421-4.679a3 3 0 0 1-.096-.755Z" clipRule="evenodd"
                            />
                        </svg>
                        Chia sẻ
                    </button>
                    {copied && (
                        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 text-gray-400 px-4 py-2 border border-gray-400">
                            Đã sao chép!
                        </div>
                    )}
                </div>

                {/* Product Info */}
                <div className="w-1/2 py-4">
                    <h1 className="text-2xl font-medium">{product.name}</h1>
                    <div className="text-3xl font-semibold bg-gray-50 text-green-700 py-2 my-4 pl-4">
                        <Currency amount={product.price} />
                    </div>

                    <div className="mt-8 space-y-4">
                        {/* shipping */}
                        <div className="grid grid-cols-3 gap-4 items-start">
                            <p className="text-md text-gray-500 row-span-2">Vận chuyển</p>

                            <p className="text-md text-gray-500">Từ</p>
                            <p className="text-md text-colors-black">{product.shipping?.from}</p>

                            <p className="text-md text-gray-500">Đến</p>
                            <p className="text-md text-colors-black">{product.shipping?.to}</p>
                        </div>
                        
                        {/* Shipping cost - stock */}
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <p className="text-md text-gray-500">Phí vận chuyển</p>
                            <p className="text-md text-colors-black">{product.shipping?.cost}</p>
                            <p className="text-md text-gray-500">Số lượng</p>{" "}
                            <p className="text-colors-black">{product.stock}
                                {" "}<span className="text-gray-500">sản phẩm có sẵn</span>
                            </p>
                        </div>
                    </div>

                    {/*Button */}
                    <div className="mt-8 flex space-x-4">
                        <button
                            onClick={() => addToCart(product)}
                            className="flex items-center px-8 bg-green-100 text-green-700 border border-green-700 py-2 rounded-lg hover:bg-opacity-75 focus:outline-none"
                        >
                            Thêm vào giỏ hàng
                        </button>
                        <button
                            onClick={() => buyNow(product)}
                            className="flex items-center px-8 bg-green-700 text-colors-white py-2 rounded-lg hover:bg-opacity-75 focus:outline-none"
                        >
                            Mua ngay
                        </button>
                    </div>
                </div>
            </div>

            {/* Seller */}
            <div className="flex items-center w-full mt-10 bg-colors-white border-y-8 border-gray-100 py-2 px-16">
                <img
                    src={product.user.avatar}
                    alt="Seller Avatar"
                    className="w-16 h-16 rounded-full"
                />
                <div className="ml-4">
                    <p className="text-md font-medium">{product.user?.name}</p>
                    <p className="text-sm text-gray-500">Online {product.user?.lastOnline}</p>
                    <p className="text-md text-gray-500 mt-2">Đánh giá: {product.user?.rating}</p>
                </div>

                {/* Seller Button */}
                <div className="ml-auto flex space-x-2">
                    <button className="px-4 py-2 bg-green-100 text-green-700 border border-green-700 rounded-md hover:bg-opacity-75">
                        Chat ngay
                    </button>
                    <button className="px-4 py-2 bg-gray-200 text-gray-500 border border-gray-500 rounded-md hover:bg-opacity-75">
                        Xem cửa hàng
                    </button>
                </div>
            </div>

            {/* Product detail */}
            <div className="px-16 mt-8">
                <h2 className="text-lg">CHI TIẾT SẢN PHẨM</h2>
                <div className="grid grid-cols-[auto_1fr] mt-8 gap-y-4 gap-x-12 text-gray-400">
                    <p>Danh mục</p><p className="text-colors-black">{product.category}</p>
                    <p>Kho</p><p className="text-colors-black">{product.stock}</p>
                    <p>Nhãn hàng</p><p className="text-colors-black">{product.brand}</p>
                    <p>Tình trạng</p><p className="text-colors-black">{product.condition}</p>
                </div>
            </div>

            {/* Description */}
            <div className="px-16 mt-8 bg-colors-white border-t-8 border-gray-100">
                <h2 className="text-lg mt-8">MÔ TẢ SẢN PHẨM</h2>
                <textarea
                    value={product.description}
                    readOnly
                    className="w-full mt-8 p-4"
                ></textarea>
            </div>
        </div>
    );
};

export default ProductDetail;
