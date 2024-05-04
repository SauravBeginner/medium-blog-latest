const ShortProfileSkeleton = () => {
  return (
    <div className="mb-4 shadow-md shadow-[white]/70 overflow-hidden border-b bg-[black]/60 rounded-md md:rounded-lg border-[white]/60 p-4 sm:border">
      <div className="animate-pulse">
        <div className="mb-3 flex aspect-square h-16 w-16 rounded-full border-2 border-[#ae7aff] object-cover animate-pulse"></div>

        <h2 className="mb-2 font-bold bg-gray-400 h-6 w-24 rounded"></h2>
        <p className="text-sm my-1 bg-gray-400 h-4 w-40 rounded"></p>
      </div>
    </div>
  );
};

export default ShortProfileSkeleton;
