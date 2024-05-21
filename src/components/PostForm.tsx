import Input from "./Input";
import { useForm } from "react-hook-form";
import RTE from "./RTE";
import axios from "axios";
import { authURL } from "../utils/baseUrl";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { CreateBlogInput, UpdateBlogInput } from "@10xcoder/medium-blog-common";
import { Button } from "./Button";
import { useCallback, useEffect } from "react";
import { CiCamera } from "react-icons/ci";
import { imgSrc } from "./RightBar";
import {
  allBlogStateAtom,
  blogDetailsAtomFamily,
  myBlogStateAtom,
  userBlogStateAtom,
} from "../store/atoms/blogAtoms";
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
    },
  });

  const token = localStorage.getItem("token");

  const setBlogDetails = useSetRecoilState(blogDetailsAtomFamily(post?.id));
  // const blogs = useRecoilValueLoadable(blogSelector);

  const navigate = useNavigate();
  // const refreshBlogList = useRecoilRefresher_UNSTABLE(blogSelector);

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

  const setAllItems = useSetRecoilState(allBlogStateAtom);
  const setMyItems = useSetRecoilState(myBlogStateAtom);
  const setUserItems = useSetRecoilState(userBlogStateAtom);

  // const allBlogsSelectorLoadable = useRecoilValueLoadable(allBlogSelector);
  // const myBlogsSelectorLoadable = useRecoilValueLoadable(myBlogSelector);
  // const userBlogsSelectorLoadable = useRecoilValueLoadable(userBlogSelector);
  // const follwingBlogsSelectorLoadable =
  //   useRecoilValueLoadable(followinBlogSelector);
  const publishBlog = async (data: any) => {
    try {
      if (post) {
        const dbPost = await authAxios.put(
          `/blog/update/${post.id}`,

          data,

          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        if (dbPost) {
          console.log(dbPost);
          // Fetch the updated post separately
          const updatedPost = await authAxios.get(
            `/blog/post/${dbPost.data?.id}`
          );
          console.log(updatedPost);

          const updatedData = normalizeBLogPost(updatedPost.data?.post);
          // console.log(updatedData);
          setBlogDetails(updatedPost.data?.post);

          setAllItems((currentList: any) =>
            currentList.map((item: any) =>
              item.id === updatedData.id ? updatedData : item
            )
          );
          setMyItems((currentList: any) =>
            currentList.map((item: any) =>
              item.id === updatedData.id ? updatedData : item
            )
          );
          setUserItems((currentList: any) =>
            currentList.map((item: any) =>
              item.id === updatedData.id ? updatedData : item
            )
          );

          navigate(`/blog/${dbPost.data?.id}`);
        }
      } else {
        const response = await axios.post(
          `${authURL}/blog/create`,

          data,

          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        console.log(response);
        if (response) {
          console.log(response);
          // Fetch the updated post separately
          const newPost = await authAxios.get(
            `/blog/post/${response.data?.id}`,
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          );
          console.log(newPost);

          const newData = normalizeBLogPost(newPost.data?.post);
          setBlogDetails(newData);

          setAllItems((currentList: any) => {
            const newArray = [newData, ...currentList];

            console.log("newArrayCreate: ", newArray);
            return newArray;
          });
          setMyItems((currentList: any) => {
            return [newData, ...currentList];
          });
          setUserItems((currentList: any) => {
            return [newData, ...currentList];
          });

          navigate(`/blog/${response.data?.id}`);
        }
      }
    } catch (e) {
      console.log(e);
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
            />
          </div>
          {/* Input for file upload */}

          <label
            htmlFor="profilePicInput"
            className="relative flex h-40 w-40 overflow-hidden rounded-full border-gray-900 border-2"
          >
            <div className="shrink-0 md:h-24md:w-24 mx-auto my-4">
              <img
                //  src="https://images.pexels.com/photos/18264716/pexels-photo-18264716.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                src={imgSrc}
                alt="Mystical Wanderer"
                className="h-full w-full rounded-sm object-cover"
              />
            </div>
            <div className="absolute py-2  bottom-0 left-0 right-0 flex items-center justify-center bg-black bg-opacity-50 text-white cursor-pointer">
              <CiCamera />
            </div>
            <Input
              type="file"
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              //  onChange={handleProfilePicChange}
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
        <div className="mb-4 ">
          {/* <input
            type="file"
            placeholder="Tags"
            className="w-full my-3 p-3 text-white rounded-lg"
          /> */}
        </div>
        <Button className="bg-[#ac7aff] text-xl w-full py-4">
          {post ? "Update" : "Publish"} Post
        </Button>
      </div>
    </form>
  );
};

export default PostForm;
