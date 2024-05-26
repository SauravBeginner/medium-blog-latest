import { useNavigate } from "react-router-dom";

import { Button } from "../components/Button";
import { imgSrc } from "../components/RightBar";
import {
  useRecoilState,
  useRecoilValueLoadable,
  useSetRecoilState,
} from "recoil";
import {
  myFollowingCountAtom,
  myfollowingsAtom,
  myProfileDetailsAtom,
  suggestionAtom,
} from "../store/atoms/userAtoms";
import { authAxios } from "../utils/axiosClient";
import { useState } from "react";

type FollowingCardProps = {
  following: {
    id: string;
    name: string;
    profileImg?: string;
  };
};
const FollowingCard = ({ following }: FollowingCardProps) => {
  const [isFollowing, setIsFollowing] = useRecoilState(myfollowingsAtom);

  const [suggestion, setSuggestion] = useRecoilState(suggestionAtom);

  const myprofileDetails = useRecoilValueLoadable(myProfileDetailsAtom);

  const setMyFollowingCount = useSetRecoilState(myFollowingCountAtom);
  // const setUserFollowingCount = useSetRecoilState(
  //   userFollowersCountAtomFamily(following.id)
  // );

  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const handleFollow = async (userId: string) => {
    if (isProcessing) return;
    try {
      setIsProcessing(true);
      const response = await authAxios.put(`/user/follow`, {
        id: userId,
      });

      const { message, newFollowing, deleteFollowing } = response?.data;
      let updateFollowing;
      let updatedSuggestionList;
      if (message === "Followed") {
        updateFollowing = [
          {
            id: newFollowing?.followingId,
            name: following?.name,
            profileImg: following?.profileImg,
          },
          ...isFollowing,
        ];
        console.log(updateFollowing);
        setIsFollowing(updateFollowing);
        setSuggestion((prev: string[]) => {
          return prev?.filter(
            //@ts-ignore
            (u) => u?.id !== newFollowing?.followingId
          );
        });

        setMyFollowingCount(updateFollowing.length);
      } else if (message === "Unfollowed") {
        setIsFollowing((prev: string[]) => {
          return prev?.filter(
            //@ts-ignore
            (u) => u?.id !== deleteFollowing?.followingId
          );
        });

        updatedSuggestionList = [
          {
            id: deleteFollowing?.followingId,
            name: following?.name,
            profileImg: following?.profileImg,
          },
          ...suggestion,
        ];
        setSuggestion(updatedSuggestionList);
        setMyFollowingCount(isFollowing.length - 1);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsProcessing(false);
    }
  };
  console.log(following);
  return (
    <>
      <div className="relative mb-2 w-full last:mb-0 sm:mb-4 cursor-pointer">
        <div className="bg-[black]/60 rounded-lg p-4 text-white mb-2 border border-[white]/60 shadow-md shadow-[white]/70  hover:bg-[black]/40">
          <div className="space-y-4">
            <div className="flex items-center justify-between mx-4">
              <div className="flex items-center space-x-3">
                <span className="relative flex h-16 w-16 shrink-0 overflow-hidden rounded-full">
                  <img
                    className="mb-3 flex aspect-square h-16 w-16 rounded-full border-2 border-[#ae7aff] object-cover"
                    alt="Ubisoft Logo"
                    src={following?.profileImg || imgSrc}
                  />
                </span>
                <div>
                  <div
                    className="font-bold  hover:underline"
                    onClick={() => navigate(`/user/${following?.id}`)}
                  >
                    {following?.name}
                  </div>
                  <div className="text-sm text-gray-400">
                    @{following?.name}
                  </div>
                </div>
              </div>

              {myprofileDetails?.contents?.id !== following?.id && (
                <Button
                  className="bg-white dark:text-black hover:bg-[#ae7aff] text-lg"
                  onClick={() => {
                    handleFollow(following?.id);
                  }}
                >
                  {isFollowing?.some((u: any) => u.id === following?.id)
                    ? "Unfollow"
                    : "Follow"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FollowingCard;
