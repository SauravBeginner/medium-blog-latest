import React, { useId } from "react";
import { ChangeEvent } from "react";

export interface LabelInputType {
  className?: string;
  label?: string;
  placeholder?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  accept?: string; // Optional prop to specify accepted file types
}

const Input = (
  { label, type = "text", className = "", ...props }: LabelInputType,
  ref: React.LegacyRef<HTMLInputElement>
) => {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        type={type}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        ref={ref}
        {...props}
        id={id}
      />
    </div>
  );
};

export default React.forwardRef(Input);
