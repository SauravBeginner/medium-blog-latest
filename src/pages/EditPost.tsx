import { useRecoilValueLoadable } from "recoil";
import PostForm from "../components/PostForm";
import { blogDetailsAtomFamily } from "../store/atoms/blogAtoms";
import { useParams } from "react-router-dom";

const EditPost = () => {
  const { id } = useParams();
  const blog = useRecoilValueLoadable(blogDetailsAtomFamily(id));

  let post = null;

  if (blog.state === "hasValue") {
    post = blog.contents;
  }

  return (
    <div className="min-h-screen bg-[#121212]">
      <div className="pt-[65px] grid grid-cols-12 gap-4 pb-8 justify-iems-center sm:px-4 sm:pt-8 md:pt-[83px] lg:px-10">
        <section className="col-span-12 md:col-span-12">
          <PostForm post={post} />
        </section>
      </div>
    </div>
  );
};

export default EditPost;
