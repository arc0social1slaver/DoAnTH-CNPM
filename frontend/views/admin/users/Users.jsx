import Card from "./Card";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from "react";
import { IconButton, InputBase } from '@mui/material';
import Modal from "./Modal";

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const AdminUsers = () => {
    const [selectedValue, setSelectedValue] = useState("option1");
    const [currentPage, setCurrentPage] = useState(1); // Track current page
    const cardsPerPage = 6;

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
        console.log("Selected Value:", event.target.value);
    };

    // Lấy từ database
    const [users, setUsers] = useState([
        { id: 1, name: "User 1", isActive: true, email: "user1@example.com" },
        { id: 2, name: "User 2", isActive: false, email: "user2@example.com" },
        { id: 3, name: "User 3", isActive: true, email: "user3@example.com" },
        { id: 4, name: "User 4", isActive: false, email: "user4@example.com" },
        { id: 5, name: "User 5", isActive: true, email: "user5@example.com" },
        { id: 6, name: "User 6", isActive: false, email: "user6@example.com" },
        { id: 7, name: "User 7", isActive: true, email: "user7@example.com" },
        { id: 8, name: "User 8", isActive: false, email: "user8@example.com" },
        { id: 9, name: "User 9", isActive: true, email: "user9@example.com" },
        { id: 10, name: "User 10", isActive: false, email: "user10@example.com" },
      ]);

    const filteredUsers =
    selectedValue === "option1"
        ? users // Show all users
        : users.filter((user) => (selectedValue === "option2" ? user.isActive : !user.isActive));

    // Logic for pagination
    const totalPages = Math.ceil(filteredUsers.length / cardsPerPage);
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstCard, indexOfLastCard);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleDeleteClick = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleDeleteConfirm = () => {
        // Filter out the user from the list
        console.log("User to delete:", selectedUser);
        setUsers(users.filter((user) => user.id !== selectedUser.id));
        setIsModalOpen(false);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="bg-white h-screen overflow-y-scroll">
            <h1 className="p-5 m-5 text-4xl font-bold text-colors-green-700">Người dùng</h1>

            <div className="p-5 m-5 bg-green-100 rounded-md">
                <div className="m-3 flex items-center">
                    <div className="w-1/3">
                        <span className="mr-2">Trạng thái</span>
                        <select
                            id="dropdown"
                            value={selectedValue}
                            onChange={handleChange}
                            className="rounded-lg border py-2 px-4"
                        >
                            <option value="option1">Tất cả</option>
                            <option value="option2">Đang hoạt động</option>
                            <option value="option3">Không hoạt động</option>
                        </select>
                    </div>
                    <div className="flex items-center p-1 w-2/3 gap-4">
                        {/* Search input */}
                        <input
                            type="search"
                            placeholder="Search"
                            className="bg-colors-white py-3 px-4 rounded-xl w-full my-1 h-3/4 shadow-md focus:outline-none focus:border-none focus:shadow-none"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                        <button type='submit' className="text-xl">
                            <FontAwesomeIcon icon={faMagnifyingGlass} className='text-colors-green-900 hover:text-colors-green-600 transition'/> {/* Use the icon here */}
                        </button>
                    </div>
                </div>

                {/* Render filtered cards */}
                {currentUsers.map((user) => (
                <Card 
                    key={user.id}
                    isActive={user.isActive}
                    name={user.name}
                    email={user.email}
                    onDelete={() => handleDeleteClick(user)}
                />
                ))}

                {/* Pagination Controls */}
                <div className="flex justify-center mt-4 items-center space-x-2">
                    <button
                        onClick={() => setCurrentPage(1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 transition hover:text-colors-green-600 cursor-pointer text-white rounded-l-md"
                    >
                        <KeyboardDoubleArrowLeftIcon />
                    </button>
                    <button
                        onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 transition hover:text-colors-green-600 cursor-pointer text-white rounded-l-md"
                    >
                        <NavigateBeforeIcon />
                    </button>
                    <span className="px-4 py-2">{`${currentPage} / ${totalPages}`}</span>
                    <button
                        onClick={() => setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 transition hover:text-colors-green-600 cursor-pointer text-white rounded-r-md"
                    >
                        <NavigateNextIcon />
                    </button>
                    <button
                        onClick={() => setCurrentPage(totalPages)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 transition hover:text-colors-green-600 cursor-pointer text-white rounded-r-md"
                    >
                        <KeyboardDoubleArrowRightIcon />
                    </button>
                </div>
            </div>
            <Modal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                onConfirm={handleDeleteConfirm}
                userName={selectedUser ? selectedUser.name : ""}
            />
        </div>
    );
}

export default AdminUsers;
