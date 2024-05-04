import { useNavigate } from "react-router-dom";

import { Button } from "../components/Button";
import { imgSrc } from "../components/RightBar";

type FollowingCardProps = {
  id: string;
  name: string;
};
const FollowingCard = ({ id, name }: FollowingCardProps) => {
  //   const [isProcessing, setIsProcessing] = useState(false);

  //   const [blogDetails, setBlogDetails] = useRecoilStateLoadable(
  //     blogDetailsAtomFamily(id)
  //   );
  //   const token = useRecoilValue(authTokenState);

  //   const hashLiked =
  //     blogDetails.state === "hasValue" && blogDetails.contents.hasLiked;

  //   const handleLike = async () => {
  //     if (isProcessing) return;
  //     try {
  //       setIsProcessing(true);
  //       const response = await axios.put(
  //         `${authURL}/blog/like`,
  //         {
  //           id: id,
  //         },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );

  //       setBlogDetails((prevDetails: any) => ({
  //         ...prevDetails,
  //         likeCount: response.data.likeCount,
  //         hasLiked: response.data.hasLiked,
  //       }));
  //     } catch (e) {
  //       console.log(e);
  //     } finally {
  //       setIsProcessing(false);
  //     }
  //   };
  //   // useTimeDiffer custom hook
  //   const timeDifference = useTimeDiffer(publishedDate);
  //   const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  return (
    <>
      <div
        className="relative mb-2 w-full last:mb-0 sm:mb-4 cursor-pointer"
        onClick={() => navigate(`/user/${id}`)}
      >
        <div className="bg-[black]/60 rounded-lg p-4 text-white mb-2 border border-[white]/60 shadow-md shadow-[white]/70  hover:bg-[black]/40">
          <div className="space-y-4">
            <div className="flex items-center justify-between mx-4">
              <div className="flex items-center space-x-3">
                <span className="relative flex h-16 w-16 shrink-0 overflow-hidden rounded-full">
                  <img
                    className="aspect-square h-full w-full object-cover"
                    alt="Ubisoft Logo"
                    src={imgSrc}
                  />
                </span>
                <div>
                  <div className="font-bold  hover:underline">{name}</div>
                  <div className="text-sm text-gray-400">@{name}</div>
                </div>
              </div>

              <Button
                className="bg-white dark:text-black hover:bg-[#ae7aff] text-lg"
                //   onClick={() => handleFollow(user?.id)}
              >
                {/* {isFollowing[user.id] ? "Unfollow" : "Follow"} */}
                Follow
              </Button>

              {/* <Button
                    className="bg-white dark:text-black hover:bg-[#ae7aff]"
                    onClick={() => handleFollow(user.id)}
                  >
                    Follow
                  </Button> */}
            </div>
          </div>
        </div>
      </div>

      {/* // {isOpen && <DeleteModal setIsOpen={setIsOpen} />} */}
    </>
  );
};

export default FollowingCard;
