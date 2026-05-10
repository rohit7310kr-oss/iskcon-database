import React from "react";

const Loader = function ({ message = "Loading..." }) {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
        <div className="text-lg text-gray-700">{message}</div>
      </div>
    </div>
  );
};

export default Loader;
