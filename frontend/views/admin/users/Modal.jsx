import React from 'react';

const Modal = ({ isOpen, onClose, onConfirm, userName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white-100 p-6 rounded-md shadow-lg w-1/3">
        <h2 className="text-xl font-bold text-center mb-4">Xác nhận xóa người dùng</h2>
        <p className="text-center mb-4">
          Bạn có chắc chắn muốn xóa người dùng <strong>{userName}</strong> không?
        </p>
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
          >
            Hủy
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-colors-red-500 text-white-100 rounded-md hover:bg-colors-red-600"
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
