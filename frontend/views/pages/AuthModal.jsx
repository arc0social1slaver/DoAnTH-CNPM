import { useState } from 'react';
import PropTypes from 'prop-types';

import Login from './Login';
import Register from './Register';


const AuthModal = ({ isOpen, closeModal }) => {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

    const openLoginModal = () => setIsLoginModalOpen(true);
    const closeLoginModal = () => setIsLoginModalOpen(false);
    const openRegisterModal = () => setIsRegisterModalOpen(true);
    const closeRegisterModal = () => setIsRegisterModalOpen(false);


    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
            <div className="relative bg-colors-white p-6 rounded-lg text-center w-full max-w-sm">
                <button
                    onClick={closeModal}
                    className="absolute text-gray-500 hover:text-gray-700 right-0 mr-6"
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        strokeWidth={1.5} 
                        stroke="currentColor" 
                        className="size-6"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            d="M6 18 18 6M6 6l12 12" 
                        />
                    </svg>
                </button>
                <h2 className="text-green-700 text-4xl font-semibold text-center mb-8">ThriftMate</h2>
                <div className="flex items-center justify-center mb-4">
                    <h1 className="text-md font-semibold">Bạn đã có tài khoản?</h1>
                    <button
                        onClick={openLoginModal}
                        className="text-blue-700 px-2 hover:underline"
                    >
                        Đăng nhập
                    </button>
                </div>
                <Login isOpen={isLoginModalOpen} closeModal={closeLoginModal} />
                <div className="flex items-center justify-center gap-4 mb-4">
                    <div className="flex-grow border-t border-gray-400"></div>
                    <p className="text-gray-500 px-2">hoặc</p>
                    <div className="flex-grow border-t border-gray-400"></div>
                </div>
                <button
                    onClick={openRegisterModal}
                    className="bg-green-100 text-colors-black py-2 w-full rounded-lg hover:bg-green-700"
                >
                    Đăng ký
                </button>
                <Register isOpen={isRegisterModalOpen} closeModal={closeRegisterModal} />
            </div>
        </div>
    );
}

AuthModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
};

export default AuthModal;
