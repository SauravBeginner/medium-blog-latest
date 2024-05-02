import { useState } from "react";
import { ImCancelCircle } from "react-icons/im";
import { IoSearch } from "react-icons/io5";

const Searchbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  //   const handleOpen = () => {
  //     setIsOpen((isOpen) => !isOpen);
  //   };
  return (
    <div className="w-full md:max-w-xl">
      <form className="flex items-center mb-2 mx-auto max-w-sm md:max-w-xl w-full">
        <label htmlFor="simple-search" className="sr-only">
          Search
        </label>
        <div className="relative w-full">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <IoSearch />
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-2.5 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-pointer"
            placeholder="Search Mockups, Logos..."
            required
            onClick={() => setIsOpen(true)}
          />
          <div
            className="absolute inset-y-0 end-0 flex items-center pe-3 cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            <ImCancelCircle />
          </div>
        </div>
      </form>
      {isOpen && (
        <div className="h-auto max-h-[400px] overflow-y-scroll no-scrollbar absolute top-[50px] z-50 w-full md:max-w-xl mt-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div className="p-2 bg-[#030712]" key={i}>
              <a href="/tracks/6SbPPXGkG8QKFOTW9BmL">
                <p id="track-link-0" tabIndex={-1} style={{ display: "none" }}>
                  Navigate
                </p>
              </a>
              <a href="/tracks/6SbPPXGkG8QKFOTW9BmL/ts-1">
                <div className="flex gap-2 px-4 py-2 border-b hover:bg-slate-100 dark:hover:bg-slate-800">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/2048px-Typescript_logo_2020.svg.png"
                    className="max-w-full w-12 object-cover aspect-square rounded"
                  />
                  <div className="w-[90%]">
                    <div className="text-lg">Typescript</div>
                    <p className="text-sm text-slate-700 dark:text-slate-300 truncate">
                      Learn about strongly typed languages, Typescript and how
                      you can integrate it into your existing javascript
                      codebase.
                    </p>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Searchbar;
