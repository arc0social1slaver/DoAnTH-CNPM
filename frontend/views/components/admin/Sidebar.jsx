import { useState } from "react";
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { Link } from "react-router-dom";

import { SideBarData } from './Links';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';

const SideBar = () => {
  const [selected, setSelected] = useState(0);

  return (
    <div className="bg-green-100 h-screen w-20 md:w-full">
      <div className="flex flex-col gap-2.5 items-center w-full h-full">
        <div className="w-full flex items-center justify-center gap-2 mb-2 h-1/6 border-b-2">
          <img
            src="../../logo.png"
            alt="Logo"
            height={80}
            width={80}
          />
          <p className="text-colors-green-700 text-2xl font-bold hidden md:block">ThriftMate</p>
        </div>
        <div className="w-full flex flex-col justify-center h-4/6">
          {SideBarData.map((item, index) => {
            return (
              <Link
                className={`${
                  selected === index ? "bg-green-900 text-white-100" : ""
                } w-full py-7 hover:bg-green-700 transition ease-in-out delay-75 cursor-pointer flex items-center justify-center gap-2`}
                key={index}
                onClick={() => setSelected(index)} 
                to={item.url}
              >
                <item.icon />
                <span className="hidden md:block">
                  {item.title}
                </span>
              </Link>
            );
          })}
        </div>

        <div className="h-1/6 w-full flex items-center justify-center gap-3 text-xl cursor-pointer hover:text-green-900">
          <span className="transition-all ease-in-out delay-75 hidden md:block">Log out</span>
          <Link className="py-5 transition-all ease-in-out delay-75 bottom-5">
            <ExitToAppOutlinedIcon className="transition-all ease-in-out delay-75 text-4xl" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
