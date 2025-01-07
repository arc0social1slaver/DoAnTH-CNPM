import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import {useAuth} from "../context/AuthContext";
import Swal from "sweetalert2";

const Login = ({ isOpen, closeModal }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const {logInUser} = useAuth();

    if (!isOpen) return null;
    
    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            const userTemp = logInUser(email, password);
            if(userTemp) {
            Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Đăng nhập thành công",
                        showConfirmButton: true,
                        timer: 1500
            });
        }
        } catch (error) {
            Swal.fire({
                        position: "center",
                        icon: "warning",
                        title: "Lỗi đăng nhập",
                        showConfirmButton: true,
                        timer: 1500
            });
        }
        closeModal();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
            <div className="relative bg-colors-white py-6 px-8 rounded-lg text-center w-full max-w-md">
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
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="email" className="block text-left">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-4 py-2 mt-2 border border-colors-gray-400 rounded-lg"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email/ Tên người dùng"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-left">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-4 py-2 mt-2 border border-colors-gray-400 rounded-lg"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Mật khẩu"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-green-100  rounded-lg hover:bg-green-700"
                    >
                        Đăng Nhập
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <Link to="/forgot-password" className="text-blue-700 text-sm hover:underline">
                        Quên mật khẩu?
                    </Link>
                </div>
            </div>
        </div>
    );
}

Login.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
};

export default Login;
