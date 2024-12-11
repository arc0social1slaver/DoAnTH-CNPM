import {Link} from "react-router-dom";
const Sidebar = ({isSBActive, changeSB}) => {
  const navigation = [
    {name: "Dashboard", href: "#", icon: "fa-home"},
    {name: "User", href: "#", icon: "fa-folder-open"}
  ]
    return (
      <>
         <div className={`fixed top-0 left-0 h-full w-[30rem] bg-gray-100 border-r z-20 transform transition-all duration-200 ${!isSBActive ? 'translate-x-0' : '-translate-x-full'}`}>
        <div id="close-btn" className="text-right p-6 block xl:hidden" onClick={changeSB}>
          <i className="fas fa-times text-3xl text-white bg-red-500 rounded-full p-4 cursor-pointer"></i>
        </div>
        <div className="p-6 border-b flex justify-center items-center">
          <img src="logo.png" alt="profile" className="h-[10rem] w-[10rem] rounded-full object-cover mb-2" />
          {/* {userId && ( */}
            {/* <> */}
              {/* <h3 className="text-2xl text-black"></h3>
              <Link to={""} className="bg-blue-500 text-white py-2 px-6 rounded-lg mt-4 block">View your CV</Link> */}
            {/* </> */}
          {/* )} */}
        </div>
        <nav>
          {/* <Link to={""} className="block py-6 px-4 text-xl border-b hover:bg-blue-100 flex items-center gap-4">
            <i className="fas fa-home text-black"></i>
            <span className="text-black">Homepage</span>
          </Link>
          <Link to={""} className="block py-6 px-4 text-xl border-b hover:bg-blue-100 flex items-center gap-4">
            <i className="fas fa-folder-open text-black"></i>
            <span className="text-black">Viewers</span>
          </Link> */}
          {
            navigation.map((item) => (
              <Link to={item.href} key={item.name} className="block py-6 px-4 text-xl border-b hover:bg-blue-100 flex items-center gap-4">
            <i className={`fas text-black ${item.icon}`}></i>
            <span className="text-black">{item.name}</span>
          </Link>
            ))
          }
        </nav>
      </div>
      </>
    );
  }
  
export default Sidebar;
  