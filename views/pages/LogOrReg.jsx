import { Link } from "react-router-dom";

export default function LoginOrRegister() {
    return (
        <div className="relative min-h-screen flex items-center justify-center">
            <img
                src="https://i.pinimg.com/736x/f3/01/b7/f301b78642349b752d88b318081a6570.jpg"
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="relative z-10 bg-white-100 p-8 rounded-lg shadow-lg text-center w-full max-w-md">
                <div className="flex items-center justify-center mb-4">
                    <h1 className="text-1g font-semibold">Bạn đã có tài khoản?</h1>
                    <a
                        href="/login"
                        className="text-blue-700 text-1x hover:underline ml-2"
                    >
                        Đăng nhập
                    </a>
                </div>
                <div className="flex items-center justify-center gap-4 mb-4">
                    <div className="flex-grow border-t border-gray-700"></div>
                    <p className="text-gray-700 px-1">hoặc</p> 
                    <div className="flex-grow border-t border-gray-700"></div>
                </div>
                <div className="flex flex-col gap-4">
                    <Link
                        to="/register"
                        className="bg-green-100 py-2 px-6 rounded-lg hover:bg-green-700 transition duration-300"
                    >
                        Đăng ký
                    </Link>
                </div>
            </div>
        </div>
    );
}
