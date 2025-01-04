import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useEffect, useRef } from "react";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import FilterListIcon from '@mui/icons-material/FilterList';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { Link, useParams } from 'react-router-dom';
import { useFetchAllProdsQuery, useLazyFetchAllProdsByCatQuery, useLazyFetchAllProdsByNameQuery } from '../redux/feature/prodAPI';
import { useFetchAllCatsQuery } from '../redux/feature/catAPI';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/feature/cartSlice';
import getBEURL from '../utils/backendURL';

const ShowProducts = () => {
    if(!sessionStorage.getItem('user')) return null;
    const {id} = useParams();
    const userID = JSON.parse(sessionStorage.getItem('user'))?._id;
    const dispatch = useDispatch();
    const handleAddProd = (product) => {
       dispatch(addToCart(product))
    }
    const [selectedValue, setSelectedValue] = useState("option1");
    const {data : {products = []} = [], isLoading, isFetching} = useFetchAllProdsQuery();
    const [getProdByName, {}] = useLazyFetchAllProdsByNameQuery();
    const [getProdByCat, {}] = useLazyFetchAllProdsByCatQuery();
    const {data: {cats = []} = []} = useFetchAllCatsQuery();
    const [currentPage, setCurrentPage] = useState(1); // Track current page
    const [cardsPerPage, setCardsPerPage] = useState(6); // Default to 6 cards per page
    const [searchValue , setSearchVal] = useState('');
    const [showProds, setShowProds] = useState([]);
    const [loading, setLoading] = useState(true);
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
        if(event.target.value === "option1") {
            setShowProds(products);
        }
    };
    const handleSearch = (event) => {
        setSearchVal(event.target.value);
        let cleanVal = event.target.value.trim()
        if(cleanVal === '') {
            setShowProds(products);
        }
    }

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
    useEffect(() => {
        const initialFetchProdCat = async (cat_id) => {
            try {
                const response = await getProdByCat(cat_id).unwrap();
                // console.log(response.product);
                setShowProds(response.product);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        }
        setLoading(true);
        if(id === "all") {
            if(!isLoading) {
                setShowProds(products);
                setLoading(false);
            }
        }
        else {
            if(cats.length != 0) {
                cats.map((cat) => {
                    if(cat._id === id) {
                        initialFetchProdCat(cat._id)
                    }
                })
            }
        }
    }, [id, isFetching, cats]);
    useEffect(() => {
        const fetchProdCat = async (cat_id) => {
            // setLoading(true);
            try {
                const response = await getProdByCat(cat_id).unwrap();
                // console.log(response.product);
                setShowProds(response.product);
                // setLoading(false);
            } catch (error) {
                console.log(error);
            }
        }
        if(selectedValue !== "option1") {
            fetchProdCat(selectedValue)
        }
    }, [selectedValue]);
    useEffect(() => {
        const fetchProdByName = async (item) => {
            // setLoading(true);
            try {
                const response = await getProdByName(item).unwrap();
                setShowProds(response.products);
                // setLoading(false);
            } catch (error) {
                console.log(error);
            }
        }
        if(searchValue.trim() !== '') {
            fetchProdByName(searchValue.trim());
        }
    }, [searchValue]);

    const filteredProducts = showProds
    
    // Logic for pagination
    const totalPages = Math.ceil(filteredProducts.length / cardsPerPage);
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstCard, indexOfLastCard);
    if(loading) return <div>Loading</div>
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
                            value={searchValue}
                            onChange={handleSearch}
                            placeholder="Search"
                            className="bg-colors-white py-3 px-4 rounded-xl w-full my-1 h-3/4 shadow-md focus:outline-none focus:border-none focus:shadow-none"
                            // inputProps={{ 'aria-label': 'search' }}
                        />
                        <button type='button' className="text-xl">
                            <FontAwesomeIcon icon={faMagnifyingGlass} className='text-colors-green-900 hover:text-colors-green-600 transition'/> {/* Use the icon here */}
                        </button>
                    </div>
                </div>
                <div className="flex flex-wrap gap-8 justify-center">
                    {currentProducts.map((product) => ( product.user_id !== userID && 
                        <div key={product._id} className="bg-white-100 w-64 rounded-xl p-4 flex flex-col gap-4 mb-2">
                        <div className='w-full flex justify-center'>
                            <img src={`${getBEURL()}/images/${product.image}`} alt="product image" width={200} height={200}/>
                        </div>
                        <div className="flex w-full items-center flex-col gap-2">
                            <p className="text-center pointer-events-none text-xl text-bold">{product.name}</p>
                            <div className="flex justify-start">
                                <p
                                    className={`inline-block px-2 py-1 bg-green-700 text-colors-green-900 rounded-md text-sm pointer-events-none`}
                                >
                                    {product.cat_id.name}
                                </p>
                            </div>
                            <div className='w-full px-3 pointer-events-none flex justify-between'>
                                <p className=''>Số lượng: <span>{product.stock}</span></p>
                                <p>Giá: <span>{product.price.toLocaleString()}</span></p>
                            </div>
                            <button
              onClick={() => handleAddProd(product)}
              // onClick={() => navigate(`/user/product/${product._id}`)}
              className="w-full py-2 bg-green-700 text-white font-semibold text-sm rounded-md mt-auto hover:bg-green-800 transition-colors"
               >
                Thêm vào giỏ hàng
            </button>
            <Link
          to={`/user/product/${product._id}`} 
          className="text-green-700 font-semibold mt-2 hover:underline"
        >
          Chi tiết sản phẩm
        </Link>
                        </div>
                    </div>
                    )) 
                    }
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
        
        </>
    )
}
export default ShowProducts;