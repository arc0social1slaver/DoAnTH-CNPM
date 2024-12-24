import React, { useState, useEffect } from "react";


const Form = ({ isOpen, onClose, onConfirm, product }) => {
  if (!isOpen) return null; 

  const [imagePreview, setImagePreview] = useState("https://via.placeholder.com/150");
  const [pendingImageURL, setPendingImageURL] = useState("");

   // State to manage the input values
  const [productName, setProductName] = useState(product ? product.name : "None");
  const [category, setCategory] = useState(product ? product.category : "option 1");
  const [price, setPrice] = useState(product ? product.price : 0);
  const [stock, setStock] = useState(product ? product.stock : 0);

  useEffect(() => {
    // If product is passed, set the initial values for fields
    if (product) {
      setProductName(product.name);
      setCategory(product.category);
      setPrice(product.price);
      setStock(product.stock);
      setImagePreview(product.image || "https://via.placeholder.com/150");
    }
  }, [product]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleURLChange = (event) => {
    setPendingImageURL(event.target.value); // Update only the pending URL
  };

  const updateImagePreview = (event) => {
    event.preventDefault(); // Prevent form submission
    setImagePreview(pendingImageURL); // Update the image preview only when confirmed
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
        <div className="bg-colors-white p-6 rounded-lg w-3/5">
            <h2 className="text-2xl font-bold">Thông tin sản phẩm</h2>
            <div className="mt-4">
                <form action="post" className="flex items-start" onSubmit={updateImagePreview}>
                    <div className="mr-3 flex flex-col gap-2 items-center">
                        <label htmlFor="image-upload" className="cursor-pointer">
                            <img
                                src={imagePreview}
                                alt="product-preview"
                                className=""
                            />
                        </label>
                        <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                        />
                        <div className="w-full">
                            <label htmlFor="image-url" className="block mb-2 text-sm text-colors-gray-700">
                            or Paste Image URL:
                            </label>
                            <input
                            id="image-url"
                            type="text"
                            value={pendingImageURL}
                            onChange={handleURLChange}
                            className="border border-gray-300 rounded py-1 px-2 text-base w-full"
                            placeholder="Enter image URL..."
                            />
                            <button
                            type="submit"
                            className="mt-2 bg-colors-blue-500 text-colors-white py-1 px-4 rounded hover:bg-colors-blue-600 transition"
                            >
                            Thay đổi
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-wrap w-full gap-y-3">
                        {/* Field 1 */}
                        <div className="w-full lg:w-1/2 px-4">
                            <label htmlFor="name">Tên sản phẩm:</label>
                            <input
                            type="text"
                            id="name"
                            value={productName} // Use state value here
                            onChange={(e) => setProductName(e.target.value)} // Update state on change
                            className="border w-full p-2"
                            />
                        </div>

                        {/* Field 2 */}
                        <div className="w-full lg:w-1/2 px-4">
                            <label htmlFor="category">Danh mục:</label>
                            <select
                            name="category"
                            id="category"
                            value={category} // Use state value here
                            onChange={(e) => setCategory(e.target.value)} // Update state on change
                            className="border w-full p-2"
                            >
                            <option value="option 1">Tất cả</option>
                            {/* Add more options here if needed */}
                            </select>
                        </div>

                        {/* Field 3 */}
                        <div className="w-full lg:w-1/2 px-4">
                            <label htmlFor="price">Giá tiền:</label>
                            <input
                            type="number"
                            id="price"
                            value={price} // Use state value here
                            onChange={(e) => setPrice(Number(e.target.value))} // Ensure it's a number
                            className="border w-full p-2"
                            />
                        </div>

                        {/* Field 4 */}
                        <div className="w-full lg:w-1/2 px-4">
                            <label htmlFor="stock">Số lượng:</label>
                            <input
                            type="number"
                            id="stock"
                            value={stock} // Use state value here
                            onChange={(e) => setStock(Number(e.target.value))} // Ensure it's a number
                            className="border w-full p-2"
                            />
                        </div>
                    </div>
                </form>
            </div>
            <div className="flex justify-center gap-8 mt-4">
                <button
                    onClick={onClose}
                    className="bg-gray-300 py-2 px-4 rounded-lg hover:bg-gray-400 transition"
                >
                    Quay lại
                </button>
                <button
                    onClick={onConfirm}
                    className="bg-green-900 text-colors-white py-2 px-4 rounded-lg hover:bg-colors-green-700 transition"
                >
                    Sửa
                </button>
            </div>
        </div>
    </div>
  );
};

export default Form;
