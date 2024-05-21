// import CreatePost from "./CreatePost";
import BlogCard from "./BlogCard";
// import { useBlogs } from "../hooks/useBlogs";
import { BlogCardSkeleton } from "./BlogCardSkeleton";

import {
  blogSelector,
  BlogType,
  // BlogType,
  blogTypes,
  currentPageState,
  followingBlogState,
  hasMoreState,
  itemsState,
  myBlogState,
  myProfileDetailsAtom,
  userBlogState,
  userProfileId,
} from "../store";
import { useCallback, useEffect } from "react";
import {
  useRecoilState,
  useRecoilValue,
  useRecoilValueLoadable,
  useSetRecoilState,
} from "recoil";
import { useParams } from "react-router-dom";

const Feed = ({ blogType }: any) => {
  const { id } = useParams();
  const [hasMore, setHasMore] = useRecoilState(hasMoreState);

  const setUserProfileId = useSetRecoilState(userProfileId);
  const [type, setType] = useRecoilState(blogTypes);
  // const currentType = useRecoilValue(blogTypes); // Access the current value of the atom
  const myProfileDetails = useRecoilValue(myProfileDetailsAtom);

  let blogAtom;
  if (blogType === BlogType.AllPosts) {
    blogAtom = itemsState;
  } else if (blogType === BlogType.MyPosts) {
    blogAtom = myBlogState;
  } else if (blogType === BlogType.Following) {
    blogAtom = followingBlogState;
  } else {
    blogAtom = myProfileDetails.id !== id ? userBlogState : myBlogState;
  }

  const [items, setItems] = useRecoilState(blogAtom);
  const blogs = useRecoilValueLoadable(blogSelector);

  const setPage = useSetRecoilState(currentPageState);

  useEffect(
    () => {
      setType(blogType);
      setUserProfileId(id as any);
      setPage(1); // Reset page to 1 when type changes

      setItems([]);
    },
    // [blogType, setType, type, setPage, setItems]
    [type, setPage]
  );

  useEffect(
    () => {
      const newItems = blogs.state === "hasValue" ? blogs.contents : [];
      setItems((prev: any) => [...prev, ...newItems]);
      setHasMore(newItems.length > 0);
    },
    //[blogs]
    [blogs, type, setItems, id]
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
      {blogs?.state === "hasValue" && items?.length < 1 && (
        <h1 className="text-white text-center">No Post to Display!</h1>
      )}
      {blogs?.state === "loading" && (
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
