import { NavLink } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isAuthenticated } from "../store";

const Navbar = () => {
  const userAuth = useRecoilValue(isAuthenticated);

  return (
    <div className="bg-[#494747]  text-white py-2 mb-8 sm:mb-16 md:mb-4 font-semibold sticky top-[80px] z-10">
      {userAuth && (
        <div className="flex space-x-2  bg-opacity-50 basis-1/2 mx-10 justify-around text-center ">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `w-[50%] py-3 hover:bg-gray-500 cursor-pointer ${
                isActive ? "bg-white text-slate-900 hover:text-slate-100" : ""
              }`
            }
          >
            All
          </NavLink>
          <NavLink
            to="/my-posts"
            className={({ isActive }) =>
              `w-[50%] py-3 hover:bg-gray-500 cursor-pointer ${
                isActive ? "bg-white text-slate-900 hover:text-slate-100" : ""
              }`
            }
          >
            My Posts
          </NavLink>
          <NavLink
            to="/following"
            className={({ isActive }) =>
              `w-[50%] py-3 hover:bg-gray-500 cursor-pointer ${
                isActive ? "bg-white text-slate-900 hover:text-slate-100" : ""
              }`
            }
          >
            Following Posts
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Navbar;
