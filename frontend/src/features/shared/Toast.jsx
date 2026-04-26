import React, { useEffect } from "react";

const Toast = ({ toast, onClose }) => {
  useEffect(() => {
    if (!toast?.message) return undefined;

    const timeout = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timeout);
  }, [toast, onClose]);

  if (!toast?.message) return null;

  const bgClass = toast.type === "success" ? "bg-green-600" : "bg-red-600";

  return (
    <div
      className={`fixed right-4 top-4 z-50 rounded-lg px-4 py-3 text-white shadow-lg ${bgClass}`}
    >
      <div className="flex items-center justify-between gap-4">
        <span>{toast.message}</span>
        <button onClick={onClose} className="text-white text-xl leading-none">
          ×
        </button>
      </div>
    </div>
  );
};

export default Toast;
