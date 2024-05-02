import { atom, atomFamily, selector, selectorFamily } from "recoil";
import { authURL } from "../utils/baseUrl";
import axios from "axios";
import { authTokenState, userProfileId } from "./userAtom";

export const blogsState = atom({
  key: "blogsState", // unique identifier for this atom
  default: [], // initial value is an empty array
});
export const hasLikedAtom = atomFamily({
  key: "hasLikedAtom",
  default: false,
});
export enum BlogType {
  MyPosts = "myposts",
  AllPosts = "allposts",
}

export const blogTypes = atom({
  key: "blogTypes", // unique identifier for this atom
  // default: BlogType.AllPosts, // initial value is an empty array

  default: "allposts",
});

export const blogSelector = selector({
  key: "blogSelector",
  get: async ({ get }) => {
    const token = get(authTokenState);
    const page = get(currentPageState);
    if (!token) {
      throw new Error("Token not available");
    }
    const type = get(blogTypes);
    const id = get(userProfileId);

    try {
      const response = await axios.get(
        type === "userposts"
          ? `${authURL}/blog/userposts/${id}?page=${page}&limit=4`
          : type === "myposts"
          ? `${authURL}/blog/myposts?page=${page}&limit=4`
          : type === "following"
          ? `${authURL}/blog/followingPost?page=${page}&limit=4`
          : `${authURL}/blog/bulk?page=${page}&limit=4`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response?.data?.posts || [];
    } catch (e) {
      console.log(e);
      return [];
    }
  },
});

export const blogDetailsAtomFamily = atomFamily({
  key: "blogDetailsAtomFamily",
  default: selectorFamily({
    key: "singleBlogSelectorFamily",
    get:
      (id) =>
      async ({ get }) => {
        const token = get(authTokenState);
        if (!token) {
          throw new Error("Token not available");
        }
        const postId = String(id);
        const response = await axios.get(`${authURL}/blog/post/${postId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        return response?.data?.post;
      },
  }),
});
export const currentPageState = atom({
  key: "currentPageState",
  default: 1,
});

export const hasMoreState = atom({
  key: "hasMoreState",
  default: true,
});
export const itemsState = atom({
  key: "itemsState", // unique ID (with respect to other atoms/selectors)
  default: [] as any, // default value (aka initial value)
});
