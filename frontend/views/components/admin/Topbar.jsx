import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
// import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import { DarkModeOutlined, NotificationsOutlined, SettingsOutlined, PersonOutlined } from '@mui/icons-material';

import { IconButton, InputBase } from '@mui/material';

const Topbar = () => {
  return (
    <>
      <div className="bg-green-700 h-16 flex justify-between">
        {/* Search bar */}
        <div className="flex items-center p-2.5 space-x-2">
          {/* Search input */}
          <InputBase
            placeholder="Search"
            className="bg-green-100 p-3 rounded-xl w-full my-1 h-3/4 shadow-md"
            inputProps={{ 'aria-label': 'search' }}
          />
          <IconButton type='button'>
            <FontAwesomeIcon icon={faMagnifyingGlass} className='text-colors-green-900'/> {/* Use the icon here */}
          </IconButton>
        </div>

        <div className="flex items-center mr-4">
          <IconButton>
            <DarkModeOutlined className='text-colors-green-900'/>
          </IconButton>
          <IconButton>
            <NotificationsOutlined className='text-colors-green-900'/>
          </IconButton>
          <IconButton>
            <SettingsOutlined className='text-colors-green-900'/>
          </IconButton>
          <IconButton>
            <PersonOutlined className='text-colors-green-900'/>
          </IconButton>
        </div>
      </div>
    </>
  );
};

export default Topbar;
