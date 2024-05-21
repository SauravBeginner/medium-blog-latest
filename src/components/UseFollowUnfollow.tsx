import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  authTokenState,
  followingAtom,
  myFollowingCountAtom,
  myfollowingsAtom,
} from "../store";
import axios from "axios";
import { authURL } from "../utils/baseUrl";

export const useFollowUnfollow = () => {
  //   const [isFollowing, setIsFollowing] = useRecoilState(followingAtom);

  const [isFollowing, setIsFollowing] = useRecoilState(myfollowingsAtom);

  const setMyFollowingCount = useSetRecoilState(myFollowingCountAtom);

  const token = useRecoilValue(authTokenState);

  const handleFollow = async (userId: string) => {
    console.log("clicked", userId);
    try {
      const response = await axios.put(
        `${authURL}/user/follow`,
        {
          id: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Use the token from the state
          },
        }
      );
      console.log(response);
      if (response.data.msg === "Followed") {
        setIsFollowing((prev) => {
          console.log(prev);
          return [...prev, response.data?.newFollowing?.followingId];
        });
      } else {
        setIsFollowing((prev) => {
          prev.filter(
            (prevItem) =>
              prevItem.id !== response.data?.deleteFollowing?.followingId
          );
        });
      }
      //   setIsFollowing((prevStatus: Record<string, boolean>) => ({
      //     ...prevStatus,
      //     [userId]: !prevStatus[userId],
      //   }));

      //   !isFollowing[userId]
      //     ? setMyFollowingCount((prevCount: number) => prevCount + 1)
      //     : setMyFollowingCount((prevCount: number) => prevCount - 1);
      //   console.log(isFollowing);
    } catch (e) {
      console.log(e);
    }
  };

  // console.log(isFollowing);

  return { isFollowing, handleFollow };
};
