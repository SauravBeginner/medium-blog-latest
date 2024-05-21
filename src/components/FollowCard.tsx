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

type FollowingCardProps = {
  following: {
    id: string;
    name: string;
  };
};
const FollowingCard = ({ following }: FollowingCardProps) => {
  const [isFollowing, setIsFollowing] = useRecoilState(myfollowingsAtom);

  const setSuggestion = useSetRecoilState(suggestionAtom);

  const myprofileDetails = useRecoilValueLoadable(myProfileDetailsAtom);

  const setMyFollowingCount = useSetRecoilState(myFollowingCountAtom);

  const navigate = useNavigate();

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
            name: following.name,
          },
          ...prev,
        ]);
        setSuggestion((prev: string[]) => {
          return prev?.filter(
            //@ts-ignore
            (u) => u?.id !== response?.data?.newFollowing?.followingId
          );
        });

        setMyFollowingCount((prev: number) => prev + 1);
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
              name: following.name,
            },
            ...prev,
          ];
        });
        setMyFollowingCount((prev: number) => prev - 1);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="relative mb-2 w-full last:mb-0 sm:mb-4 cursor-pointer">
        <div className="bg-[black]/60 rounded-lg p-4 text-white mb-2 border border-[white]/60 shadow-md shadow-[white]/70  hover:bg-[black]/40">
          <div className="space-y-4">
            <div className="flex items-center justify-between mx-4">
              <div className="flex items-center space-x-3">
                <span className="relative flex h-16 w-16 shrink-0 overflow-hidden rounded-full">
                  <img
                    className="aspect-square h-full w-full object-cover"
                    alt="Ubisoft Logo"
                    src={imgSrc}
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
