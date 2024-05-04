import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { followingsAtom, followTypes } from "../store";
import FollowingCard from "../pages/FollowCard";
import { useEffect } from "react";
import { FollowingCardSkeleton } from "./FollowingCardSkeleton";

const FollowUnFollow = ({ followType }: any) => {
  const { id } = useParams();
  const followings = useRecoilValueLoadable(followingsAtom(id));

  //   const { id } = useParams();
  // const { loading, blogs } = useBlogs({ blogType: blogType || "" });
  //   const [hasMore, setHasMore] = useRecoilState(hasMoreState);
  //   const [items, setItems] = useRecoilState(itemsState);
  //   const setUserProfileId = useSetRecoilState(userProfileId);
  const [type, setType] = useRecoilState(followTypes);
  // const currentType = useRecoilValue(blogTypes); // Access the current value of the atom

  //   const setPage = useSetRecoilState(currentPageState);

  useEffect(() => {
    setType(followType);
    // setUserProfileId(id as any);
    // setPage(1); // Reset page to 1 when type changes
    // setItems([]);
  }, [followType, id]);

  if (followings.state === "loading") {
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
      <h2 className="text-lg text-gray-100 font-bold pb-4">Followings</h2>
      {followings.contents?.length < 1 && (
        <h1 className="text-white text-center">No Contents!</h1>
      )}
      {followings.contents?.map((user: any) => (
        <FollowingCard
          key={`${type}-${user?.id}`}
          id={user?.id}
          name={user?.name}
        />
      ))}
    </div>
  );
};

export default FollowUnFollow;
