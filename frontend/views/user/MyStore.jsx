import { useState } from 'react';
import Swal from "sweetalert2";
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import { useFetchAllCatsQuery } from '../redux/feature/catAPI';
import { useAddProdMutation, useDeleteProdMutation, useFetchMyStoreProductsQuery, useUpdateProdMutation } from '../redux/feature/prodAPI';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import getBEURL from '../utils/backendURL';
import Currency from '../components/user/Currency';

const MyStore = () => {
    const id = JSON.parse(sessionStorage.getItem('user'))._id;
    const [isUpdate , setIsUpdate] = useState(false);
    const {data: {cats = []} = []} = useFetchAllCatsQuery();
    const {data: {products = []} = []} = useFetchMyStoreProductsQuery(id);
    const [addProd, {}] = useAddProdMutation();
    const [updProd, {}] = useUpdateProdMutation();
    const [delProd, {}] = useDeleteProdMutation();
    const [showForm, setShowForm] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [fieldFile, setFile] = useState(null);
    const [showImagePopup, setShowImagePopup] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        cat_id: '',
        description: '',
        stock: '',
        imageUrl: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewProduct((prev) => ({
        ...prev,
        [name]: value
        }));        
    };
    const handleModifyClick = (item) => {
        setShowForm(true);
        setNewProduct(item);
        setIsUpdate(true);
    }
    const handleDeleteClick = (item) => {
        setNewProduct(item);
        setIsModalOpen(true);
    }
    const handleDeleteConfirm = async (id) => {
        if(id) {
        try {
            await delProd(id).unwrap();
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Xóa sản phẩm thành công",
                showConfirmButton: true,
                timer: 1500
            });
        } catch (error) {
            console.log(error);
            if(error.status === 404) {
                Swal.fire({
                    position: "center",
                    icon: "warning",
                    title: "Sản phẩm không tìm thấy",
                    showConfirmButton: true,
                    timer: 1500
                });
            }
            else {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Chỉnh sửa sản phẩm thất bại",
                    showConfirmButton: true,
                    timer: 1500
                });
            }
        }
        } else {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Lỗi sản phẩm",
                showConfirmButton: true,
                timer: 1500
            });
        }
        setNewProduct({
            name: '',
            price: '',
            cat_id: '',
            description: '',
            stock: '',
        });
        setFile(null);
        setIsModalOpen(false);
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setNewProduct(prev => ({
                ...prev,
                image: file,
                imageUrl: imageUrl
            }));
        }
        setFile(file);
    };
    const handleCancelButton = () => {
        setShowForm(false);
        setNewProduct({
        name: '',
        price: '',
        cat_id: '',
        description: '',
        stock: '',
        });
        setFile(null);
        setIsUpdate(false);
        setIsModalOpen(false);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        // setProducts(prev => [...prev, { ...newProduct, id: Date.now() }]);
        // console.log(newProduct);
        if(Object.values(newProduct).includes('') || (!fieldFile && !isUpdate)) {
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "Thông tin sản phẩm không được để trống",
                showConfirmButton: true,
                timer: 1500
            });
        }
        else {
            const newProd = new FormData();
            newProd.append('file', fieldFile)
            if(!isUpdate) {
                const user_id = JSON.parse(sessionStorage.getItem('user'))._id
                newProduct.user_id = user_id
                newProd.append('product', JSON.stringify(newProduct))
                
            try {
                await addProd(newProd).unwrap();
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Thêm sản phẩm thành công",
                    showConfirmButton: true,
                    timer: 1500
                });
            } catch (error) {
                console.log(error);
                if(error.status === 400) {
                    Swal.fire({
                        position: "center",
                        icon: "warning",
                        title: "Không tồn tại ảnh",
                        showConfirmButton: true,
                        timer: 1500
                    });
                }
                else {
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "Thêm sản phẩm thất bại",
                        showConfirmButton: true,
                        timer: 1500
                    });
                }
            }
            } else {
                const id = newProduct?._id;
                delete newProduct?._id;
                newProd.append('product', JSON.stringify(newProduct))
                try {
                    await updProd({id, newProd}).unwrap();
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Chỉnh sửa sản phẩm thành công",
                        showConfirmButton: true,
                        timer: 1500
                    });
                } catch (error) {
                    console.log(error);
                    if(error.status === 404) {
                        Swal.fire({
                            position: "center",
                            icon: "warning",
                            title: "Sản phẩm không tìm thấy",
                            showConfirmButton: true,
                            timer: 1500
                        });
                    }
                    else {
                        Swal.fire({
                            position: "center",
                            icon: "error",
                            title: "Chỉnh sửa sản phẩm thất bại",
                            showConfirmButton: true,
                            timer: 1500
                        });
                    }
                }
            }
        }
        setShowForm(false);
        setNewProduct({
        name: '',
        price: '',
        cat_id: '',
        description: '',
        stock: '',
        imageUrl: ''
        });
        setFile(null);
        setIsUpdate(false)
    };

    const openImagePopup = () => {
        setShowImagePopup(true);
    };

    const closeImagePopup = () => {
        setShowImagePopup(false);
    };

    

    return (
        <div className="relative min-h-screen py-4">
            <div className="bg-green-100 p-4 text-2xl font-bold text-left text-green-700">
                <span className='ml-8'>ThriftMate</span> <span className='text-3xl font-light'>|</span>
                <span className='font-medium ml-4'>Cửa hàng của tôi</span>
            </div>

        {/* Product List */}
        <div className='flex flex-col min-h-screen items-center mx-auto p-4'>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4 w-full md:max-w-5xl">

                {products.length === 0 ? (
                    <div className="text-center py-10 col-span-full">
                        <p className="text-gray-500">Chưa có sản phẩm nào được đăng bán.</p>
                    </div>
                ) : (
                    <div className="col-span-full flex items-center justify-start gap-4 -mx-2 md:-mx-4 my-4">
                        {products.map((product) => (
                            <div key={product._id} className="flex flex-col items-center w-48 md:w-48 space-x-4 mt-8 border border-colors-gray-200 p-4 h-auto">
                                <img 
                                    src={product.image ? `${getBEURL()}/images/${product.image}` : '/placeholder.png'} 
                                    alt={product.name} 
                                    className="w-full h-48 object-cover"
                                />
                                <h3 className="text-base text-center line-clamp-2">{product.name}</h3>
                                <p className="text-base text-green-700 font-semibold text-center"><Currency amount={product.price}/></p>
                                <div className='w-full py-1 px-2 rounded-lg bg-green-900 hover:bg-colors-green-700 text-white-100 transition-all rounded-sm cursor-pointer flex gap-1 items-center justify-center' onClick={() => handleModifyClick(product)}>
                                    <ModeEditIcon className='hover:text-green-900 transition cursor-pointer'/>
                                        <span>Chỉnh sửa</span>
                                </div>
                                <div className='w-full mt-2 py-1 px-2 rounded-lg bg-colors-red-500 hover:bg-colors-red-800 text-white-100 transition-all cursor-pointer rounded-sm flex gap-1 items-center justify-center' onClick={() => handleDeleteClick(product)}>
                                    <DeleteIcon className='text-white-100 hover:text-white-100' />
                                    <span>Xóa</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
        {/* Floating Add Button */}
        <button
            onClick={() => setShowForm(true)}
            className="fixed bottom-8 left-8 bg-green-100 hover:bg-green-700 rounded-full p-4 shadow-lg transition duration-200 ease-in-out transform hover:scale-105"
        >
            <PlusCircleIcon className="h-8 w-8" />
        </button>

        {/* Add Product Form Modal */}
        {showForm && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-colors-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto relative border border-gray-200 shadow-xl">
                <button
                    onClick={handleCancelButton}
                    className="absolute text-gray-500 hover:text-gray-700 right-0 mr-6"
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        strokeWidth={1.5} 
                        stroke="currentColor" 
                        className="size-6"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            d="M6 18 18 6M6 6l12 12" 
                        />
                    </svg>
                </button>
                <h2 className="text-2xl font-bold mb-6 text-center text-green-700">{isUpdate ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Tên sản phẩm</label>
                    <input
                    type="text"
                    name="name"value={newProduct.name}
                    onChange={handleChange}
                    className="w-full border border-gray-400 rounded-lg p-2"
                    required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Giá</label>
                    <input
                    type="number"
                    name="price"
                    value={newProduct.price}
                    onChange={handleChange}
                    className="w-full border border-gray-400 rounded-lg p-2"
                    required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Danh mục</label>
                    <select
                    name="cat_id"
                    value={newProduct.cat_id}
                    onChange={handleChange}
                    className="w-full border border-gray-400 rounded-lg p-2"
                    required
                    >
                    <option value="" disabled>Chọn danh mục</option>
                    {
                        cats.map((cat) => (
                            <option key={cat._id} value={cat._id}>{cat.name}</option>
                        ))
                    }
                    {/* <option value="fashion">Thời trang</option>
                    <option value="beauty">Làm đẹp</option>
                    <option value="documents">Tài liệu</option>
                    <option value="electronics">Điện tử</option> */}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Số lượng</label>
                    <input
                    type="number"
                    name="stock"
                    value={newProduct.stock}
                    onChange={handleChange}
                    className="w-full border border-gray-400 rounded-lg p-2"
                    required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Mô tả</label>
                    <textarea
                    name="description"
                    value={newProduct.description}
                    onChange={handleChange}
                    className="w-full border border-gray-400 rounded-lg p-2 h-32"
                    required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Hình ảnh</label>
                    <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full"
                    // required
                    />
                    {newProduct.imageUrl && (
                        <div className="mt-2">
                            <a 
                                href="#"
                                onClick={openImagePopup} 
                                className="text-blue-700 hover:underline"
                            >
                                {newProduct.image.name}
                            </a>
                        </div>
                    )}
                </div>

                <div className="flex justify-center space-x-4 mt-6">
                    <button
                        type="submit"
                        className="px-6 py-2 bg-green-100 hover:bg-green-700 text-white rounded-lg shadow-lg transition duration-200 ease-in-out transform hover:scale-105"
                    >
                    {isUpdate ? 'Chỉnh sửa sản phẩm' :'Đăng sản phẩm'}
                    </button>
                </div>
                </form>
            </div>
            </div>
        )}
        {showImagePopup && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="relative">
                        <button
                            onClick={closeImagePopup}
                            className="absolute text-gray-500 hover:text-gray-700 right-0 mr-2 mt-2"
                        >
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                strokeWidth={1.5} 
                                stroke="currentColor" 
                                className="size-6"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    d="M6 18 18 6M6 6l12 12" 
                                />
                            </svg>
                        </button>
                        <img
                            src={newProduct.imageUrl}
                            alt="Product Preview"
                            className="w-80 h-80"
                        />
                    </div>
                </div>
            )}
        
        {
            isModalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div className="bg-colors-white p-6 rounded-lg w-80">
        <h2 className="text-xl font-bold text-center mb-4">Xác nhận xóa sản phẩm </h2>
        <p className="text-center mb-4">Bạn có chắc chắn muốn xóa sản phẩm "{newProduct.name}" không?</p>
        <div className="flex justify-around">
          <button
            onClick={() => handleCancelButton()}
            className="bg-gray-300 py-2 px-4 rounded-lg hover:bg-gray-400 transition"
          >
            Hủy
          </button>
          <button
            onClick={() => handleDeleteConfirm(newProduct?._id)}
            className="bg-colors-red-600 text-colors-white py-2 px-4 rounded-lg hover:bg-colors-red-700 transition"
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
            )
        }
        </div>
    );
};

export default MyStore;