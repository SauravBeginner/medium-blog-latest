import { atom, atomFamily, selector, selectorFamily } from "recoil";
import {
  getMyProfileDataSelector,
  myFollowersCountSelector,
  myFollowingCountSelector,
  userFollowersCountSelectorFamily,
  userFollowingCountSelectorFamily,
} from "../selectors/userSelector";
import { authAxios } from "../../utils/axiosClient";

export const authState = atom({
  key: "authState",
  default: {
    status: false,
    // userData: null,
  },
});
export const isAuthenticated = selector({
  key: "isAuthenticated",
  get: ({ get }) => {
    const { status } = get(authState);
    return status;
  },
});

export const myProfileDetailsAtom = atom({
  key: "myProfileDetailsAtom",
  default: getMyProfileDataSelector,
});

export const userProfileIdAtom = atom({
  key: "userProfileIdAtom",
  default: "",
});
export const userProfileDetailsAtomFamily = atomFamily({
  key: "userProfileDetailsAtom",
  default: selectorFamily({
    key: "userProfileDetailsSelector",
    get:
      (id) =>
      async ({}) => {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token not available");
        }
        const userId = String(id);
        try {
          const response = await authAxios.get(`/user/userProfile/${userId}`);

          return response?.data?.userDetails;
        } catch (error) {
          // Handle errors, such as by returning a default value or re-throwing the error
          console.error("Error fetching profile details:", error);
          //    localStorage.removeItem("token");
          throw error;
        }
      },
  }),
});

export const currentFollwoingPageAtom = atom({
  key: "currentFollwoingPageAtom",
  default: 1,
});

export const suggestionAtom = atom({
  key: "suggestionAtom",
  default: selector({
    key: "suggestionSelector",
    get: async ({ get }) => {
      const token = localStorage.getItem("token");
      const page = get(currentFollwoingPageAtom);

      if (!token) {
        throw new Error("Token not available");
      }
      try {
        const response = await authAxios.get(
          `/user/suggestions?page=${page}&limit=10`
        );
        // console.log("followings: ", response?.data?.suggestions);
        return response?.data?.suggestions || [];
      } catch (error) {
        // Handle errors, such as by returning a default value or re-throwing the error
        console.error("Error fetching profile details:", error);
        localStorage.removeItem("token");
        throw error;
      }
    },
  }),
});
export const followTypes = atom({
  key: "followTypes", // unique identifier for this atom
  // default: BlogType.AllPosts, // initial value is an empty array

  default: "followings",
});

export const myFollowingCountAtom = atom({
  key: "myFollowingCountAtom",
  default: myFollowingCountSelector, // Set the default value to the result of the selector
});

export const userFollowingCountAtomFamily = atomFamily({
  key: "userFollowingCountAtomFamily",
  default: userFollowingCountSelectorFamily, // Set the default value to the result of the selector
});
export const myFollowersCountAtom = atom({
  key: "myFollowersCountAtom",
  default: myFollowersCountSelector, // Set the default value to the result of the selector
});
export const userFollowersCountAtomFamily = atomFamily({
  key: "userFollowersCountAtomFamily",
  default: userFollowersCountSelectorFamily, // Set the default value to the result of the selector
});
export const myfollowingsAtom = atom({
  key: "myfollowingsAtom",
  default: selector({
    key: "myfollowingsSelector",
    get: async ({ get }) => {
      const token = localStorage.getItem("token");

      const myProfile = get(myProfileDetailsAtom);
      const myUserId = myProfile?.id;
      const page = get(currentFollwoingPageAtom);
      const followType = get(followTypes);

      if (!token) {
        throw new Error("Token not available");
      }
      const userId = String(myUserId);
      try {
        if (followType === "followings") {
          const response = await authAxios.get(
            `/user/followings/${userId}?page=${page}&limit=10`
          );
          console.log("followings: ", response?.data?.folllowingUsers);
          return response?.data?.folllowingUsers || [];
        } else if (followType === "followers") {
          const response = await authAxios.get(
            `/user/followers/${userId}?page=${page}&limit=3`
          );
          console.log("followers: ", response?.data?.followerUsers);

          return response?.data?.followerUsers || [];
        }
      } catch (error) {
        // Handle errors, such as by returning a default value or re-throwing the error
        console.error("Error fetching profile details:", error);
        localStorage.removeItem("token");
        throw error;
      }
    },
  }),
});
export const followingsAtom = atomFamily({
  key: "followingsAtom",
  default: selectorFamily({
    key: "followingsSelectorFamily",
    get:
      (id) =>
      async ({ get }) => {
        const token = localStorage.getItem("token");
        const page = get(currentFollwoingPageAtom);
        if (!token) {
          throw new Error("Token not available");
        }
        const userId = String(id);
        try {
          const response = await authAxios.get(
            `/user/followings/${userId}?page=${page}&limit=10`
          );
          console.log("followings: ", response?.data?.folllowingUsers);
          return response?.data?.folllowingUsers || [];
        } catch (error) {
          // Handle errors, such as by returning a default value or re-throwing the error
          console.error("Error fetching profile details:", error);
          localStorage.removeItem("token");
          throw error;
        }
      },
  }),
});
export const followersAtom = atomFamily({
  key: "followersAtom",
  default: selectorFamily({
    key: "followersSelectorFamily",
    get:
      (id) =>
      async ({ get }) => {
        const token = localStorage.getItem("token");
        const page = get(currentFollwoingPageAtom);

        if (!token) {
          throw new Error("Token not available");
        }
        const userId = String(id);
        try {
          const response = await authAxios.get(
            `/user/followers/${userId}?page=${page}&limit=3`
          );
          console.log("followers: ", response?.data?.followerUsers);

          return response?.data?.followerUsers || [];
        } catch (error) {
          // Handle errors, such as by returning a default value or re-throwing the error
          console.error("Error fetching profile details:", error);
          localStorage.removeItem("token");
          throw error;
        }
      },
  }),
});
