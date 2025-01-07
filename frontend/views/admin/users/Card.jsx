import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import getBEURL from '../../utils/backendURL';

const Card = ({ isActive, avt, name, email, onDelete }) => {
  return (
    <div className="bg-white-100 w-full rounded-xl p-4 flex items-center gap-4 mb-2">
        <div>
            <img src={avt ? `${getBEURL()}/images/${avt}` : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} alt="avatar" width={60} height={60} className="rounded-full"/>
        </div>
        <div className="flex w-full items-center">
            <p className="w-1/5 text-center pointer-events-none">{name}</p>
            <div className="w-1/5 flex justify-start">
                <p
                    className={`inline-block p-2 rounded-md text-sm pointer-events-none ${
                    isActive
                        ? 'bg-colors-green-300 text-colors-green-900'
                        : 'bg-gray-300 text-gray-700'
                    }`}
                >
                    {isActive ? 'Đang hoạt động' : 'Không hoạt động'}
                </p>
            </div>
            <p className="w-3/5 pointer-events-none">{email}</p>
            <div className='mr-3 text-colors-red-500 hover:text-colors-red-800 transition-all cursor-pointer' onClick={onDelete}>
                <DeleteIcon />
            </div>
        </div>
    </div>
  );
};

export default Card;
