import { useRecoilValueLoadable } from "recoil";
import { Button } from "./Button";

import { useNavigate } from "react-router-dom";
import { RightBarSkeleton } from "./RightBarSkeleton";
import ShortProfileSkeleton from "./ShortProfileSkeleton";
// import { BlogCardSkeleton } from "./BlogCardSkeleton";
// import { useFollowUnfollow } from "./UseFollowUnfollow";
import { myProfileDetailsAtom, suggestionAtom } from "../store/atoms/userAtoms";
import MyMiniProfile from "./MyMiniProfile";
import { getMyProfileDataSelector } from "../store/selectors/userSelector";
import SuggestionList from "./SuggestionList";
import { useEffect, useState } from "react";

export const imgSrc =
  "https://pbs.twimg.com/profile_images/1674815862879178752/nTGMV1Eo_400x400.jpg";

const RightBar = () => {
  const myProfileDetailsSelector = useRecoilValueLoadable(
    getMyProfileDataSelector
  );

  const [showAppbar, setShowAppbar] = useState(false);
  const [lastScrollY, setlastScrollY] = useState(0);
  const followingSuggestions = useRecoilValueLoadable(suggestionAtom);

  const myDetailsAtom = useRecoilValueLoadable(myProfileDetailsAtom);

  const currentUser = myDetailsAtom?.contents;

  const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowAppbar(false);
      } else {
        setShowAppbar(true);
      }
      setlastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);
  return (
    <>
      <aside className="hidden text-white lg:col-span-3 lg:block">
        <div className={`sticky ${showAppbar ? "top-[80px]" : "top-[10px]"}`}>
          {myProfileDetailsSelector.state !== "loading" ? (
            <div className="mb-4 shadow-md shadow-[white]/70  overflow-y-hidden border-b bg-[black]/60  rounded-md md:rounded-lg border-[white]/60 p-4 sm:border ">
              <MyMiniProfile currentUser={currentUser} />
            </div>
          ) : (
            <ShortProfileSkeleton />
          )}

          {followingSuggestions.state === "hasValue" ? (
            <div className="max-h-screen ">
              <div className="bg-[black]/60 rounded-lg p-4 text-white mb-2 border border-[white]/60 shadow-md shadow-[white]/70">
                <h2 className="text-lg font-bold pb-4">Who to follow</h2>
                <div className="space-y-4">
                  {followingSuggestions.contents?.length > 0 &&
                    followingSuggestions.contents
                      ?.slice(0, 3)
                      .map((user: any) => <SuggestionList user={user} />)}
                </div>
                <div className="my-4">
                  <Button
                    className="bg-white dark:text-black w-full hover:bg-[#ae7aff]"
                    onClick={() =>
                      navigate(`/user/${currentUser?.id}/suggestions`)
                    }
                  >
                    Show More
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <RightBarSkeleton />
          )}
        </div>
      </aside>
    </>
  );
};

export default RightBar;
