import Card from "./Card";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from "react";
import Modal from "./Modal";
import axios from "axios";

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import getBEURL from "../../utils/backendURL";
import Swal from "sweetalert2";

const AdminUsers = () => {
    const [selectedValue, setSelectedValue] = useState("option1");
    const [searchValue, setSearchVal] = useState("");
    const [currentPage, setCurrentPage] = useState(1); // Track current page
    const cardsPerPage = 6;

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
        console.log("Selected Value:", event.target.value);
    };

    // Lấy từ database - Sample data
    // const [users, setUsers] = useState([
    //     { id: 1, avt: "https://via.placeholder.com/150", name: "User 1", isActive: true, email: "user1@example.com" },
    //     { id: 2, avt: "https://via.placeholder.com/150", name: "User 2", isActive: false, email: "user2@example.com" },
    //     { id: 3, avt: "https://via.placeholder.com/150", name: "User 3", isActive: true, email: "user3@example.com" },
    //     { id: 4, avt: "https://via.placeholder.com/150", name: "User 4", isActive: false, email: "user4@example.com" },
    //     { id: 5, avt: "https://via.placeholder.com/150", name: "User 5", isActive: true, email: "user5@example.com" },
    //     { id: 6, avt: "https://via.placeholder.com/150", name: "User 6", isActive: false, email: "user6@example.com" },
    //     { id: 7, avt: "https://via.placeholder.com/150", name: "User 7", isActive: true, email: "user7@example.com" },
    //     { id: 8, avt: "https://via.placeholder.com/150", name: "User 8", isActive: false, email: "user8@example.com" },
    //     { id: 9, avt: "https://via.placeholder.com/150", name: "User 9", isActive: true, email: "user9@example.com" },
    //     { id: 10, avt: "https://via.placeholder.com/150", name: "User 10", isActive: false, email: "user10@example.com" },
    //   ]);
    const fetchData = async () => {
        const admin_id = JSON.parse(sessionStorage.getItem('user'))._id;
        try {
            const response = await axios.get(`${getBEURL()}/api/users/norm-user/${admin_id}`, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            setUsers(response.data.users);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {

        fetchData();
    }, []);

    // Filter options get from category name
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
    const handleSearch = async (event) => {
        setSearchVal(event.target.value)
        if(event.target.value === '') {
            fetchData();
        }
    }

    const handleDeleteConfirm = async () => {
        // Filter out the user from the list
        // console.log("User to delete:", selectedUser);
        // setUsers(users.filter((user) => user.id !== selectedUser.id));
        await axios.delete(`${getBEURL()}/api/users/${selectedUser._id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
                    .then((response) => {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Xóa người dùng thành công",
                            showConfirmButton: true,
                            timer: 1500
                        });
                    })
                    .catch((error) => {
                        console.log(error);
                        if(error.response.status === 404) {
                            Swal.fire({
                                position: "top-end",
                                icon: "warning",
                                title: "Admin không thể xóa",
                                showConfirmButton: true,
                                timer: 1500
                            });
                        }
                        else {
                            Swal.fire({
                                position: "top-end",
                                icon: "error",
                                title: "Lỗi xóa người dùng",
                                showConfirmButton: true,
                                timer: 1500
                            });
                        }
                    })
        fetchData();
        setIsModalOpen(false);
        // document.location.reload();
    };

    useEffect(() => {
        const fetchData_search = async () => {
            const admin_id = JSON.parse(sessionStorage.getItem('user'))._id;
            try {
                const response = await axios.get(`${getBEURL()}/api/users/search/${admin_id}/${searchValue}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': "application/json",
                    }
                })
                setUsers(response.data.users)
            } catch (error) {
                console.log(error);
                fetchData();
            }
        }
        if(users.length !== 0) {
            if(searchValue !== '') {
                fetchData_search()
            }
        }
    }, [searchValue])
    const handleModalClose = () => {
        setIsModalOpen(false);
    };
    if(loading) return <div>Loading</div>
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
                            value={searchValue}
                            onChange={handleSearch}
                            placeholder="Search"
                            className="bg-colors-white py-3 px-4 rounded-xl w-full my-1 h-3/4 shadow-md focus:outline-none focus:border-none focus:shadow-none"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                        <button type='button' className="text-xl">
                            <FontAwesomeIcon icon={faMagnifyingGlass} className='text-colors-green-900 hover:text-colors-green-600 transition'/> {/* Use the icon here */}
                        </button>
                    </div>
                </div>

                {/* Render filtered cards */}
                {currentUsers.map((user) => (
                <Card 
                    key={user._id}
                    isActive={user.isActive}
                    avt={user?.avt}
                    name={user.username}
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
                    <select
                        value={currentPage}
                        onChange={(e) => setCurrentPage(Number(e.target.value))}
                        className="px-2 py-1 border rounded-md focus:outline-none bg-colors-inherit border-none"
                    >
                        {Array.from({ length: totalPages }, (_, index) => (
                        <option key={index + 1} value={index + 1}>
                            Page {index + 1}
                        </option>
                        ))}
                    </select>
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
                userName={selectedUser ? selectedUser.username : ""}
            />
        </div>
    );
}

export default AdminUsers;
