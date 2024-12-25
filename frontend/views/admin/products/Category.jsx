import CategoryCard from "./CategoryCards";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useEffect } from "react";
import Modal from "./Modal";
import CategoryForm from "./CategoryForm";
import Swal from "sweetalert2";

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useAddCatMutation, useDeleteCatMutation, useFetchAllCatsQuery, useUpdateCatMutation } from "../../redux/feature/catAPI";

const Category = () => {
    const [selectedValue, setSelectedValue] = useState("option1");
    const [currentPage, setCurrentPage] = useState(1); // Track current page
    const cardsPerPage = 8;
    const [addCat, {}] = useAddCatMutation();
    const [updateCat, {}] = useUpdateCatMutation();
    const [deleteCat, {}] = useDeleteCatMutation();
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };


    // Lấy từ database
    // const [categories, setCategories] = useState([
    //     { id: 1, name: "Category 1", date: "" },
    //     { id: 2, name: "Category 2", date: "" },
    //     { id: 3, name: "Category 3", date: "" },
    //     { id: 4, name: "Category 4", date: "" },
    //     { id: 5, name: "Category 5", date: "" },
    //     { id: 6, name: "Category 6", date: "" },
    //     { id: 7, name: "Category 7", date: "" },
    //     { id: 8, name: "Category 8", date: "" },
    //     { id: 9, name: "Category 9", date: "" },
    //     { id: 10, name: "Category 10", date: "" },
    //   ]);
    const {data : {cats = []} = {}} = useFetchAllCatsQuery();

    // Lấy từ database (category)
    const filteredCategories =
    selectedValue === "option1"
        ? cats // Show all categories
        : cats.filter((category) => (selectedValue === "option2" ? category.isActive : !category.isActive));

    // Logic for pagination
    const totalPages = Math.ceil(filteredCategories.length / cardsPerPage);
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCategories = filteredCategories.slice(indexOfFirstCard, indexOfLastCard);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [fieldCategory, setFieldCategory] = useState('');

    const handleDeleteClick = (category) => {
        setSelectedCategory(category);
        setIsModalOpen(true);
    };

    const handleDeleteConfirm = async () => {
        // console.log("category to delete:", selectedCategory);
        // setCategories(categories.filter((category) => category.id !== selectedCategory.id));
        const id = selectedCategory._id;
        try {
            await deleteCat(id).unwrap();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Xóa danh mục thành công",
                    showConfirmButton: true,
                    timer: 1500
                });
        } catch (err) {
            // console.log(err);
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Lỗi xóa danh mục",
                showConfirmButton: true,
                timer: 1500
            });
        }
        setIsModalOpen(false);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    // Form Logic
    const [isFormOpen, setIsFormOpen] = useState(false); 
    const handleModifyClick = (category) => {
        setSelectedCategory(category);
        setFieldCategory(category.name);
        setIsFormOpen(true);
    };

    const handleAddCategoryClick = () => {
        setSelectedCategory(null); 
        setIsFormOpen(true);
    };

    const handleFormClose = () => {
        setIsFormOpen(false); // Close the form
    };

    const handleFormConfirm = async () => {
        if(fieldCategory == '') {
            Swal.fire({
                position: "top-end",
                icon: "warning",
                title: "Danh mục sản phẩm không được để trống",
                showConfirmButton: true,
                timer: 1500
            });
        }
        else {
            const newCat = {
                name: fieldCategory
            };
            if (selectedCategory) {
                // console.log(`Modifying category with ID: ${selectedCategory._id}`);
                // Modify logic
                const id = selectedCategory._id;
                try {
                    await updateCat({id, ...newCat}).unwrap();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Chỉnh sửa danh mục thành công",
                        showConfirmButton: true,
                        timer: 1500
                    });
                } catch (err) {
                    // console.log(err);
                    if(err.status == 404) {
                        Swal.fire({
                        position: "top-end",
                        icon: "warning",
                        title: "Danh mục không tồn tại",
                        showConfirmButton: true,
                        timer: 1500
                    });
                    }
                    else {
                        Swal.fire({
                        position: "top-end",
                        icon: "error",
                        title: "Lỗi chỉnh sửa danh mục",
                        showConfirmButton: true,
                        timer: 1500
                        });
                    }
                }
            }
            else {
                // Add logic
                // console.log("Dang them danh muc", fieldCategory);
                try {
                    await addCat(newCat).unwrap();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Thêm danh mục thành công",
                        showConfirmButton: true,
                        timer: 1500
                    });
                } catch (err) {
                    // console.log(err);
                    if(err.status == 400) {
                        Swal.fire({
                        position: "top-end",
                        icon: "warning",
                        title: "Danh mục đã tồn tại",
                        showConfirmButton: true,
                        timer: 1500
                    });
                    }
                    else {
                        Swal.fire({
                        position: "top-end",
                        icon: "error",
                        title: "Lỗi thêm danh mục",
                        showConfirmButton: true,
                        timer: 1500
                        });
                    }
                }
            }
        }
        setIsFormOpen(false); // Close the form after confirming
        setFieldCategory('');
    };


    return (
        <>
            <div className="p-5 mx-5 mb-5 bg-green-100 rounded-md">
                <div className="m-3 flex items-center flex-col md:flex-row">
                    <div className="w-full md:w-1/3 flex items-center">
                        <div className="transition hover:text-green-900 cursor-pointer mr-2">
                            <FilterListIcon />
                            <span>A-Z</span>
                        </div>
                        <span className="mr-2 hidden md:inline-block">Danh mục</span>
                        {/* Lấy từ database tất cả các category*/}
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
                    <div className="flex items-center p-1 w-full md:w-1/3 gap-4">
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
                    <div className="w-full md:w-1/3 transition-all hover:text-green-900 cursor-pointer ml-4 flex items-center justify-center gap-2" onClick={handleAddCategoryClick}>
                        <AddCircleIcon />
                        <span>Thêm danh mục</span>
                    </div>
                </div>
                <div className="flex flex-col gap-1 justify-center mx-6">
                    {currentCategories.map((category) => (
                        <div key={category._id} className="">
                            <CategoryCard 
                                name={category.name}
                                date={new Date(category.createdAt).toUTCString()}
                                onDelete={() => handleDeleteClick(category)}
                                onModify={() => handleModifyClick(category)}
                                className="w-full"
                            />
                        </div>
                    ))}
                </div>
                {/* Render filtered cards */}

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
                categoryName={selectedCategory ? selectedCategory.name : ""}
            />

            {/* Form for modifying a category */}
            <CategoryForm
                isOpen={isFormOpen}
                onClose={handleFormClose}
                onConfirm={handleFormConfirm}
                category={fieldCategory}
                onCategory={setFieldCategory}
            />
        </>
    );
}

export default Category;
