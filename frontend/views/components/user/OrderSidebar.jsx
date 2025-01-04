import { useState } from 'react';
import PropTypes from 'prop-types';

const OrderSidebar = ({ onStatusChange, title }) => {
  const [selectedStatus, setSelectedStatus] = useState('placed');

  const menuItems = [
    { title: 'Đã đặt', status: 'Pending' },
    { title: 'Đang vận chuyển', status: 'Shipping' },
    { title: 'Đã giao', status: 'Delivered' }
  ];

  const handleStatusClick = (status) => {
    setSelectedStatus(status);
    onStatusChange(status);
  };

  return (
    <div className="w-64 min-h-screen bg-gray-100 p-4 border-r">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-green-700">{title}</h2>
      </div>
      <nav>
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => handleStatusClick(item.status)}
            className={`w-full text-left py-3 px-4 mb-2 rounded-lg transition-all duration-200
              ${selectedStatus === item.status 
                ? 'bg-blue-500 text-white' 
                : 'text-black hover:bg-gray-200'}`}
          >
            {item.title}
          </button>
        ))}
      </nav>
    </div>
  );
};
OrderSidebar.propTypes = {
  onStatusChange: PropTypes.func.isRequired,
};

export default OrderSidebar;
