import { useNavigate } from "react-router-dom";
import { imgSrc } from "./RightBar";
// import { myFollowingCountAtom, myProfileDetailsAtom } from "../store";

const UserMiniDetails = ({ currentUser }: any) => {
  const navigate = useNavigate();
  // const followingCount = useRecoilValue(myFollowingCountAtom);
  // // const followersCount = useRecoilValue(myFollowersCountSelector);

  // const myprofile = useRecoilValueLoadable(myProfileDetailsAtom);

  // const followings =
  //   currentUser?.id === myprofile.contents?.id
  //     ? followingCount
  //     : currentUser?.followingCount;

  // const followers =
  //   currentUser?.id !== myprofile.contents?.id
  //     ? myprofile.contents?.followersCount
  //     : currentUser?.followersCount;
  //console.log(followingCount, followersCount);

  const followings = currentUser?.followingCount;

  const followers = currentUser?.followersCount;
  return (
    <div>
      <div
        className="cursor-pointer flex items-center"
        onClick={() => navigate(`/user/${currentUser?.id}`)}
      >
        <img
          className="mb-3 flex aspect-square h-16 w-16 rounded-full border-2 border-[#ae7aff] object-cover"
          src={imgSrc}
          alt="avatar"
        />
        <span className="mx-4">
          <div className="font-bold  hover:underline">{currentUser?.name}</div>
          <div className="text-sm text-gray-400">@{currentUser?.name}</div>
        </span>
      </div>
      <button className="block text-[#ae7aff] hover:underline">
        {currentUser?.email}
      </button>
      <p
        className="mb-2 flex gap-x-4 items-center"
        // onClick={() => navigate(`/user/${currentUser?.id}/followings`)}
      >
        <span
          className="inline-block cursor-pointer hover:underline"
          onClick={() => navigate(`/user/${currentUser?.id}/followers`)}
        >
          <span className="font-bold">
            {followers > 1000 ? Math.floor(followers / 1000) + "k" : followers}
            &nbsp;
          </span>
          <span className="text-sm text-gray-400">Followers</span>
        </span>
        <span
          className="inline-block mx-5 cursor-pointer hover:underline"
          onClick={() => navigate(`/user/${currentUser?.id}/followings`)}
        >
          <span className="font-bold">
            {followings > 1000
              ? Math.floor(followings / 1000) + "k"
              : followings}
            &nbsp;
          </span>
          <span className="text-sm text-gray-400">Followings</span>
        </span>
      </p>
      <p className="text-sm my-1">
        Night owl | Moon enthusiast | Wanderlust 🌕🌙🌎
      </p>
    </div>
  );
};

export default UserMiniDetails;
