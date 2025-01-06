import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import getBEURL from "../utils/backendURL";
import { useFetchMyStoreProductsQuery } from '../redux/feature/prodAPI';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/feature/cartSlice';

const ViewShop = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const handleAddProd = (product) => {
        dispatch(addToCart(product))
    }
    const { data: {products = []} = [], isLoading } = useFetchMyStoreProductsQuery(userId);
    const [shopOwner, setShopOwner] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await fetch(`${getBEURL()}/api/users/profile/${userId}`);
                if (!response.ok) throw new Error('Không tìm thấy người dùng');
                const data = await response.json();
                setShopOwner(data.profile);
            } catch (err) {
                console.error('Error fetching user:', err);
                setError(err.message);
            }
        };
        fetchUserInfo();
    }, [userId]);

    if (isLoading || !shopOwner) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    // Handle chat button click
    const handleChatClick = () => {
        const chatEvent = new CustomEvent('openChat', { 
            detail: { userId: shopOwner._id } 
        });
        window.dispatchEvent(chatEvent);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Shop Owner Info */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <img
                            src={`${getBEURL()}/images/${shopOwner?.avatar}`}
                            alt={shopOwner?.username}
                            className="w-20 h-20 rounded-full object-cover"
                        />
                        <div>
                            <h1 className="text-2xl font-bold">{shopOwner?.username}</h1>
                            <div className="flex items-center mt-2">
                                <span className={`w-3 h-3 rounded-full ${shopOwner?.isActive ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                                <span className="ml-2 text-gray-600">
                                    {shopOwner?.isActive ? 'Online' : 'Offline'}
                                </span>
                            </div>
                        </div>
                    </div>
                    <button 
                        onClick={handleChatClick}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-600"
                    >
                        <ChatBubbleLeftIcon className="w-5 h-5" />
                        <span>Chat ngay</span>
                    </button>
                </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <img
                            src={`${getBEURL()}/images/${product.image}`}
                            alt={product.name}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4 flex flex-col items-center">
                            <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                            <p className="text-green-600 font-bold">
                                {product.price?.toLocaleString('vi-VN')}đ
                            </p>
                            <button
                                onClick={() => handleAddProd(product)}
                                className="w-full py-2 bg-green-700 text-white font-semibold text-sm rounded-md mt-auto hover:bg-green-800 transition-colors"
                            >
                                Thêm vào giỏ hàng
                            </button>
                            <Link
                                to={`/user/product/${product._id}`} 
                                className="text-green-700 font-semibold mt-2 hover:underline"
                            >
                                Chi tiết sản phẩm
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ViewShop;