import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { IoIosAddCircle } from "react-icons/io";
import Searchbar from "./Searchbar";
import { imgSrc } from "../utils/baseUrl";
import { useRecoilState, useRecoilStateLoadable } from "recoil";
import { authState, myProfileDetailsAtom } from "../store/atoms/userAtoms";

const Appbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [showAppbar, setShowAppbar] = useState(true);
  const [lastScrollY, setlastScrollY] = useState(0);
  const [authStatus, setAuthStauts] = useRecoilState(authState);
  const dropdownRef = useRef(null);
  const btnRef = useRef(null);

  const navigate = useNavigate();
  const handleProfileClick = () => {
    setIsOpen((prev) => !prev);
  };
  useEffect(() => {
    setIsOpen(false);
    const handleClickOutside = (event: any) => {
      if (
        dropdownRef.current &&
        btnRef.current &&
        //@ts-ignore
        !dropdownRef.current.contains(event.target) &&
        //@ts-ignore
        !btnRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // if user scroll on y access then navbar colour will be change.
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowAppbar(false);
      } else {
        setShowAppbar(true);
      }
      setlastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const [myProfileDetails, setMyProfileDetails] =
    useRecoilStateLoadable(myProfileDetailsAtom);
  // const [isFollowing, setIsFollowing] = useState<Record<string, boolean>>({});
  const currentUser = myProfileDetails?.contents;

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuthStauts({ status: false });
    setMyProfileDetails(null);
    navigate("/login", { replace: true });
  };

  const [icon, setIcon] = useState<JSX.Element | null>(null);
  useEffect(() => {
    const path = location.pathname;
    const newIcon =
      path !== "/blog/create" ? (
        <IoIosAddCircle size={40} color="#ae7aff" />
      ) : (
        // <CiSaveUp2 size={40} color="#ae7aff" />
        ""
      );
    //@ts-ignore
    setIcon(newIcon);
  }, [location.pathname]);

  return (
    <nav
      className={`fixed w-full z-50 
      ${showAppbar ? "translate-y-0" : "-translate-y-full"}
        bg-black text-white border-gray-200 px-4 py-3 flex items-center justify-evenly text-sm md:text-lg font-semibold`}
    >
      <Link to="/" className="font-bold mx-0 lg:mx-6">
        Medium
      </Link>

      {authStatus?.status && (
        <>
          <Searchbar />
          <Link to="/blog/create" className="md:block">
            {icon}
          </Link>

          <button
            onClick={handleProfileClick}
            className="focus:outline-none w-12 h-10 mx-0 lg:mx-6"
            ref={btnRef}
          >
            <img
              src={currentUser?.profileImg || imgSrc}
              alt="avatar"
              className="w-full h-full rounded-full aspect-square object-cover  border-2 border-[#ae7aff]"
            />
          </button>
          <div className="relative">
            {isOpen && (
              <ul
                ref={dropdownRef}
                className="appbar-dropdown absolute top-8 right-0 bg-[#121212] shadow-white shadow-md rounded-md divide-y  divide-gray-400 w-40 font-medium text-base text-center"
              >
                <li
                  className="py-3 cursor-pointer hover:bg-gray-500 hover:rounded-t-md"
                  onClick={() => navigate(`/user/${currentUser?.id}`)}
                >
                  Profile
                </li>
                <li
                  className="px-4 py-3 cursor-pointer md:hidden hover:bg-gray-500"
                  onClick={() => navigate(`/blog/create`)}
                >
                  Create Post
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
                  onClick={() => navigate(`/user/id/suggestions`)}
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
