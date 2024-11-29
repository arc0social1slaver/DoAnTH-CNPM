import { useState } from 'react';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUserName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Registering with:', { email, password });
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
                    <div className="mb-10">
                        <label htmlFor="password" className="block text-gray-700">Tên người dùng</label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-4 py-2 mt-1 border border-colors-gray-400 rounded-lg"
                            value={username}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                        />
                    </div>
                    <h3 className='text-colors-gray-400 text-sm mb-4'>Bằng cách đăng ký, bạn đồng ý với <span 
                        className='text-blue-700 hover:underline'>Điều khoản
                        </span>, <span 
                        className='text-blue-700 hover:underline'>Chính sách quyền riêng tư
                        </span> và <span className='text-blue-700 hover:underline'>Chính sách cookie</span> của chúng tôi.
                    </h3>
                    <button
                        type="submit"
                        className="w-full py-2 bg-green-100 text-black-900 rounded-lg hover:bg-green-700"
                    >
                        Đăng ký
                    </button>
                </form>
            </div>
        </div>
    );
}
