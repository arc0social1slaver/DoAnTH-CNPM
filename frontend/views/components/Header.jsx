import { useState } from "react";
import Login from "../pages/Login";

const Header = () => {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    const openLoginModal = () => setIsLoginModalOpen(true);
    const closeLoginModal = () => setIsLoginModalOpen(false);

    return (
        <header className="sticky top-0 z-10 flex items-center justify-between bg-green-700 py-2 px-8">
            <a 
                href="/"
                className="text-colors-white text-2xl font-bold"
            >
                ThriftMate
            </a>
            <div className="ml-auto flex items-center space-x-4">
                <select
                    className="rounded-lg py-2 px-4"
                    defaultValue="vi"
                    onChange={(e) => console.log('Ngôn ngữ chọn:', e.target.value)}
                >
                    <option value="vi">Tiếng Việt</option>
                    <option value="en">English</option>
                </select>
                    <a
                        href="/register"
                        className="hover:text-colors-white transition"
                    >
                        Đăng ký
                    </a>
                    <span>|</span>
                    <button
                        className="hover:text-colors-white transition"
                        onClick={openLoginModal}
                    >
                        Đăng nhập
                    </button>
                    <Login isOpen={isLoginModalOpen} closeModal={closeLoginModal} />
                </div>
        </header>
    );
}

export default Header;
