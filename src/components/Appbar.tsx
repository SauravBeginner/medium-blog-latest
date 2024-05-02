import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authTokenState, isAuthenticated } from "../store";
import Searchbar from "./Searchbar";

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
    <nav className="fixed w-full z-50 bg-[black] border-gray-200 px-4 py-3 flex items-center justify-around text-gray-100 text-sm md:text-lg font-semibold">
      <Link to="/" className="font-bold">
        Medium
      </Link>
      {userAuth && (
        <>
          <Searchbar />

          <div className="relative">
            <button onClick={handleProfileClick} className="focus:outline-none">
              <img
                src="https://flowbite.com/docs/images/logo.svg"
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
            </button>

            {isOpen && (
              <ul className="absolute top-10 right-0 bg-neutral-900 shadow-md rounded-xl divide-y divide-gray-100 w-48 font-bold">
                <li className="px-4 py-4 hover:bg-gray-500">
                  <Link to="/profile">Profile</Link>
                </li>
                <li className="px-4 py-4 hover:bg-gray-500">
                  <Link to="/settings">Settings</Link>
                </li>
                <li className="px-4 py-4 hover:bg-gray-500">
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
