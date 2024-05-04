const ProfileSkeleton = () => {
  return (
    <aside className="hidden md:block col-span-12 text-white md:col-span-12 lg:col-span-4 xl:col-span-3">
      <div className="sticky top-[80px] overflow-y-hidden border-b bg-[black]/60  rounded-md md:rounded-lg border-[white]/60 p-4 sm:border shadow-md shadow-[white]/70">
        <div className="mb-3 flex aspect-square h-16 w-16 rounded-full border-2 border-[#ae7aff] object-cover animate-pulse"></div>

        <div className="mb-1 font-bold h-6 w-36 bg-gray-700 animate-pulse"></div>
        <div className="block text-[#ae7aff] hover:underline h-4 w-20 bg-gray-700 animate-pulse"></div>
        <div className="text-sm my-1 h-4 w-36 bg-gray-700 animate-pulse"></div>

        <hr className="my-4 h-[1px] w-full bg-gray-700 animate-pulse" />

        <div className="mb-4">
          <h3 className="mb-1 font-bold h-4 w-20 bg-gray-700 animate-pulse"></h3>
          <p className="text-sm h-16 w-36 bg-gray-700 animate-pulse"></p>
        </div>

        <p className="mb-4 flex gap-x-4">
          <span className="inline-block h-4 w-16 bg-gray-700 animate-pulse"></span>
          <span className="inline-block h-4 w-16 bg-gray-700 animate-pulse"></span>
        </p>

        <button className="inline-flex w-max items-center bg-[#ae7aff] px-4 py-2 text-center font-bold text-black shadow-[5px 5px 0px 0px #4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px 0px 0px 0px #4f4e4e] animate-pulse">
          Edit Profile
        </button>
      </div>
    </aside>
  );
};

export default ProfileSkeleton;
