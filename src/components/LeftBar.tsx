import { useRecoilState, useRecoilValueLoadable } from "recoil";

import { useParams } from "react-router-dom";
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

const LeftBar = () => {
  const { id } = useParams();
  // const { isFollowing, handleFollow } = useFollowUnfollow();

  const myProfileDetails = useRecoilValueLoadable(myProfileDetailsAtom);
  const userProfileDetails = useRecoilValueLoadable(
    userProfileDetailsAtomFamily(id)
  );

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
      <aside className="hidden md:block col-span-12 text-white md:col-span-12 lg:col-span-4 xl:col-span-3 ">
        <div className="sticky top-[80px]">
          {myProfileDetails.state !== "loading" ? (
            <>
              {myProfileDetails.contents?.id !== id && (
                <div className="mb-4 shadow-md shadow-[white]/70  overflow-y-hidden border-b bg-[black]/60  rounded-md md:rounded-lg border-[white]/60 p-4 sm:border ">
                  <UserMiniDetails currentUser={myProfileDetails.contents} />
                </div>
              )}
            </>
          ) : (
            <ShortProfileSkeleton />
          )}
          {profileDetails?.state === "hasValue" ? (
            <div className="sticky top-[80px] overflow-y-hidden border-b bg-[black]/60  rounded-md md:rounded-lg border-[white]/60 p-4 sm:border shadow-md shadow-[white]/70">
              <UserMiniDetails currentUser={currentUser} />
              <>
                <hr className="my-4 h-[1px] w-full" />
                <div className="mb-4">
                  <h3 className="mb-1 font-bold">Short Bio</h3>
                  <p className="text-sm">
                    Immersed in the enchanting world of the night, captivated by
                    the moon's allure, and constantly seeking new adventures
                    around the globe. 🌕🌙🌎
                  </p>
                </div>
                {/* <div className="mb-4 text-sm">
                  <h3 className="mb-1 font-bold">Public link</h3>
                  <button className="block text-[#ae7aff] hover:underline">
                    {currentUser?.email}
                  </button>
                  <button className="block break-all text-[#ae7aff] hover:underline">
                    https://www.aurorastarry.com/
                  </button>
                </div> */}
                <p className="mb-4 flex gap-x-4">
                  <span className="inline-block">
                    <span className="font-bold">13.5k&nbsp;</span>
                    <span className="text-sm text-gray-400">Followers</span>
                  </span>
                  <span className="inline-block">
                    <span className="font-bold">204&nbsp;</span>
                    <span className="text-sm text-gray-400">Following</span>
                  </span>
                </p>
              </>

              {myProfileDetails.contents?.id == id ? (
                <Button className="inline-flex w-max items-center bg-[#4d17a4] px-4 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]">
                  Edit Profile
                </Button>
              ) : (
                <Button
                  className="inline-flex w-max items-center bg-[#4d17a4] px-4 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]"
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
    </>
  );
};

export default LeftBar;
