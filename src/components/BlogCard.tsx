import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

import { useRecoilStateLoadable } from "recoil";
import { useTimeDiffer } from "../hooks/UseTimeDiffer";
import parse from "html-react-parser";
import { imgSrc } from "./RightBar";
import { blogDetailsAtomFamily } from "../store/atoms/blogAtoms";
import { useState } from "react";
import { authAxios } from "../utils/axiosClient";
import { authURL } from "../utils/baseUrl";

type BlogCardProps = {
  id: string;
  title: string;
  content: string;
  authorName: string;
  authorId: string;
  publishedDate: Date;
  likeCount: number;
  hasLiked: boolean;
  thumbNail?: string;
  authorImg?: string;
};
const BlogCard = ({
  id,
  content,
  authorName,
  authorId,
  title,
  publishedDate,
  thumbNail,
  authorImg,
}: BlogCardProps) => {
  // const [isProcessing, setIsProcessing] = useState(false);

  const [blogDetails, setBlogDetails] = useRecoilStateLoadable(
    blogDetailsAtomFamily(id)
  );
  const hashLiked =
    blogDetails.state === "hasValue" && blogDetails.contents.hasLiked;

  const imgURL = thumbNail ? thumbNail : imgSrc;
  // if (blogDetails.state === "hasValue") {
  //   title = blogDetails.contents?.title;
  //   content = blogDetails.contents?.content;
  // }

  const [isProcessing, setIsProcessing] = useState(false);

  const handleLike = async () => {
    if (isProcessing) return;
    try {
      setIsProcessing(true);
      const response = await authAxios.put(`${authURL}/blog/like`, {
        id: id,
      });

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
  // useTimeDiffer custom hook
  const timeDifference = useTimeDiffer(publishedDate);

  return (
    <div className="relative mb-2 w-full last:mb-0 sm:mb-4">
      <div className="flex flex-col sm:flex-row bg-[black]/40 rounded-none sm:rounded-md md:rounded-lg border-b border-t border-[white]/60 p-4 text-white sm:border-l sm:border-r shadow-md shadow-[white]/70 sm:space-x-4 md:h-60 h-full">
        <div className="shrink-0 h-60 w-full sm:h-auto sm:w-60 sm:mb-0 mb-4">
          <img
            src={imgURL}
            loading={"lazy"}
            alt="Blog Thumbnail"
            className="h-full w-full rounded-sm object-cover"
          />
        </div>
        <div className="flex flex-col pl-0 sm:pl-4 pt-1 w-full h-full">
          <div className="mb-2 flex items-center gap-x-2">
            <Link to={`/user/${authorId}`}>
              <div className="flex items-center gap-x-4">
                <div className="h-10 w-10 shrink-0 sm:h-10 sm:w-10">
                  <img
                    src={authorImg || imgSrc}
                    loading={"lazy"}
                    alt="Author"
                    className="w-full h-full rounded-full aspect-square object-cover  border-2 border-[#ae7aff]"
                  />
                </div>
                <div>
                  <h2 className="inline-block font-bold hover:underline">
                    {authorName}
                  </h2>
                  <span className="ml-2 inline-block text-sm text-gray-400">
                    {timeDifference}
                  </span>
                </div>
              </div>
            </Link>
          </div>
          <div className="flex-grow overflow-hidden">
            <Link to={`/blog/${id}`}>
              <div className="flex flex-col items-start sm:flex-row sm:items-center justify-between mb-4 space-y-4 sm:space-y-0 sm:space-x-5 md:space-x-10">
                <div className="w-full sm:w-auto">
                  <p className="pb-2 text-lg sm:text-base font-bold">{title}</p>
                  <p className="text-sm sm:text-base line-clamp-3">
                    {parse(content.slice(0, 800))}
                  </p>
                  <span className="text-[#ae7aff] text-sm underline cursor-pointer">
                    Read more...
                  </span>
                </div>
              </div>
            </Link>
          </div>
          <div className="flex gap-x-4 items-center mt-auto">
            <button
              className={`inline-flex items-center gap-x-1 outline-none hover:text-[#ae7aff] ${
                hashLiked ? "text-[#ae7aff]" : "text-white"
              }`}
              onClick={handleLike}
              disabled={isProcessing}
            >
              <FaHeart size={20} />
              <span>{blogDetails?.contents?.likeCount || 0}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
