import { useNavigate, useParams } from "react-router-dom";
import { imgSrc } from "./RightBar";
import { useRecoilValue } from "recoil";
import {
  myFollowingCountAtom,
  myProfileDetailsAtom,
  userFollowersCountAtomFamily,
  userFollowingCountAtomFamily,
} from "../store/atoms/userAtoms";
// import { myFollowingCountAtom, myProfileDetailsAtom } from "../store";

const UserMiniDetails = ({ currentUser }: any) => {
  const navigate = useNavigate();

  // const followingCount = useRecoilValue(myFollowingCountAtom);
  // // const followersCount = useRecoilValue(myFollowersCountSelector);

  const myprofile = useRecoilValue(myProfileDetailsAtom);

  // const followings =
  //   currentUser?.id === myprofile.contents?.id
  //     ? followingCount
  //     : currentUser?.followingCount;

  // const followers =
  //   currentUser?.id !== myprofile.contents?.id
  //     ? myprofile.contents?.followersCount
  //     : currentUser?.followersCount;
  //console.log(followingCount, followersCount);
  const myFollowingCount = useRecoilValue(myFollowingCountAtom);

  const userFollowingCount = useRecoilValue(
    userFollowingCountAtomFamily(currentUser?.id)
  );
  const followerCount = useRecoilValue(
    userFollowersCountAtomFamily(currentUser?.id)
  );
  // const followings = currentUser?.followingCount;
  // const followers = currentUser?.followersCount;

  const followingCount =
    myprofile?.id === currentUser?.id ? myFollowingCount : userFollowingCount;
  return (
    <div>
      <div
        className="cursor-pointer flex items-center"
        onClick={() => navigate(`/user/${currentUser?.id}`)}
      >
        <img
          className="mb-3 flex aspect-square h-16 w-16 rounded-full border-2 border-[#ae7aff] object-cover"
          src={currentUser?.profileImg || imgSrc}
          alt="avatar"
        />
        <span className="mx-4">
          <div className="font-bold  hover:underline">{currentUser?.name}</div>
          <div className="text-sm text-gray-400">@{currentUser?.name}</div>
        </span>
      </div>
      {/* <button className="block text-[#ae7aff] hover:underline">
        {currentUser?.email}
      </button> */}
      <p
        className="mb-2 flex gap-x-4 items-center"
        // onClick={() => navigate(`/user/${currentUser?.id}/followings`)}
      >
        <span
          className="inline-block cursor-pointer hover:underline"
          onClick={() => navigate(`/user/${currentUser?.id}/followers`)}
        >
          <span className="font-bold">
            {followerCount > 1000
              ? Math.floor(followerCount / 1000) + "k"
              : followerCount}
            &nbsp;
          </span>
          <span className="text-sm text-gray-400">Followers</span>
        </span>
        <span
          className="inline-block mx-5 cursor-pointer hover:underline"
          onClick={() => navigate(`/user/${currentUser?.id}/followings`)}
        >
          <span className="font-bold">
            {followingCount > 1000
              ? Math.floor(followingCount / 1000) + "k"
              : followingCount}
            &nbsp;
          </span>
          <span className="text-sm text-gray-400">Followings</span>
        </span>
      </p>
      <p className="text-sm my-1">
        {currentUser?.tagLine ||
          "Night owl | Moon enthusiast | Wanderlust 🌕🌙🌎"}
        '
      </p>
      <>
        <hr className="my-4 h-[1px] w-full" />
        <div className="mb-4">
          <h3 className="mb-1 font-bold">Short Bio</h3>
          <p className="text-sm">
            {currentUser?.bio ||
              `Immersed in the enchanting world of the night, captivated
              by the moon's allure, and constantly seeking new
              adventures around the globe. 🌕🌙🌎`}
          </p>
        </div>
        <div className="mb-4 text-sm">
          <h3 className="mb-1 font-bold">Public link</h3>
          <button className="block text-[#ae7aff] hover:underline">
            {currentUser?.email}
          </button>
          <button className="block break-all text-[#ae7aff] hover:underline">
            {currentUser?.portfolioUrl}
          </button>
        </div>
        {/* <p className="mb-4 flex gap-x-4">
          <span className="inline-block">
            <span className="font-bold">13.5k&nbsp;</span>
            <span className="text-sm text-gray-400">Followers</span>
          </span>
          <span className="inline-block">
            <span className="font-bold">204&nbsp;</span>
            <span className="text-sm text-gray-400">Following</span>
          </span>
        </p> */}
      </>
    </div>
  );
};

export default UserMiniDetails;
