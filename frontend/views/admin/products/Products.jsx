import Card from "./Card";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useEffect, useRef } from "react";
import Modal from "./Modal";
import Form from "./Form";

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useFetchAllProdsQuery } from "../../redux/feature/prodAPI";
import { useFetchAllCatsQuery } from "../../redux/feature/catAPI";

const Products = () => {
    const [selectedValue, setSelectedValue] = useState("option1");
    const {data : {products = []} = [],} = useFetchAllProdsQuery();
    const {data: {cats = []} = []} = useFetchAllCatsQuery();
    const [currentPage, setCurrentPage] = useState(1); // Track current page
    const [cardsPerPage, setCardsPerPage] = useState(6); // Default to 6 cards per page
    const currentProducts_fetch = useRef([]);
    const totalPages_fetch = useRef(0);
    const fetchOrNot = useRef(false);
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
        fetchTheProducts(event.target.value);
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
    // const [products, setProducts] = useState([
    //     { id: 1, img: "https://via.placeholder.com/150", name: "Product 1", category: "Electronic", price: 100.000, stock: 10 },
    //     { id: 2, img: "https://via.placeholder.com/150", name: "Product 2", category: "Electronic", price: 100.000, stock: 10 },
    //     { id: 3, img: "https://via.placeholder.com/150", name: "Product 3", category: "Electronic", price: 100.000, stock: 10 },
    //     { id: 4, img: "https://via.placeholder.com/150", name: "Product 4", category: "Electronic", price: 100.000, stock: 10 },
    //     { id: 5, img: "https://via.placeholder.com/150", name: "Product 5", category: "Electronic", price: 100.000, stock: 10 },
    //     { id: 6, img: "https://via.placeholder.com/150", name: "Product 6", category: "Electronic", price: 100.000, stock: 10 },
    //     { id: 7, img: "https://via.placeholder.com/150", name: "Product 7", category: "Electronic", price: 100.000, stock: 10 },
    //     { id: 8, img: "https://via.placeholder.com/150", name: "Product 8", category: "Electronic", price: 100.000, stock: 10 },
    //     { id: 9, img: "https://via.placeholder.com/150", name: "Product 9", category: "Electronic", price: 100.000, stock: 10 },
    //     { id: 10, img: "https://via.placeholder.com/150", name: "Product 10", category: "Electronic", price: 100.000, stock: 10 },
    //   ]);
    
    const fetchTheProducts = (val) => {
        let filteredProducts = []
        fetchOrNot.current = true
        if(val == "option1") {                
            filteredProducts=  products
        }
        else {  
           filteredProducts = products.filter((product) => product.cat_id._id == val);
        }
        totalPages_fetch.current = Math.ceil(filteredProducts.length / cardsPerPage);
        let indexOfLastCard = currentPage * cardsPerPage;
        let indexOfFirstCard = indexOfLastCard - cardsPerPage;
        currentProducts_fetch.current = filteredProducts.slice(indexOfFirstCard, indexOfLastCard)
    }
    const filteredProducts = products;

    // Logic for pagination
    const totalPages = Math.ceil(filteredProducts.length / cardsPerPage);
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstCard, indexOfLastCard);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleDeleteClick = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleDeleteConfirm = () => {
        console.log("Product to delete:", selectedProduct);
        setProducts(products.filter((product) => product.id !== selectedProduct.id));
        setIsModalOpen(false);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    // Form Logic
    const [isFormOpen, setIsFormOpen] = useState(false); 

    const handleModifyClick = (product) => {
        setSelectedProduct(product); 
        setIsFormOpen(true); 
    };

    const handleAddProductClick = () => {
        setSelectedProduct(null); 
        setIsFormOpen(true); 
    };

    const handleFormClose = () => {
        setIsFormOpen(false); // Close the form
    };

    const handleFormConfirm = () => {
        if (selectedProduct) {
        console.log(`Modifying product with ID: ${selectedProduct.id}`);
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
                            // value={selectedValue}
                            onChange={handleChange}
                            className="rounded-lg border py-2 px-4"
                        >
                            <option value="option1">Tất cả</option>
                            {
                                cats.map((category) => (
                                    <option key={category._id} value={category._id}>{category.name}</option>
                                ))
                            }
                            {/* <option value="option2">Đang hoạt động</option>
                            <option value="option3">Không hoạt động</option> */}
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
                    <div className="w-full md:w-1/3 transition-all hover:text-green-900 cursor-pointer ml-4 flex items-center justify-center gap-2" onClick={handleAddProductClick}>
                        <AddCircleIcon />
                        <span>Thêm sản phẩm</span>
                    </div>
                </div>
                <div className="flex flex-wrap gap-8 justify-center">
                    {fetchOrNot.current == false ? currentProducts.map((product) => (
                        <div key={product._id} className="2xl:w-1/5">
                            <Card 
                                img={product.image}
                                name={product.name}
                                price={product.price}
                                category={product.cat_id.name}
                                stock={product.stock}
                                onDelete={() => handleDeleteClick(product)}
                                onModify={() => handleModifyClick(product)}
                                className="w-full"
                            />
                        </div>
                    )) : currentProducts_fetch.current.map((product) => (
                        <div key={product._id} className="2xl:w-1/5">
                            <Card 
                                img={product.image}
                                name={product.name}
                                price={product.price}
                                category={product.cat_id.name}
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
                        {Array.from({ length: fetchOrNot.current == false ? totalPages : totalPages_fetch.current }, (_, index) => (
                        <option key={index + 1} value={index + 1}>
                            Page {index + 1}
                        </option>
                        ))}
                    </select>
                    <button
                        onClick={() => {
                            if (fetchOrNot.current == false) {
                            setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages)
                            } else {
                            setCurrentPage(currentPage < totalPages_fetch.current ? currentPage + 1 : totalPages_fetch.current)
                            }
                        }}
                        disabled={fetchOrNot.current == false ? currentPage === totalPages : currentPage == totalPages_fetch.current}
                        className="px-4 py-2 transition hover:text-colors-green-600 cursor-pointer text-white rounded-r-md"
                    >
                        <NavigateNextIcon />
                    </button>
                    <button
                        onClick={() => fetchOrNot.current == false ? setCurrentPage(totalPages) : setCurrentPage(totalPages_fetch.current)}
                        disabled={fetchOrNot.current == false ? currentPage === totalPages : currentPage == totalPages_fetch.current}
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
                ProductName={selectedProduct ? selectedProduct.name : ""}
            />

            {/* Form for modifying a product */}
            <Form
                isOpen={isFormOpen}
                onClose={handleFormClose}
                onConfirm={handleFormConfirm}
                product={selectedProduct} 
            />
        </>
    );
}

export default Products;
