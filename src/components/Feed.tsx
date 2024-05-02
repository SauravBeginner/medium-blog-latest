// import CreatePost from "./CreatePost";
import BlogCard from "./BlogCard";
// import { useBlogs } from "../hooks/useBlogs";
import { BlogCardSkeleton } from "./BlogCardSkeleton";

import {
  blogSelector,
  // BlogType,
  blogTypes,
  currentPageState,
  hasMoreState,
  itemsState,
  userProfileId,
} from "../store";
import { useCallback, useEffect } from "react";
// import InfiniteScroll from "react-infinite-scroll-component";
import {
  useRecoilState,
  useRecoilValueLoadable,
  useSetRecoilState,
} from "recoil";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
const Feed = ({ blogType }: any) => {
  const { id } = useParams();
  // const { loading, blogs } = useBlogs({ blogType: blogType || "" });
  const [hasMore, setHasMore] = useRecoilState(hasMoreState);
  const [items, setItems] = useRecoilState(itemsState);
  const setUserProfileId = useSetRecoilState(userProfileId);
  const [type, setType] = useRecoilState(blogTypes);
  // const currentType = useRecoilValue(blogTypes); // Access the current value of the atom

  const blogs = useRecoilValueLoadable(blogSelector);

  const setPage = useSetRecoilState(currentPageState);

  // useEffect(() => {
  //   // Provide a default value for blogType if it is undefined
  //   setType(blogType);
  // }, []);
  useEffect(() => {
    setType(blogType);
    setUserProfileId(id as any);
    setPage(1); // Reset page to 1 when type changes
    setItems([]);
  }, [blogType, setType, type, setPage, setItems]);

  useEffect(() => {
    const newItems = blogs.state === "hasValue" ? blogs.contents : [];
    setItems((prev: any) => [...prev, ...newItems]);
    setHasMore(newItems.length > 0);
  }, [blogs, type, setItems]);

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
  // console.log("items", items);
  return (
    <section className="col-span-12 md:col-span-12 lg:col-span-6">
      {/* <CreatePost /> */}
      <Navbar />
      {items?.map((blog: any) => (
        <BlogCard
          key={`${type}-${blog?.id}`}
          id={blog?.id}
          title={blog?.title}
          likeCount={blog?.likeCount}
          hasLiked={blog?.hasLiked}
          content={blog?.content}
          publishedDate={blog?.publishedDate}
          authorId={blog?.author?.id}
          authorName={blog?.author?.name}
        />
      ))}

      {blogs?.state === "loading" && (
        <>
          <BlogCardSkeleton />
        </>
      )}
    </section>
  );
};

export default Feed;
