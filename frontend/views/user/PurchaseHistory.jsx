import { useEffect, useState } from 'react';
import OrderSidebar from '../components/user/OrderSidebar';
import { useFetchAllHistoryQuery, useLazyFetchHistoryByStatQuery } from '../redux/feature/orderAPI';

const PurchaseHistory = () => {
  if(!sessionStorage.getItem('user')) return null
  const id = JSON.parse(sessionStorage.getItem('user'))?._id;
  const [selectedStatus, setSelectedStatus] = useState('All');
  const {data : {orders = []} = [], isLoading, isFetching} = useFetchAllHistoryQuery(id);
  const [getHist, {}] = useLazyFetchHistoryByStatQuery();
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  // Sample purchase history data
  // const purchases = [
  //   { 
  //     id: 1, 
  //     product: "Áo thun", 
  //     price: 200000, 
  //     status: "placed", 
  //     date: "2024-03-20", 
  //     quantity: 2 
  //   },
  //   { 
  //     id: 2, 
  //     product: "Quần jean", 
  //     price: 500000, 
  //     status: "shipping", 
  //     date: "2024-03-19", 
  //     quantity: 1 
  //   },
  //   { 
  //     id: 3, 
  //     product: "Giày", 
  //     price: 800000, 
  //     status: "delivered", 
  //     date: "2024-03-18", 
  //     quantity: 1 
  //   }
  // ];

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
  };

  // const filteredPurchases = purchases.filter(
  //   purchase => purchase.status === selectedStatus
  // );
  const filteredPurchases = purchases;

  const getStatusTitle = () => {
    switch (selectedStatus) {
      case 'Pending': return 'Đơn hàng đã đặt';
      case 'Shipping': return 'Đơn hàng đang vận chuyển';
      case 'Delivered': return 'Đơn hàng đã giao';
      default: return 'Tất cả đơn hàng';
    }
  };
  const getNameStatus = (val) => {
    switch (val) {
      case 'Pending': return 'Đơn hàng đã đặt';
      case 'Shipping': return 'Đơn hàng đang vận chuyển';
      case 'Delivered': return 'Đơn hàng đã giao';
      default: return 'Tất cả đơn hàng';
    }
  };
  useEffect(() => {
    if(!isLoading) {
      setPurchases(orders);
      setLoading(false);
    }
    else {
      setLoading(true);
    }
  }, [isFetching]);
  useEffect(() => {
    const fetchHisOrders = async () => {
      const stat = selectedStatus
      try {
        const response = await getHist({id, stat}).unwrap();
        setPurchases(response.orders);
      } catch (error) {
        console.log(error);
      }
    }
    if(selectedStatus != "All") {
      fetchHisOrders()
    }
  }, [selectedStatus]);
  if(loading) return <div>Loading</div>
  return (
    <div className="flex flex-row min-h-screen">
      <OrderSidebar onStatusChange={handleStatusChange} title={"Lịch sử mua hàng"} />
      <main className="flex-1 border-l border-gray-200">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6 text-green-700">{getStatusTitle()}</h2>
          <div className="space-y-4">
            {filteredPurchases.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-500">Không có đơn hàng nào</p>
              </div>
            ) : (
              filteredPurchases.map((purchase, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">Đơn hàng #{index + 1}</h3>
                      <p>{purchase.product}</p>
                      <p className="text-gray-600">Số lượng: 1</p>
                      <p className="text-gray-600">{new Date(purchase.createdAt).toUTCString()}</p>
                    </div>
                    <div>
                      <p className="font-bold">{purchase.price.toLocaleString('vi-VN')} đ</p>
                      <p className="">Trạng thái: {getNameStatus(purchase.status)}</p>
                      {/* <button 
                        className="mt-2 text-blue-500 hover:text-blue-700 transition-colors"
                      >
                        Xem chi tiết
                      </button> */}
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