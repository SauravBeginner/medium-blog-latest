import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { Button } from "./Button";
import { authTokenState, myProfileDetailsAtom, userAtom } from "../store/atom";
import axios from "axios";
import { authURL } from "../utils/baseUrl";
import { useEffect, useState } from "react";
import { BlogCardSkeleton } from "./BlogCardSkeleton";

interface User {
  id: string;
  name: string;
  followers: Follower[];
  following: Following[];
}

interface Follower {
  followerId: string;
}
interface Following {
  followingId: string;
}

const RightBar = () => {
  const imgSrc =
    "https://images.pexels.com/photos/7775642/pexels-photo-7775642.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
  const allUserList = useRecoilValueLoadable(userAtom);

  const token = useRecoilValue(authTokenState);
  const myProfileDetails = useRecoilValueLoadable(myProfileDetailsAtom);
  const [isFollowing, setIsFollowing] = useState<Record<string, boolean>>({});
  const currentUser = myProfileDetails?.contents;
  const [users, setUsers] = useState<User[]>([]);

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

      setIsFollowing((prevStatus: Record<string, boolean>) => ({
        ...prevStatus,
        [userId]: !prevStatus[userId],
      }));
      console.log(isFollowing);
    } catch (e) {
      console.log(e);
    }
  };
  // const isfollow = (userId: string) => {
  //   return !!currentUser?.following?.find((u) => u?.followingId === userId);
  // };

  useEffect(() => {
    if (allUserList.state === "hasValue" && allUserList.contents) {
      setUsers(
        allUserList.contents.filter((user: User) => user.id !== currentUser?.id)
      );
    }
  }, [allUserList, currentUser?.id]);

  useEffect(() => {
    console.log(users);
    const checkFollowStatus = () => {
      if (allUserList.state === "hasValue" && currentUser && users) {
        const initialFollowingStatus: Record<string, boolean> = {};

        allUserList.contents.forEach((user: User) => {
          const isFollowed = user?.followers?.some(
            (follower: Follower) => follower?.followerId === currentUser.id
          );
          initialFollowingStatus[user?.id] = isFollowed;
        });
        setIsFollowing(initialFollowingStatus);
      }
    };
    checkFollowStatus();
  }, []);

  // if (allUserList.state === "loading") {
  //   return <BlogCardSkeleton />;
  // }

  return (
    <>
      <aside className="hidden text-white lg:col-span-3 lg:block">
        <div className="max-h-screen sticky top-[100px] ">
          <div className="bg-[black]/60 rounded-lg p-4 text-white mb-2 border border-[white]/60">
            <h2 className="text-lg font-bold pb-4">Who to follow</h2>
            <div className="space-y-4">
              {users &&
                users.length > 0 &&
                users?.map((user: any) => (
                  <div
                    className="flex items-center justify-between"
                    key={user?.id}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                        <img
                          className="aspect-square h-full w-full"
                          alt="Ubisoft Logo"
                          src={imgSrc}
                        />
                      </span>
                      <div>
                        <div className="font-bold">{user?.name}</div>
                        <div className="text-sm text-gray-400">
                          @{user?.name}
                        </div>
                      </div>
                    </div>

                    <Button
                      className="bg-white dark:text-black hover:bg-[#ae7aff]"
                      onClick={() => handleFollow(user?.id)}
                    >
                      {isFollowing[user.id] ? "Unfollow" : "Follow"}
                    </Button>

                    {/* <Button
                    className="bg-white dark:text-black hover:bg-[#ae7aff]"
                    onClick={() => handleFollow(user.id)}
                  >
                    Follow
                  </Button> */}
                  </div>
                ))}
            </div>
            <div className="my-4">
              <Button className="bg-white dark:text-black w-full hover:bg-[#ae7aff]">
                Show More
              </Button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default RightBar;
