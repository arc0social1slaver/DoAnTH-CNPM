import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Currency from "../components/user/Currency";
import Swal from "sweetalert2";
import { useCreateOrderMutation } from "../redux/feature/orderAPI";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/feature/cartSlice";

const Checkout = () => {
    if(!sessionStorage.getItem('user')) return null;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [shippingAddress, setShippingAddress] = useState('');
    const [shippingDist, setShippingDist] = useState('');
    const [shippingCity, setShippingCity] = useState('');
    const cartItems = useSelector(state => state.cart.cartItems);
    const [addOrder, {}] = useCreateOrderMutation();
    const calculateTotal = cartItems.reduce((acc, item) => acc + Number(item['price']), 0)
    
    const handleOrder = async (e) => {
        e.preventDefault()
        if (shippingAddress === '' || shippingDist === '' || shippingCity === '') {
            Swal.fire({
                                    position: "center",
                                    icon: "warning",
                                    title: "Thông tin không được để trống",
                                    showConfirmButton: true,
                                    timer: 1500
            });
        }
        else {
            const newOrder = {
                address: {
                    city: shippingCity,
                    district: shippingDist,
                    street: shippingAddress
                },
                prodIDs: cartItems.map((item) => item._id),
                userID: JSON.parse(sessionStorage.getItem('user'))._id,
            }
            // console.log(newOrder);
            
            try {
                await addOrder(newOrder).unwrap();
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Đặt hàng thành công",
                    showConfirmButton: true,
                    timer: 1500
                });
                dispatch(clearCart());
                navigate("/user");
            } catch (error) {
                console.log(error);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Lỗi đặt hàng",
                    showConfirmButton: true,
                    timer: 1500
                });   
            }
        }
    }
    return (
        <div className="min-h-screen bg-colors-white">
            {/* Header */}
            <div className="bg-green-100 p-4 mt-8 text-2xl font-bold text-left text-green-700">
                <span className='ml-8'>ThriftMate</span> <span className='text-3xl font-light'>|</span>
                <span className='font-medium ml-4'>Thanh toán</span>
            </div>

            {/* Nội dung chính */}
            <div className="container mx-auto mt-8 px-8">
                <form onSubmit={handleOrder}>
                    <div className="bg-colors-white shadow border border-gray-200 rounded-lg p-6 mb-4">
                        <h2 className="text-lg font-semibold mb-2">
                            Tổng giá trị đơn hàng
                        </h2>
                        <p className="text-gray-700"><Currency amount={calculateTotal} /></p>
                    </div>
                    <div className="bg-colors-white shadow border border-gray-200 rounded-lg p-6 mb-4">
                        <h2 className="text-lg font-semibold mb-2">
                            Số lượng đơn hàng
                        </h2>
                        <p className="text-gray-700">{cartItems.length}</p>
                    </div>
                    {/* Địa chỉ nhận hàng */}
                    <div className="bg-colors-white justify-center shadow border border-gray-200 rounded-lg p-6 mb-8">
                        
                            <h2 className="text-lg font-semibold mb-2">
                                Địa chỉ nhận hàng
                            </h2>
                            <div className="mb-6">
                                <label htmlFor="addr" className="block">Địa chỉ / Số nhà</label>
                                <input
                                    type="text"
                                    id="addr"
                                    className="w-full px-4 py-2 mt-2 border border-gray-400 rounded-lg"
                                    value={shippingAddress}
                                    onChange={(e) => setShippingAddress(e.target.value)}
                                    placeholder="Nhập địa chỉ tại đây"
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="dist" className="block">Quận, Huyện, Thành phố</label>
                                <input
                                    type="text"
                                    id="dist"
                                    className="w-full px-4 py-2 mt-2 border border-gray-400 rounded-lg"
                                    value={shippingDist}
                                    onChange={(e) => setShippingDist(e.target.value)}
                                    placeholder="Nhập quận, huyện, thành phố tại đây"
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="city" className="block">Tỉnh</label>
                                <input
                                    type="text"
                                    id="city"
                                    className="w-full px-4 py-2 mt-2 border border-gray-400 rounded-lg"
                                    value={shippingCity}
                                    onChange={(e) => setShippingCity(e.target.value)}
                                    placeholder="Nhập tỉnh tại đây"
                                    required
                                />
                            </div>
                        
                        {/* <p className="text-gray-700">{shippingAddress}</p> */}
                        
                    </div>
                    <div className="w-full flex justify-center">
                        <button
                            type="submit"
                            className="flex items-center px-16 py-4 text-colors-white text-xl font-bold bg-green-700 rounded-lg hover:bg-opacity-75 hover:scale-105 mb-8"
                        >
                            Đặt hàng
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Checkout;
