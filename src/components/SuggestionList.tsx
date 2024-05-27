import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { suggestionListSelector } from "../store/selectors/userSelector";
import SuggestionCard from "./SuggestionCard";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";
import { SuggestionListSkeleton } from "./RightBarSkeleton";
import {
  myfollowingsAtom,
  myProfileDetailsAtom,
  suggestionAtom,
} from "../store/atoms/userAtoms";

const SuggestionList = () => {
  const suggestionList = useRecoilValueLoadable(suggestionAtom);
  const myFollowingList = useRecoilValue(myfollowingsAtom);

  const navigate = useNavigate();
  const myDetailsAtom = useRecoilValueLoadable(myProfileDetailsAtom);

  const currentUser = myDetailsAtom?.contents;

  if (suggestionList.state === "loading") {
    return <SuggestionListSkeleton />;
  }
  return (
    <div className="bg-[black]/60 rounded-lg p-4 text-white mb-2 border border-[white]/60 shadow-md shadow-[white]/70">
      <h2 className="text-lg font-bold pb-4">Who to follow</h2>
      <div className="space-y-4">
        {suggestionList.contents?.slice(0, 3).map((user: any) => (
          <SuggestionCard
            key={user?.id}
            user={user}
            myFollowingList={myFollowingList}
          />
        ))}
      </div>
      <div className="my-4">
        <Button
          className="bg-white dark:text-black w-full hover:bg-[#ae7aff]"
          onClick={() => navigate(`/user/${currentUser?.id}/suggestions`)}
        >
          Show More
        </Button>
      </div>
    </div>
  );
};

export default SuggestionList;
