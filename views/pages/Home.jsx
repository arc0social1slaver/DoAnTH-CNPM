import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="p-4 bg-gray-100 flex items-center justify-center">
            <div className="max-w-7xl mx-auto text-center p-4 bg-white-100 rounded-lg shadow-lg">
                
                <div className="mb-8">
                    <img
                        src="https://i.pinimg.com/736x/e6/4f/68/e64f6844306f3329c24e73b9ae248283.jpg" 
                        alt="Welcome Image"
                        className="w-full h-64 object-cover rounded-lg"
                    />
                </div>

                <h1 className="text-4xl font-bold mb-4">Chào Mừng Đến Với <span className="text-green-700">2Hand</span>!</h1>
                <p className="text-lg mb-6">Cung cấp sản phẩm chất lượng, giá tốt cho bạn</p>

               
                <div className="flex justify-center gap-4">
                    <Link
                        to="/login"
                        className="bg-green-100 py-2 px-6 rounded-lg hover:bg-green-700 transition duration-300"
                    >
                        Đăng Nhập
                    </Link>
                    <Link
                        to="/register"
                        className="bg-green-100 py-2 px-6 rounded-lg hover:bg-green-700 transition duration-300"
                    >
                        Đăng Ký
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;