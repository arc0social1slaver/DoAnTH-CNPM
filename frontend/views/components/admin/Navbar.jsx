import { useState } from "react";
import {Link} from "react-router-dom";
const Navbar = ({changeSB}) => {
  const [isProfileActive, setProfileActive] = useState(false);
  const toggleProfile = () => {
    setProfileActive(state => !state)
    // changeSB()
  };
    return (
      <>      
      <header className="bg-white sticky top-0 z-10 border-b">
      <section className="flex items-center justify-between p-6 max-w-screen-xl mx-auto">
        {/* <a href="" className="text-3xl font-bold text-black">Jobseeker App</a> */}
        <Link to={""} className="text-3xl font-bold text-black uppercase">admin dashboard</Link>
        <div className="flex items-center gap-4">
          <div id="menu-btn" className="fas fa-bars text-xl cursor-pointer" onClick={changeSB}></div>
          <div id="search-btn" className="fas fa-search text-xl cursor-pointer"></div>
          <div id="user-btn" className="fas fa-user text-xl cursor-pointer" onClick={toggleProfile}></div>
        </div>
        <div className={`absolute top-[120%] right-8 w-80 p-6 bg-gray-100 text-center rounded-lg transform origin-top-right transition-all duration-200 ${isProfileActive ? 'scale-100' : 'scale-0'}`}>
          {/* {userId ? ( */}
            <>
              <h3 className="text-2xl text-black"></h3>
              <Link to={""} className="bg-blue-500 text-white py-2 px-6 rounded-lg mt-4 block">Logout</Link>
            </>
           {/* ) : (  */}
            <div className="flex gap-4">
              <Link to={""} className="bg-blue-100 text-black py-2 px-6 rounded-lg">Login</Link>
              <Link to={""} className="bg-blue-100 text-black py-2 px-6 rounded-lg">Register</Link>
            </div>
          {/* )}  */}
        </div>
      </section>
    </header>
    </>
    );
  }
  
  export default Navbar;
  