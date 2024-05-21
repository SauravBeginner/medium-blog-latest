import Feed from "../components/Feed";
import { BlogType } from "../store/atoms/blogAtoms";

const FollowingBlogs = () => {
  return (
    <div>
      <Feed key={BlogType.FollowingPosts} blogType={BlogType.FollowingPosts} />
    </div>
  );
};

export default FollowingBlogs;
