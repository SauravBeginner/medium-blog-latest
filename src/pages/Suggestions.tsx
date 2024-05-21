import { useRecoilValueLoadable } from "recoil";
import { suggestionAtom } from "../store/atoms/userAtoms";
import { FollowingCardSkeleton } from "../components/FollowingCardSkeleton";
import FollowingCard from "../components/FollowCard";

const Suggestions = () => {
  const followingSuggestions = useRecoilValueLoadable(suggestionAtom);
  const suggestions =
    followingSuggestions.state === "hasValue" && followingSuggestions.contents;
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
        {followingSuggestions?.state === "hasValue" &&
          suggestions?.map((user: any) => (
            <FollowingCard key={`suggstions-${user?.id}`} following={user} />
          ))}
      </div>
    </>
  );
};

export default Suggestions;
