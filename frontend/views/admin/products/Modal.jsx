import React from "react";

const Modal = ({ isOpen, onClose, onConfirm, ProductName }) => {
  if (!isOpen) return null; // Don't render the modal if it's not open

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div className="bg-colors-white p-6 rounded-lg w-80">
        <h2 className="text-xl font-bold text-center mb-4">Xác nhận xóa sản phẩm</h2>
        <p className="text-center mb-4">Bạn có chắc chắn muốn xóa sản phẩm "{ProductName}" không?</p>
        <div className="flex justify-around">
          <button
            onClick={onClose}
            className="bg-gray-300 py-2 px-4 rounded-lg hover:bg-gray-400 transition"
          >
            Hủy
          </button>
          <button
            onClick={onConfirm}
            className="bg-colors-red-600 text-colors-white py-2 px-4 rounded-lg hover:bg-colors-red-700 transition"
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
