import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

import { useRecoilValueLoadable } from "recoil";
import { useState } from "react";
import { useTimeDiffer } from "../hooks/UseTimeDiffer";
import parse from "html-react-parser";
import { imgSrc } from "./RightBar";
import { blogDetailsAtomFamily } from "../store/atoms/blogAtoms";

type BlogCardProps = {
  id: string;
  title: string;
  content: string;
  authorName: string;
  authorId: string;
  publishedDate: Date;
  likeCount: number;
  hasLiked: boolean;
};
const BlogCard = ({
  id,
  content,
  authorName,
  authorId,
  title,
  publishedDate,
}: BlogCardProps) => {
  // const [isProcessing, setIsProcessing] = useState(false);

  const blogDetails = useRecoilValueLoadable(blogDetailsAtomFamily(id));

  const hashLiked =
    blogDetails.state === "hasValue" && blogDetails.contents.hasLiked;

  // if (blogDetails.state === "hasValue") {
  //   title = blogDetails.contents?.title;
  //   content = blogDetails.contents?.content;
  // }

  // const handleLike = async () => {
  //   if (isProcessing) return;
  //   try {
  //     setIsProcessing(true);
  //     const response = await axios.put(
  //       `${authURL}/blog/like`,
  //       {
  //         id: id,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     setBlogDetails((prevDetails: any) => ({
  //       ...prevDetails,
  //       likeCount: response.data.likeCount,
  //       hasLiked: response.data.hasLiked,
  //     }));
  //   } catch (e) {
  //     console.log(e);
  //   } finally {
  //     setIsProcessing(false);
  //   }
  // };
  // useTimeDiffer custom hook
  const timeDifference = useTimeDiffer(publishedDate);

  return (
    <>
      <div className="relative mb-2 w-full last:mb-0 sm:mb-4 ">
        <div className="flex bg-[black]/40 rounded-none sm:rounded-md md:rounded-lg border-b border-t border-[white]/60 p-4 text-white sm:border-l sm:border-r  shadow-md shadow-[white]/70 ">
          <div className="pl-4 pt-1 w-full">
            <div className=" mb-2 flex items-center gap-x-2">
              <Link to={`/user/${authorId}`}>
                <div className="flex items-center gap-x-4">
                  <div className="h-10 w-10 shrink-0 sm:h-10 sm:w-10">
                    <img
                      // src="https://images.pexels.com/photos/18264716/pexels-photo-18264716.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"

                      src={imgSrc}
                      alt="Mystical Wanderer"
                      className="h-full w-full rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="inline-block font-bold  hover:underline">
                      {authorName}
                    </h2>
                    <span className="ml-2 inline-block text-sm text-gray-400">
                      {timeDifference}
                    </span>
                  </div>
                </div>
              </Link>

              {/* <button className="ml-auto shrink-0 hover:text-[#ae7aff]">
              <IoEllipsisVertical />
            </button> */}
            </div>
            <Link to={`/blog/${id}`}>
              <div className="flex items-center justify-between mb-4 space-x-2">
                <div className="">
                  <p className="pb-2 text-lg sm:text-base font-bold">{title}</p>
                  <p className="text-sm sm:text-base">
                    {parse(content.slice(0, 400))}
                    <div className="text-[#ae7aff] underline cursor-pointer">
                      Read more...
                    </div>
                  </p>
                </div>
                <div className="shrink-0 h-40 w-40 md:h-24md:w-24">
                  <img
                    //    src="https://images.pexels.com/photos/18264716/pexels-photo-18264716.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    src={imgSrc}
                    alt="Mystical Wanderer"
                    className="h-full w-full rounded-sm object-cover"
                  />
                </div>
              </div>
            </Link>
            <div className="flex gap-x-4 items-center">
              <button
                className={`inline-flex items-center gap-x-1 outline-none hover:text-[#ae7aff] ${
                  hashLiked ? "text-[#ae7aff]" : "text-white"
                }`}
                //   onClick={handleLike}
                //   disabled={isProcessing}
              >
                <FaHeart size={20} />
                <span>{blogDetails?.contents?.likeCount || 0}</span>
              </button>
              {/* <button className="inline-flex items-center gap-x-1 outline-none hover:text-[#ae7aff]">
              <FaComment size={20} />
              <span>13</span>
            </button> */}

              {/* <div className="ml-auto">
                <button className="mr-2 inline-flex items-center gap-x-1 outline-none hover:text-[#ae7aff]">
                  <MdEditSquare size={20} />
                </button>
                <button
                  className="ml-2 inline-flex items-center gap-x-1 outline-none hover:text-[#ae7aff] focus:text-[#ae7aff]"
                  onClick={() => setIsOpen(true)}
                >
                  <MdDelete size={20} />
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogCard;
