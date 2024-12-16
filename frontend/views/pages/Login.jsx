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
                        position: "top-end",
                        icon: "success",
                        title: "User login successfully",
                        showConfirmButton: true,
                        timer: 1500
            });
        }
        } catch (error) {
            Swal.fire({
                        position: "top-end",
                        icon: "warning",
                        title: "Invalid data",
                        showConfirmButton: true,
                        timer: 1500
            });
        }
        closeModal();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
            <div className="bg-colors-white p-6 rounded-lg w-96">
                <h2 className="text-green-700 text-4xl font-semibold text-center mb-4">ThriftMate</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block">Email</label>
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
                        <label htmlFor="password" className="block">Password</label>
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
                    <button
                        type="button"
                        onClick={closeModal}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        Đóng
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
