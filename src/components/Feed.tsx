import BlogCard from "./BlogCard";
import { BlogCardSkeleton } from "./BlogCardSkeleton";

import { useCallback, useEffect } from "react";
import {
  useRecoilState,
  useRecoilValue,
  useRecoilValueLoadable,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";
import { useLocation, useParams } from "react-router-dom";
import {
  allBlogStateAtom,
  BlogType,
  blogTypesAtom,
  currentPageStateAtom,
  followingBlogStateAtom,
  hasMoreStateAtom,
  myBlogStateAtom,
  userBlogStateAtom,
} from "../store/atoms/blogAtoms";
import {
  myProfileDetailsAtom,
  userProfileIdAtom,
} from "../store/atoms/userAtoms";
import { useBlogs } from "../hooks/useBlogs";

const Feed = ({ blogType }: any) => {
  const { id } = useParams();
  const [hasMore, setHasMore] = useRecoilState(hasMoreStateAtom);

  const [type, setType] = useRecoilState(blogTypesAtom);
  const myProfileDetails = useRecoilValue(myProfileDetailsAtom);
  const setPage = useSetRecoilState(currentPageStateAtom);
  const setUserProfileId = useSetRecoilState(userProfileIdAtom);
  // const blogsSelector = useRecoilValueLoadable(blogSelector);

  let blogAtom;
  const location = useLocation();
  console.log("location", location.pathname);

  const { loading, blogs } = useBlogs({ blogType }, { id });
  // const setAllItems = useSetRecoilState(allBlogStateAtom);
  // const setMyItems = useSetRecoilState(myBlogStateAtom);
  // const setUserItems = useSetRecoilState(userBlogStateAtom);

  // const allBlogsSelectorLoadable = useRecoilValueLoadable(allBlogSelector);
  // const myBlogsSelectorLoadable = useRecoilValueLoadable(myBlogSelector);
  // const userBlogsSelectorLoadable = useRecoilValueLoadable(userBlogSelector);

  if (type === BlogType.AllPosts) {
    blogAtom = allBlogStateAtom;
  } else if (type === BlogType.FollowingPosts) {
    blogAtom = followingBlogStateAtom;
  } else if (type === BlogType.UserPosts) {
    blogAtom = myProfileDetails.id !== id ? userBlogStateAtom : myBlogStateAtom;
  } else {
    blogAtom = myBlogStateAtom;
  }
  const [items, setItems] = useRecoilState(blogAtom);
  console.log(items);
  useEffect(() => {
    setType(blogType);
    setUserProfileId(id as any);
    setPage(1); // Reset page to 1 when type changes
    setItems(blogs);
  }, []);

  useEffect(
    () => {
      const newItems = !loading ? blogs : [];
      setItems((prev: any) => [...prev, ...newItems]);
      setHasMore(newItems.length > 0);
    },
    //[blogs]
    [blogs]
  );
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.body.scrollHeight &&
      hasMore
    ) {
      setPage((page) => page + 1);
    }
  }, [setPage, hasMore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  // console.log(items);

  return (
    <section>
      {items?.map((blog: any) => (
        <BlogCard
          key={`${type}-${blog?.id}`}
          id={blog?.id}
          title={blog?.title}
          likeCount={blog?.likeCount}
          hasLiked={blog?.hasLiked}
          content={blog?.content}
          publishedDate={blog?.createdAt}
          authorId={blog?.author?.id}
          authorName={blog?.author?.name}
        />
      ))}
      {!loading && items?.length < 1 && (
        <h1 className="text-white text-center">No Post to Display!</h1>
      )}
      {loading && (
        <>
          <BlogCardSkeleton />
          <BlogCardSkeleton />
          <BlogCardSkeleton />
          <BlogCardSkeleton />
        </>
      )}
    </section>
  );
};

export default Feed;
