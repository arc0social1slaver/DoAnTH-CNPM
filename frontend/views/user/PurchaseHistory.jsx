import { useState } from 'react';
import OrderSidebar from '../components/user/OrderSidebar';

const PurchaseHistory = () => {
  const [selectedStatus, setSelectedStatus] = useState('placed');

  // Sample purchase history data
  const purchases = [
    { 
      id: 1, 
      product: "Áo thun", 
      price: 200000, 
      status: "placed", 
      date: "2024-03-20", 
      quantity: 2 
    },
    { 
      id: 2, 
      product: "Quần jean", 
      price: 500000, 
      status: "placed", 
      date: "2024-03-19", 
      quantity: 1 
    },
    { 
      id: 3, 
      product: "Quần jean", 
      price: 500000, 
      status: "placed", 
      date: "2024-03-19", 
      quantity: 1 
    },
    { 
      id: 4, 
      product: "Quần jean", 
      price: 500000, 
      status: "placed", 
      date: "2024-03-19", 
      quantity: 1 
    }
  ];

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
  };

  const filteredPurchases = purchases.filter(
    purchase => purchase.status === selectedStatus
  );

  const getStatusTitle = () => {
    switch (selectedStatus) {
      case 'placed': return 'Đơn hàng đã đặt';
      case 'shipping': return 'Đơn hàng đang vận chuyển';
      case 'delivered': return 'Đơn hàng đã giao';
      default: return 'Đơn hàng';
    }
  };

  return (
    <div className="flex flex-row min-h-screen">
      <OrderSidebar onStatusChange={handleStatusChange} />
      <main className="flex-1 border-l border-gray-200">
        <div className="py-4">
          <div className="bg-green-100 p-4 text-2xl text-center font-bold mb-6 text-green-700">{getStatusTitle()}</div>
          <div className="p-6 space-y-4">
            {filteredPurchases.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-400">Chưa có đơn hàng nào</p>
              </div>
            ) : (
              filteredPurchases.map(purchase => (
                <div key={purchase.id} className="bg-colors-white p-4 border rounded-lg shadow hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">Đơn hàng #{purchase.id}</h3>
                      <p>{purchase.product}</p>
                      <p className="text-gray-600">Số lượng: {purchase.quantity}</p>
                      <p className="text-gray-600">{purchase.date}</p>
                    </div>
                    <div>
                      <p className="font-bold">{purchase.price.toLocaleString('vi-VN')} đ</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PurchaseHistory;