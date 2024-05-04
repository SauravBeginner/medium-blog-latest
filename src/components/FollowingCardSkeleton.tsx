export const FollowingCardSkeleton = () => {
  return (
    <div className="relative mb-2 w-full last:mb-0 sm:mb-4">
      <div className="bg-[black]/60 rounded-lg p-4 text-white mb-2 border border-[white]/60 shadow-md shadow-[white]/70 animate-pulse">
        <div className="space-y-4">
          <div className="flex items-center justify-between mx-4">
            <div className="flex items-center space-x-3">
              <span className="relative flex h-16 w-16 shrink-0 overflow-hidden rounded-full bg-gray-400"></span>
              <div>
                <div className="font-bold mb-2 bg-gray-400 h-4 w-24 rounded"></div>
                <div className="text-sm text-gray-400 bg-gray-300 h-3 w-16 rounded"></div>
              </div>
            </div>
            <div className="bg-gray-300 h-8 w-20 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
