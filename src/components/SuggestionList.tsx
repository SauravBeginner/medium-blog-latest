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

const SuggestionList = ({ user }: any) => {
  const setIsFollowing = useSetRecoilState(myfollowingsAtom);

  const setSuggestion = useSetRecoilState(suggestionAtom);

  const setMyFollowingCount = useSetRecoilState(myFollowingCountAtom);

  const handleFollow = async (userId: string) => {
    console.log("clicked", userId);
    try {
      const response = await authAxios.put(`${authURL}/user/follow`, {
        id: userId,
      });

      if (response?.data?.message === "Followed") {
        Promise.all([
          setIsFollowing((prev: string[]) => [
            {
              id: response?.data?.newFollowing?.followingId,
              name: user.name,
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
                name: user.name,
              },
              ...prev,
            ];
          }),
          setMyFollowingCount((prev: any) => prev - 1),
        ]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex items-center justify-between" key={user?.id}>
      <Link to={`/user/${user?.id}`}>
        <div className="flex items-center space-x-3">
          <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
            <img
              className="aspect-square h-full w-full object-cover"
              alt="Ubisoft Logo"
              src={user?.profileImg || imgSrc}
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
