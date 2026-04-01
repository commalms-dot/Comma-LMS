import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "transparent";
  size?: "sm" | "md" | "lg" | "full";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-bold transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:pointer-events-none active:scale-[0.97]";

  const variants = {
    primary:
      "bg-sky-600 text-white hover:bg-sky-700 shadow-lg shadow-sky-600/20",
    secondary:
      "bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-100/50",
    transparent: "bg-transparent hover:bg-slate-100",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs rounded-xl",
    md: "px-5 py-2.5 rounded-2xl",
    lg: "px-8 py-4 text-lg rounded-[1.5rem]",
    full: "w-full px-5 py-2.5 rounded-2xl",
  };

  const variantStyle = variants[variant] || variants.primary;
  const sizeStyle = sizes[size] || sizes.md;

  return (
    <button
      className={`${baseStyles} ${variantStyle} ${sizeStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
