import { useRecoilValueLoadable } from "recoil";
import Feed from "../components/Feed";
import { suggestionAtom } from "../store";
import FollowingCard from "./FollowCard";
import { FollowingCardSkeleton } from "../components/FollowingCardSkeleton";

const Suggestions = () => {
  const followingSuggestions = useRecoilValueLoadable(suggestionAtom);

  if (followingSuggestions.state === "loading") {
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
    <>
      <div>
        <h2 className="text-lg text-gray-100 font-bold pb-4">Followings</h2>
        {followingSuggestions.contents?.length < 1 && (
          <h1 className="text-white text-center">No Contents!</h1>
        )}
        {followingSuggestions.contents?.map((user: any) => (
          <FollowingCard key={`${user?.id}`} id={user?.id} name={user?.name} />
        ))}
      </div>
    </>
  );
};

export default Suggestions;
