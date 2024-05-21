import Feed from "../components/Feed";
import { BlogType } from "../store/atoms/blogAtoms";

const MyBlogs = () => {
  return (
    <div>
      <Feed key={BlogType.MyPosts} blogType={BlogType.MyPosts} />
    </div>
  );
};

export default MyBlogs;
