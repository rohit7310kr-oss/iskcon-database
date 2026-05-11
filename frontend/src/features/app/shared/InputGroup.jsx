import React from "react";

const InputGroup = ({
  onChange,
  value,
  type = "text",
  name,
  label,
  selectConfig,
  error,
  disabled = false,
}) => {
  {
    if (type === "text" || type === "date")
      return (
        <div className="m-1 w-full">
          <label className="block py-1" htmlFor={name}>
            {label}
          </label>
          <input
            onChange={onChange}
            value={value}
            name={name}
            type={type}
            id={name}
            className={`border p-1 w-full ${error ? "border-red-500" : ""}`}
            disabled={disabled}
          />
          {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
        </div>
      );
  }

  return (
    <div className="m-1 w-full">
      {type === "select" && (
        <>
          <label className="block py-1" htmlFor={name}>
            {label}
          </label>
          <select
            onChange={onChange}
            value={value}
            name={name}
            className={`border p-1 w-full ${error ? "border-red-500" : ""}`}
          >
            <option value="">{label}</option>
            {selectConfig.options.map((option) => (
              <option value={option.value}>{option.label}</option>
            ))}
          </select>
          {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
        </>
      )}
    </div>
  );
};

export default InputGroup;
