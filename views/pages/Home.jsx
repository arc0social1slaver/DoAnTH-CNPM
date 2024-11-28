//import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="min-h-screen flex items-center">
            <div className="flex-1 h-full relative">
                <img
                    src="https://i.pinimg.com/736x/45/22/02/452202d6c6e666c9ad91961ba4c641fd.jpg"
                    alt="Background"
                    className="m-1 object-cover"
                />
            </div>
            <div className="flex-1 flex items-center justify-center">
                <div className="text-center p-8 space-x-4">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">
                        Chào Mừng Đến Với <span className="text-green-700">ThriftMate</span>!
                    </h1>
                    <p className="text-green-700 text-lg md:text-xl mb-10">
                        &quot;người bạn đồng hành khi bạn muốn tiết kiệm&quot;
                    </p>
                    <p className=" text-lg md:text-xl mb-6">
                        Trao đổi đồ cũ nhưng mới.
                    </p>
                    <a
                        href="/login-or-register"
                        className="inline-block bg-green-100 py-2 px-6 rounded-lg hover:bg-green-700 transition duration-300"
                    >
                        🛒 Mua sắm ngay!
                    </a>
                    <a 
                        href="/login-or-register"
                        className="inline-block bg-green-100 py-2 px-6 rounded-lg hover:bg-green- transition duration-300"
                    >
                        📤 Đăng bán ngay!
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Home;