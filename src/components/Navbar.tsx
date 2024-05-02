import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isAuthenticated } from "../store";

const Navbar = () => {
  const userAuth = useRecoilValue(isAuthenticated);

  const navigate = useNavigate();

  return (
    <div className="bg-[#494747]  text-white py-2 mb-8 sm:mb-16 md:mb-4 font-semibold sticky top-[80px] z-10">
      {userAuth && (
        <>
          <ul className="flex space-x-2  bg-opacity-50 basis-1/2 mx-10 justify-around text-center ">
            <li
              className="w-[50%] py-3 hover:bg-gray-500 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <button>All</button>
            </li>
            <li
              className="w-[50%] py-3 hover:bg-gray-500 cursor-pointer"
              onClick={() => navigate("/my-profile")}
            >
              <button>My Posts</button>
            </li>
            {/* Add more navigation links as needed  */}
            <li
              className="w-[50%] py-3 hover:bg-gray-500 cursor-pointer"
              onClick={() => navigate("/following")}
            >
              <button>Following</button>
            </li>
          </ul>
        </>
      )}
    </div>
  );
};

export default Navbar;
