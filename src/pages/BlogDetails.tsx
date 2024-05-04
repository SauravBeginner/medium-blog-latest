// import { useParams } from "react-router-dom";
import { useParams } from "react-router-dom";
import FullBlog from "../components/FullBlog";
import { useRecoilValueLoadable } from "recoil";
import { blogDetailsAtomFamily } from "../store";
import { BlogCardSkeleton } from "../components/BlogCardSkeleton";
import AuthorDetails from "../components/AuthorDetails";
import SingleBlogSkeleton from "../components/SingleBlogSkeleton";

const BlogDetails = () => {
  const { id } = useParams();
  const blog = useRecoilValueLoadable(blogDetailsAtomFamily(id));

  const {
    id: blogId,
    content,
    author,
    title,

    likeCount,
    hasLiked,
    createdAt,
  } = blog.contents;

  if (blog.state === "loading")
    return (
      <div className="min-h-screen">
        <div className="pt-[65px] grid grid-cols-12 gap-4 pb-8  sm:px-4 sm:pt-8 md:pt-[83px] lg:px-10">
          <section className="col-span-12 md:col-span-12 lg:col-span-9">
            <SingleBlogSkeleton />
          </section>
        </div>
      </div>
    );
  return (
    <div className="min-h-screen">
      <div className="pt-[65px] grid grid-cols-12 gap-4 pb-8  sm:px-4 sm:pt-8 md:pt-[83px] lg:px-10">
        <section className="col-span-12 md:col-span-12 lg:col-span-9">
          <FullBlog
            id={blogId}
            content={content}
            title={title}
            authorName={author?.name}
            authorId={author?.id}
            publishedDate={createdAt}
            likeCount={likeCount}
            hasLiked={hasLiked}
          />
        </section>
        <AuthorDetails currentUser={author} />
      </div>
    </div>
  );
};

export default BlogDetails;
