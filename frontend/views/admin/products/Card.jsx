import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const Card = ({ img, name, price, category, stock, onDelete, onModify }) => {
  return (
    <div className="bg-white-100 w-64 rounded-xl p-4 flex flex-col gap-4 mb-2">
        <div className='w-full flex justify-center'>
            <img src={img} alt="product image" width={200} height={200}/>
        </div>
        <div className="flex w-full items-center flex-col gap-2">
            <p className="text-center pointer-events-none text-xl text-bold">{name}</p>
            <div className="flex justify-start">
                <p
                    className={`inline-block px-2 py-1 bg-green-700 text-colors-green-900 rounded-md text-sm pointer-events-none`}
                >
                    {category}
                </p>
            </div>
            <div className='w-full px-3 pointer-events-none flex justify-between'>
                <p className=''>Số lượng: <span>{stock}</span></p>
                <p>Giá: <span>{price}</span></p>
            </div>
            <div className='w-full flex justify-between mt-3'>
                <div className='py-1 px-2 bg-green-900 hover:bg-colors-green-700 text-white-100 transition-all rounded-sm cursor-pointer flex gap-1 items-center justify-center' onClick={onModify}>
                    <ModeEditIcon className='hover:text-green-900 transition cursor-pointer'/>
                    <span>Chỉnh sửa</span>
                </div>
                <div className='py-1 px-2 bg-colors-red-500 hover:bg-colors-red-800 text-white-100 transition-all cursor-pointer rounded-sm flex gap-1 items-center justify-center' onClick={onDelete}>
                    <DeleteIcon className='text-white-100 hover:text-white-100' />
                    <span>Xóa</span>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Card;
