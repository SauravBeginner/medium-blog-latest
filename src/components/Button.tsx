import React from "react";

interface ButtonType {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}
export const Button = ({ onClick, children, className }: ButtonType) => {
  return (
    <>
      <button
        onClick={onClick}
        className={`${className} inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-black text-white`}
      >
        {children}
      </button>
    </>
  );
};
