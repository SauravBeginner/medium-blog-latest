import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isAuthenticated, myProfileDetailsAtom } from "../store";
import { useEffect, useState } from "react";

const Topbar = () => {
  const { id } = useParams();
  const myDetails = useRecoilValue(myProfileDetailsAtom);
  const userAuth = useRecoilValue(isAuthenticated);

  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<string>("");

  const istrue = id === myDetails?.id;
  useEffect(() => {
    const path = location.pathname;
    setActiveTab(path);
  }, [location.pathname, istrue]);

  return (
    <div className="bg-[#494747]  text-white py-2 mb-8 sm:mb-16 md:mb-4 font-semibold sticky top-[80px] z-10">
      {userAuth && (
        <>
          <ul className="flex space-x-2  bg-opacity-50 basis-1/2 mx-10 justify-around text-center ">
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
            {istrue && (
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
    </div>
  );
};

export default Topbar;
