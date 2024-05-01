export const BlogCardSkeleton = () => {
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
