import { selector, selectorFamily } from "recoil";
import {
  BlogType,
  blogTypesAtom,
  currentPageStateAtom,
} from "../atoms/blogAtoms";
import { authAxios } from "../../utils/axiosClient";
import { userProfileIdAtom } from "../atoms/userAtoms";

export const allBlogSelector = selector({
  key: "allBlogSelector",
  get: async ({ get }) => {
    const token = localStorage.getItem("token");

    const page = get(currentPageStateAtom);
    if (!token) {
      throw new Error("Token not available");
    }
    // const type = get(blogTypes);
    // const id = get(userProfileId);

    try {
      const response = await authAxios.get(`/blog/bulk?page=${page}&limit=4`);
      return response?.data?.posts || [];
    } catch (e) {
      console.log(e);
      return [];
    }
  },
});

export const myBlogSelector = selector({
  key: "myBlogSelector",
  get: async ({ get }) => {
    const token = localStorage.getItem("token");

    const page = get(currentPageStateAtom);
    if (!token) {
      throw new Error("Token not available");
    }

    try {
      const response = await authAxios.get(
        `/blog/myposts?page=${page}&limit=4`
      );
      return response?.data?.posts || [];
    } catch (e) {
      console.log(e);
      return [];
    }
  },
});
export const followinBlogSelector = selector({
  key: "followinBlogSelector",
  get: async ({ get }) => {
    const token = localStorage.getItem("token");

    const page = get(currentPageStateAtom);
    if (!token) {
      throw new Error("Token not available");
    }
    try {
      const response = await authAxios.get(
        `/blog/followingPosts?page=${page}&limit=4`
      );
      return response?.data?.posts || [];
    } catch (e) {
      console.log(e);
      return [];
    }
  },
});

export const userBlogSelector = selector({
  key: "userBlogSelectorFamily",
  get: async ({ get }) => {
    const token = localStorage.getItem("token");

    const page = get(currentPageStateAtom);
    if (!token) {
      throw new Error("Token not available");
    }
    // const type = get(blogTypes);
    const id = get(userProfileIdAtom);
    // const postId = String(id);
    try {
      const response = await authAxios.get(
        `/blog/userposts/${id}?page=${page}&limit=4`
      );
      return response?.data?.posts || [];
    } catch (e) {
      console.log(e);
      return [];
    }
  },
});
export const blogSelector = selector({
  key: "blogSelector",
  get: async ({ get }) => {
    const token = localStorage.getItem("token");
    const page = get(currentPageStateAtom);
    if (!token) {
      throw new Error("Token not available");
    }
    const type = get(blogTypesAtom);
    const id = get(userProfileIdAtom);

    try {
      const response = await authAxios.get(
        type === BlogType.UserPosts
          ? `/blog/userposts/${id}?page=${page}&limit=4`
          : type === BlogType.MyPosts
          ? `/blog/myposts?page=${page}&limit=4`
          : type === BlogType.FollowingPosts
          ? `/blog/followingPosts?page=${page}&limit=4`
          : `/blog/bulk?page=${page}&limit=4`
      );
      return response?.data?.posts || [];
    } catch (e) {
      console.log(e);
      return [];
    }
  },
});

export const blogSelectorFamily = selectorFamily({
  key: "blogSelectorFamily",
  get:
    (id) =>
    async ({ get }) => {
      const token = localStorage.getItem("token");
      const page = get(currentPageStateAtom);
      if (!token) {
        throw new Error("Token not available");
      }
      const type = get(blogTypesAtom);
      const ids = String(id);

      try {
        const response = await authAxios.get(
          type === BlogType.UserPosts
            ? `/blog/userposts/${ids}?page=${page}&limit=4`
            : type === BlogType.MyPosts
            ? `/blog/myposts?page=${page}&limit=4`
            : type === BlogType.FollowingPosts
            ? `/blog/followingPosts?page=${page}&limit=4`
            : `/blog/bulk?page=${page}&limit=4`
        );
        return response?.data?.posts || [];
      } catch (e) {
        console.log(e);
        return [];
      }
    },
});
