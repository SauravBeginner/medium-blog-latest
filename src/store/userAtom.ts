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
  default: null,
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
