import PersonIcon from '@mui/icons-material/Person';
import PaidIcon from '@mui/icons-material/Paid';
import InventoryIcon from '@mui/icons-material/Inventory';
import React, { useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Card = ({ icon, title, proportion, number }) => {
  // Map icons to a dictionary for clarity and extensibility

  const icons = {
    users: <PersonIcon size={32} />,
    transaction: <PaidIcon size={32} />,
    inventory: <InventoryIcon size={32} />,
  };

  return (
    <>
        <div className="bg-green-100 w-full sm:w-4/5 md:w-1/3 rounded-xl p-4 flex relative">
            <div className='flex w-2/5 flex-col justify-end gap-4 mr-5'>
                <CircularProgressbar 
                    value={proportion}
                    text={`${proportion}%`}
                    styles={buildStyles({
                        pathColor: 'rgb(21 128 61)', 
                        textColor: 'rgb(21 128 61)',   
                        trailColor: '#9FD4A3', 
                        textSize: '1em', 
                    })}
                />
            </div>
            <div className='w-3/5 flex flex-col justify-between mx-3 items-center'>
                <div className="flex gap-1 text-colors-green-900">
                    {icons[icon] || null}
                    <span className="text-xl">{title || "Untitled"}</span>
                </div>
                <span className="text-3xl font-bold text-colors-green-700">{number || "N/A"}</span>
                <span>Trong 24 giờ vừa qua</span>

            </div>
        </div>
    </>
  );
};

export default Card;
