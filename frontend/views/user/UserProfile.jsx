import { useState } from "react";

const UserProfile = () => {
    // Placeholder user data
    const [user, setUser] = useState({
        username: "johndoe",
        name: "John Doe",
        sex: "Nam",
        dob: "1990-01-01",
        phone: "123-456-7890",
        email: "john.doe@example.com",
        avatar: "https://via.placeholder.com/150"
    });

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

    const handleSave = () => {
        // Save user information logic here
        console.log("User information saved:", user);
    };

    return (
        <div className="container mx-auto p-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-green-700">Hồ sơ của tôi</h2>
        
        <div className="flex justify-between items-start bg-white shadow-md rounded-lg p-6 mb-6">
            <div className="w-2/3">
            <div className="mb-4">
                <label className="block font-semibold mb-1">Tên đăng nhập:</label>
                <input
                type="text"
                name="username"
                value={user.username}
                onChange={handleChange}
                className="w-full border rounded p-2"
                />
            </div>
            <div className="mb-4">
                <label className="block font-semibold mb-1">Tên:</label>
                <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
                className="w-full border rounded p-2"
                />
            </div>
            <div className="mb-4">
                <label className="block font-semibold mb-1">Giới tính:</label>
                <input
                type="text"
                name="sex"
                value={user.sex}
                onChange={handleChange}
                className="w-full border rounded p-2"
                />
            </div>
            <div className="mb-4">
                <label className="block font-semibold mb-1">Ngày sinh:</label>
                <input
                type="date"
                name="dob"
                value={user.dob}
                onChange={handleChange}
                className="w-full border rounded p-2"
                />
            </div>
            <div className="mb-4">
                <label className="block font-semibold mb-1">Số điện thoại:</label>
                <input
                type="text"
                name="phone"
                value={user.phone}
                onChange={handleChange}
                className="w-full border rounded p-2"
                />
            </div>
            <div className="mb-4">
                <label className="block font-semibold mb-1">Email:</label>
    <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="w-full border rounded p-2"
                />
            </div>
            <div className="flex justify-center mt-6 mb-4">
                <button
                onClick={handleSave}
                className="w-1/3 bg-green-100 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200 ease-in-out transform hover:scale-105"
                >
                Lưu thông tin
                </button>
            </div>
            </div>
            <div className="w-1/3 text-center">
            <div className="relative border-4 border-blue-200 rounded-full p-1 w-40 h-40 mx-auto mb-4 group">
                <img
                src={user.avatar || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
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