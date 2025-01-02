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
        image: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewProduct(prev => ({
        ...prev,
        [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setNewProduct(prev => ({
        ...prev,
        image: file
        }));
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
        image: null
        });
    };

    return (
        <div className="relative min-h-screen p-6">
        <h1 className="text-2xl font-bold mb-6 text-center text-green-700">Cửa hàng của tôi</h1>

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
            <PlusCircleIcon className="h-12 w-12" />
        </button>

        {/* Add Product Form Modal */}
        {showForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-gray-50 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto relative border border-gray-200 shadow-xl">
                <h2 className="text-2xl font-bold mb-6 text-center text-green-700">Đăng sản phẩm mới</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Tên sản phẩm</label>
                    <input
                    type="text"
                    name="name"value={newProduct.name}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-2"
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
                    className="w-full border rounded-lg p-2"
                    required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Danh mục</label>
                    <select
                    name="category"
                    value={newProduct.category}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-2"
                    required
                    >
                    <option value="">Chọn danh mục</option>
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
                    className="w-full border rounded-lg p-2 h-32"
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
                </div>

                <div className="flex justify-center space-x-4 mt-6">
                    <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-6 py-2 bg-green-100 hover:bg-green-700 text-white rounded-lg shadow-lg transition duration-200 ease-in-out transform hover:scale-105"
                    >
                    Hủy
                    </button>
                    <button
                    type="submit"
                    className="px-6 py-2 bg-green-100 hover:bg-green-700 text-white rounded-lg shadow-lg transition duration-200 ease-in-out transform hover:scale-105"
                    >
                    Đăng sản phẩm
                    </button>
                </div>
                </form>
            </div>
            </div>
        )}
        </div>
    );
};

export default MyStore;