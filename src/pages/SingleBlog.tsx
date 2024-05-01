import FullBlog from "../components/FullBlog";
import { useParams } from "react-router-dom";
import { useBlog } from "../hooks/useBlogs";

const SingleBlog = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog({ id: id || "" });

  if (loading) return <h1 className="text-white">Loading...</h1>;

  return (
    <div>
      <FullBlog blog={blog} />
    </div>
  );
};

export default SingleBlog;
