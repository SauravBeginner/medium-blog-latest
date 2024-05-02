import { Link } from "react-router-dom";
import { FaBookmark, FaComment, FaHeart } from "react-icons/fa";
import { IoMdShare } from "react-icons/io";
import { IoEllipsisVertical } from "react-icons/io5";
import { authURL } from "../utils/baseUrl";
import axios from "axios";
import { useRecoilStateLoadable, useRecoilValue } from "recoil";
import { authTokenState, blogDetailsAtomFamily } from "../store";
import { useState } from "react";

type BlogCardProps = {
  id: string;
  title: string;
  content: string;
  authorName: string;
  authorId: string;
  publishedDate?: string;
  likeCount: number;
  hasLiked: boolean;
};
const BlogCard = ({
  id,
  content,
  authorName,
  authorId,
  title,
}: // likeCount,
// hasLiked,
BlogCardProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  //  const [neWLikeCount, setNewLikeCount] = useState(likeCount);
  // const [liked, setLiked] = useState(hasLiked);
  // const [newBlog, setNewBlog] = useRecoilState(refetchBlogPostsTrigger);
  const [blogDetails, setBlogDetails] = useRecoilStateLoadable(
    blogDetailsAtomFamily(id)
  );
  // const [hashLiked, sethashLiked] = useRecoilState(hasLikedAtom(id));
  const token = useRecoilValue(authTokenState);

  const hashLiked =
    blogDetails.state === "hasValue" && blogDetails.contents.hasLiked;
  // const likeCount =
  //   blogDetails.state === "hasValue" && blogDetails?.contents?.likeCount;

  // console.log("hashLiked: ", hashLiked);
  const handleLike = async () => {
    //  console.log("before", hasLiked);
    if (isProcessing) return;
    try {
      setIsProcessing(true);
      const response = await axios.put(
        `${authURL}/blog/like`,
        {
          id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBlogDetails((prevDetails: any) => ({
        ...prevDetails,
        likeCount: response.data.likeCount,
        hasLiked: response.data.hasLiked,
      }));
    } catch (e) {
      console.log(e);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="relative mb-2 w-full last:mb-0 sm:mb-4">
      <div className="flex bg-[black]/40 rounded-none sm:rounded-md md:rounded-lg border-b border-t border-[white]/60 p-4 text-white sm:border-l sm:border-r">
        {/* <Link to={`/user/blog/${authorId}`}>
          <div className="h-10 w-10 shrink-0 sm:h-8 sm:w-8">
            <img
              src="https://images.pexels.com/photos/18264716/pexels-photo-18264716.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Mystical Wanderer"
              className="h-full w-full rounded-full object-cover"
            />
          </div>
        </Link> */}

        <div className="pl-4 pt-1 w-full">
          <div className=" mb-2 flex items-center gap-x-2">
            <Link to={`/user/blog/${authorId}`}>
              <div className="flex items-center gap-x-4">
                <div className="h-10 w-10 shrink-0 sm:h-10 sm:w-10">
                  <img
                    src="https://images.pexels.com/photos/18264716/pexels-photo-18264716.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="Mystical Wanderer"
                    className="h-full w-full rounded-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="inline-block font-bold">{authorName}</h2>
                  <span className="ml-2 inline-block text-sm text-gray-400">
                    15 minutes ago
                  </span>
                </div>
              </div>
            </Link>

            <button className="ml-auto shrink-0 hover:text-[#ae7aff]">
              <IoEllipsisVertical />
            </button>
          </div>
          <Link to={`/blog/${id}`}>
            <div className="flex items-center justify-between mb-4 space-x-2">
              <div className="">
                <p className="pb-2 text-lg sm:text-base font-bold">{title}</p>
                <p className="text-sm sm:text-sm">{content}</p>
              </div>
              <div className="shrink-0 h-20 w-20 md:h-24md:w-24">
                <img
                  src="https://images.pexels.com/photos/18264716/pexels-photo-18264716.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
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
              onClick={handleLike}
              disabled={isProcessing}
            >
              <FaHeart />
              <span>{blogDetails?.contents?.likeCount}</span>
            </button>
            <button className="inline-flex items-center gap-x-1 outline-none hover:text-[#ae7aff]">
              <FaComment />
              <span>13</span>
            </button>
            <div className="ml-auto">
              <button className="mr-2 inline-flex items-center gap-x-1 outline-none hover:text-[#ae7aff]">
                <IoMdShare />
              </button>
              <button className="group inline-flex items-center gap-x-1 outline-none hover:text-[#ae7aff] focus:text-[#ae7aff]">
                <FaBookmark />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
