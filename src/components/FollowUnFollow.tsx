import { useParams } from "react-router-dom";
import {
  useRecoilState,
  useRecoilStateLoadable,
  useRecoilValueLoadable,
} from "recoil";
import {
  followersAtom,
  followingsAtom,
  followTypes,
  myfollowingsAtom,
  myProfileDetailsAtom,
  suggestionAtom,
} from "../store";
import FollowingCard from "../pages/FollowCard";
import { useEffect } from "react";
import { FollowingCardSkeleton } from "./FollowingCardSkeleton";

const FollowUnFollow = ({ followType }: any) => {
  const { id } = useParams();
  const myProfile = useRecoilValueLoadable(myProfileDetailsAtom);
  const userFollowings = useRecoilValueLoadable(followingsAtom(id));
  const myFollowings = useRecoilValueLoadable(myfollowingsAtom);

  const followers = useRecoilValueLoadable(followersAtom(id));
  const [type, setType] = useRecoilState(followTypes);

  useEffect(() => {
    setType(followType);
  }, [followType, id]);

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
