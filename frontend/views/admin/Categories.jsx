import { useState } from "react";
import { useAddCatMutation, useDeleteCatMutation, useFetchAllCatsQuery, useUpdateCatMutation } from "../redux/feature/catAPI";
import CustomForm from "../components/admin/CustomForm";
import Swal from "sweetalert2";

const AdminCategories = () => {
    const {data : {cats = []} = {}} = useFetchAllCatsQuery();
    const [isOpenAdd, setIsOpenAdd] = useState(false);
    const [isOpenEdit, setIsOpenEdit] = useState(false);
    const [addCat, {}] = useAddCatMutation();
    const [updateCat, {}] = useUpdateCatMutation();
    const [deleteCat, {}] = useDeleteCatMutation();
    const [cat, setCat] = useState('');
    const [catID, setCatID] = useState('');
    const fieldInForm = [{
      id: "danh mục",
      type: "text",
      placeholder: "Nhập danh mục",
      value: cat,
      handler: setCat
    },
    {
      id: "catID",
      type: "hidden",
      placeholder: '',
      value: catID,
      handler: setCatID
    }];
    const handleAdd = () => {
        fieldInForm.map(item => item.handler(''))
        setIsOpenAdd(true)
    }
    const closeAdd = () => setIsOpenAdd(false);
    const handleEdit = (item) => {
        fieldInForm.map((iter) => {
          if(iter.id == "catID") {
          iter.handler(item._id)
          }
          else {
            iter.handler(item.name)
          }
    })
        setIsOpenEdit(true);
    }
    const closeEdit = () => setIsOpenEdit(false);
    const formAdd = async (e) => {
      e.preventDefault();
      if(cat == '') {
        Swal.fire({
                                position: "top-end",
                                icon: "warning",
                                title: "Category is a required field",
                                showConfirmButton: true,
                                timer: 1500
        });
      } else {
        const newCat = {
          name: cat
        }
        try {
          await addCat(newCat).unwrap();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Add category successfully",
            showConfirmButton: true,
            timer: 1500
          });
        } catch (err) {
          // console.log(err);
          if(err.status == 400) {
          Swal.fire({
            position: "top-end",
            icon: "warning",
            title: "Category already exists",
            showConfirmButton: true,
            timer: 1500
          });
        }
        else {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Failed to add the category",
            showConfirmButton: true,
            timer: 1500
          });
        }
        }
      }
      closeAdd()
    }
    const formEdit = async (e) => {
      e.preventDefault();
      if(cat == '') {
        Swal.fire({
                                position: "top-end",
                                icon: "warning",
                                title: "Category is a required field",
                                showConfirmButton: true,
                                timer: 1500
        });
      } else {
      const newCat = {
        name: cat
      }
      const id = catID
      try {
        await updateCat({id, ...newCat}).unwrap();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Update category successfully",
          showConfirmButton: true,
          timer: 1500
        });      
      } catch (error) {
        if(error.status == 404) {
          Swal.fire({
            position: "top-end",
            icon: "warning",
            title: "Category not found",
            showConfirmButton: true,
            timer: 1500
          });
        }
        else {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Fail to update category",
            showConfirmButton: true,
            timer: 1500
          });
        }
      }
    }
    closeEdit()
  }
  const handleDelete = async (id) => {
    if(confirm("Delete this product?")) {
      try {
        await deleteCat(id).unwrap();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Delete category successfully",
          showConfirmButton: true,
          timer: 1500
        });
      } catch (error) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Fail to delete category",
          showConfirmButton: true,
          timer: 1500
        });
      }
    }
  }
    return (
        <div className="flex flex-col items-center justify-center p-4 bg-colors-sky-300 h-screen ">
        <h1 className="text-2xl text-black-900 font-bold mt-8 mb-8">Danh mục của bạn</h1>
        <div className="w-full md:max-w-5xl ">
        <div className="w-full md:max-w-5xl flex justify-end mb-4">
            <button
      onClick={handleAdd}
      className="px-6 py-2 bg-colors-purple-600 text-colors-white font-semibold rounded-md hover:bg-colors-green-700 transition-colors"
            >
            Thêm danh mục
            </button>
            <CustomForm isOpen={isOpenAdd} closeModal={closeAdd} fields={fieldInForm} formSubmit={formAdd}/>
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
              onClick={() => handleEdit(item)}
              className="ml-2 px-4 py-2 bg-colors-yellow-400 text-gray-700 font-semibold text-sm rounded-md hover:bg-colors-green-400 transition-colors"
            >
              Chỉnh sửa
            </button>
            <CustomForm isOpen={isOpenEdit} closeModal={closeEdit} fields={fieldInForm} formSubmit={formEdit}/>
            {/* Remove Button */}
            <button
              onClick={() => handleDelete(item._id)}
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