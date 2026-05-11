import React from "react";
import Tags from "@yaireo/tagify/dist/react.tagify"; // Import the React component
import "@yaireo/tagify/dist/tagify.css"; // Import the required CSS

const MyTagInput = ({
  label,
  setValue,
  name,
  whitelist,
  value,
  mode = "tag",
}) => {
  console.log(whitelist, value);
  const libWhitelist = whitelist.map((el) => {
    return { value: el.label, id: el.value };
  });

  const libValue = value?.map((el) => {
    return { value: el?.label, id: el?.value };
  });

  const tagifySettings = {
    mode,
    enforceWhitelist: true,
    tagTextProp: "label",
    maxTags: 5,
    dropdown: {
      enabled: 0, // 2. Show suggestions on focus (0 chars typed)
      maxItems: 20, // Limit visible items in list
      classname: "tags-look", // Optional: Custom class for styling
      closeOnSelect: mode === "select", // Keep dropdown open after picking one
    },
  };

  const onChange = (e) => {
    const tagData = e.detail.tagify.value;
    console.log(tagData);
    if (mode === "select")
      setValue((data) => {
        return {
          ...data,
          [name]: { label: tagData[0].value, value: tagData[0].id },
        };
      });
    else
      setValue((data) => {
        return {
          ...data,
          [name]: tagData.map((el) => {
            return { label: el.value, value: el.id };
          }),
        };
      });
  };

  return (
    <div className="m-1 w-full">
      <label>{label}</label>
      <Tags
        value={libValue}
        whitelist={libWhitelist}
        className="w-full"
        settings={tagifySettings}
        onChange={onChange}
      />
    </div>
  );
};

export default MyTagInput;
