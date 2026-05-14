import React from "react";

const Button = ({
  onClick,
  variant = "primary",
  loading = false,
  children,
}) => {
  let className;

  if (variant === "primary")
    className = `px-4 py-2 rounded text-white ${
      loading
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-blue-500 hover:bg-blue-600"
    }`;

  if (variant === "secondary")
    className = "px-4 py-2 bg-gray-300 rounded hover:bg-gray-400";

  if (variant === "underlined")
    className = `px-4 text-red-500 hover:underline ${
      loading ? "opacity-50 cursor-not-allowed" : ""
    }`;

  return (
    <button onClick={onClick} disabled={loading} className={className}>
      {loading ? `${children}..` : children}
    </button>
  );
};

export default Button;
