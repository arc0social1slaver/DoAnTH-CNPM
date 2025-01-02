import { useState } from 'react';
import OrderSidebar from '../components/user/OrderSidebar';

const OrderManagement = () => {
  const [selectedStatus, setSelectedStatus] = useState('placed');

  // Sample order data
  const orders = [
    { id: 1, product: "Áo thun", price: 200000, status: "placed", date: "2024-03-20" },
    { id: 2, product: "Quần jean", price: 500000, status: "shipping", date: "2024-03-19" },
    { id: 3, product: "Giày", price: 800000, status: "delivered", date: "2024-03-18" }
  ];

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
  };

  const filteredOrders = orders.filter(order => order.status === selectedStatus);

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
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6 text-green-700">{getStatusTitle()}</h2>
          <div className="space-y-4">
            {filteredOrders.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-500">Không có đơn hàng nào</p>
              </div>
            ) : (
              filteredOrders.map(order => (
                <div key={order.id} className="bg-white p-4 rounded-lg shadow">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">Đơn hàng #{order.id}</h3>
                      <p>{order.product}</p>
                      <p className="text-gray-600">{order.date}</p>
                    </div>
                    <div>
                      <p className="font-bold">{order.price.toLocaleString('vi-VN')} đ</p>
                      <button className="mt-2 text-blue-500 hover:text-blue-700">
                        Xem chi tiết
                      </button>
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

export default OrderManagement;