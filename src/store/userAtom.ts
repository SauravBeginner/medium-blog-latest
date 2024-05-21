import { atom, atomFamily, selector, selectorFamily } from "recoil";
import { authURL } from "../utils/baseUrl";
import axios from "axios";

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
export const userProfileId = atom({
  key: "userProfileId",
  default: "",
});
export const userProfileDetailsAtom = atomFamily({
  key: "userProfileDetailsAtom",
  default: selectorFamily({
    key: "userProfileDetailsSelector",
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

type FollowingRecord = Record<string, boolean>;
export const followingAtom = atom<FollowingRecord>({
  key: "followingAtom",
  default: {},
});

export const currentFollwoingPage = atom({
  key: "currentFollwoingPage",
  default: 1,
});

export const myFollowingCountSelector = selector({
  key: "myFollowingCountSelector",
  get: ({ get }) => {
    const following = get(followingAtom);
    const myProfile = get(myProfileDetailsAtom);
    const followingCount = myProfile.followingCount;

    console.log("FollowingCount", followingCount);
    const result = Object.keys(following).filter(
      (key) => following[key]
    ).length;
    // return followingCount + result;
    return followingCount;
  },
});

export const myFollowersCountSelector = selector({
  key: "myFollowersCountSelector",
  get: ({ get }) => {
    const follower = get(followingAtom);
    const myProfile = get(myProfileDetailsAtom);
    const followersCount = myProfile.followersCount;

    console.log("followersCount", followersCount);
    const result = Object.keys(follower).filter((key) => follower[key]).length;
    // return followersCount + result;
    return followersCount;
  },
});

export const userFollowingCountSelector = selectorFamily({
  key: "userFollowingCountSelector",
  get:
    (id) =>
    ({ get }) => {
      const following = get(followingAtom);
      const userProfile = get(userProfileDetailsAtom(id));
      const followingCount = userProfile.followingCount;

      console.log("FollowingCount", followingCount);
      const result = Object.keys(following).filter(
        (key) => following[key]
      ).length;
      // return followingCount + result;
      return followingCount;
    },
});

export const userFollowersCountSelector = selectorFamily({
  key: "userFollowersCountSelector",
  get:
    (id) =>
    ({ get }) => {
      const follower = get(followingAtom);
      const userProfile = get(userProfileDetailsAtom(id));
      const followersCount = userProfile.followersCount;

      console.log("followersCount", followersCount);
      const result = Object.keys(follower).filter(
        (key) => follower[key]
      ).length;
      // return followersCount + result;
      return followersCount;
    },
});

export const myFollowingCountAtom = atom({
  key: "myFollowingCountAtom",
  default: myFollowingCountSelector, // Set the default value to the result of the selector
});
export const myFollowersCountAtom = atom({
  key: "myFollowersCountAtom",
  default: myFollowersCountSelector, // Set the default value to the result of the selector
});

export const followTypes = atom({
  key: "followTypes", // unique identifier for this atom
  // default: BlogType.AllPosts, // initial value is an empty array

  default: "followings",
});

export const followingsAtom = atomFamily({
  key: "followingsAtom",
  default: selectorFamily({
    key: "followingsSelectorFamily",
    get:
      (id) =>
      async ({ get }) => {
        const token = get(authTokenState);
        const page = get(currentFollwoingPage);
        const followType = get(followTypes);

        if (!token) {
          throw new Error("Token not available");
        }
        const userId = String(id);
        try {
          if (followType === "followings") {
            const response = await axios.get(
              `${authURL}/user/followings/${userId}?page=${page}&limit=10`,
              {
                headers: {
                  Authorization: `Bearer ${token}`, // Use the token from the state
                },
              }
            );
            console.log("followings: ", response?.data?.folllowingUsers);
            return response?.data?.folllowingUsers || [];
            // } else if (followType === "followers") {
            //   const response = await axios.get(
            //     `${authURL}/user/followers/${userId}?page=${page}&limit=3`,
            //     {
            //       headers: {
            //         Authorization: `Bearer ${token}`, // Use the token from the state
            //       },
            //     }
            //   );
            //   console.log("followers: ", response?.data?.followerUsers);

            //   return response?.data?.followerUsers || [];
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

export const followersAtom = atomFamily({
  key: "followersAtom",
  default: selectorFamily({
    key: "followersSelectorFamily",
    get:
      (id) =>
      async ({ get }) => {
        const token = get(authTokenState);
        const page = get(currentFollwoingPage);
        const followType = get(followTypes);

        if (!token) {
          throw new Error("Token not available");
        }
        const userId = String(id);
        try {
          if (followType === "followers") {
            const response = await axios.get(
              `${authURL}/user/followers/${userId}?page=${page}&limit=3`,
              {
                headers: {
                  Authorization: `Bearer ${token}`, // Use the token from the state
                },
              }
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

export const myfollowingsAtom = atom({
  key: "myfollowingsAtom",
  default: selector({
    key: "myfollowingsSelector",
    get: async ({ get }) => {
      const token = get(authTokenState);

      const myProfile = get(myProfileDetailsAtom);
      const myUserId = myProfile?.id;
      const page = get(currentFollwoingPage);
      const followType = get(followTypes);

      if (!token) {
        throw new Error("Token not available");
      }
      const userId = String(myUserId);
      try {
        if (followType === "followings") {
          const response = await axios.get(
            `${authURL}/user/followings/${userId}?page=${page}&limit=10`,
            {
              headers: {
                Authorization: `Bearer ${token}`, // Use the token from the state
              },
            }
          );
          console.log("followings: ", response?.data?.folllowingUsers);
          return response?.data?.folllowingUsers || [];
        } else if (followType === "followers") {
          const response = await axios.get(
            `${authURL}/user/followers/${userId}?page=${page}&limit=3`,
            {
              headers: {
                Authorization: `Bearer ${token}`, // Use the token from the state
              },
            }
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

export const suggestionAtom = atom({
  key: "suggestionAtom",
  default: selector({
    key: "suggestionSelector",
    get: async ({ get }) => {
      const token = get(authTokenState);
      const page = get(currentFollwoingPage);

      if (!token) {
        throw new Error("Token not available");
      }
      try {
        const response = await axios.get(
          `${authURL}/user/suggestions?page=${page}&limit=10`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Use the token from the state
            },
          }
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
