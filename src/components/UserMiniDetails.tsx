import { useNavigate } from "react-router-dom";

const UserMiniDetails = ({ currentUser }) => {
  const navigate = useNavigate();
  return (
    <div>
      <div
        className="cursor-pointer flex items-center"
        onClick={() => navigate(`/user/${currentUser?.id}`)}
      >
        <img
          className="mb-3 flex aspect-square h-16 w-16 rounded-full border-2 border-[#ae7aff] object-cover"
          src="https://images.pexels.com/photos/7775642/pexels-photo-7775642.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
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
          onClick={() => navigate(`/user/${currentUser?.id}/followings`)}
        >
          <span className="font-bold">
            {(currentUser?.followers?.length || currentUser?.followersCount) >
            1000
              ? Math.floor(
                  (currentUser?.followers?.length ||
                    currentUser?.followersCount) / 1000
                ) + "k"
              : currentUser?.followers?.length || currentUser?.followersCount}
            &nbsp;
          </span>
          <span className="text-sm text-gray-400">Followers</span>
        </span>
        <span
          className="inline-block mx-5 cursor-pointer hover:underline"
          onClick={() => navigate(`/user/${currentUser?.id}/followers`)}
        >
          <span className="font-bold">
            {(currentUser?.follwing?.length || currentUser?.followingCount) >
            1000
              ? Math.floor(
                  (currentUser?.following?.length ||
                    currentUser?.followingCount) / 1000
                ) + "k"
              : currentUser?.followers?.length || currentUser?.followingCount}
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
