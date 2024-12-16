import { useState } from "react";
import { useFetchAllCatsQuery } from "../redux/feature/catAPI";

const AdminCategories = () => {
    const {data : {cats = []} = {}} = useFetchAllCatsQuery();
    const [isOpenAdd, setIsOpenAdd] = useState(false);
    const [isOpenEdit, setIsOpenEdit] = useState(false);
    const handleAdd = () => {
        setIsOpenAdd(true);
        setIsOpenEdit(false);
    }
    const handleEdit = () => {
        setIsOpenEdit(true);
        setIsOpenAdd(false);
    }
    return (
        <div className="flex flex-col items-center justify-center p-4 bg-colors-sky-300 h-screen ">
        <h1 className="text-2xl text-black-900 font-bold mt-8 mb-8">Danh mục của bạn</h1>
        <div className="w-full md:max-w-5xl ">
        <div className="w-full md:max-w-5xl flex justify-end mb-4">
            <button
      onClick={() => handleAdd()}
      className="px-6 py-2 bg-colors-purple-600 text-colors-white font-semibold rounded-md hover:bg-colors-green-700 transition-colors"
            >
            Thêm danh mục
            </button>
            </div>
            {cats.length === 0 ? (
               <p className="text-center text-gray-500">Không có danh mục</p> 
            ) : (                
                <div className="space-y-4 border-2 border-colors-black">
        {cats.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between w-full border-b border-colors-black py-4 px-4"
          >

            {/* Product Name */}
            <h2 className="flex-1 text-base mx-4 text-gray-700">{item?.name}</h2>
             {/* Product Price */}
             {/* <p className="text-base text-gray-700 bg-colors-yellow-400 px-4 py-2">{item?.price}</p> */}

             <button
            //   onClick={() => handleRemoveFromCart(item)}
              className="ml-2 px-4 py-2 bg-colors-yellow-400 text-gray-700 font-semibold text-sm rounded-md hover:bg-colors-green-400 transition-colors"
            >
              Chỉnh sửa
            </button>
            {/* Remove Button */}
            <button
            //   onClick={() => handleRemoveFromCart(item)}
              className="ml-2 px-4 py-2 bg-colors-red-600 text-colors-white font-semibold text-sm rounded-md hover:bg-colors-green-400 transition-colors"
            >
              Xóa
            </button>
          </div>
         ))} 
      </div>
            )}
        </div>
        </div>
    );
}

export default AdminCategories;