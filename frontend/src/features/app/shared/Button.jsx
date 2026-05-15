import React from "react";

const Button = ({
  onClick,
  variant = "primary",
  loading = false,
  children,
  className,
  color = null,
  type = "button",
}) => {
  let variantClass;

  if (variant === "primary")
    variantClass = `px-4 py-2 rounded text-white ${
      loading
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-blue-500 hover:bg-blue-600"
    }`;

  if (variant === "secondary")
    variantClass = "px-4 py-2 bg-gray-300 rounded hover:bg-gray-400";

  if (variant === "underlined")
    variantClass = `pr-3 text-${color}-500 hover:underline ${
      loading ? "opacity-50 cursor-not-allowed" : ""
    }`;

  return (
    <button
      className={`${variantClass} ${className}`}
      onClick={onClick}
      disabled={loading}
      type={type}
    >
      {loading ? `${children}..` : children}
    </button>
  );
};

export default Button;
