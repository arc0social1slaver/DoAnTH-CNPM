import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  // State lưu thông tin người dùng
  const [isSearchOpen, setIsSearchOpen] = useState(false); // Quản lý trạng thái mở/đóng khung tìm kiếm

  // Hàm để toggle hiển thị khung tìm kiếm
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };
  
  const [user] = useState({
    avatar: 'https://i.pinimg.com/736x/5b/ad/66/5bad666e821e7f7ecbbb0a8479f022ca.jpg',
  });

  const [cartItems] = useState(0); // Giả sử có 3 sản phẩm trong giỏ hàng
  const [dropdownOpen, setDropdownOpen] = useState(false); // State quản lý dropdown
  const navigate = useNavigate();

  // Hàm xử lý đăng xuất
  const handleLogout = () => {
    console.log('Đăng xuất');
    navigate('/login'); // Chuyển hướng đến trang đăng nhập
  };

  // Toggle dropdown
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen); // Đảo ngược trạng thái dropdown
  };

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-screen-xl mx-auto px-4 py-1 flex justify-between items-center">
        {/* Logo bên trái */}
        <div className="flex items-center space-x-2">
          <img
            src="../../logo.png"
            alt="Logo"
            className="h-14 w-14 ml-10"
          />
        </div>

        {/* Trang chủ, Danh mục sản phẩm */}
        <div className="flex space-x-8 mx-auto">
          <a href="/user" className="font-bold">Trang chủ</a>
          <a href="/categories" className="font-bold">Danh mục sản phẩm</a>
        </div>

        {/* Thông báo, Tìm kiếm, Giỏ hàng, Người dùng */}
        <div className="flex items-center space-x-6">
          {/* Tìm kiếm */}
          <button className="relative text-colors-black hover:text-green-700" onClick={toggleSearch}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </button>
          {isSearchOpen && (
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                className="p-2 border border-colors-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-colors-green-500"
              />
            </div>
          )}

          {/* Thông báo */}
          <button className="relative text-colors-black hover:text-green-700">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
            </svg>
            {cartItems > 0 && (
              <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full px-2 py-1">
                {cartItems}
              </span>
            )}
          </button>

          {/* Giỏ hàng */}
          <button className="relative text-colors-black hover:text-green-700">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
          </button>

          {/* Người dùng */}
          <button className="relative text-colors-black hover:text-green-700" onClick={toggleDropdown}>
            <div className="flex items-center space-x-2">
            <img
              src={user.avatar}
              alt="User Avatar"
              className="w-8 h-8 rounded-full border-2 border-gray-500"
            />
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
            </div>
          </button>
          {/* Dropdown menu */}
          {dropdownOpen && (
            <div className="absolute mt-48 w-48 shadow-lg rounded-lg border border-colors-gray-400 z-10">
              <ul>
                <li className="px-4 py-2 hover:bg-gray-200">
                  <Link to="/user/profile" className="text-gray-700">Thông tin</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-200">
                  <Link to="/user/orders" className="text-gray-700">Lịch sử mua hàng</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-200">
                  <Link to="/user/products" className="text-gray-700">Sản phẩm</Link>
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={handleLogout}
                >
                  Đăng xuất
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
