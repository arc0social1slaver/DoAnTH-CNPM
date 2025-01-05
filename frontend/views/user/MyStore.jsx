import { useState } from 'react';
import { PlusCircleIcon } from '@heroicons/react/24/solid';

const MyStore = () => {
    const [showForm, setShowForm] = useState(false);
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        category: '',
        description: '',
        image: null,
        imageUrl: ''
    });
    const [showImagePopup, setShowImagePopup] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewProduct(prev => ({
            ...prev,
            [name]: value
        }));
    };

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
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setProducts(prev => [...prev, { ...newProduct, id: Date.now() }]);
        setShowForm(false);
        setNewProduct({
            name: '',
            price: '',
            category: '',
            description: '',
            image: null,
            imageUrl: ''
        });
    };

    const openImagePopup = () => {
        setShowImagePopup(true);
    };

    const closeImagePopup = () => {
        setShowImagePopup(false);
    };

    const closeForm = () => {
        setShowForm(false);
        setNewProduct({
            name: '',
            price: '',
            category: '', 
            description: '',
            image: null,
            imageUrl: ''
        });
    };

    return (
        <div className="relative min-h-screen py-4">
            <div className="bg-green-100 p-4 text-2xl font-bold text-left text-green-700">
                <span className='ml-8'>ThriftMate</span> <span className='text-3xl font-light'>|</span>
                <span className='font-medium ml-4'>Cửa hàng của tôi</span>
            </div>
            {/* Product List */}
            {products.length === 0 ? (
                <div className="text-center py-10">
                <p className="text-gray-500">Chưa có sản phẩm nào được đăng bán</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {products.map((product) => (
                    <div key={product.id} className="border rounded-lg p-4">
                    <img 
                        src={product.image ? URL.createObjectURL(product.image) : '/placeholder.png'} 
                        alt={product.name} 
                        className="w-full h-48 object-cover rounded-lg"
                    />
                    <h3 className="font-semibold mt-2">{product.name}</h3>
                    <p className="text-gray-600">{Number(product.price).toLocaleString('vi-VN')} đ</p>
                    </div>
                ))}
                </div>
            )}

            {/* Floating Add Button */}
            <button
                onClick={() => setShowForm(true)}
                className="fixed bottom-8 left-8 bg-green-100 hover:bg-green-700 text-white rounded-full p-4 shadow-lg transition duration-200 ease-in-out transform hover:scale-105"
            >
                <PlusCircleIcon className="h-8 w-8" />
            </button>

            {/* Add Product Form Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-colors-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto relative border border-gray-200 shadow-xl">
                        <button
                        onClick={closeForm}
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
                        <h2 className="text-2xl font-bold mb-6 text-center text-green-700">Thêm sản phẩm mới</h2>
                        
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Tên sản phẩm</label>
                                <input
                                    type="text"
                                    name="name"value={newProduct.name}
                                    onChange={handleChange}
                                    className="w-full border border-colors-gray-400 rounded-lg p-2"
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
                                    className="w-full border border-colors-gray-400 rounded-lg p-2"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Danh mục</label>
                                <select
                                    name="category"
                                    value={newProduct.category}
                                    onChange={handleChange}
                                    className="w-full border border-colors-gray-400 rounded-lg p-2"
                                    required
                                >
                                    <option value="" disabled>Chọn danh mục</option>
                                    <option value="fashion">Thời trang</option>
                                    <option value="beauty">Làm đẹp</option>
                                    <option value="documents">Tài liệu</option>
                                    <option value="electronics">Điện tử</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Mô tả</label>
                                <textarea
                                    name="description"
                                    value={newProduct.description}
                                    onChange={handleChange}
                                    className="w-full border border-colors-gray-400 rounded-lg p-2 h-32"
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
                                    required
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
                                    className="px-6 py-2 bg-green-100 hover:bg-green-700 rounded-lg"
                                >
                                    Đăng sản phẩm
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
        </div>
    );
};

export default MyStore;