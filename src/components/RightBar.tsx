import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from "recoil";
import { Button } from "./Button";
import {
  authTokenState,
  followingAtom,
  myProfileDetailsAtom,
  suggestionAtom,
} from "../store";
import axios from "axios";
import { authURL } from "../utils/baseUrl";

import { Link } from "react-router-dom";
import { RightBarSkeleton } from "./RightBarSkeleton";
import ShortProfileSkeleton from "./ShortProfileSkeleton";
// import { BlogCardSkeleton } from "./BlogCardSkeleton";
import UserMiniDetails from "./UserMiniDetails";

// interface User {
//   id: string;
//   name: string;
//   followers: Follower[];
//   following: Following[];
// }

// interface Follower {
//   followerId: string;
// }
// interface Following {
//   followingId: string;
// }
export const imgSrc =
  "https://images.pexels.com/photos/7775642/pexels-photo-7775642.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
const RightBar = () => {
  // const allUserList = useRecoilValueLoadable(userAtom);

  const [isFollowing, setIsFollowing] = useRecoilState(followingAtom);
  const token = useRecoilValue(authTokenState);
  const myProfileDetails = useRecoilValueLoadable(myProfileDetailsAtom);
  // const [isFollowing, setIsFollowing] = useState<Record<string, boolean>>({});
  const currentUser = myProfileDetails?.contents;
  // const [users, setUsers] = useState<User[]>([]);

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
  const followingSuggestions = useRecoilValueLoadable(suggestionAtom);

  // useEffect(() => {
  //   if (allUserList.state === "hasValue" && allUserList.contents) {
  //     setUsers(
  //       allUserList.contents.filter((user: User) => user.id !== currentUser?.id)
  //     );
  //   }
  // }, [allUserList, currentUser?.id, isFollowing]);

  // useEffect(() => {
  //   console.log(users);
  //   const checkFollowStatus = () => {
  //     if (allUserList.state === "hasValue" && currentUser && users) {
  //       const initialFollowingStatus: Record<string, boolean> = {};

  //       allUserList.contents.forEach((user: User) => {
  //         const isFollowed = user?.followers?.some(
  //           (follower: Follower) => follower?.followerId === currentUser.id
  //         );
  //         initialFollowingStatus[user?.id] = isFollowed;
  //       });
  //       setIsFollowing(initialFollowingStatus);
  //     }
  //   };
  //   checkFollowStatus();
  // }, []);

  if (
    followingSuggestions.state === "loading" &&
    myProfileDetails.state === "loading"
  ) {
    return (
      <aside className="hidden text-white lg:col-span-3 lg:block">
        <ShortProfileSkeleton />
        <RightBarSkeleton />
      </aside>
    );
  }
  console.log(currentUser);
  return (
    <>
      <aside className="hidden text-white lg:col-span-3 lg:block">
        <div className="sticky top-[80px]">
          <div className="mb-4 shadow-md shadow-[white]/70  overflow-y-hidden border-b bg-[black]/60  rounded-md md:rounded-lg border-[white]/60 p-4 sm:border ">
            <UserMiniDetails currentUser={currentUser} />
          </div>

          <div className="max-h-screen ">
            <div className="bg-[black]/60 rounded-lg p-4 text-white mb-2 border border-[white]/60 shadow-md shadow-[white]/70">
              <h2 className="text-lg font-bold pb-4">Who to follow</h2>
              <div className="space-y-4">
                {followingSuggestions.contents?.length > 0 &&
                  followingSuggestions.contents?.map((user: any) => (
                    <div
                      className="flex items-center justify-between"
                      key={user?.id}
                    >
                      <Link to={`/user/${user?.id}`}>
                        <div className="flex items-center space-x-3">
                          <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                            <img
                              className="aspect-square h-full w-full object-cover"
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
                      </Link>

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
        </div>
      </aside>
    </>
  );
};

export default RightBar;
