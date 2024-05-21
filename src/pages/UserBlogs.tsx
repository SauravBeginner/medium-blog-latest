import Feed from "../components/Feed";
import { BlogType } from "../store/atoms/blogAtoms";

const UserBlogs = () => {
  return (
    <>
      {/* <LeftBar /> */}
      <Feed key={BlogType.UserPosts} blogType={BlogType.UserPosts} />
    </>
  );
};

export default UserBlogs;
