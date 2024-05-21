import Feed from "../components/Feed";
import { BlogType } from "../store";

const Blogs = () => {
  return (
    <>
      <Feed blogType={BlogType.AllPosts} />
    </>
  );
};

export default Blogs;
