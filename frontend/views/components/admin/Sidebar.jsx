import { useState } from "react";
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { Link } from "react-router-dom";
import Logo from "../Logo";

import { SideBarData } from './Links';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';

const SideBar = () => {

  const [selected, setSelected] = useState(0);

  return (
    <div className="bg-white-100 h-screen">
      <div className="flex flex-col gap-2.5 items-center w-full h-full">
        <div className="w-full flex items-center justify-center gap-2 mb-2 h-1/6 border-b-2">
          <img
              src="../../logo.png"
              alt="Logo"
              height={50}
              width={50}
            />
          <p className="text-green-900 text-2xl font-bold">ThriftMate</p>
        </div>
        <div className="w-full flex flex-col justify-evenly h-4/6">
          {SideBarData.map((item, index)=>{
            return(
              <Link
                className={`${
                  selected === index ? "bg-colors-green-200" : ""
                } w-full py-7 hover:bg-colors-green-200 transition ease-in-out delay-75 cursor-pointer flex items-center justify-center gap-2`}
                key={index}
                onClick={() => setSelected(index)} 
                to={item.url}
              >
                
                <item.icon/>
                <span>
                  {item.title}
                </span>
              </Link>
            )
          })}

        </div>
        
          <div className="h-1/6 w-full flex items-center justify-center gap-3 text-xl cursor-pointer hover:text-green-900">
            <span className="transition-all ease-in-out delay-75">Log out</span>
            <Link className="py-5 transition-all ease-in-out delay-75 bottom-5">
              <ExitToAppOutlinedIcon className="transition-all ease-in-out delay-75 text-4xl" />
            </Link>
          </div>
      </div>
    </div>
  );
};

export default SideBar;
