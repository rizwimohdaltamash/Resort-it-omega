import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from '../../assets/logoicon.jpg';

const Navbar = () => {
  // get user from localStorage
  const storedUser = localStorage.getItem("users");
  const user = storedUser ? JSON.parse(storedUser) : null;

  // navigate
  const navigate = useNavigate();

  // logout function
  const logout = () => {
    localStorage.removeItem("users");
    navigate("/login");
  };

  // State to manage dropdown visibility
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  // Toggle dropdown
  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  // navList Data
  const navList = (
    <ul className="flex flex-row justify-evenly text-center items-center space-x-9 text-white font-medium text-md lg:px-5 lg:mx-0 mx-2 w-full">
     
      {/* Home */}
      <li className="hover:text-gray-300 text-md lg:text-lg">
        <Link to={"/"}>Home</Link>
      </li>

      {/* Signup */}
      {!user ? (
        <li className="hover:text-gray-300 text-md lg:text-lg">
          <Link to={"/signup"}>Signup</Link>
        </li>
      ) : (
        ""
      )}

      {/* Drop down */}

      {/* Login */}
      {!user ? (
        <li className="hover:text-gray-300 text-md lg:text-lg">
          <Link to={"/login"}>Login</Link>
        </li>
      ) : (
        ""
      )}

      {/* User */}
      {/* {user?.name} */}
      {(user?.role === "scrapdealer" || user?.role === "ngo") && (
        <li className="hover:text-gray-300 text-md lg:text-lg">
          <Link to={"/user-dashboard"}>Dashboard </Link>
        </li>
      )}

      {/* Admin */}
      {/* {user?.name} */}
      {user?.role === "user" && (
        <li className="hover:text-gray-300 text-sm lg:text-lg">
          <Link to={"/owner-dashboard"}> User-Dash</Link>
        </li>
      )}

      {/* Dropdown */}
      {user?.role === "user" && (
       <li className="relative text-md lg:text-lg">
       <button
         onClick={toggleDropdown}
         className="hover:text-gray-300 focus:outline-none"
       >
         Features
       </button>
       {isDropdownOpen && (
         <ul className="absolute top-full left-[-4rem] mt-2 w-48 bg-[#0a2540] text-white shadow-lg">
            <li className=" hover:bg-[#c1f8d3f8]  hover:text-[#25934af8] text-[#0ae854f8]   px-4 py-2">
             <Link to="/scrap">Scrap Deals</Link>
           </li>
           <li className=" hover:bg-[#c1f8d3f8]  hover:text-[#25934af8] text-[#0ae854f8]   px-4 py-2">
             <Link to="/message">Community Page</Link>
           </li>
           <li className="hover:bg-[#c1f8d3f8] hover:text-[#25934af8] text-[#0ae854f8]  px-4 py-2">
             <Link to="/gemini">AI Chat Bot</Link>
           </li>
           <li className="hover:bg-[#c1f8d3f8]  hover:text-[#25934af8] text-[#0ae854f8]  px-4 py-2">
             <Link to="/govscheme">GovScheme</Link>
           </li>
           <li className="hover:bg-[#c1f8d3f8]  hover:text-[#25934af8] text-[#0ae854f8]  px-4 py-2">
             <Link to="/skills">Skills</Link>
           </li>
         </ul>
       )}
       
 
 
     </li>
      )}
     
      
      
      

      {/* Logout */}
      {user && (
        <li
          className=" bg-[#0ae854f8] hover:bg-[#25934af8] px-2 py-1 rounded-md cursor-pointer text-sm lg:text-lg "
          onClick={logout}
        >
          Logout
        </li>
      )}
    </ul>
  );

  return (
    <nav className="bg-[#0a2540] sticky top-0 z-50">
      {/* main  */}
      <div className="flex lg:flex-row flex-col lg:justify-between items-center py-3 lg:px-3 ">
        {/* left  */}

        <div className="left py-3 lg:py-0  lg:w-[15%]">
          <Link to={"/"}>
            <div className="flex flex-row justify-center items-center">
              <h2 className="text-3xl text-white mr-1">
                <img src={Logo} className="w-[25px]" alt="" />
              </h2>
              <h2 className=" font-bold text-white text-2xl text-center">
                ReSort-It
              </h2>
            </div>
          </Link>
        </div>

        <div className="flex lg:flex-row flex-col lg:justify-end lg:items-center lg:w-[85%] w-full">
          {/* right  */}
          <div className=" order-1 lg:order-2 right flex justify-center mb-2 lg:mb-0 lg:w-[50%] w-full">
            {navList}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
