import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

const RTE = ({ name, control, label, defaultValue = "" }: any) => {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <Controller
        name={name || "content"}
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange } }) => (
          <Editor
            apiKey="3qvmzl0kl1gfvflcjyr99bu7j857r5oopifu8lx50msqrjkp"
            //  initialValue="Please type the content of the blog!"
            initialValue={defaultValue}
            init={{
              height: 500,
              branding: false,
              menubar: true,
              placeholder: "Please type the content of the blog!",
              plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "help",
                "wordcount",
                "anchor",
              ],
              toolbar:
                "undo redo | blocks | image code table link| bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
};

export default RTE;
