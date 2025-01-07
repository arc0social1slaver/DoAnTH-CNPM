import { useEffect, useState } from "react";
import axios from "axios";
import getBEURL from "../utils/backendURL";
import Swal from "sweetalert2";

const UserProfile = () => {
    // Placeholder user data
    if(!sessionStorage.getItem('user')) return null;
    const [loading , setLoading] = useState(true);
    const [user, setUser] = useState({});
    const [fieldFile, setFieldFile] = useState();

    useEffect(() => {
        const getProfile = async () => {
            const user_id = JSON.parse(sessionStorage.getItem('user'))._id;
            try {
                const response = await axios.get(`${getBEURL()}/api/users/profile/${user_id}`)
                setUser(response.data.profile)
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        }
        getProfile()
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
        ...prevUser,
        [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
        setFieldFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setUser(prev => ({
            ...prev,
            avatar: reader.result
            }));
        };
        reader.readAsDataURL(file);
        }
    };

    const handleSave = async () => {
        // Save user information logic here
        const user_id = JSON.parse(sessionStorage.getItem('user'))._id;
        // console.log("User information saved:", user);
        const formData = new FormData()
        formData.append('file', fieldFile)
        formData.append('user', JSON.stringify(user))
        try {
            await axios.post(`${getBEURL()}/api/users/profile/edit/${user_id}`, formData)
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Cập nhật hồ sơ thành công",
                showConfirmButton: true,
                timer: 1500
            });
            
        } catch (error) {
            console.log(error);
             Swal.fire({
                position: "center",
                icon: "error",
                title: "Lỗi cập nhật hồ sơ",
                showConfirmButton: true,
                timer: 1500
            });
        }
    };
    if(loading) return <div>Loading</div>
    return (
        <div className="relative min-h-screen py-4">
            <div className="bg-green-100 p-4 text-2xl font-bold text-left text-green-700">
                <span className='ml-8'>ThriftMate</span> <span className='text-3xl font-light'>|</span>
                <span className='font-medium ml-4'>Hồ sơ của tôi</span>
            </div>
        <div className="flex justify-between items-start bg-colors-white border shadow rounded-lg p-6 m-8">
            <div className="w-2/3">
            <div className="mb-4">
                <label className="block font-semibold mb-1">Tên đăng nhập:</label>
                <input
                type="text"
                name="username"
                value={user.username}
                onChange={handleChange}
                className="w-full border border-gray-400 rounded p-2"
                />
            </div>
            <div className="mb-4">
                <label className="block font-semibold mb-1">Tên:</label>
                <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
                className="w-full border border-gray-400 rounded p-2"
                />
            </div>
            <div className="mb-4">
                <label className="block font-semibold mb-1">Giới tính:</label>
                <input
                type="text"
                name="sex"
                value={user.sex}
                onChange={handleChange}
                className="w-full border border-gray-400 rounded p-2"
                />
            </div>
            <div className="mb-4">
                <label className="block font-semibold mb-1">Ngày sinh:</label>
                <input
                type="date"
                name="dob"
                value={user.dob}
                onChange={handleChange}
                className="w-full border border-gray-400 rounded p-2"
                />
            </div>
            <div className="mb-4">
                <label className="block font-semibold mb-1">Số điện thoại:</label>
                <input
                type="text"
                name="phone"
                value={user.phone}
                onChange={handleChange}
                className="w-full border border-gray-400 rounded p-2"
                />
            </div>
            <div className="mb-4">
                <label className="block font-semibold mb-1">Email:</label>
    <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="w-full border border-gray-400 rounded p-2"
                />
            </div>
            <div className="flex justify-center mt-6 mb-4">
                <button
                onClick={handleSave}
                className="w-1/3 bg-green-700 text-colors-white hover:bg-opacity-75 font-bold py-3 px-6 rounded-lg transition duration-200 ease-in-out transform hover:scale-105"
                >
                Lưu thông tin
                </button>
            </div>
            </div>
            <div className="w-1/3 text-center">
            <div className="relative border-4 border-blue-200 rounded-full p-1 w-40 h-40 mx-auto mb-4 group">
                <img
                src={user?.avatar && !fieldFile ? `${getBEURL()}/images/${user.avatar}` : fieldFile && user?.avatar ? user.avatar : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
                alt="User Avatar"
                className="rounded-full w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <label className="cursor-pointer bg-black bg-opacity-50 text-white p-2 rounded-full">
                    <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    />
                    Đổi ảnh
                </label>
                </div>
            </div>
            <p className="font-semibold text-lg text-gray-700">{user.name}</p>
            </div>
        </div>
        </div>
    );
};

export default UserProfile;