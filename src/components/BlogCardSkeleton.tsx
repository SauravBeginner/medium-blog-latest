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
    <article className="flex flex-col border-b-2 border-gray-600 shadow-md mb-5 animate-pulse">
      <div className="flex space-y-4 items-center">
        <div className="flex-1 py-4 px-6">
          <header className="flex items-center space-x-2">
            <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-600"></span>
            <div className="flex flex-col space-y-2">
              <div className="text-sm font-medium bg-gray-600 h-2 w-20 rounded"></div>
              <div className="inline-flex items-center rounded-full whitespace-nowrap border px-2.5 py-0.5 w-fit text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-gray-600"></div>
            </div>
          </header>
          <h2 className="text-xl my-2 font-bold bg-gray-600 h-6 w-2/4 rounded"></h2>
          <p className="bg-gray-600 h-4 w-3/4 rounded mb-2"></p>
          <p className="bg-gray-600 h-4 w-full rounded mb-2"></p>
          <p className="bg-gray-600 h-4 w-3/4 rounded mb-2"></p>
          <p className="bg-gray-600 h-4 w-full rounded mb-2"></p>
          <p className="bg-gray-600 h-4 w-3/5 rounded mb-2"></p>
        </div>
        <div className="flex-shrink-0 mx-4">
          <div className="h-40 w-40 bg-gray-600 rounded"></div>
        </div>
      </div>
      <footer className="flex items-center justify-between pb-2 px-6">
        <div className="text-sm bg-gray-600 h-4 w-12 rounded"></div>
        <div className="flex items-center space-x-2">
          <div className="text-sm bg-gray-600 h-4 w-12 rounded"></div>
          <div className="text-sm bg-gray-600 h-4 w-12 rounded"></div>
        </div>
      </footer>
    </article>
  );
};
