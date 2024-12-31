import { useState } from 'react';
import AuthModal from './AuthModal';

const Home = () => {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    return (
        <div className="min-h-screen flex items-center bg-colors-white">
            <div className="flex-1 h-full relative">
                <img
                    src="../../public/logo.png"
                    alt="Logo"
                    className="m-8 object-cover"
                />
            </div>
            <div className="flex-1 flex items-center justify-center mr-6">
                <div className="text-center p-2 space-x-4">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">
                        Chào Mừng Đến Với <span className="text-green-700">ThriftMate</span>!
                    </h1>
                    <p className="text-green-700 text-lg md:text-xl mb-10">
                        &quot;người bạn đồng hành khi bạn muốn tiết kiệm&quot;
                    </p>
                    <p className=" text-lg md:text-xl mb-6">
                        Trao đổi đồ cũ nhưng mới.
                    </p>
                    <button
                        onClick={() => setIsAuthModalOpen(true)}
                        className="inline-block bg-green-100 py-2 px-6 rounded-lg hover:bg-green-700 transition duration-300"
                    >
                        🛒 Mua sắm ngay!
                    </button>
                    <button 
                        onClick={() => setIsAuthModalOpen(true)}
                        className="inline-block bg-green-100 py-2 px-6 rounded-lg hover:bg-green-700 transition duration-300"
                    >
                        📤 Đăng bán ngay!
                    </button>
                    <AuthModal
                        isOpen={isAuthModalOpen}
                        closeModal={() => setIsAuthModalOpen(false)}
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;