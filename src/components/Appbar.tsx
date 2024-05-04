import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  useRecoilValue,
  useRecoilValueLoadable,
  useSetRecoilState,
} from "recoil";
import {
  authTokenState,
  isAuthenticated,
  myProfileDetailsAtom,
} from "../store";
import Searchbar from "./Searchbar";
import { IoIosAddCircle } from "react-icons/io";
import { CiSaveUp2 } from "react-icons/ci";

const Appbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const userAuth = useRecoilValue(isAuthenticated);
  const setAuthToken = useSetRecoilState(authTokenState);

  const navigate = useNavigate();

  const handleProfileClick = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuthToken(null);
    navigate("/login", { replace: true });
  };

  const [icon, setIcon] = useState<JSX.Element | null>(null);
  useEffect(() => {
    const path = location.pathname;
    const newIcon =
      path !== "/blog/create" ? (
        <IoIosAddCircle size={40} color="#ae7aff" />
      ) : (
        <CiSaveUp2 size={40} color="#ae7aff" />
      );
    setIcon(newIcon);
  }, [location.pathname]);
  const myProfileDetails = useRecoilValueLoadable(myProfileDetailsAtom);
  // const [isFollowing, setIsFollowing] = useState<Record<string, boolean>>({});
  const currentUser = myProfileDetails?.contents;
  return (
    <nav className="fixed w-full z-50 bg-[black] border-gray-200 px-4 py-3 flex items-center justify-around text-gray-100 text-sm md:text-lg font-semibold">
      <Link to="/" className="font-bold">
        Medium
      </Link>
      {userAuth && (
        <>
          <Searchbar />
          <Link to="/blog/create" className="mr-4">
            {icon}
          </Link>

          <button
            onClick={handleProfileClick}
            className="focus:outline-none w-8 h-8"
          >
            <img
              src="https://images.pexels.com/photos/7775642/pexels-photo-7775642.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="avatar"
              className="w-full h-full rounded-full object-cover"
            />
          </button>
          <div className="relative">
            {isOpen && (
              <ul className="absolute top-8 right-0 bg-[#121212] shadow-white shadow-md rounded-md divide-y  divide-gray-400 w-40 font-medium text-base text-center">
                <li
                  className="py-3 cursor-pointer hover:bg-gray-500 hover:rounded-t-md"
                  onClick={() => navigate(`/user/${currentUser?.id}`)}
                >
                  Profile
                </li>
                <li
                  className="px-4 py-3 cursor-pointer hover:bg-gray-500"
                  onClick={() =>
                    navigate(`/user/${currentUser?.id}/followings`)
                  }
                >
                  Followings
                </li>
                <li
                  className="px-4 py-3 cursor-pointer hover:bg-gray-500"
                  onClick={() => navigate(`/user/${currentUser?.id}/followers`)}
                >
                  Followers
                </li>
                <li
                  className="px-4 py-3 cursor-pointer hover:bg-gray-500"
                  onClick={() =>
                    navigate(`/user/${currentUser?.id}/suggestions`)
                  }
                >
                  Suggestions
                </li>
                <li
                  className="py-3 cursor-pointer hover:bg-gray-500  hover:rounded-b-md"
                  onClick={handleLogout}
                >
                  <button>Sign Out</button>
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
