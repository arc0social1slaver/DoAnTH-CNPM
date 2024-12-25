import React, { useState, useEffect } from "react";


const CategoryForm = ({ isOpen, onClose, onConfirm, category }) => {
  if (!isOpen) return null; 

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

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
        <div className="bg-colors-white p-6 rounded-lg w-3/5">
            <h2 className="text-2xl font-bold">Thông tin danh mục</h2>
            <div className="mt-4 flex gap-2">
                <p>Danh mục hiện có</p>
                {/* Lấy từ database */}
                <select name="category" id="category" className="border">
                    <option value="option 1">Tất cả</option>
                </select>
            </div>
            <div className="mt-3">
                <form action="post">
                    <input type="text" placeholder="Nhập danh mục" className="border w-full px-2 py-1"/>
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
                    Xác nhận
                </button>
            </div>
        </div>
    </div>
  );
};

export default CategoryForm;
