import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [username, setUserName] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Mật khẩu không khớp!');
            return;
        } else {
            setError('');
        }
        console.log('Registering with:', { email, password, username });
        setShowPopup(true);
        setTimeout(() => {
            setShowPopup(false);
            navigate('/login');
        }, 2000);
    };
    const handleConfirmPasswordChange = (e) => {
        const value = e.target.value;
        setConfirmPassword(value);
        if (value !== password) {
        setError("Mật khẩu không khớp!");
        } else {
        setError("");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-md w-full bg-white-100 p-8 rounded-lg shadow-lg">
                <h2 className="text-green-700 text-4xl font-semibold text-center mb-4">ThriftMate</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="email" className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-4 py-2 mt-1 border border-colors-gray-400 rounded-lg"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700">Mật khẩu</label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-4 py-2 mt-1 border border-colors-gray-400 rounded-lg"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="relative mb-6">
                        <label htmlFor="confirm-password" className="block text-gray-700">Nhập lại mật khẩu</label>
                        <input
                            type="password"
                            id="confirm-password"
                            className="w-full px-4 py-2 mt-1 border border-colors-gray-400 rounded-lg"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            required
                        />
                        {error && 
                        <div className="flex items-center absolute text-colors-red-600 text-sm right-0 mt-1">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                strokeWidth={1.5} 
                                stroke="currentColor" 
                                className="size-4 mr-1">
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                                />
                            </svg>
                            {error}
                        </div>}
                    </div>
                    <div className="mb-10">
                        <label htmlFor="password" className="block text-gray-700">Tên người dùng</label>
                        <input
                            type="text"
                            id="user-name"
                            className="w-full px-4 py-2 mt-1 border border-colors-gray-400 rounded-lg"
                            value={username}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                        />
                    </div>
                    <h3 className='text-colors-gray-400 text-sm mb-4'>Bằng cách đăng ký, bạn đồng ý với{" "}
                        <Link 
                            to="/terms"
                            className='text-blue-700 hover:underline'
                        >
                            Điều khoản
                        </Link>
                        ,{" "} 
                        <Link 
                            to="/privacy-policy"
                            className='text-blue-700 hover:underline'
                        >
                            Chính sách quyền riêng tư
                        </Link> 
                        {" "}và{" "} 
                        <Link
                            to="/cookie-policy" 
                            className='text-blue-700 hover:underline'
                        >
                            Chính sách cookie
                        </Link> 
                        {" "}của chúng tôi.
                    </h3>
        
                    <button
                        type="submit"
                        className="w-full py-2 bg-green-100 text-black-900 rounded-lg hover:bg-green-700"
                    >
                        Đăng ký
                    </button>
                </form>
                {showPopup && (
                    <div className="fixed top-10 right-10 bg-colors-green-400 text-colors-white px-6 py-4 z-10">
                        <p>Đăng ký thành công!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
