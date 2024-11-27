import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Logging in with:', { email, password });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-6">Đăng Nhập</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-4 py-2 mt-2 rounded-lg"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-4 py-2 mt-2 border rounded-lg"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-green-100 text-black-900 rounded-lg hover:bg-green-700"
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
