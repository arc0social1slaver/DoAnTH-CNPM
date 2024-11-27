import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="p-4 bg-gray-100 flex items-center justify-center">
            <div className="max-w-7xl mx-auto text-center p-4 bg-white rounded-lg shadow-lg">
                
                <div className="mb-8">
                    <img
                        src="https://i.pinimg.com/736x/e6/4f/68/e64f6844306f3329c24e73b9ae248283.jpg" 
                        alt="Welcome Image"
                        className="w-full h-64 object-cover rounded-lg"
                    />
                </div>

                <h1 className="text-4xl font-bold text-gray-800 mb-4">Chào Mừng Đến Với 2Hand!</h1>
                <p className="text-lg text-gray-600 mb-6">Cung cấp sản phẩm chất lượng, giá tốt cho bạn</p>

               
                <div className="flex justify-center gap-4">
                    <Link
                        to="/login"
                        className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        Đăng Nhập
                    </Link>
                    <Link
                        to="/register"
                        className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition duration-300"
                    >
                        Đăng Ký
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;