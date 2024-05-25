import { useRecoilState, useRecoilValueLoadable } from "recoil";

import { useLocation, useNavigate, useParams } from "react-router-dom";
import ProfileSkeleton from "./ProfileSkeleton";
import UserMiniDetails from "./UserMiniDetails";
import ShortProfileSkeleton from "./ShortProfileSkeleton";
import { Button } from "./Button";
import {
  myfollowingsAtom,
  myProfileDetailsAtom,
  userProfileDetailsAtomFamily,
} from "../store/atoms/userAtoms";
import { authAxios } from "../utils/axiosClient";
import { useEffect, useState } from "react";
import MyMiniProfile from "./MyMiniProfile";

const LeftBar = () => {
  const [isEdit, setIsEdit] = useState(false);
  const location = useLocation();
  const path = location.pathname.split("/")[2];

  useEffect(() => {
    if (path === "edit-profile") {
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
  }, [location.pathname]);
  const { id } = useParams();
  // const { isFollowing, handleFollow } = useFollowUnfollow();

  const myProfileDetails = useRecoilValueLoadable(myProfileDetailsAtom);
  const userProfileDetails = useRecoilValueLoadable(
    userProfileDetailsAtomFamily(id)
  );

  const navigate = useNavigate();

  const profileDetails = id ? userProfileDetails : myProfileDetails;

  const currentUser = profileDetails?.contents;

  const [isFollowing, setIsFollowing] = useRecoilState(myfollowingsAtom);
  // const setSuggestion = useSetRecoilState(suggestionAtom);

  // const setMyFollowingCount = useSetRecoilState(myFollowingCountAtom);

  const handleFollow = async (userId: string) => {
    console.log("clicked", userId);
    try {
      const response = await authAxios.put(`/user/follow`, {
        id: userId,
      });

      if (response?.data?.message === "Followed") {
        setIsFollowing((prev: string[]) => [
          {
            id: response?.data?.newFollowing?.followingId,
            name: userProfileDetails.contents.name,
          },
          ...prev,
        ]);

        // setMyFollowingCount((prev) => prev + 1),
      } else if (response?.data?.message === "Unfollowed") {
        setIsFollowing((prev: string[]) => {
          return prev?.filter(
            //@ts-ignore
            (u) => u?.id !== response?.data?.deleteFollowing?.followingId
          );
        });

        // setMyFollowingCount((prev) => prev - 1),
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {
        <aside className=" md:block col-span-12 text-white md:col-span-12 lg:col-span-3 xl:col-span-3 ">
          <div className="sticky top-[80px]">
            {isEdit || (
              <>
                {myProfileDetails.state !== "loading" ? (
                  <>
                    {myProfileDetails.contents?.id !== id && (
                      <div className="mb-4 shadow-md shadow-[white]/70  overflow-y-hidden border-b bg-[black]/60  rounded-md md:rounded-lg border-[white]/60 p-4 sm:border ">
                        <MyMiniProfile
                          currentUser={myProfileDetails.contents}
                        />
                      </div>
                    )}
                  </>
                ) : (
                  <ShortProfileSkeleton />
                )}
              </>
            )}

            {profileDetails?.state === "hasValue" ? (
              <div className="sticky top-[80px] overflow-y-hidden border-b bg-[black]/60  rounded-md md:rounded-lg border-[white]/60 p-4 sm:border shadow-md shadow-[white]/70">
                <UserMiniDetails currentUser={currentUser} />

                {myProfileDetails.contents?.id == id ? (
                  <Button
                    className="inline-flex w-max items-center bg-[#885dcf] px-4 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]"
                    onClick={() =>
                      navigate(`/user/${currentUser?.id}/edit-profile`)
                    }
                  >
                    Edit Profile
                  </Button>
                ) : (
                  <Button
                    className="inline-flex w-max items-center bg-[#885dcf] px-4 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]"
                    onClick={() => handleFollow(currentUser?.id)}
                  >
                    {
                      //@ts-ignore
                      isFollowing?.some((u) => u.id === currentUser?.id)
                        ? "Unfollow"
                        : "Follow"
                    }
                  </Button>
                )}
              </div>
            ) : (
              <ProfileSkeleton />
            )}
          </div>
        </aside>
      }
    </>
  );
};

export default LeftBar;
