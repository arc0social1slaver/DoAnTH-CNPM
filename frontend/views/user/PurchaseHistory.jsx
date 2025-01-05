import { useEffect, useState } from 'react';
import OrderSidebar from '../components/user/OrderSidebar';
import { useFetchAllHistoryQuery, useLazyFetchHistoryByStatQuery } from '../redux/feature/orderAPI';
import getBEURL from "../utils/backendURL";
import Currency from '../components/user/Currency';

const PurchaseHistory = () => {
  if(!sessionStorage.getItem('user')) return null
  const id = JSON.parse(sessionStorage.getItem('user'))?._id;
  const [selectedStatus, setSelectedStatus] = useState('All');
  const {data : {orders = []} = [], isLoading, isFetching} = useFetchAllHistoryQuery(id);
  const [getHist, {}] = useLazyFetchHistoryByStatQuery();
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
  };
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
      <main className="pl-64 flex-1 border-l border-gray-200">
        <div className="py-4">
          <h2 className="bg-green-100 p-4 text-2xl text-center font-bold mb-6 text-green-700">{getStatusTitle()}</h2>
          <div className="p-6 space-y-4">
            {filteredPurchases.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-400">Chưa có đơn hàng nào.</p>
              </div>
            ) : (
              filteredPurchases.map((purchase, index) => (
                <div key={index} className="bg-colors-white p-4 border rounded-lg shadow hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-4">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={`${getBEURL()}/images/${purchase.product_image}`}
                        alt={purchase.product_name}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                    </div>
              
                    {/* Product and Order Details */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-normal">Đơn hàng #{index + 1}</h3>
                          <h4 className="font-bold text-green-700 text-lg">
                              {purchase.product_name}
                          </h4>
                          <p className="text-gray-600">Số lượng: 1</p>
                          <p className="text-gray-500">{new Date(purchase.createdAt).toLocaleString('vi-VN')}</p>
                        </div>
                        <div>
                          <p className="font-bold"><Currency amount={purchase.price}/></p>
                          <p className="">Trạng thái: {getNameStatus(purchase.status)}</p>
                        </div>
                      </div>
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