import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

const CategoryCard = ({ name, date, onDelete, onModify }) => {
  return (
    <div className="bg-white-100 w-full rounded-xl p-4 flex items-center gap-4 mb-2">
        <div className='ml-3 hover:text-green-900 transition-all cursor-pointer' onClick={onModify}>
            <ModeEditIcon />
        </div>
        <div className="flex w-full items-center">
            <p className="w-2/5 text-center pointer-events-none">{name}</p>
            <p className="w-3/5 pointer-events-none"><span className='text-colors-gray-600 hidden md:block'>Ngày tạo: </span> {date}</p>
        </div>
        <div className='mr-3 text-colors-red-500 hover:text-colors-red-800 transition-all cursor-pointer' onClick={onDelete}>
            <DeleteIcon />
        </div>
    </div>
  );
};

export default CategoryCard;
