import { selector } from "recoil";
import { authAxios } from "../../utils/axiosClient";
import { followingBlogStateAtom } from "../atoms/blogAtoms";
import { myProfileDetailsAtom } from "../atoms/userAtoms";

export const getMyProfileDataSelector = selector({
  key: "getMyProfileDataSelector",
  get: async () => {
    const token = localStorage.getItem("token"); // Assuming token is stored in userData
    if (!token) {
      return null; // Return null if token is missing
    }

    try {
      const response = await authAxios.get(`/user/myprofile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response?.data?.myDetails;
    } catch (error) {
      console.error("Error fetching profile details:", error);
      localStorage.removeItem("token");
      // Handle errors, such as by returning a default value or re-throwing the error
      throw error;
    }
  },
});
export const myFollowingCountSelector = selector({
  key: "myFollowingCountSelector",
  get: ({ get }) => {
    // const following = get(followingAtom);
    const myProfile = get(myProfileDetailsAtom);
    const followingCount = myProfile.followingCount;

    console.log("FollowingCount", followingCount);

    return followingCount;
  },
});

export const myFollowersCountSelector = selector({
  key: "myFollowersCountSelector",
  get: ({ get }) => {
    const myProfile = get(myProfileDetailsAtom);
    const followersCount = myProfile.followersCount;
    console.log("followersCount", followersCount);

    return followersCount;
  },
});
