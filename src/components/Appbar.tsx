import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authTokenState, isAuthenticated } from "../store/atom";

const Appbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const userAuth = useRecoilValue(isAuthenticated);
  const setAuthToken = useSetRecoilState(authTokenState);

  const navigate = useNavigate();

  //  const resetProfileDetails = useSetRecoilState(myProfileDetailsAtom);
  const handleProfileClick = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    // resetProfileDetails((profile) => profile === null);
    setAuthToken(null);
    navigate("/login", { replace: true });
  };
  return (
    <nav className="fixed w-full z-10 bg-[black] border-gray-200 px-4 py-3 flex items-center justify-around text-gray-100">
      <Link to="/" className="font-semibold text-lg">
        Medium
      </Link>
      {userAuth && (
        <>
          <ul className="hidden md:flex space-x-2  bg-opacity-50 basis-1/2 mr-10 justify-around text-center ">
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
          </ul>

          <div className="relative">
            <button onClick={handleProfileClick} className="focus:outline-none">
              <img
                src="https://flowbite.com/docs/images/logo.svg"
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
            </button>

            {isOpen && (
              <ul className="absolute top-10 right-0 bg-black shadow-md rounded divide-y divide-gray-100 w-48">
                <li className="px-4 py-2 hover:bg-gray-500">
                  <Link to="/profile">Profile</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-500">
                  <Link to="/settings">Settings</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-500">
                  <button onClick={handleLogout}>Sign Out</button>
                </li>
              </ul>
            )}
          </div>
        </>
      )}
    </nav>
  );
};

export default Appbar;
