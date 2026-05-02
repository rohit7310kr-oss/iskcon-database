import React from "react";

const Form = ({ children }) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <form className="px-5 py-10 shadow-lg">{children}</form>
    </div>
  );
};

export default Form;
