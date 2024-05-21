import { Link, useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

import { authURL } from "../utils/baseUrl";
import axios from "axios";
import { useRecoilStateLoadable, useRecoilValueLoadable } from "recoil";

import { useState } from "react";
import { MdDelete, MdEditSquare } from "react-icons/md";
import { useTimeDiffer } from "../hooks/UseTimeDiffer";
import parse from "html-react-parser";
import { blogDetailsAtomFamily } from "../store/atoms/blogAtoms";
import { myProfileDetailsAtom } from "../store/atoms/userAtoms";
import { imgSrc } from "./RightBar";

type BlogCardProps = {
  id: string;
  title: string;
  content: string;
  authorName: string;
  authorId: string;
  publishedDate: Date;
  // likeCount: number;
  // hasLiked: boolean;
};
const FullBlog = ({
  id,
  content,
  authorName,
  authorId,
  title,
  publishedDate,
}: BlogCardProps) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const [blogDetails, setBlogDetails] = useRecoilStateLoadable(
    blogDetailsAtomFamily(id)
  );
  const token = localStorage.getItem("token");
  const hashLiked =
    blogDetails.state === "hasValue" && blogDetails.contents.hasLiked;

  const handleLike = async () => {
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

  const myProfileDetails = useRecoilValueLoadable(myProfileDetailsAtom);
  const currentUser = myProfileDetails?.contents;

  const timeDifference = useTimeDiffer(publishedDate);
  const navigate = useNavigate();

  return (
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
                  <h2 className="inline-block text-lg font-bold">
                    {authorName}
                  </h2>
                  <span className="ml-2 inline-block text-sm text-gray-400">
                    {timeDifference}
                  </span>
                </div>
              </div>
            </Link>
          </div>
          <Link to={`/blog/${id}`}>
            <div className="flex items-center justify-between mb-4 space-x-2">
              <div className="mr-10">
                <p className="py-2 text-lg sm:text-4xl font-bold text-center">
                  {title}
                </p>
                <div className="shrink-0 h-80 w-4/6 md:h-24md:w-24 mx-auto my-4">
                  <img
                    // src="https://images.pexels.com/photos/18264716/pexels-photo-18264716.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    src={imgSrc}
                    alt="Mystical Wanderer"
                    className="h-full w-full rounded-sm object-cover"
                  />
                </div>
                <p className="text-sm sm:text-2xl py-2 font-bold">Content:</p>
                <p className="text-sm sm:text-lg py-2">{parse(content)}</p>
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
              <FaHeart size={25} />
              <span className="text-2xl">
                {blogDetails?.contents?.likeCount || 0}
              </span>
            </button>

            {currentUser?.id ===
              (blogDetails?.contents?.authorId || authorId) && (
              <div className="ml-auto">
                <button
                  className="mr-2 inline-flex items-center gap-x-1 outline-none hover:text-[#ae7aff]"
                  onClick={() => navigate(`/blog/update/${id}`)}
                >
                  <MdEditSquare size={25} />
                </button>
                <button className="ml-2 inline-flex items-center gap-x-1 outline-none hover:text-[#ae7aff] focus:text-[#ae7aff] ">
                  <MdDelete size={25} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullBlog;
