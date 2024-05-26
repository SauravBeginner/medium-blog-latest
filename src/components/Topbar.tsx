import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import { myProfileDetailsAtom } from "../store/atoms/userAtoms";

const Topbar = () => {
  const { id: paramId } = useParams();
  const myDetails = useRecoilValue(myProfileDetailsAtom);

  const navigate = useNavigate();
  const location = useLocation();
  const id = paramId || myDetails?.id;

  const [activeTab, setActiveTab] = useState<string>("");

  const isCurrentUser = paramId === myDetails?.id;

  useEffect(() => {
    const path = location.pathname;
    setActiveTab(path);
  }, [location.pathname, isCurrentUser]);

  return (
    <div className="bg-[#121212] border-b overflow-y-auto no-scrollbar text-base md:text-lg border-[white]/60 text-white p-4 flex justify-around items-center sticky top-0 z-10 mb-4">
      <div className="flex space-x-8">
        <button
          className={`border-b-4 px-4 pb-2 ${
            activeTab === `/user/${id}`
              ? "border-[#ae7aff] text-white font-semibold"
              : "border-transparent text-gray-500"
          }`}
          onClick={() => {
            setActiveTab(`/user/${id}`);
            navigate(`/user/${id}`);
          }}
        >
          Posts
        </button>
        {isCurrentUser && (
          <button
            className={`border-b-4 px-4 pb-2 ${
              activeTab === `/user/${id}/edit-profile`
                ? "border-[#ae7aff] text-white font-semibold"
                : "border-transparent text-gray-500"
            }`}
            onClick={() => {
              setActiveTab(`/user/${id}/edit-profile`);
              navigate(`/user/${id}/edit-profile`);
            }}
          >
            Edit Profile
          </button>
        )}
        <button
          className={`border-b-4 px-4 pb-2 ${
            activeTab === `/user/${id}/followings`
              ? "border-[#ae7aff] text-white font-semibold"
              : "border-transparent text-gray-500"
          }`}
          onClick={() => {
            setActiveTab(`/user/${id}/followings`);
            navigate(`/user/${id}/followings`);
          }}
        >
          Followings
        </button>
        <button
          className={`border-b-4 px-4 pb-2 ${
            activeTab === `/user/${id}/followers`
              ? "border-[#ae7aff] text-white font-semibold"
              : "border-transparent text-gray-500"
          }`}
          onClick={() => {
            setActiveTab(`/user/${id}/followers`);
            navigate(`/user/${id}/followers`);
          }}
        >
          Followers
        </button>
        {isCurrentUser && (
          <button
            className={`border-b-4 px-4 pb-2 ${
              activeTab === `/user/${id}/suggestions`
                ? "border-[#ae7aff] text-white font-semibold"
                : "border-transparent text-gray-500"
            }`}
            onClick={() => {
              setActiveTab(`/user/${id}/suggestions`);
              navigate(`/user/${id}/suggestions`);
            }}
          >
            Suggestions
          </button>
        )}
      </div>
    </div>
  );
};

export default Topbar;
