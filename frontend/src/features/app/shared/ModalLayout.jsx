import React from "react";

const ModalLayout = ({ title, children }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md overflow-y-auto max-h-screen">
        <h3 className="text-lg font-bold mb-4">{title}</h3>
        <div className="space-y-4 overflow-y-scroll-auto">{children}</div>
      </div>
    </div>
  );
};

export default ModalLayout;
