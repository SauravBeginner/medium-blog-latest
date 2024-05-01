import { ChangeEvent } from "react";

interface LabelInputType {
  className?: string;
  label?: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

export const LabelInput = ({
  className = "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  label = "",
  placeholder,
  onChange,
  type,
}: LabelInputType) => {
  return (
    <div>
      <label
        className="block text-sm font-medium text-gray-700"
        htmlFor="username"
      >
        {label}
      </label>
      <input
        className={className}
        placeholder={placeholder}
        onChange={onChange}
        type={type || "text"}
        required
      />
    </div>
  );
};
