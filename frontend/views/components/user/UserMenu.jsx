import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {useAuth} from "../../context/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";
import getBEURL from '../../utils/backendURL';

const UserMenu = () => {
    if(!sessionStorage.getItem('user')) return null;
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState({
        avatar: 'https://i.pinimg.com/736x/5b/ad/66/5bad666e821e7f7ecbbb0a8479f022ca.jpg',
    });
    useEffect(() => {
      const fetchAvatar = async () => {
        const user_id = JSON.parse(sessionStorage.getItem('user'))?._id;
        try {
          const response = await axios.get(`${getBEURL()}/api/users/profile/${user_id}`)
          if(response.data.profile?.avatar) {
            setUser({
              avatar: `${getBEURL()}/images/${response.data.profile?.avatar}`
            })
            
          }
          else {
            setUser({
              avatar: 'https://i.pinimg.com/736x/5b/ad/66/5bad666e821e7f7ecbbb0a8479f022ca.jpg',
            })
          }
          setLoading(false);
        } catch (error) {
          console.log(error);
          setUser({
            avatar: 'https://i.pinimg.com/736x/5b/ad/66/5bad666e821e7f7ecbbb0a8479f022ca.jpg',
          })
          setLoading(false);
        }
      }
      fetchAvatar()
    }, [])
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const {logOutUser} = useAuth();
    
    //logout
    const handleLogout = () => {
      try {
        logOutUser();
      navigate('/'); 
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Đăng xuất thành công",
          showConfirmButton: true,
          timer: 1500
        });
      } catch (error) {
        Swal.fire({
          position: "center",
          icon: "warning",
          title: "Lỗi đăng xuất",
          showConfirmButton: true,
          timer: 1500
        });
      }
    };

    // Toggle dropdown
    const toggleDropdown = () => {
        setDropdownOpen((prevState) => !prevState);
    };
    
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    if (loading) return <div>Loading</div>
    return (
        <div>
            <button 
              className="group relative " 
              onClick={toggleDropdown}
            >
              <div className="flex items-center space-x-2">
                <img
                  src={user.avatar}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full border-2 border-colors-black group-hover:border-green-700"
                />
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  strokeWidth={2} 
                  stroke="currentColor" 
                  className="size-4 group-hover:text-green-700"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </div>
            </button>
          {/* Dropdown menu */}
          {dropdownOpen && (
            <div 
                ref={dropdownRef}
                className="absolute right-0 top-full mt-2 w-48 bg-colors-white shadow-lg rounded-lg border border-green-700 z-10"
            >
              <ul>
                <li className="px-4 py-2 hover:bg-green-100">
                  <Link to="/user/profile" className="text-colors-gray-600">Thông tin</Link>
                </li>
                <li className="px-4 py-2 hover:bg-green-100">
                  <Link to="/user/order" className="text-colors-gray-600">Lịch sử mua hàng</Link>
                </li>
                <li className="px-4 py-2 hover:bg-green-100">
                  <Link to="/user/product" className="text-colors-gray-600">Cửa hàng của tôi</Link>
                </li>
                <li className="px-4 py-2 hover:bg-green-100">
                  <Link to="/user/sale" className="text-colors-gray-600">Quản lý đơn hàng</Link>
                </li>
                <li
                  className="px-4 py-2 text-colors-gray-600 hover:bg-green-100 cursor-pointer"
                  onClick={handleLogout}
                >
                  Đăng xuất
                </li>
              </ul>
            </div>
          )}
        </div>
    );
};

export default UserMenu;