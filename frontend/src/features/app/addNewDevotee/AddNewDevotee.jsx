import React from "react";
import InputGroup from "../shared/InputGroup";
import Toast from "../shared/Toast";
import useAddFormHandler from "../hooks/useAddFormHandler";

const AddNewDevotee = () => {
  const {
    formData,
    errors,
    setToast,
    toast,
    handleAddNewDevotee,
    inputOnChange,
    loading,
    file,
    setFile,
    handleUpload,
  } = useAddFormHandler();

  return (
    <>
      <Toast toast={toast} onClose={() => setToast(null)} />
      <div className="bg-white p-6 rounded-xl shadow">
        <div className="pb-3 text-lg">Add new devotee</div>
        <form onSubmit={handleAddNewDevotee}>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2">
            <InputGroup
              value={formData.fullName}
              onChange={inputOnChange}
              type="text"
              label="Full name"
              name="fullName"
              error={errors.fullName}
            />
            <InputGroup
              value={formData.phone}
              onChange={inputOnChange}
              type="text"
              label="Phone (10 digits only)"
              name="phone"
              error={errors.phone}
            />

            <InputGroup
              value={formData.address}
              onChange={inputOnChange}
              type="text"
              label="Address"
              name="address"
              error={errors.address}
            />
            <InputGroup
              value={formData.occupation}
              onChange={inputOnChange}
              type="text"
              label="Occupation"
              name="occupation"
              error={errors.occupation}
            />
            <InputGroup
              value={formData.gender}
              onChange={inputOnChange}
              type="select"
              name="gender"
              label="Select gender"
              error={errors.gender}
              selectConfig={{
                options: [
                  { value: "male", label: "Male" },
                  { value: "female", label: "Female" },
                  { value: "other", label: "Other" },
                ],
              }}
            />
            <InputGroup
              value={formData.date}
              onChange={inputOnChange}
              type="date"
              label="Date"
              name="date"
              error={errors.date}
              // disabled={true}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`block border my-5 p-3 w-50 rounded text-white ${
              loading ? "bg-gray-400" : "bg-green-400 hover:bg-green-500"
            }`}
          >
            {loading ? "Adding..." : "Add devotee"}
          </button>
        </form>
        <div className="flex gap-3">
          <input
            type="file"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
            accept=".xlsx,.xls,.csv"
            // disabled={loading}
            className={`block border my-5 p-3 w-50 rounded text-white bg-gray-400 hover:bg-gray-500
            }`}
            // className={`block border my-5 p-3 w-50 rounded text-white ${
            //   loading ? "bg-gray-400" : "bg-green-400 hover:bg-green-500"
            // }`}
          />

          <button
            onClick={handleUpload}
            className="block border my-5 p-3 w-50 rounded text-white bg-amber-400 hover:bg-amber-500"
          >
            Upload
          </button>
        </div>
      </div>
    </>
  );
};

export default AddNewDevotee;
