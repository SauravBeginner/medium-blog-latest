import { atom, atomFamily, selectorFamily } from "recoil";
import { authAxios } from "../../utils/axiosClient";

export enum BlogType {
  MyPosts = "myposts",
  AllPosts = "allposts",
  FollowingPosts = "followingposts",
  UserPosts = "userposts",
}

export const blogTypesAtom = atom({
  key: "blogTypesAtom",
  default: BlogType.AllPosts,
});

export const currentPageStateAtom = atom({
  key: "currentPageStateAtom",
  default: 1,
});

export const hasMoreStateAtom = atom({
  key: "hasMoreStateAtom",
  default: true,
});
export const allBlogStateAtom = atom({
  key: "allBlogStateAtom",
  default: [] as any,
});
export const myBlogStateAtom = atom({
  key: "myBlogStateAtom",
  default: [] as any,
});
export const userBlogStateAtom = atom({
  key: "userBlogStateAtom",
  default: [] as any,
});

export const userBlogStateAtomFamily = atomFamily({
  key: "userBlogStateAtomFamily",
  default: (id) => [] as any,
});
export const followingBlogStateAtom = atom({
  key: "followingBlogStateAtom",
  default: [] as any,
});

export const timeDifferAtom = atom({
  key: "timeDifferAtom",
  default: "",
});

export const blogDetailsAtomFamily = atomFamily({
  key: "blogDetailsAtomFamily",
  default: selectorFamily({
    key: "singleBlogSelectorFamily",
    get:
      (id) =>
      async ({ get }) => {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token not available");
        }
        const postId = String(id);
        const response = await authAxios.get(`/blog/post/${postId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        return response?.data?.post;
      },
  }),
});
