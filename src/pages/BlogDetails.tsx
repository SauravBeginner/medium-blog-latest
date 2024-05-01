// import { useParams } from "react-router-dom";
import FullBlog from "../components/FullBlog";
// import { useRecoilValueLoadable } from "recoil";
// import { blogDetailsAtomFamily } from "../store/atom";

const BlogDetails = () => {
  // const { id } = useParams();
  // const { loading, blog } = useBlog({ id: id || "" });

  // const blog = useRecoilValueLoadable(blogDetailsAtomFamily(id));

  // if (loading) return <h1 className="text-white">Loading...</h1>;

  return (
    <section className="col-span-12 md:col-span-8 lg:col-span-6">
      {/* <FullBlog blog={blog.contents} /> */}
      <FullBlog />
    </section>
  );
};

export default BlogDetails;
