import BlogCard from "./BlogCard";
import { BlogCardSkeleton } from "./BlogCardSkeleton";

import { useCallback, useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useParams } from "react-router-dom";
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
  const [page, setPage] = useRecoilState(currentPageStateAtom);
  const setUserProfileId = useSetRecoilState(userProfileIdAtom);

  let blogAtom;

  const { loading, blogs } = useBlogs({ blogType }, { id });

  const isCurrentUser = myProfileDetails?.id === id;
  if (type === BlogType.AllPosts) {
    blogAtom = allBlogStateAtom;
  } else if (type === BlogType.FollowingPosts) {
    blogAtom = followingBlogStateAtom;
  } else if (type === BlogType.UserPosts) {
    blogAtom = !isCurrentUser ? userBlogStateAtom : myBlogStateAtom;
  } else {
    blogAtom = myBlogStateAtom;
  }
  const [items, setItems] = useRecoilState(blogAtom);
  useEffect(() => {
    setType(blogType);
    setUserProfileId(id as any);
    setPage(1); // Reset page to 1 when type changes
    setItems(blogs);

    return () => {
      setItems([]);
    };
  }, [type]);

  useEffect(
    () => {
      // const newItems = !loading ? blogs : [];
      // setItems((prev: any) => [...prev, ...newItems]);
      // setHasMore(newItems.length > 0);

      if (!loading) {
        setItems((prev: any) => (page === 1 ? blogs : [...prev, ...blogs]));
        setHasMore(blogs.length > 0);
      }
    },
    //[blogs]
    [blogs, id]
  );
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.body.scrollHeight &&
      hasMore
    ) {
      setPage((page) => page + 1);
    }
  }, [setPage, type, hasMore]);

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
          authorImg={blog?.author?.profileImg}
          thumbNail={blog?.thumbNail}
        />
      ))}
      {!loading && items?.length === 0 && (
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
