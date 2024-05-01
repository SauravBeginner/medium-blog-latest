import { atom, atomFamily, selector, selectorFamily } from "recoil";
import axios from "axios";
import { authURL } from "../utils/baseUrl";

export const authTokenState = atom({
  key: "authTokenState",
  default: localStorage.getItem("token") || null,
});

export const isAuthenticated = atom({
  key: "isAuthenticated",
  default: selector({
    key: "isAuthenticatedSelector",
    get: ({ get }) => {
      const token = get(authTokenState);
      return !!token;
    },
  }),
});

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

export const userProfileId = atom({
  key: "userProfileId",
  default: null,
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
          : type !== "myposts"
          ? `${authURL}/blog/bulk?page=${page}&limit=4`
          : `${authURL}/blog/myposts?page=${page}&limit=4`,
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

export const myProfileDetailsAtom = atom({
  key: "myProfileDetailsAtom",
  default: selector({
    key: "myProfileDetailsSelector",
    get: async ({ get }) => {
      const token = get(authTokenState);
      if (!token) {
        throw new Error("Token not available");
      }
      try {
        const response = await axios.get(`${authURL}/user/myprofile`, {
          headers: {
            Authorization: `Bearer ${token}`, // Use the token from the state
          },
        });

        return response?.data?.myDetails;
      } catch (error) {
        // Handle errors, such as by returning a default value or re-throwing the error
        console.error("Error fetching profile details:", error);
        localStorage.removeItem("token");
        throw error;
      }
    },
  }),
});

export const userProfileDetailsAtom = atomFamily({
  key: "myProfileDetailsAtom",
  default: selectorFamily({
    key: "myProfileDetailsSelector",
    get:
      (id) =>
      async ({ get }) => {
        const token = get(authTokenState);
        if (!token) {
          throw new Error("Token not available");
        }
        const userId = String(id);
        try {
          const response = await axios.get(
            `${authURL}/user/userProfile/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`, // Use the token from the state
              },
            }
          );

          return response?.data?.myDetails;
        } catch (error) {
          // Handle errors, such as by returning a default value or re-throwing the error
          console.error("Error fetching profile details:", error);
          //    localStorage.removeItem("token");
          throw error;
        }
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

export const userSelector = selector({
  key: "userSelector",
  get: async ({ get }) => {
    const token = get(authTokenState);
    // const page = get(currentPageState);
    if (!token) {
      throw new Error("Token not available");
    }

    try {
      const response = await axios.get(
        `${authURL}/user/allUsers`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response);
      return response?.data?.allUsers || [];
    } catch (e) {
      console.log(e);
      return [];
    }
  },
});
export const userAtom = atom({
  key: "userAtom",
  default: userSelector,
});
