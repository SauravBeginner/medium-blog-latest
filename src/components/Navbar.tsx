import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-[#121212] border-b text-base md:text-lg border-[white]/60 text-white p-4 flex justify-around items-center sticky top-0 z-10 mb-4">
      <div className="flex space-x-8">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `border-b-4 px-4 pb-2  ${
              // isActive ? "bg-white text-slate-900 hover:text-slate-100" : ""
              isActive
                ? "border-[#ae7aff] text-white font-semibold"
                : "border-transparent text-gray-500"
            }`
          }
        >
          Explore
        </NavLink>
        <NavLink
          to="/following-blogs"
          className={({ isActive }) =>
            `border-b-4 px-4 pb-2  ${
              // isActive ? "bg-white text-slate-900 hover:text-slate-100" : ""
              isActive
                ? "border-[#ae7aff] text-white font-semibold"
                : "border-transparent text-gray-500"
            }`
          }
        >
          Following Posts
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
