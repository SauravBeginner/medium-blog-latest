import { Button } from "./Button";

export const RightBarSkeleton = () => {
  return (
    <aside className="hidden text-white lg:col-span-3 lg:block">
      <div className="max-h-screen sticky top-[80px]">
        <div className="bg-[black]/60 rounded-lg p-4 text-white mb-2 border border-[white]/60 animate-pulse">
          <h2 className="text-lg font-bold pb-4">Who to follow</h2>
          <div className="space-y-2">
            {/* Placeholder for skeleton items */}
            {Array.from({ length: 3 }).map((_, i) => (
              <div className="flex items-center justify-between" key={i}>
                <div className="flex items-center space-x-3">
                  <span className="h-10 w-10 bg-gray-400 rounded-full"></span>
                  <div>
                    <div className="h-5 bg-gray-400 w-24 rounded my-2"></div>
                    <div className="h-4 bg-gray-400 w-16 rounded"></div>
                  </div>
                </div>
                <Button className="bg-gray-400 w-16 rounded-full px-6"></Button>
              </div>
            ))}
          </div>
          <div className="my-4">
            <Button className="bg-gray-400 w-full"></Button>
          </div>
        </div>
      </div>
    </aside>
  );
};
