import Feed from "../components/Feed";
import { BlogType } from "../store";
// import { BlogType } from "../store";

const MyPosts = () => {
  return (
    <>
      <Feed blogType={BlogType.MyPosts} />
    </>
  );
};

export default MyPosts;
