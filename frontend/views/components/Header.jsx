const Header = () => {
  return (
    <header className="flex items-center justify-between py-2 px-8 shadow-lg">
        <a 
            href="/"
            className="text-green-700 text-2xl font-bold"
        >
            ThriftMate
        </a>
        <div className="ml-auto flex items-center space-x-4">
            <select
                className="text-colors-gray-500 border border-colors-gray-400 rounded-lg py-2 px-4"
                defaultValue="vi"
                onChange={(e) => console.log('Ngôn ngữ chọn:', e.target.value)}
            >
                <option value="vi">Tiếng Việt</option>
                <option value="en">English</option>
            </select>
                <a
                    href="/register"
                    className="text-colors-gray-500 hover:text-green-700 transition"
                >
                    Đăng ký
                </a>
                <span className="text-colors-gray-500">|</span>
                <a
                    href="/login"
                    className="text-colors-gray-500 hover:text-green-700 transition"
                >
                    Đăng nhập
                </a>
            </div>
    </header>
  );
}

export default Header;
