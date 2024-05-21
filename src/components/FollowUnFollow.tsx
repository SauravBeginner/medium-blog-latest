import { useParams } from "react-router-dom";
import {
  useRecoilState,
  useRecoilStateLoadable,
  useRecoilValueLoadable,
} from "recoil";

import FollowingCard from "./FollowCard";
import { FollowingCardSkeleton } from "./FollowingCardSkeleton";
import {
  followersAtom,
  followingsAtom,
  followTypes,
  myfollowingsAtom,
  myProfileDetailsAtom,
} from "../store/atoms/userAtoms";

const FollowUnFollow = ({ followType }: any) => {
  console.log(followType);
  const { id } = useParams();
  const myProfile = useRecoilValueLoadable(myProfileDetailsAtom);
  const userFollowings = useRecoilValueLoadable(followingsAtom(id));
  const myFollowings = useRecoilValueLoadable(myfollowingsAtom);

  const followers = useRecoilValueLoadable(followersAtom(id));
  const [type, setType] = useRecoilState(followTypes);

  // useEffect(() => {
  //   setType(followType);
  // }, [followType, id]);

  const followings =
    myProfile.state === "hasValue" && id === myProfile.contents?.id
      ? myFollowings
      : userFollowings;

  const items = followType === "followings" ? followings : followers;

  if (items.state === "loading") {
    return (
      <>
        <FollowingCardSkeleton />
        <FollowingCardSkeleton />
        <FollowingCardSkeleton />
        <FollowingCardSkeleton />
      </>
    );
  }

  return (
    <div>
      <h2 className="text-lg text-gray-100 font-bold pb-4">
        {followType === "followings" ? "Followings" : "Followers"}
      </h2>
      {items.contents?.length < 1 && (
        <h1 className="text-white text-center">No Contents!</h1>
      )}
      {items.state === "hasValue" &&
        items?.contents?.map((user: any) => (
          <FollowingCard key={`${type}-${user?.id}`} following={user} />
        ))}
    </div>
  );
};

export default FollowUnFollow;
