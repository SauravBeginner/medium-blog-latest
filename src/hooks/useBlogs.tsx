import axios from "axios";
import { useEffect, useState } from "react";
import { baseURL } from "../utils/baseUrl";

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

export const useBlogs = ({ blogType }: { blogType?: string }) => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    axios
      .get(
        blogType !== "myposts"
          ? `${baseURL}/blog/bulk`
          : `${baseURL}/blog/myposts`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        setBlogs(response.data.posts);

        setLoading(false);
      })
      .catch((e) => console.log(e));
  }, []);

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
