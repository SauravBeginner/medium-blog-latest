import Input from "./Input";
import { useForm } from "react-hook-form";
import RTE from "./RTE";
import { authURL } from "../utils/baseUrl";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { CreateBlogInput, UpdateBlogInput } from "@10xcoder/medium-blog-common";
import { Button } from "./Button";
import { useCallback, useEffect, useState } from "react";
import { CiCamera } from "react-icons/ci";
import { imgSrc } from "./RightBar";
import { blogDetailsAtomFamily } from "../store/atoms/blogAtoms";
import { authAxios } from "../utils/axiosClient";

const PostForm = ({ post }: any) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    getValues,
    formState: { errors },
  } = useForm<CreateBlogInput | UpdateBlogInput>({
    defaultValues: {
      title: post?.title || "",
      content: post?.content || "",
      slug: post?.slug || "",
      thumbNail: post?.thumbNail || "",
    },
  });

  const setBlogDetails = useSetRecoilState(blogDetailsAtomFamily(post?.id));

  const navigate = useNavigate();

  const normalizeBLogPost = (detailedPost: any) => {
    return {
      id: detailedPost?.id,
      title: detailedPost?.title,
      content: detailedPost.content,
      createdAt: detailedPost.createdAt,
      author: {
        name: detailedPost.author.name,
        id: detailedPost.author.id,
      },
      likeCount: detailedPost.likeCount,
      hasLiked: detailedPost.hasLiked,
    };
  };

  // const setAllItems = useSetRecoilState(allBlogStateAtom);
  // const setMyItems = useSetRecoilState(myBlogStateAtom);
  // const setUserItems = useSetRecoilState(userBlogStateAtom);

  const [img, setImg] = useState(post?.thumbNail);
  const publishBlog = async (data: any) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("slug", data.slug);

    if (data.thumbNail[0]) {
      formData.append("file", data.thumbNail[0]);
    }

    try {
      if (post) {
        const dbPost = await authAxios.put(`/blog/update/${post.id}`, formData);
        if (dbPost) {
          console.log(dbPost);
          // Fetch the updated post separately
          const updatedPost = await authAxios.get(
            `/blog/post/${dbPost.data?.post?.id}`
          );

          // const updatedData = normalizeBLogPost(updatedPost.data?.post);
          setBlogDetails(updatedPost.data?.post);

          // setAllItems((currentList: any) =>
          //   currentList.map((item: any) =>
          //     item.id === updatedData.id ? updatedData : item
          //   )
          // );
          // setMyItems((currentList: any) =>
          //   currentList.map((item: any) =>
          //     item.id === updatedData.id ? updatedData : item
          //   )
          // );
          // setUserItems((currentList: any) =>
          //   currentList.map((item: any) =>
          //     item.id === updatedData.id ? updatedData : item
          //   )
          // );

          navigate(`/blog/${dbPost.data?.post?.id}`);
        }
      } else {
        const file = data.thumbNail[0] || null;
        console.log(file);
        const response = await authAxios.post(
          `${authURL}/blog/create`,

          formData
        );
        console.log(response);
        if (response) {
          console.log(response);
          // Fetch the updated post separately
          const newPost = await authAxios.get(
            `/blog/post/${response.data?.id}`
          );
          console.log(newPost);

          const newData = normalizeBLogPost(newPost.data?.post);
          setBlogDetails(newData);

          // setAllItems((currentList: any) => {
          //   const newArray = [newData, ...currentList];

          //   console.log("newArrayCreate: ", newArray);
          //   return newArray;
          // });
          // setMyItems((currentList: any) => {
          //   return [newData, ...currentList];
          // });
          // setUserItems((currentList: any) => {
          //   return [newData, ...currentList];
          // });

          navigate(`/blog/${response.data?.id}`);
        }
      }
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

  const slugTransform = useCallback((value: string | undefined) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    }
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value?.title), {
          shouldValidate: true,
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(publishBlog)}>
      <main className="flex flex-col px-4 py-12 bg-white">
        <div className="flex items-center space-x-4 justify-between">
          {/* <CiCirclePlus size={50} color={"gray"} /> */}
          <div className="w-3/4">
            <Input
              className="focus:bg-gray-100"
              label="Title"
              placeholder="Enter Title"
              type="title"
              {...register("title", {
                required: true,
                minLength: {
                  value: 6,
                  message: "Title must be at least 6 characters",
                },
              })}
            />
            {errors.title && (
              <span className="text-sm text-red-500">
                {errors.title.message}
              </span>
            )}

            <Input
              className="focus:bg-gray-50 cursor-not-allowed"
              label="Slug"
              placeholder="Enter Slug"
              type="slug"
              {...register("slug", {
                required: true,
              })}
              //@ts-ignore
              onInput={(e: any) => {
                setValue("slug", slugTransform(e.currentTarget.value), {
                  shouldValidate: true,
                });
              }}
              disabled={true}
            />
          </div>
          {/* Input for file upload */}

          <label
            htmlFor="profilePicInput"
            className="relative flex justify-center items-center h-40 w-40 overflow-hidden rounded-full border-gray-900 border-2 hover:opacity-75"
          >
            <img
              src={img || imgSrc}
              onClick={() => setImg(img)}
              alt="Mystical Wanderer"
              className=" object-cover"
            />

            <div className="absolute py-2  bottom-0 left-0 right-0 flex items-center justify-center bg-black bg-opacity-50 text-white cursor-pointer">
              <CiCamera />
            </div>
            <Input
              type="file"
              // accept="image/png, image/jpg, image/jpeg, image/gif"
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              {...register("thumbNail", { required: false })}
              onChange={handleImageChange}
            />
          </label>
        </div>
        <div className="mt-4">
          <RTE
            name={"content"}
            control={control}
            label={"Content: "}
            defaultValue={getValues("content")}
          />
        </div>
      </main>
      <div className="flex flex-col flex-colitems-center justify-center my-10 ">
        <Button className="bg-[#ac7aff] text-xl w-full py-4">
          {post ? "Update" : "Publish"} Post
        </Button>
      </div>
    </form>
  );
};

export default PostForm;
