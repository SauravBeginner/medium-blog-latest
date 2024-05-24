export const BlogCardSkeletons = () => {
  // ... your useEffect for data fetching

  return (
    <div className="relative mb-2 w-full last:mb-0 sm:mb-4">
      {/* ... your border styles */}

      <div
        role="status"
        className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center"
      >
        <div className="flex items-center justify-center h-32 w-32 bg-gray-300 rounded-full sm:w-40 dark:bg-gray-700">
          {/* Adjust height/width as needed for image */}
          <svg
            className="w-10 h-10 text-gray-200 dark:text-gray-600"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 18"
          >
            {/* ... Your image SVG */}
          </svg>
        </div>
        <div className="w-full">
          <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-2/3 mb-4"></div>
          {/* Adjust width (w-2/3)  as needed */}
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2"></div>
          {/* Add more lines for longer content */}
        </div>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};
export const BlogCardSkeleton = () => {
  return (
    <div className="relative mb-2 w-full last:mb-0 sm:mb-4">
      <div className="flex flex-col sm:flex-row bg-[black]/40 rounded-none sm:rounded-md md:rounded-lg border-b border-t border-[white]/60 p-4 text-white sm:border-l sm:border-r shadow-md shadow-[white]/70 sm:space-x-4 md:h-60 h-full animate-pulse">
        <div className="shrink-0 h-60 w-full sm:h-auto sm:w-60 sm:mb-0 mb-4">
          <div className="h-full w-full rounded-sm bg-gray-600"></div>
        </div>
        <div className="flex flex-col pl-0 sm:pl-4 pt-1 w-full h-full">
          <div className="mb-2 flex items-center gap-x-2">
            <div className="flex items-center gap-x-4">
              <div className="h-10 w-10 shrink-0 sm:h-10 sm:w-10 bg-gray-600 rounded-full"></div>
              <div className="flex flex-col space-y-2">
                <div className="h-2 w-20 bg-gray-600 rounded"></div>
                <div className="h-2 w-16 bg-gray-600 rounded"></div>
              </div>
            </div>
          </div>
          <div className="flex-grow overflow-hidden">
            <div className="flex flex-col items-start sm:flex-row sm:items-center justify-between mb-4 space-y-4 sm:space-y-0 sm:space-x-5 md:space-x-10">
              <div className="w-full">
                <div className="h-4 w-2/4 bg-gray-600 rounded mb-2"></div>
                <div className="h-3 w-3/4 bg-gray-600 rounded mb-2"></div>
                <div className="h-3 w-full bg-gray-600 rounded mb-2"></div>
                <div className="h-3 w-3/4 bg-gray-600 rounded mb-2"></div>
                <div className="h-3 w-full bg-gray-600 rounded mb-2"></div>
                <div className="h-3 w-3/5 bg-gray-600 rounded mb-2"></div>
              </div>
            </div>
          </div>
          <div className="flex gap-x-4 items-center mt-auto">
            <div className="h-6 w-12 bg-gray-600 rounded"></div>
            <div className="h-6 w-12 bg-gray-600 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
