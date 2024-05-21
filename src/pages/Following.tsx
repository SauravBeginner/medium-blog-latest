import Feed from "../components/Feed";
import { BlogType } from "../store";
// import { BlogType } from "../store";

const Following = () => {
  return (
    <>
      <Feed blogType={BlogType.Following} />
    </>
  );
};

export default Following;
