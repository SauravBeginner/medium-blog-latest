import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import {
  isAuthenticated,
  myProfileDetailsAtom,
} from "../store/atoms/userAtoms";

const Topbar = () => {
  const { id: paramId } = useParams();
  const myDetails = useRecoilValue(myProfileDetailsAtom);
  const userAuth = useRecoilValue(isAuthenticated);

  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<string>("");

  const isCurrentUser = paramId === myDetails?.id;

  const id = paramId || myDetails?.id;

  useEffect(() => {
    const path = location.pathname;
    setActiveTab(path);
  }, [location.pathname, isCurrentUser]);

  return (
    <div className="bg-[#494747] text-white py-2 mb-4 sm:mb-16 md:mb-4 text-sm md:text-base font-semibold sticky top-[65px] z-10">
      {userAuth && (
        <>
          <ul className="flex space-x-4 bg-opacity-50 basis-1/2 mx-5 md:mx-10 justify-around text-center no-scrollbar overflow-x-auto items-center">
            <li
              className={`w-[50%] py-3 hover:bg-gray-500 cursor-pointer ${
                activeTab === `/user/${id}`
                  ? "bg-white text-slate-900 hover:text-slate-100"
                  : ""
              }`}
              onClick={() => navigate(`/user/${id}`)}
            >
              <button>{myDetails.id === id ? "My" : "User"} Post</button>
            </li>
            {isCurrentUser && (
              <li
                className={`w-[50%] py-3 hover:bg-gray-500 cursor-pointer ${
                  activeTab === `/user/${id}/edit-profile`
                    ? "bg-white text-slate-900 hover:text-slate-100"
                    : ""
                }`}
                onClick={() => navigate(`/user/${id}/edit-profile`)}
              >
                <button>Edit Profile</button>
              </li>
            )}
            <li
              className={`w-[50%] py-3 hover:bg-gray-500 cursor-pointer ${
                activeTab === `/user/${id}/followings`
                  ? "bg-white text-slate-900 hover:text-slate-100"
                  : ""
              }`}
              onClick={() => navigate(`/user/${id}/followings`)}
            >
              <button>Followings</button>
            </li>
            {/* Add more navigation links as needed  */}
            <li
              className={`w-[50%] py-3 hover:bg-gray-500 cursor-pointer ${
                activeTab === `/user/${id}/followers`
                  ? "bg-white text-slate-900 hover:text-slate-100"
                  : ""
              }`}
              onClick={() => navigate(`/user/${id}/followers`)}
            >
              <button>Followers</button>
            </li>
            {isCurrentUser && (
              <li
                className={`w-[50%] py-3 hover:bg-gray-500 cursor-pointer ${
                  activeTab === `/user/${id}/suggestions`
                    ? "bg-white text-slate-900 hover:text-slate-100"
                    : ""
                }`}
                onClick={() => navigate(`/user/${id}/suggestions`)}
              >
                <button>Suggestions</button>
              </li>
            )}
          </ul>
        </>
      )}
      <>
        {/* <ul className="bg-[#494747] no-scrollbar overflow-x-auto flex justify-between text-white py-2 mb-8 sm:mb-16 md:mb-4 font-semibold sticky top-[80px] z-10">
        <li
          className={`mx-2 inline-block shrink-0 ${
            activeTab === `/user/${id}`
              ? "bg-white text-slate-900 hover:text-slate-100 "
              : ""
          }`}
          onClick={() => navigate(`/user/${id || myDetails?.id}`)}
        >
          <button className="inline-block hover:bg-[#2c2c2c]  px-6 py-1.5 ">
            {isCurrentUser ? "My" : "User"} Posts
          </button>
        </li>
        {isCurrentUser && (
          <li
            className={`mr-2 inline-block shrink-0 ${
              activeTab === `/user/edit-profile`
                ? "bg-white text-slate-900 hover:text-slate-100 "
                : ""
            }`}
            onClick={() => navigate(`/user/edit-profile`)}
          >
            <button className="inline-block hover:bg-[#2c2c2c]  px-6 py-1.5 ">
              Edit Profile
            </button>
          </li>
        )}
        <li
          className={`mr-2 inline-block shrink-0 ${
            activeTab === `/user/${id}/followings`
              ? "bg-white text-slate-900 hover:text-slate-100 "
              : ""
          }`}
          onClick={() => navigate(`/user/${id}/followings`)}
        >
          <button className="inline-block hover:bg-[#2c2c2c]  px-6 py-1.5 ">
            Followings
          </button>
        </li>
        <li
          className={`mr-2 inline-block shrink-0  ${
            activeTab === `/user/${id || myDetails?.id}/followers`
              ? "bg-white text-slate-900 hover:text-slate-100 "
              : ""
          }`}
          onClick={() => navigate(`/user/${id || myDetails?.id}/followers`)}
        >
          <button className="inline-block hover:bg-[#2c2c2c] px-6 py-1.5 ">
            Followers
          </button>
        </li>
        {isCurrentUser && (
          <>
            {" "}
            <li
              className={`mr-2 inline-block shrink-0  ${
                activeTab === `/user/suggestions`
                  ? "bg-white text-slate-900 hover:text-slate-100 "
                  : ""
              }`}
              onClick={() => navigate(`/user/suggestions`)}
            >
              <button className="inline-block hover:bg-[#2c2c2c] px-6 py-1.5 ">
                Suggestions
              </button>
            </li>
            <li className="mr-2 inline-block shrink-0">
              <button className="inline-block px-6 py-1.5 hover:bg-[#2c2c2c]">
                Change password
              </button>
            </li>
            <li className="mr-2 inline-block shrink-0">
              <button className="inline-block px-6 py-1.5 hover:bg-[#2c2c2c]">
                Bookmarked
              </button>
            </li>
          </>
        )}
      </ul> */}
      </>
    </div>
  );
};

export default Topbar;
