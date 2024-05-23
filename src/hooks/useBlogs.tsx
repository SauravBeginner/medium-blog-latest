import axios from "axios";
import { useEffect, useState } from "react";
import { baseURL } from "../utils/baseUrl";
import { authAxios } from "../utils/axiosClient";
import { BlogType, currentPageStateAtom } from "../store/atoms/blogAtoms";
import { useRecoilValue } from "recoil";

import { useLocation } from "react-router-dom";

export interface Blog {
  title: string;
  content: string;
  id: string;
  author: {
    name: string;
  };
  publishedDate?: string;
}

export const useBlog = ({ id }: { id: string }) => {
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
  const page = useRecoilValue(currentPageStateAtom);
  // const type = useRecoilValue(blogTypesAtom);

  const location = useLocation();
  console.log("location", location.pathname);

  useEffect(() => {
    setLoading(true);
    authAxios
      .get(
        blogType === BlogType.UserPosts
          ? `/blog/userposts/${id}?page=${page}&limit=4`
          : blogType === BlogType.MyPosts
          ? `/blog/myposts?page=${page}&limit=4`
          : blogType === BlogType.FollowingPosts
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
  }, [page]);

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
