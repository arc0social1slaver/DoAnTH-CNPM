// import {Link} from "react-router-dom";
// const Sidebar = ({isSBActive, changeSB}) => {
//   const navigation = [
//     {name: "Dashboard", href: "#", icon: "fa-home"},
//     {name: "User", href: "#", icon: "fa-folder-open"}
//   ]
//     return (
//       <>
//          <div className={`fixed top-0 left-0 h-full w-[30rem] bg-gray-100 border-r z-20 transform transition-all duration-200 ${!isSBActive ? 'translate-x-0' : '-translate-x-full'}`}>
//         <div id="close-btn" className="text-right p-6 block xl:hidden" onClick={changeSB}>
//           <i className="fas fa-times text-3xl text-white bg-red-500 rounded-full p-4 cursor-pointer"></i>
//         </div>
//         <div className="p-6 border-b flex justify-center items-center">
//           <img src="logo.png" alt="profile" className="h-[10rem] w-[10rem] rounded-full object-cover mb-2" />
//           {/* {userId && ( */}
//             {/* <> */}
//               {/* <h3 className="text-2xl text-black"></h3>
//               <Link to={""} className="bg-blue-500 text-white py-2 px-6 rounded-lg mt-4 block">View your CV</Link> */}
//             {/* </> */}
//           {/* )} */}
//         </div>
//         <nav>
//           {/* <Link to={""} className="block py-6 px-4 text-xl border-b hover:bg-blue-100 flex items-center gap-4">
//             <i className="fas fa-home text-black"></i>
//             <span className="text-black">Homepage</span>
//           </Link>
//           <Link to={""} className="block py-6 px-4 text-xl border-b hover:bg-blue-100 flex items-center gap-4">
//             <i className="fas fa-folder-open text-black"></i>
//             <span className="text-black">Viewers</span>
//           </Link> */}
//           {
//             navigation.map((item) => (
//               <Link to={item.href} key={item.name} className="block py-6 px-4 text-xl border-b hover:bg-blue-100 flex items-center gap-4">
//             <i className={`fas text-black ${item.icon}`}></i>
//             <span className="text-black">{item.name}</span>
//           </Link>
//             ))
//           }
//         </nav>
//       </div>
//       </>
//     );
//   }
  
// export default Sidebar;
  
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
