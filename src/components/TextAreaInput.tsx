import { ChangeEvent } from "react";

interface TextAreaInputType {
  placeholder?: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
  rows?: number;
}

export default function TextAreaInput({
  placeholder = "Tell your story...",
  onChange,
  className = "w-full text-lg text-gray-600 placeholder-gray-400 border-none focus:outline-none focus:ring-0",
  rows = 10,
}: TextAreaInputType) {
  return (
    <textarea
      placeholder={placeholder}
      onChange={onChange}
      className={className}
      rows={rows}
      defaultValue={""}
    />
  );
}
