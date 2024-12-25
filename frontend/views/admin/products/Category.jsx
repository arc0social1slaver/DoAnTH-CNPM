import Card from "./Card";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useEffect } from "react";
import Modal from "./Modal";
import CategoryForm from "./CategoryForm";

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const Category = () => {
    const [selectedValue, setSelectedValue] = useState("option1");
    const [currentPage, setCurrentPage] = useState(1); // Track current page
    const [cardsPerPage, setCardsPerPage] = useState(6); // Default to 6 cards per page

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };
    

    // Dynamically adjust cards per page based on screen size
    useEffect(() => {
        const updateCardsPerPage = () => {
            const width = window.innerWidth;
            if (width >= 1536) {
                setCardsPerPage(8); // Large screen
            } else {
                setCardsPerPage(6); // Medium and smaller screens
            }
        };

        // Set initial value
        updateCardsPerPage();

        // Update on window resize
        window.addEventListener("resize", updateCardsPerPage);

        // Cleanup on component unmount
        return () => {
            window.removeEventListener("resize", updateCardsPerPage);
        };
    }, []);

    // Lấy từ database
    const [products, setProducts] = useState([
        { id: 1, img: "https://via.placeholder.com/150", name: "Product 1", category: "Electronic", price: 100.000, stock: 10 },
        { id: 2, img: "https://via.placeholder.com/150", name: "Product 2", category: "Electronic", price: 100.000, stock: 10 },
        { id: 3, img: "https://via.placeholder.com/150", name: "Product 3", category: "Electronic", price: 100.000, stock: 10 },
        { id: 4, img: "https://via.placeholder.com/150", name: "Product 4", category: "Electronic", price: 100.000, stock: 10 },
        { id: 5, img: "https://via.placeholder.com/150", name: "Product 5", category: "Electronic", price: 100.000, stock: 10 },
        { id: 6, img: "https://via.placeholder.com/150", name: "Product 6", category: "Electronic", price: 100.000, stock: 10 },
        { id: 7, img: "https://via.placeholder.com/150", name: "Product 7", category: "Electronic", price: 100.000, stock: 10 },
        { id: 8, img: "https://via.placeholder.com/150", name: "Product 8", category: "Electronic", price: 100.000, stock: 10 },
        { id: 9, img: "https://via.placeholder.com/150", name: "Product 9", category: "Electronic", price: 100.000, stock: 10 },
        { id: 10, img: "https://via.placeholder.com/150", name: "Product 10", category: "Electronic", price: 100.000, stock: 10 },
      ]);

    // Lấy từ database (category)
    const filteredProducts =
    selectedValue === "option1"
        ? products // Show all products
        : products.filter((product) => (selectedValue === "option2" ? product.isActive : !product.isActive));

    // Logic for pagination
    const totalPages = Math.ceil(filteredProducts.length / cardsPerPage);
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstCard, indexOfLastCard);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleDeleteClick = (product) => {
        setSelectedCategory(product);
        setIsModalOpen(true);
    };

    const handleDeleteConfirm = () => {
        console.log("Product to delete:", selectedCategory);
        setProducts(products.filter((product) => product.id !== selectedCategory.id));
        setIsModalOpen(false);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    // Form Logic
    const [isFormOpen, setIsFormOpen] = useState(false); 

    const handleModifyClick = (product) => {
        setSelectedCategory(product); 
        setIsFormOpen(true); 
    };

    const handleAddCategoryClick = () => {
        setSelectedCategory(null); 
        setIsFormOpen(true); 
    };

    const handleFormClose = () => {
        setIsFormOpen(false); // Close the form
    };

    const handleFormConfirm = () => {
        if (selectedCategory) {
        console.log(`Modifying product with ID: ${selectedCategory.id}`);
        }
        setIsFormOpen(false); // Close the form after confirming
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
                <div className="flex flex-wrap gap-4 justify-center">
                    {currentProducts.map((product) => (
                        <div className="2xl:w-1/5">
                            <Card 
                                img={product.img}
                                name={product.name}
                                price={product.price}
                                category={product.category}
                                stock={product.stock}
                                onDelete={() => handleDeleteClick(product)}
                                onModify={() => handleModifyClick(product)}
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

            {/* Form for modifying a product */}
            <CategoryForm
                isOpen={isFormOpen}
                onClose={handleFormClose}
                onConfirm={handleFormConfirm}
            />
        </>
    );
}

export default Category;
