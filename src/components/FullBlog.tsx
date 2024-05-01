import { Blog } from "../hooks/useBlogs";

// const FullBlog = ({ blog }: { blog?: Blog }) => {
//   // console.log(blog);
//   return (
//     <div className="max-w-4xl mx-auto my-12 px-8">
//       <h1 className="text-5xl font-bold leading-tight mb-4">{blog?.title}</h1>
//       <p className="text-lg text-gray-600 mb-8">Posted on August 24, 2023</p>
//       <div className="flex">
//         <div className="flex-grow">
//           <p className="text-lg leading-relaxed mb-6">{blog?.content}</p>
//           <h2 className="text-2xl font-semibold mb-4">Comments</h2>
//         </div>
//         <div className="w-48 ml-12">
//           <div className="flex items-center mb-4">
//             <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
//               <img src="https://dummyimage.com/100x100" alt="Jokester" />
//               <span className="flex h-full w-full items-center justify-center rounded-full bg-muted">
//                 JK
//               </span>
//             </span>
//             <div className="ml-4">
//               <h3 className="text-xl font-semibold">{blog?.author?.name}</h3>
//               <p className="text-sm text-gray-600">Author</p>
//             </div>
//           </div>
//           <p className="text-sm">
//             Master of mirth, purveyor of puns, and the funniest person in the
//             kingdom.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

