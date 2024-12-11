import {useDispatch, useSelector} from "react-redux";
import { clearCart, removeFromCart } from "../redux/feature/cartSlice";

const ShowCart = () => {
  const dispatch = useDispatch()
    const cartItems = useSelector(state => state.cart.cartItems)
    const calculateTotal = cartItems.reduce((acc, item) => acc + Number(item['price'].replace(/,/g, '').replace(' VND', '')), 0)
    const handleRemoveFromCart = (product) => {
        dispatch(removeFromCart(product))
    }
    const handleClearCart = () => {
        dispatch(clearCart())
    }
    return (

    <div className="flex flex-col items-center justify-center mx-auto p-4">
  <h1 className="text-2xl text-green-700 font-bold mt-8">Your Cart</h1>
  <div className="w-full md:max-w-5xl">
    {/* Check if cart is empty */}
    {cartItems.length === 0 ? (
      <p className="text-center text-gray-500">Your cart is empty</p>
     ) : (
       <>
  {/* Clear Cart Button */}
        <div className="w-full md:max-w-5xl flex justify-end mb-4">
            <button
      onClick={() => handleClearCart()}
      className="px-6 py-2 bg-colors-purple-600 text-colors-white font-semibold rounded-md hover:bg-colors-green-700 transition-colors"
            >
             Clear Cart
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
              src={item?.image}
              alt={item?.name}
              className="w-16 h-16 object-cover rounded"
            />

            {/* Product Name */}
            <h2 className="flex-1 text-base mx-4 text-gray-700">{item?.name}</h2>
             {/* Product Price */}
             <p className="text-base text-gray-700 bg-colors-yellow-400 px-4 py-2">{item?.price}</p>

            {/* Remove Button */}
            <button
              onClick={() => handleRemoveFromCart(item)}
              className="ml-2 px-4 py-2 bg-colors-red-600 text-colors-white font-semibold text-sm rounded-md hover:bg-colors-green-400 transition-colors"
            >
              Remove
            </button>
          </div>
         ))} 
      </div>
      </>
     )} 
  </div>

  {/* Checkout Button */}
  {cartItems.length > 0 && (
    <div className="mt-8 w-full md:max-w-5xl flex justify-between items-center">
      <p className="text-lg font-semibold text-gray-700">
        Tong cong: {calculateTotal? calculateTotal.toLocaleString(): 0} VND
      </p>
      <button
        // onClick={handleCheckout}
        className="px-6 py-2 bg-green-700 text-white font-semibold rounded-md hover:bg-green-800 transition-colors"
      >
        Checkout
      </button>
    </div>
  )}
</div> 
        
      
  );
};

export default ShowCart;