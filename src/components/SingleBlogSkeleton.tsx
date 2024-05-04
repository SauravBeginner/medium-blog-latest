import React from "react";

const SingleBlogSkeleton = () => {
  return (
    <div className="relative mb-2 w-full last:mb-0 sm:mb-4">
      <div className="flex bg-[black]/40 rounded-none sm:rounded-md md:rounded-lg border-b border-t border-[white]/60 p-4 text-white sm:border-l sm:border-r shadow-md shadow-[white]/70 animate-pulse">
        <div className="pl-4 pt-1 w-full">
          <div className="mb-2 flex items-center gap-x-2">
            <div className="flex items-center gap-x-4">
              <div className="h-10 w-10 shrink-0 sm:h-10 sm:w-10 bg-gray-400 rounded-full"></div>
              <div>
                <h2 className="inline-block font-bold bg-gray-400 h-6 w-32 rounded"></h2>
                <span className="ml-2 inline-block text-sm text-gray-400 bg-gray-300 h-4 w-16 rounded"></span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between mb-4 space-x-2">
            <div className="mr-10">
              <p className="py-2 text-lg sm:text-4xl font-bold bg-gray-400 h-6 w-96 rounded mb-2"></p>
              <p className="text-sm sm:text-lg py-2 my-1 bg-gray-300 h-5 w-96 rounded"></p>
              <p className="text-sm sm:text-lg py-2 my-1 bg-gray-300 h-5 w-96 rounded"></p>
              <p className="text-sm sm:text-lg py-2 my-1 bg-gray-300 h-5 w-96 rounded"></p>
              <p className="text-sm sm:text-lg py-2 my-1 bg-gray-300 h-5 w-96 rounded"></p>
            </div>
            <div className="shrink-0 h-80 w-80 md:h-14 md:w-24 bg-gray-400 rounded-sm"></div>
          </div>
          <div className="flex gap-x-4 items-center">
            <button className="inline-flex items-center gap-x-1 outline-none hover:text-[#ae7aff] text-white bg-gray-400 h-8 w-20 rounded">
              <span className="h-4 w-4 bg-gray-300 rounded-full"></span>
              <span className="bg-gray-300 h-4 w-16 rounded"></span>
            </button>
            <div className="ml-auto">
              <button className="mr-2 inline-flex items-center gap-x-1 outline-none hover:text-[#ae7aff] text-white bg-gray-400 h-8 w-8 rounded">
                <span className="bg-gray-300 h-4 w-4 rounded-full"></span>
              </button>
              <button className="ml-2 inline-flex items-center gap-x-1 outline-none hover:text-[#ae7aff] text-white bg-gray-400 h-8 w-8 rounded">
                <span className="bg-gray-300 h-4 w-4 rounded-full"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBlogSkeleton;
