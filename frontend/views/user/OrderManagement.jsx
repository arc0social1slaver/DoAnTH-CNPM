import { useEffect, useState } from 'react';
import OrderSidebar from '../components/user/OrderSidebar';
import Swal from "sweetalert2";
import { useFetchMyStoreQuery, useLazyFetchMyStoreByStatQuery, useUpdateOrderMutation } from '../redux/feature/orderAPI';
import getBEURL from "../utils/backendURL";
import Currency from '../components/user/Currency';

const OrderManagement = () => {
  if(!sessionStorage.getItem('user')) return null
  const id = JSON.parse(sessionStorage.getItem('user'))?._id;
  const [selectedStatus, setSelectedStatus] = useState('All');
  const {data : {myOrders = []} = [], isLoading, isFetching} = useFetchMyStoreQuery(id);
  const [getOrders , {}] = useLazyFetchMyStoreByStatQuery();
  const [updOrder, {}] = useUpdateOrderMutation();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedOrder, setSelectedOrders] = useState({
    id: '',
    status: '',
  });

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
  };
  const handleModifyClick = (item) => {
    setShowForm(true);
    setSelectedOrders({
      id: item?._id,
      status: item?.status,
    });
}
const handleCancelButton = () => {
  setShowForm(false);
  setSelectedOrders({
    id: '',
    status: ''
  });
}
  const filteredOrders = orders;
// console.log(filteredOrders);

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
      case 'Pending': return 'Đã đặt';
      case 'Shipping': return 'Đang vận chuyển';
      case 'Delivered': return 'Đã giao';
      default: return 'Tất cả đơn hàng';
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedOrders((prev) => ({
    ...prev,
    [name]: value
    }));        
  };
  const handleSubmit = async (e) => {
          e.preventDefault();
          // setProducts(prev => [...prev, { ...newProduct, id: Date.now() }]);
          // console.log(newProduct);
          if(Object.values(selectedOrder).includes('')) {
              Swal.fire({
                  position: "center",
                  icon: "warning",
                  title: "Trạng thái đơn hàng không được để trống",
                  showConfirmButton: true,
                  timer: 1500
              });
          }
          else {
              const id = selectedOrder.id;
              const newOrder = {
                status: selectedOrder.status
              }
              try {
                await updOrder({id, ...newOrder}).unwrap();
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Trạng thái đơn hàng cập nhập thành công",
                  showConfirmButton: true,
                  timer: 1500
                });
              } catch (error) {
                    console.log(error);
                    if(error.status === 404) {
                        Swal.fire({
                            position: "center",
                            icon: "warning",
                            title: "Đơn hàng không tìm thấy",
                            showConfirmButton: true,
                            timer: 1500
                        });
                    }
                    else {
                        Swal.fire({
                            position: "center",
                            icon: "error",
                            title: "Chỉnh sửa đơn hàng thất bại",
                            showConfirmButton: true,
                            timer: 1500
                        });
                    }
              }
          }
          setShowForm(false);
          setSelectedOrders({
            id: '',
            status: '',
          });
    };
  useEffect(() => {
      if(!isLoading) {
        setOrders(myOrders);
        setLoading(false);
      }
      else {
        setLoading(true);
      }
    }, [isFetching]);
    useEffect(() => {
      const fetchMyOrders = async () => {
        const stat = selectedStatus
        try {
          const response = await getOrders({id, stat}).unwrap();
          setOrders(response.myOrders);
        } catch (error) {
          console.log(error);
        }
      }
      if(selectedStatus != "All") {
        fetchMyOrders()
      }
    }, [selectedStatus]);
  if(loading) return <div>Loading</div>
  return (
    <div className="flex flex-row min-h-screen">
      <OrderSidebar onStatusChange={handleStatusChange} title={"Quản lý đơn hàng"} />
      <main className="pl-64 flex-1 border-l border-gray-200">
        <div className="py-4">
          <h2 className="bg-green-100 p-4 text-2xl text-center font-bold mb-6 text-green-700">{getStatusTitle()}</h2>
          <div className="p-6 space-y-4">
            {filteredOrders.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-400">Chưa có đơn hàng nào.</p>
              </div>
            ) : (
              filteredOrders.map((order, index) => (
                <div className="bg-colors-white border p-4 rounded-lg shadow flex items-start space-x-4" key={index}>
                {/* Product Image */}
                <div className="flex-shrink-0">
                    <img
                        src={`${getBEURL()}/images/${order.images[0]}`}
                        alt={order.products[0]}
                        className="w-20 h-20 object-cover rounded-md"
                    />
                </div>

                {/* Existing Order Info */}
                <div className="flex-1">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="font-normal">Đơn hàng #{index + 1}</h3>
                            {
                                order.products.map((product, index) => (
                                    <p key={index} className="font-bold text-green-700 text-lg">{product}</p>
                                ))
                            }
                            <p className="text-gray-500">{new Date(order.createdAt).toLocaleString('vi-VN')}</p>
                        </div>
                        <div>
                            <p className="font-bold"><Currency amount={order.price}/></p>
                            <p className="">Trạng thái: {getNameStatus(order.status)}</p>
                            <button className="mt-2 text-colors-blue-500 hover:text-blue-700" onClick={() => handleModifyClick(order)}>
                                Chuyển trạng thái đơn hàng
                            </button>
                        </div>
                    </div>
                </div>
            </div>
              ))
            )}
          </div>
        </div>
      </main>

      {showForm && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-colors-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto relative border border-gray-200 shadow-xl">
                <h2 className="text-2xl font-bold mb-6 text-center text-green-700">Chỉnh sửa trạng thái đơn hàng</h2>
                
                <form onSubmit={handleSubmit}  className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Trạng thái</label>
                    <select
                      name="status"
                      value={selectedOrder.status}
                      onChange={handleChange}
                      className="w-full border border-gray-400 rounded-lg p-2"
                      required
                    >
                    <option value="" disabled>Chọn trạng thái</option>
                    <option value="Pending">Đã đặt</option>
                    <option value="Shipping">Đang vận chuyển</option>
                    <option value="Delivered">Đã giao</option>
                    </select>
                </div>

                <div className="flex justify-center space-x-4 mt-6">
                    <button
                    type="button"
                    onClick={() => handleCancelButton()}
                    className="px-6 py-2 bg-green-100 hover:bg-green-700 text-white rounded-lg shadow-lg transition duration-200 ease-in-out transform hover:scale-105"
                    >
                    Hủy
                    </button>
                    <button
                    type="submit"
                    className="px-6 py-2 bg-green-100 hover:bg-green-700 text-white rounded-lg shadow-lg transition duration-200 ease-in-out transform hover:scale-105"
                    >
                   Chỉnh sửa trạng thái
                    </button>
                </div>
                </form>
            </div>
            </div>
        )}
    </div>
  );
};

export default OrderManagement;