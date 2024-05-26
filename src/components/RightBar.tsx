import { useRecoilValueLoadable } from "recoil";

import ShortProfileSkeleton from "./ShortProfileSkeleton";
import { myProfileDetailsAtom } from "../store/atoms/userAtoms";
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

  const myDetailsAtom = useRecoilValueLoadable(myProfileDetailsAtom);

  const currentUser = myDetailsAtom?.contents;

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

          <SuggestionList />
        </div>
      </aside>
    </>
  );
};

export default RightBar;
