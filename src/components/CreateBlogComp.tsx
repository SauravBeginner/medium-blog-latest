import { useState } from "react";
import { LabelInput } from "./LabelInput";
import TextAreaInput from "./TextAreaInput";
import { Button } from "./Button";
import axios from "axios";
import { authURL } from "../utils/baseUrl";
import { useNavigate } from "react-router-dom";
import { authTokenState } from "../store";
import { useRecoilValue } from "recoil";

export const CreateBlogComp = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const token = useRecoilValue(authTokenState);
  const navigate = useNavigate();
  const publishBlog = async () => {
    try {
      const response = await axios.post(
        `${authURL}/blog/create`,
        {
          title,
          content,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      navigate(`/blog/${response.data.id}`);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <main className="flex flex-col px-4 py-12 bg-white">
        <div className="flex items-center space-x-4">
          {/* <CiCirclePlus size={50} color={"gray"} /> */}

          <div className="w-full">
            <LabelInput
              placeholder={"Title"}
              onChange={(e) => setTitle(e.target.value)}
              className="text-4xl font-bold text-gray-600 placeholder-gray-400 border-none focus:outline-none focus:ring-0 w-full max-w-screen-xl"
            />
          </div>
        </div>
        <div className="mt-4">
          <TextAreaInput onChange={(e) => setContent(e.target.value)} />
        </div>
      </main>
      <div className="flex flex-col flex-colitems-center justify-center my-10 ">
        <div className="mb-4 ">
          <input
            type="file"
            placeholder="Tags"
            className="w-full my-3 p-3 text-white rounded-lg"
          />
        </div>
        <Button
          className="bg-[#ac7aff] text-xl w-full py-4"
          onClick={publishBlog}
        >
          Publish Post
        </Button>
      </div>
    </div>
  );
};
