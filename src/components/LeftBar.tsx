import {
  useRecoilState,
  useRecoilValueLoadable,
  useSetRecoilState,
} from "recoil";

import { useLocation, useNavigate, useParams } from "react-router-dom";
import ProfileSkeleton from "./ProfileSkeleton";
import UserMiniDetails from "./UserMiniDetails";
import ShortProfileSkeleton from "./ShortProfileSkeleton";
import {
  myFollowingCountAtom,
  myfollowingsAtom,
  myProfileDetailsAtom,
  suggestionAtom,
  userFollowersCountAtomFamily,
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

  const myProfileDetails = useRecoilValueLoadable(myProfileDetailsAtom);
  const userProfileDetails = useRecoilValueLoadable(
    userProfileDetailsAtomFamily(id)
  );
  const setMyFollowingCount = useSetRecoilState(myFollowingCountAtom);

  const navigate = useNavigate();

  const profileDetails =
    id !== myProfileDetails?.contents?.id
      ? userProfileDetails
      : myProfileDetails;

  const currentUser = profileDetails?.contents;
  const setUserFollowersCount = useSetRecoilState(
    userFollowersCountAtomFamily(userProfileDetails?.contents?.id)
  );

  const [isFollowing, setIsFollowing] = useRecoilState(myfollowingsAtom);
  const setSuggestion = useSetRecoilState(suggestionAtom);

  const [showAppbar, setShowAppbar] = useState(false);
  const [lastScrollY, setlastScrollY] = useState(0);

  const handleFollow = async (userId: string) => {
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

        setSuggestion((prev: string[]) => {
          return prev?.filter(
            //@ts-ignore
            (u) => u?.id !== response?.data?.newFollowing?.followingId
          );
        });

        setMyFollowingCount((prev: any) => prev + 1);
        setUserFollowersCount((prev: any) => prev + 1);
      } else if (response?.data?.message === "Unfollowed") {
        setIsFollowing((prev: string[]) => {
          return prev?.filter(
            //@ts-ignore
            (u) => u?.id !== response?.data?.deleteFollowing?.followingId
          );
        });
        setSuggestion((prev: string[]) => {
          return [
            {
              id: response?.data?.deleteFollowing?.followingId,
              name: userProfileDetails.contents.name,
            },
            ...prev,
          ];
        });

        setMyFollowingCount((prev: any) => prev - 1);
        setUserFollowersCount((prev: any) => prev - 1);
      }
    } catch (e) {
      console.log(e);
    }
  };
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

  return (
    <>
      {
        <aside className=" col-span-12 text-white md:col-span-12 lg:col-span-3 xl:col-span-3 ">
          <div className={`sticky ${showAppbar ? "top-[80px]" : "top-[10px]"}`}>
            {isEdit || (
              <>
                {myProfileDetails.state !== "loading" ? (
                  <>
                    {myProfileDetails.contents?.id !== id && (
                      <div className="mb-4 lg:block hidden shadow-md shadow-[white]/70  overflow-y-hidden border-b bg-[black]/60  rounded-md md:rounded-lg border-[white]/60 p-4 sm:border ">
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

            {userProfileDetails?.state !== "loading" ? (
              <div className="sticky top-[80px] overflow-y-hidden border-b bg-[black]/60  rounded-md md:rounded-lg border-[white]/60 p-4 sm:border shadow-md shadow-[white]/70">
                {myProfileDetails.contents?.id === id ? (
                  <UserMiniDetails currentUser={myProfileDetails.contents} />
                ) : (
                  <UserMiniDetails currentUser={userProfileDetails.contents} />
                )}

                {myProfileDetails.contents?.id === id ? (
                  <button
                    className="inline-flex w-max items-center bg-[#885dcf] px-4 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]"
                    onClick={() =>
                      navigate(`/user/${currentUser?.id}/edit-profile`)
                    }
                  >
                    Edit Profile
                  </button>
                ) : (
                  <button
                    className="inline-flex w-max items-center bg-[#885dcf] px-4 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]"
                    onClick={() =>
                      handleFollow(userProfileDetails.contents?.id)
                    }
                  >
                    {
                      //@ts-ignore
                      isFollowing?.some(
                        (u: any) => u.id === userProfileDetails.contents?.id
                      )
                        ? "Unfollow"
                        : "Follow"
                    }
                  </button>
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
