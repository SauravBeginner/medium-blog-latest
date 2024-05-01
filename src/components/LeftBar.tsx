import { useRecoilValueLoadable } from "recoil";
import { myProfileDetailsAtom, userProfileDetailsAtom } from "../store/atom";
import { useParams } from "react-router-dom";
import { BlogCardSkeleton } from "./BlogCardSkeleton";

const LeftBar = () => {
  const { id } = useParams();

  const myProfileDetails = useRecoilValueLoadable(myProfileDetailsAtom);
  const userProfileDetails = useRecoilValueLoadable(userProfileDetailsAtom(id));

  const profileDetails = id ? userProfileDetails : myProfileDetails;

  // console.log("profileDetails: ", profileDetails);
  const { name, email } = profileDetails?.contents;
  console.log("name:", name, "email:", email);

  if (profileDetails?.state === "loading") {
    return <BlogCardSkeleton />;
  }
  return (
    <>
      {profileDetails?.state === "hasValue" && (
        <aside className="col-span-12 text-white md:col-span-5 lg:col-span-4 xl:col-span-3">
          <div className="sticky top-[100px] border-b bg-[black]/60  rounded-md md:rounded-lg border-[white]/60 p-4 sm:border">
            <img
              className="mb-3 flex aspect-square h-16 w-16 rounded-full border-2 border-[#ae7aff] object-cover"
              src="https://images.pexels.com/photos/7775642/pexels-photo-7775642.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="avatar"
            />

            <h2 className="mb-1 font-bold">{name}</h2>

            <button className="block text-[#ae7aff] hover:underline">
              {email}
            </button>

            <p className="text-sm my-1">
              Night owl | Moon enthusiast | Wanderlust 🌕🌙🌎
            </p>

            <>
              <hr className="my-4 h-[1px] w-full" />
              <div className="mb-4">
                <h3 className="mb-1 font-bold">Short Bio</h3>
                <p className="text-sm">
                  Immersed in the enchanting world of the night, captivated by
                  the moon's allure, and constantly seeking new adventures
                  around the globe. 🌕🌙🌎
                </p>
              </div>
              <div className="mb-4 text-sm">
                <h3 className="mb-1 font-bold">Public link</h3>
                <button className="block text-[#ae7aff] hover:underline">
                  {email}
                </button>
                <button className="block break-all text-[#ae7aff] hover:underline">
                  https://www.aurorastarry.com/
                </button>
              </div>
              <p className="mb-4 flex gap-x-4">
                <span className="inline-block">
                  <span className="font-bold">13.5k&nbsp;</span>
                  <span className="text-sm text-gray-400">Followers</span>
                </span>
                <span className="inline-block">
                  <span className="font-bold">204&nbsp;</span>
                  <span className="text-sm text-gray-400">Following</span>
                </span>
              </p>
            </>

            <button className="inline-flex w-max items-center bg-[#ae7aff] px-4 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]">
              Edit Profile
            </button>
          </div>
        </aside>
      )}
    </>
  );
};

export default LeftBar;
