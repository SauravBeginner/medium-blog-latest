import { atom, atomFamily, selector, selectorFamily } from "recoil";
import { authURL } from "../utils/baseUrl";
import axios from "axios";
import { authTokenState, userProfileId } from "./userAtom";

export const hasLikedAtom = atomFamily({
  key: "hasLikedAtom",
  default: false,
});
export enum BlogType {
  MyPosts = "myposts",
  AllPosts = "allposts",
  Following = "followingposts",
  UserPosts = "userposts",
}

export const blogTypes = atom({
  key: "blogTypes", // unique identifier for this atom
  // default: BlogType.AllPosts, // initial value is an empty array

  // default: "allposts",

  default: BlogType.AllPosts,
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
        type === BlogType.UserPosts
          ? `${authURL}/blog/userposts/${id}?page=${page}&limit=4`
          : type === BlogType.MyPosts
          ? `${authURL}/blog/myposts?page=${page}&limit=4`
          : type === BlogType.Following
          ? `${authURL}/blog/followingPosts?page=${page}&limit=4`
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
  effects_UNSTABLE: [
    ({ setSelf, onSet }) => {
      // const blogType = localStorage.getItem("currentBlogType");
      // const savedState = localStorage.getItem("itemsState");
      const savedState = localStorage.getItem(`itemsState`);

      if (savedState !== null) {
        setSelf(JSON.parse(savedState));
      }
      onSet((newValue, oldValue) => {
        //  console.log("itemsState changed from", oldValue, "to", newValue);
        // localStorage.setItem("itemsState", JSON.stringify(newValue));

        localStorage.setItem(`itemsState`, JSON.stringify(newValue));
      });
    },
  ],
});
export const myBlogState = atom({
  key: "myBlogState", // unique ID (with respect to other atoms/selectors)
  default: [] as any, // default value (aka initial value)
  effects_UNSTABLE: [
    ({ setSelf, onSet }) => {
      // const blogType = localStorage.getItem("currentBlogType");
      // const savedState = localStorage.getItem("itemsState");
      const savedState = localStorage.getItem(`myBlogState`);

      if (savedState !== null) {
        setSelf(JSON.parse(savedState));
      }
      onSet((newValue, oldValue) => {
        // console.log("myBlogState changed from", oldValue, "to", newValue);
        // localStorage.setItem("itemsState", JSON.stringify(newValue));

        localStorage.setItem(`myBlogState`, JSON.stringify(newValue));
      });
    },
  ],
});
export const userBlogState = atom({
  key: "userBlogState", // unique ID (with respect to other atoms/selectors)
  default: [] as any, // default value (aka initial value)
  effects_UNSTABLE: [
    ({ setSelf, onSet }) => {
      // const blogType = localStorage.getItem("currentBlogType");
      // const savedState = localStorage.getItem("itemsState");
      const savedState = localStorage.getItem(`userBlogState`);

      if (savedState !== null) {
        setSelf(JSON.parse(savedState));
      }
      onSet((newValue, oldValue) => {
        // console.log("userBlogState changed from", oldValue, "to", newValue);
        // localStorage.setItem("itemsState", JSON.stringify(newValue));

        localStorage.setItem(`userBlogState`, JSON.stringify(newValue));
      });
    },
  ],
});

export const followingBlogState = atom({
  key: "followingBlogState", // unique ID (with respect to other atoms/selectors)
  default: [] as any, // default value (aka initial value)
  effects_UNSTABLE: [
    ({ setSelf, onSet }) => {
      // const blogType = localStorage.getItem("currentBlogType");
      // const savedState = localStorage.getItem("itemsState");
      const savedState = localStorage.getItem(`followingBlogState`);

      if (savedState !== null) {
        setSelf(JSON.parse(savedState));
      }
      onSet((newValue, oldValue) => {
        localStorage.setItem(`followingBlogState`, JSON.stringify(newValue));
      });
    },
  ],
});
export const blogsState = atom({
  key: "blogsState", // unique identifier for this atom
  default: [], // initial value is an empty array
});
export const timeDifferAtom = atom({
  key: "timeDifferAtom",
  default: "",
});
