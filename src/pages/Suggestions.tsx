import { useRecoilStateLoadable, useRecoilValueLoadable } from "recoil";
import { followingsAtom, suggestionAtom } from "../store";
import FollowingCard from "./FollowCard";
import { FollowingCardSkeleton } from "../components/FollowingCardSkeleton";
import { useParams } from "react-router-dom";

const Suggestions = () => {
  const { id } = useParams();

  const followingSuggestions = useRecoilValueLoadable(suggestionAtom);
  // const [followings, setFollowings] = useRecoilStateLoadable(
  //   followingsAtom(id)
  // );

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

  // if (followingSuggestions.state === "hasValue")
  //   console.log(followingSuggestions.contents);

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