const FullBlog = ({ blog }: { blog?: Blog }) => {
  return (
    <>
      <div className="min-h-screen bg-[#121212]">
        <section className="col-span-12 border-b border-t border-white sm:border-l sm:border-r md:col-span-8 lg:col-span-6">
          <div className="flex border-b border-white p-4 text-white last:border-none">
            <div className="h-10 w-10 shrink-0 sm:h-12 sm:w-12">
              <img
                src="https://images.pexels.com/photos/7775637/pexels-photo-7775637.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Solar Flare "
                className="h-full w-full rounded-full object-cover"
              />
            </div>
            <div className="pl-4 pt-1">
              <div className="mb-2 flex items-center gap-x-2">
                <div className="w-full">
                  <h2 className="inline-block font-bold">Solar Flare </h2>
                  <span className="ml-2 inline-block text-sm text-gray-400">
                    59 minutes ago
                  </span>
                </div>
                <button className="ml-auto shrink-0 hover:text-[#ae7aff]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                    />
                  </svg>
                </button>
              </div>
              <p className="mb-4 text-sm sm:text-base">
                Harnessing the power of the sun for a brighter future. ☀️🔋
                #SolarEnergy
              </p>
              <div className="mb-4 grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-4">
                <img
                  src="https://images.pexels.com/photos/18107025/pexels-photo-18107025/free-photo-of-man-reading-newspaper.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="attachment-0"
                  className="rounded-md"
                />
                <img
                  src="https://images.pexels.com/photos/18148933/pexels-photo-18148933/free-photo-of-city-road-man-people.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="attachment-1"
                  className="rounded-md"
                />
                <img
                  src="https://images.pexels.com/photos/18148937/pexels-photo-18148937/free-photo-of-city-road-traffic-landscape.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="attachment-2"
                  className="rounded-md"
                />
              </div>
              <div className="flex gap-x-4">
                <button
                  className="group inline-flex items-center gap-x-1 outline-none after:content-[attr(data-like-count)] focus:after:content-[attr(data-like-count-alt)] text-[#ae7aff] focus:text-inherit"
                  data-like-count={802}
                  data-like-count-alt={801}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="h-5 w-5 fill-[#ae7aff] group-focus:fill-none"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>
                </button>
                <button className="inline-flex items-center gap-x-1 outline-none hover:text-[#ae7aff]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-5 w-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223zM8.25 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM10.875 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>99</span>
                </button>
                <div className="ml-auto">
                  <button className="mr-2 inline-flex items-center gap-x-1 outline-none hover:text-[#ae7aff]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      className="h-5 w-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M15.75 4.5a3 3 0 11.825 2.066l-8.421 4.679a3.002 3.002 0 010 1.51l8.421 4.679a3 3 0 11-.729 1.31l-8.421-4.678a3 3 0 110-4.132l8.421-4.679a3 3 0 01-.096-.755z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <button className="group inline-flex items-center gap-x-1 outline-none hover:text-[#ae7aff] focus:text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="h-5 w-5 fill-[#ae7aff] text-[#ae7aff] group-focus:fill-none group-focus:text-inherit"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full items-center justify-start border-b border-white px-4 py-2 last:border-none">
            <img
              className="flex aspect-square h-10 w-10 shrink-0 rounded-full object-cover"
              src="https://images.pexels.com/photos/7775642/pexels-photo-7775642.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="avatar"
            />
            <input
              placeholder="Comment..."
              className="w-full bg-transparent p-2 text-white !outline-none placeholder:text-gray-500 md:p-4"
            />
            <div className="flex gap-x-1 sm:gap-x-2">
              <button className="flex shrink-0 items-center justify-center p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="w-6 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                  />
                </svg>
              </button>
              <button className="flex shrink-0 items-center justify-center p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="w-6 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </button>
              <button className="flex shrink-0 items-center justify-center bg-[#ae7aff] p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="w-6 text-black"
                >
                  <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                </svg>
              </button>
            </div>
          </div>
          <div className="relative border-b border-white last:border-none">
            <div className="flex p-4 text-white">
              <div className="relative shrink-0 before:absolute before:left-1/2 before:top-[30px] before:z-[5] before:h-full before:w-[1px] before:bg-white">
                <div className="relative z-10 h-10 w-10 sm:h-12 sm:w-12">
                  <img
                    src="https://images.pexels.com/photos/3532554/pexels-photo-3532554.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="Isabella Andrews"
                    className="h-full w-full rounded-full object-cover"
                  />
                </div>
              </div>
              <div className="pl-4 pt-1">
                <div className="mb-2 flex items-center gap-x-2">
                  <div className="w-full">
                    <h2 className="inline-block font-bold">Isabella Andrews</h2>
                    <span className="ml-2 inline-block text-sm text-gray-400">
                      58 minutes ago
                    </span>
                  </div>
                  <button className="ml-auto shrink-0 hover:text-[#ae7aff]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                      />
                    </svg>
                  </button>
                </div>
                <p className="mb-4 text-sm sm:text-base">
                  Such an important mission! How can individuals contribute to
                  this solar revolution, Solar Flare?
                </p>
                <div className="mb-4 grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-4">
                  <img
                    src="https://images.pexels.com/photos/18148936/pexels-photo-18148936.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="attachment-0"
                    className="rounded-md"
                  />
                </div>
                <div className="flex gap-x-4">
                  <button
                    className="group inline-flex items-center gap-x-1 outline-none after:content-[attr(data-like-count)] focus:after:content-[attr(data-like-count-alt)] hover:text-[#ae7aff] focus:text-[#ae7aff]"
                    data-like-count={420}
                    data-like-count-alt={421}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="h-5 w-5 group-focus:fill-[#ae7aff]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                      />
                    </svg>
                  </button>
                  <button className="inline-flex items-center gap-x-1 outline-none hover:text-[#ae7aff]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      className="h-5 w-5"
                    >
                      <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 00-1.032-.211 50.89 50.89 0 00-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 002.433 3.984L7.28 21.53A.75.75 0 016 21v-4.03a48.527 48.527 0 01-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979z" />
                      <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 001.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0015.75 7.5z" />
                    </svg>
                    <span>20</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="flex p-4 text-white">
              <div className="h-10 w-10 shrink-0 sm:h-12 sm:w-12">
                <img
                  src="https://images.pexels.com/photos/7775642/pexels-photo-7775642.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Aurora Starlight"
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
              <div className="pl-4 pt-1">
                <div className="mb-2 flex items-center gap-x-2">
                  <div className="w-full">
                    <h2 className="inline-block font-bold">Aurora Starlight</h2>
                    <span className="ml-2 inline-block text-sm text-gray-400">
                      55 minutes ago
                    </span>
                  </div>
                  <button className="ml-auto shrink-0 hover:text-[#ae7aff]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                      />
                    </svg>
                  </button>
                </div>
                <p className="mb-4 text-sm sm:text-base">
                  Embracing the lunar magic tonight. The full moon is my muse.
                  🌕🌌 #MoonlightDreams
                </p>
                <div className="flex gap-x-4">
                  <button
                    className="group inline-flex items-center gap-x-1 outline-none after:content-[attr(data-like-count)] focus:after:content-[attr(data-like-count-alt)] text-[#ae7aff] focus:text-inherit"
                    data-like-count={10}
                    data-like-count-alt={9}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="h-5 w-5 fill-[#ae7aff] group-focus:fill-none"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="relative border-b border-white last:border-none">
            <div className="flex p-4 text-white">
              <div className="relative shrink-0 before:absolute before:left-1/2 before:top-[30px] before:z-[5] before:h-full before:w-[1px] before:bg-transparent">
                <div className="relative z-10 h-10 w-10 sm:h-12 sm:w-12">
                  <img
                    src="https://images.pexels.com/photos/1092422/pexels-photo-1092422.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="Daniel Greenfield"
                    className="h-full w-full rounded-full object-cover"
                  />
                </div>
              </div>
              <div className="pl-4 pt-1">
                <div className="mb-2 flex items-center gap-x-2">
                  <div className="w-full">
                    <h2 className="inline-block font-bold">
                      Daniel Greenfield
                    </h2>
                    <span className="ml-2 inline-block text-sm text-gray-400">
                      45 minutes ago
                    </span>
                  </div>
                  <button className="ml-auto shrink-0 hover:text-[#ae7aff]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                      />
                    </svg>
                  </button>
                </div>
                <p className="mb-4 text-sm sm:text-base">
                  Absolutely love your commitment to clean energy, Solar Flare!
                  Keep up the great work! 💚♻️
                </p>
                <div className="mb-4 grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-4">
                  <img
                    src="https://images.pexels.com/photos/1114619/pexels-photo-1114619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="attachment-0"
                    className="rounded-md"
                  />
                </div>
                <div className="flex gap-x-4">
                  <button
                    className="group inline-flex items-center gap-x-1 outline-none after:content-[attr(data-like-count)] focus:after:content-[attr(data-like-count-alt)] hover:text-[#ae7aff] focus:text-[#ae7aff]"
                    data-like-count={45}
                    data-like-count-alt={46}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="h-5 w-5 group-focus:fill-[#ae7aff]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                      />
                    </svg>
                  </button>
                  <button className="inline-flex items-center gap-x-1 outline-none hover:text-[#ae7aff]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      className="h-5 w-5"
                    >
                      <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 00-1.032-.211 50.89 50.89 0 00-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 002.433 3.984L7.28 21.53A.75.75 0 016 21v-4.03a48.527 48.527 0 01-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979z" />
                      <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 001.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0015.75 7.5z" />
                    </svg>
                    <span>0</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="relative border-b border-white last:border-none">
            <div className="flex p-4 text-white">
              <div className="relative shrink-0 before:absolute before:left-1/2 before:top-[30px] before:z-[5] before:h-full before:w-[1px] before:bg-white">
                <div className="relative z-10 h-10 w-10 sm:h-12 sm:w-12">
                  <img
                    src="https://images.pexels.com/photos/998716/pexels-photo-998716.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="Matthew Advocate"
                    className="h-full w-full rounded-full object-cover"
                  />
                </div>
              </div>
              <div className="pl-4 pt-1">
                <div className="mb-2 flex items-center gap-x-2">
                  <div className="w-full">
                    <h2 className="inline-block font-bold">Matthew Advocate</h2>
                    <span className="ml-2 inline-block text-sm text-gray-400">
                      30 minutes ago
                    </span>
                  </div>
                  <button className="ml-auto shrink-0 hover:text-[#ae7aff]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                      />
                    </svg>
                  </button>
                </div>
                <p className="mb-4 text-sm sm:text-base">
                  Your efforts are helping us move towards a sustainable future.
                  Kudos, Solar Flare! 🌞🌱
                </p>
                <div className="mb-4 grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-4">
                  <img
                    src="https://images.pexels.com/photos/998714/pexels-photo-998714.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="attachment-0"
                    className="rounded-md"
                  />
                </div>
                <div className="flex gap-x-4">
                  <button
                    className="group inline-flex items-center gap-x-1 outline-none after:content-[attr(data-like-count)] focus:after:content-[attr(data-like-count-alt)] hover:text-[#ae7aff] focus:text-[#ae7aff]"
                    data-like-count={60}
                    data-like-count-alt={61}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="h-5 w-5 group-focus:fill-[#ae7aff]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                      />
                    </svg>
                  </button>
                  <button className="inline-flex items-center gap-x-1 outline-none hover:text-[#ae7aff]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      className="h-5 w-5"
                    >
                      <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 00-1.032-.211 50.89 50.89 0 00-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 002.433 3.984L7.28 21.53A.75.75 0 016 21v-4.03a48.527 48.527 0 01-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979z" />
                      <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 001.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0015.75 7.5z" />
                    </svg>
                    <span>2</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="flex p-4 text-white">
              <div className="h-10 w-10 shrink-0 sm:h-12 sm:w-12">
                <img
                  src="https://images.pexels.com/photos/909489/pexels-photo-909489.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Sophia Innovator"
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
              <div className="pl-4 pt-1">
                <div className="mb-2 flex items-center gap-x-2">
                  <div className="w-full">
                    <h2 className="inline-block font-bold">Sophia Innovator</h2>
                    <span className="ml-2 inline-block text-sm text-gray-400">
                      28 minutes ago
                    </span>
                  </div>
                  <button className="ml-auto shrink-0 hover:text-[#ae7aff]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                      />
                    </svg>
                  </button>
                </div>
                <p className="mb-4 text-sm sm:text-base">
                  Every ray of sunshine counts! Have you considered integrating
                  solar in urban spaces, Solar Flare?
                </p>
                <div className="flex gap-x-4">
                  <button
                    className="group inline-flex items-center gap-x-1 outline-none after:content-[attr(data-like-count)] focus:after:content-[attr(data-like-count-alt)] text-[#ae7aff] focus:text-inherit"
                    data-like-count={2}
                    data-like-count-alt={1}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="h-5 w-5 fill-[#ae7aff] group-focus:fill-none"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="flex p-4 text-white">
              <div className="h-10 w-10 shrink-0 sm:h-12 sm:w-12">
                <img
                  src="https://images.pexels.com/photos/909487/pexels-photo-909487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Michael Tech"
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
              <div className="pl-4 pt-1">
                <div className="mb-2 flex items-center gap-x-2">
                  <div className="w-full">
                    <h2 className="inline-block font-bold">Michael Tech</h2>
                    <span className="ml-2 inline-block text-sm text-gray-400">
                      2 minutes ago
                    </span>
                  </div>
                  <button className="ml-auto shrink-0 hover:text-[#ae7aff]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                      />
                    </svg>
                  </button>
                </div>
                <p className="mb-4 text-sm sm:text-base">
                  Your dedication to solar energy is inspiring, Solar Flare! Are
                  there any upcoming projects we can look forward to?
                </p>
                <div className="flex gap-x-4">
                  <button
                    className="group inline-flex items-center gap-x-1 outline-none after:content-[attr(data-like-count)] focus:after:content-[attr(data-like-count-alt)] text-[#ae7aff] focus:text-inherit"
                    data-like-count={1}
                    data-like-count-alt={0}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="h-5 w-5 fill-[#ae7aff] group-focus:fill-none"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="relative border-b border-white last:border-none">
            <div className="flex p-4 text-white">
              <div className="relative shrink-0 before:absolute before:left-1/2 before:top-[30px] before:z-[5] before:h-full before:w-[1px] before:bg-transparent">
                <div className="relative z-10 h-10 w-10 sm:h-12 sm:w-12">
                  <img
                    src="https://images.pexels.com/photos/909483/pexels-photo-909483.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="Samuel Eco"
                    className="h-full w-full rounded-full object-cover"
                  />
                </div>
              </div>
              <div className="pl-4 pt-1">
                <div className="mb-2 flex items-center gap-x-2">
                  <div className="w-full">
                    <h2 className="inline-block font-bold">Samuel Eco</h2>
                    <span className="ml-2 inline-block text-sm text-gray-400">
                      45 seconds ago
                    </span>
                  </div>
                  <button className="ml-auto shrink-0 hover:text-[#ae7aff]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                      />
                    </svg>
                  </button>
                </div>
                <p className="mb-4 text-sm sm:text-base">
                  You're doing incredible work for the environment, Solar Flare.
                  💪🌿 Let's all go solar!
                </p>
                <div className="flex gap-x-4">
                  <button
                    className="group inline-flex items-center gap-x-1 outline-none after:content-[attr(data-like-count)] focus:after:content-[attr(data-like-count-alt)] hover:text-[#ae7aff] focus:text-[#ae7aff]"
                    data-like-count={9}
                    data-like-count-alt={10}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="h-5 w-5 group-focus:fill-[#ae7aff]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                      />
                    </svg>
                  </button>
                  <button className="inline-flex items-center gap-x-1 outline-none hover:text-[#ae7aff]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      className="h-5 w-5"
                    >
                      <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 00-1.032-.211 50.89 50.89 0 00-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 002.433 3.984L7.28 21.53A.75.75 0 016 21v-4.03a48.527 48.527 0 01-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979z" />
                      <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 001.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0015.75 7.5z" />
                    </svg>
                    <span>1</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default FullBlog;
