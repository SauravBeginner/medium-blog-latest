import { Link } from "react-router-dom";
import { imgSrc } from "./RightBar";
import { Button } from "./Button";
import { authURL } from "../utils/baseUrl";
import {
  myFollowingCountAtom,
  myfollowingsAtom,
  suggestionAtom,
} from "../store/atoms/userAtoms";
import { useSetRecoilState } from "recoil";
import { authAxios } from "../utils/axiosClient";
import { useState } from "react";

const SuggestionList = ({ user }: any) => {
  const setIsFollowing = useSetRecoilState(myfollowingsAtom);

  const setSuggestion = useSetRecoilState(suggestionAtom);

  const setMyFollowingCount = useSetRecoilState(myFollowingCountAtom);

  const [isProcessing, setIsProcessing] = useState(false);
  const handleFollow = async (userId: string) => {
    if (isProcessing) return;
    try {
      setIsProcessing(true);
      const response = await authAxios.put(`${authURL}/user/follow`, {
        id: userId,
      });

      if (response?.data?.message === "Followed") {
        Promise.all([
          setIsFollowing((prev: string[]) => [
            {
              id: response?.data?.newFollowing?.followingId,
              name: user?.name,
              profileImg: user?.profileImg,
            },
            ...prev,
          ]),
          setSuggestion((prev: string[]) => {
            return prev?.filter(
              //@ts-ignore
              (u) => u?.id !== response?.data?.newFollowing?.followingId
            );
          }),

          setMyFollowingCount((prev: any) => prev + 1),
        ]);
      } else if (response?.data?.message === "Unfollowed") {
        Promise.all([
          setIsFollowing((prev: any) => {
            return prev?.filter(
              //@ts-ignore
              (u) => u?.id !== response?.data?.deleteFollowing?.followingId
            );
          }),

          setSuggestion((prev: any) => {
            return [
              {
                id: response?.data?.deleteFollowing?.followingId,
                name: user?.name,
                profileImg: user?.profileImg,
              },
              ...prev,
            ];
          }),
          setMyFollowingCount((prev: any) => prev - 1),
        ]);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex items-center justify-between" key={user?.id}>
      <Link to={`/user/${user?.id}`}>
        <div className="flex items-center space-x-3">
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
      </Link>

      <Button
        className="bg-white dark:text-black hover:bg-[#ae7aff]"
        onClick={() => handleFollow(user?.id)}
      >
        Follow
      </Button>
    </div>
  );
};

export default SuggestionList;
