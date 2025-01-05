import {useDispatch, useSelector} from "react-redux";
import { clearCart, removeFromCart } from "../redux/feature/cartSlice";
import { Link } from "react-router-dom";
import Currency from "../components/user/Currency";
import getBEURL from "../utils/backendURL";

const ShowCart = () => {
  const dispatch = useDispatch()
    const cartItems = useSelector(state => state.cart.cartItems)
    // const calculateTotal = cartItems.reduce((acc, item) => acc + Number(item['price'].replace(/,/g, '').replace(' VND', '')), 0)
    const calculateTotal = cartItems.reduce((acc, item) => acc + Number(item['price']), 0)
    const handleRemoveFromCart = (product) => {
        dispatch(removeFromCart(product))
    }
    const handleClearCart = () => {
        dispatch(clearCart())
    }
    return (

      <div className="relative min-h-screen py-4">
        <div className="bg-green-100 p-4 text-2xl font-bold text-left text-green-700">
            <span className='ml-8'>ThriftMate</span> <span className='text-3xl font-light'>|</span>
            <span className='font-medium ml-4'>Giỏ hàng của tôi</span>
        </div>
        <div className=" mx-auto p-4 w-full md:max-w-5xl">
          {/* Check if cart is empty */}
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-400">Giỏ hàng trống.</p>
          ) : (
            <>
        {/* Clear Cart Button */}
              <div className="w-full md:max-w-5xl flex justify-end mb-4">
                  <button
                    onClick={() => handleClearCart()}
                    className="px-6 py-2 bg-colors-red-600 text-colors-white rounded-md hover:bg-opacity-75"
                  >
                    Xoá tất cả
                  </button>
              </div>
        
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between w-full border-b border-gray-300 py-4"
                >
                  {/* Product Image */}
                  <img
                    src={`${getBEURL()}/images/${item?.image}`}
                    alt={item?.name}
                    className="w-16 h-16 object-cover rounded"
                  />

                  {/* Product Name */}
                  <h2 className="flex-1 text-base mx-4">{item?.name}</h2>
                  {/* Product Price */}
                  <p className="text-gray-500 font-md px-4 py-2"> <Currency amount={item?.price}/></p>

                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemoveFromCart(item)}
                    className="ml-2 px-4 py-2 text-colors-red-600 rounded-md hover:text-opacity-75 transition-colors"
                  >
                    Xoá
                  </button>
                </div>
              ))} 
            </div>
            </>
          )} 
        </div>

        {/* Checkout Button */}
        {cartItems.length > 0 && (
          <div className="mx-auto mt-8 w-full md:max-w-5xl flex justify-between items-center">
            <p className="text-lg font-semibold">
              Tổng cộng: <span className="text-2xl text-green-700"><Currency amount={calculateTotal? calculateTotal: 0} /></span>
            </p>
            <Link
              // onClick={handleCheckout}
              to={"/user/checkout"}
              className="px-6 py-2 bg-green-700 text-colors-white text-xl font-semibold rounded-md hover:scale-105 hover:bg-opacity-75 transition-colors"
            >
              Thanh toán
            </Link>
          </div>
        )}
      </div> 
        
      
  );
};

export default ShowCart;