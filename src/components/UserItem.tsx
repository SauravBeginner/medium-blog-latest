import React from "react";

const UserItem = ({ user, isFollowing }) => {
  const imgSrc =
    "https://images.pexels.com/photos/7775642/pexels-photo-7775642.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

  return (
    <div className="flex items-center justify-between" key={user?.id}>
      <div className="flex items-center space-x-3">
        <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
          <img
            className="aspect-square h-full w-full"
            alt="Ubisoft Logo"
            src={imgSrc}
          />
        </span>
        <div>
          <div className="font-bold">{user?.name}</div>
          <div className="text-sm text-gray-400">@{user?.name}</div>
        </div>
      </div>
      {isFollowing(user) ? (
        <Button
          className="bg-white dark:text-black hover:bg-[#ae7aff]"
          onClick={() => handleFollow(user?.id)}
        >
          Unfollow
        </Button>
      ) : (
        <Button
          className="bg-white dark:text-black hover:bg-[#ae7aff]"
          onClick={() => handleFollow(user.id)}
        >
          Follow
        </Button>
      )}
    </div>
  );
};

export default UserItem;
