import { useNavigate } from "react-router-dom";
import { imgSrc } from "./RightBar";
import { Button } from "./Button";
import {
  myFollowingCountAtom,
  myfollowingsAtom,
  suggestionAtom,
} from "../store/atoms/userAtoms";
import { useRecoilState, useSetRecoilState } from "recoil";
import { authAxios } from "../utils/axiosClient";
import { useState } from "react";

const SuggestionCard = ({ user, myFollowingList }: any) => {
  const setIsFollowing = useSetRecoilState(myfollowingsAtom);

  const [suggestion, setSuggestion] = useRecoilState(suggestionAtom);

  const setMyFollowingCount = useSetRecoilState(myFollowingCountAtom);

  const [isProcessing, setIsProcessing] = useState(false);

  const navigate = useNavigate();
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
            name: user?.name,
            profileImg: user?.profileImg,
          },
          ...myFollowingList,
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
        setIsFollowing((prev: any) => {
          return prev?.filter(
            //@ts-ignore
            (u) => u?.id !== deleteFollowing?.followingId
          );
        });

        updatedSuggestionList = [
          {
            id: deleteFollowing?.followingId,
            name: user?.name,
            profileImg: user?.profileImg,
          },
          ...suggestion,
        ];
        setSuggestion(updatedSuggestionList);
        setMyFollowingCount(myFollowingList.length - 1);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div
        className="flex items-center space-x-3"
        onClick={() => navigate(`/user/${user?.id}`)}
      >
        <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
          <img
            className="w-full h-full rounded-full aspect-square object-cover  border-2 border-[#ae7aff]"
            alt="Ubisoft Logo"
            src={user?.profileImg || imgSrc}
            loading="eager"
          />
        </span>
        <div>
          <div className="font-bold">{user?.name}</div>
          <div className="text-sm text-gray-400">@{user?.name}</div>
        </div>
      </div>

      <Button
        className="bg-white dark:text-black hover:bg-[#ae7aff]"
        onClick={() => handleFollow(user?.id)}
      >
        Follow
      </Button>
    </div>
  );
};

export default SuggestionCard;
