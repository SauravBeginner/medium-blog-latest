import axios from "axios";
import { useEffect, useState } from "react";
import { baseURL } from "../utils/baseUrl";
import { authAxios } from "../utils/axiosClient";

import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { useLocation } from "react-router-dom";
import { BlogType, blogTypes, currentPageState } from "../store";

export interface Blog {
  title: string;
  content: string;
  id: string;
  author: {
    name: string;
  };
  publishedDate?: string;
}

const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlogs] = useState<Blog>();

  useEffect(() => {
    axios
      .get(`${baseURL}/blog/post/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setBlogs(response.data.post);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  }, [id]);

  return { loading, blog };
};

export const useBlogs = (
  { blogType }: { blogType?: string },
  { id }: { id?: string }
) => {
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const page = useRecoilValue(currentPageState);

  const [type, setType] = useRecoilState(blogTypes);

  let blogAtom;
  const location = useLocation();
  console.log("location", location.pathname);

  // if (blogType === BlogType.AllPosts) {
  //   blogAtom = allBlogStateAtom;
  // } else if (blogType === BlogType.FollowingPosts) {
  //   blogAtom = followingBlogStateAtom;
  // } else if (blogType === BlogType.UserPosts) {
  //   blogAtom = myProfileDetails.id !== id ? userBlogStateAtom : myBlogStateAtom;
  // } else {
  //   blogAtom = myBlogStateAtom;
  // }
  // const [blogs, setBlogs] = useRecoilState(blogAtom);

  useEffect(() => {
    setLoading(true);
    authAxios
      .get(
        blogType === BlogType.UserPosts
          ? `/blog/userposts/${id}?page=${page}&limit=4`
          : blogType === BlogType.MyPosts
          ? `/blog/myposts?page=${page}&limit=4`
          : blogType === BlogType.Following
          ? `/blog/followingPosts?page=${page}&limit=4`
          : `/blog/bulk?page=${page}&limit=4`
      )
      .then((response) => {
        setBlogs(response.data.posts);
        //  setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => setLoading(false));
    // return () => {
    //   setBlogs([]);
    // };
  }, [type, page]);

  return { loading, blogs };
};

// export const useMyBlogs = () => {
//   const [loading, setLoading] = useState(true);
//   const [myBlogs, setMyBlogs] = useState<Blog[]>([]);

//   useEffect(() => {
//     axios
//       .get(`${baseURL}/blog/myposts`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       })
//       .then((response) => {
//         setMyBlogs(response.data.posts);

//         setLoading(false);
//       })
//       .catch((e) => console.log(e));
//   }, []);

//   return { loading, myBlogs };
// };
