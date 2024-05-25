// import { useParams } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValueLoadable } from "recoil";
import SingleBlogSkeleton from "../components/SingleBlogSkeleton";
import { Button } from "../components/Button";
import { ArrowLeft } from "lucide-react";
import { blogDetailsAtomFamily } from "../store/atoms/blogAtoms";
import FullBlog from "../components/FullBlog";
import UserMiniDetails from "../components/UserMiniDetails";

const BlogDetails = () => {
  const { id } = useParams();
  const blog = useRecoilValueLoadable(blogDetailsAtomFamily(id));
  const navigate = useNavigate();
  const {
    id: blogId,
    content,
    author,
    title,
    thumbNail,
    // likeCount,
    // hasLiked,
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
  console.log(blog.contents);
  return (
    <div className="min-h-screen">
      <div className="pt-[65px] grid grid-cols-12 gap-4 pb-8  sm:px-4 sm:pt-8 md:pt-[83px] lg:px-10">
        <section className="col-span-12 lg:col-span-8 xl:col-span-9">
          <Button
            className="mb-4 item bg-[#555555] hover:bg-[#ae7aff]"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
          <FullBlog
            id={blogId}
            content={content}
            title={title}
            authorName={author?.name}
            authorImg={author?.profileImg}
            authorId={author?.id}
            publishedDate={createdAt}
            thumbNail={thumbNail}
            //  likeCount={likeCount}
            //  hasLiked={hasLiked}
          />
        </section>

        <aside className="md:block col-span-12 text-white md:col-span-12 lg:col-span-4 xl:col-span-3">
          <div className="sticky top-[80px] overflow-y-hidden border-b bg-[black]/60  rounded-md md:rounded-lg border-[white]/60 p-4 sm:border shadow-md shadow-[white]/70">
            <h1 className="pb-2 text-2xl font-semibold">Author</h1>
            <UserMiniDetails currentUser={author} />
          </div>
        </aside>
      </div>
    </div>
  );
};

export default BlogDetails;
