import { useRecoilState, useSetRecoilState } from "recoil";
import {
  myProfileDetailsAtom,
  userProfileDetailsAtomFamily,
} from "../store/atoms/userAtoms";
import { authAxios } from "../utils/axiosClient";
import { imgSrc } from "../utils/baseUrl";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UpdateProfileInput } from "@10xcoder/medium-blog-common";
import { useForm } from "react-hook-form";
import Input from "../components/Input";

const EditProfile = () => {
  const { id } = useParams();
  const [myDetailsAtom, setMyDetailsAtom] =
    useRecoilState(myProfileDetailsAtom);
  const setuserDetailsAtom = useSetRecoilState(
    userProfileDetailsAtomFamily(id)
  );

  const {
    register,
    handleSubmit,
    //  formState: { errors },
  } = useForm<UpdateProfileInput>({
    defaultValues: {
      name: myDetailsAtom?.name || "",
      tagLine: myDetailsAtom?.tagLine || "",
      profileImg: myDetailsAtom?.profileImg || "",
      email: myDetailsAtom?.email || "",
      portfolioUrl: myDetailsAtom?.portfolioUrl || "",
      shortBio: myDetailsAtom?.shortBio || "",
    },
  });

  const navigate = useNavigate();

  const [img, setImg] = useState(myDetailsAtom.profileImg);

  const editProfile = async (data: any) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("tagLine", data.tagLine);
    // formData.append("password", data.password);

    if (data.profileImg[0]) {
      formData.append("file", data.profileImg[0]);
    }
    try {
      const updatedProfile = await authAxios.put(
        `/user/edit-profile`,
        formData
      );
      setMyDetailsAtom(updatedProfile?.data?.updatedProfile);
      setuserDetailsAtom(updatedProfile?.data?.updatedProfile);
      navigate(`/user/${myDetailsAtom?.id}`);
    } catch (e) {
      console.log(e);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImg(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] flex  justify-center">
      <div className="pt[65px] pb-8  sm:px-4 sm:pt8 md:pt[83px] lg:px-10  max-w-4xl ">
        <section className="col-span-12 text-white md:col-span-7 lg:col-span-5 xl:col-span-6">
          <form
            onSubmit={handleSubmit(editProfile)}
            className="mb-4 mt-8 flex flex-wrap gap-y-4 p-4 md:p-0"
          >
            <div className="flex w-full items-center justify-center">
              <label
                htmlFor="avatar-input-1"
                className="relative flex aspect-square h-24 w-24 cursor-pointer items-center justify-center overflow-visible rounded-full border-4 border-[#ae7aff] p-1"
              >
                <img
                  alt="avatar-inp"
                  src={img || imgSrc}
                  onClick={() => setImg(img)}
                  className="h-full w-full rounded-full object-cover"
                />
                <Input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  {...register("profileImg", { required: false })}
                  onChange={handleImageChange}
                />
                <span className="absolute bottom-0 right-0 flex aspect-square h-5 w-5 items-center justify-center rounded-full bg-[#ae7aff] p-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-3 w-3 text-black"
                  >
                    <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
                  </svg>
                </span>
              </label>
            </div>
            <div className="flex w-full flex-col items-start justify-start gap-2">
              <label className="text-xs text-slate-200">First name</label>
              <Input
                placeholder="Enter first name"
                // autoComplete="false"
                className="w-full border-[1px] border-white bg-black p-4 text-white placeholder:text-gray-500 focus:bg-gray-700"
                // defaultValue="Aurora"
                type="title"
                {...register("name", {
                  required: false,
                  minLength: {
                    value: 6,
                    message: "Name must be at least 1 characters",
                  },
                })}
              />
            </div>
            <div className="flex w-full flex-col items-start justify-start gap-2">
              <label className="text-xs text-slate-200">Email</label>
              <Input
                placeholder="Enter email"
                // autoComplete="false"
                className="w-full border-[1px] border-white p-4 text-white  cursor-not-allowed"
                //  defaultValue="starryaurora@gmail.com"
                {...register("email", {
                  required: false,
                  minLength: {
                    value: 6,
                    message: "Name must be at least 1 characters",
                  },
                })}
                //@ts-ignore
                disabled={true}
              />
            </div>
            <div className="flex w-full flex-col items-start justify-start gap-2">
              <label className="text-xs text-slate-200">Tagline</label>
              <Input
                placeholder="Enter tagline"
                // autoComplete="false"
                className="w-full border-[1px] border-white bg-black p-4 text-white placeholder:text-gray-500 focus:bg-gray-700 "
                //  defaultValue="Night owl | Moon enthusiast | Wanderlust 🌕🌙🌎"
                {...register("tagLine", {
                  required: false,
                  minLength: {
                    value: 6,
                    message: "Name must be at least 1 characters",
                  },
                })}
              />
            </div>
            {/* <div className="flex w-full flex-col items-start justify-start gap-2">
              <label className="text-xs text-slate-200">Short Bio</label>
              <textarea
                placeholder="Enter short bio"
                // autoComplete="false"
                className="w-full resize-none border-[1px] border-white bg-black p-4 text-white placeholder:text-gray-500 focus:bg-gray-700"
                defaultValue={
                  "Immersed in the enchanting world of the night, captivated by\nthe moon's allure, and constantly seeking new adventures\n             around the globe. 🌕🌙🌎\n                "
                }
                {...register("name", {
                  required: false,
                  minLength: {
                    value: 6,
                    message: "Name must be at least 1 characters",
                  },
                })}
              />
            </div> */}
            <div className="flex w-full flex-col items-start justify-start gap-2">
              <label className="text-xs text-slate-200">Short Bio</label>
              <Input
                placeholder="Enter Bio"
                // autoComplete="false"
                className="w-full border-[1px] border-white bg-black p-4 text-white placeholder:text-gray-500 focus:bg-gray-700"
                type="bio"
                // defaultValue="https://www.aurorastarry.com/"
                {...register("shortBio", {
                  required: false,
                  minLength: {
                    value: 6,
                    message: "Name must be at least 1 characters",
                  },
                })}
              />
            </div>
            <div className="flex w-full flex-col items-start justify-start gap-2">
              <label className="text-xs text-slate-200">Portfolio URL</label>
              <Input
                placeholder="Enter url"
                // autoComplete="false"
                className="w-full border-[1px] border-white bg-black p-4 text-white placeholder:text-gray-500 focus:bg-gray-700"
                type="url"
                // defaultValue="https://www.aurorastarry.com/"
                {...register("portfolioUrl", {
                  required: false,
                  minLength: {
                    value: 6,
                    message: "Name must be at least 1 characters",
                  },
                })}
              />
            </div>
            <button className="w-full bg-[#ae7aff] p-3 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]">
              Update Profile
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default EditProfile;
