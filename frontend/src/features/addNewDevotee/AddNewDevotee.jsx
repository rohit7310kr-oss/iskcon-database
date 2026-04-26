import React, { useState } from "react";
import InputGroup from "../shared/InputGroup";
import Toast from "../shared/Toast";
import { createDevotee } from "../service/devotees";

const AddNewDevotee = () => {
  const today = new Date().toISOString().split("T")[0];
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    gender: "",
    date: today,
  });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);

  const inputOnChange = function (e) {
    setFormData((data) => {
      return { ...data, [e.target.name]: e.target.value };
    });
    if (errors[e.target.name]) {
      setErrors((err) => ({ ...err, [e.target.name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName) {
      newErrors.fullName = "Please write your name";
    }
    if (!formData.phone || !/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits.";
    }
    if (!formData.gender) {
      newErrors.gender = "Please select a gender.";
    }
    if (!formData.address) {
      newErrors.address = "Please fill your address";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddRequest = async function () {
    if (!validateForm()) return;
    setLoading(true);
    try {
      await createDevotee(formData);
      setToast({ type: "success", message: "Devotee added successfully!" });
      setFormData({
        fullName: "",
        phone: "",
        address: "",
        gender: "",
        date: today,
      });
      setErrors({});
    } catch (err) {
      setToast({ type: "error", message: "Error adding devotee." });
      console.dir(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNewDevotee = function (e) {
    e.preventDefault();
    handleAddRequest();
  };

  return (
    <>
      <Toast toast={toast} onClose={() => setToast(null)} />
      <div className="bg-white p-6 rounded-xl shadow">
        <div className="pb-3 text-lg">Add new devotee</div>
        <form onSubmit={handleAddNewDevotee}>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-1">
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
              disabled={true}
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
      </div>
    </>
  );
};

export default AddNewDevotee;
