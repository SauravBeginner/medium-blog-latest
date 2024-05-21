import Feed from "../components/Feed";
import { BlogType } from "../store/atoms/blogAtoms";

const AllBlogs = () => {
  return (
    <div>
      <Feed key={BlogType.AllPosts} blogType={BlogType.AllPosts} />
    </div>
  );
};

export default AllBlogs;
