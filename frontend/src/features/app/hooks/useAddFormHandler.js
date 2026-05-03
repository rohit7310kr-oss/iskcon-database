import React from "react";
import { useState } from "react";
import { createDevotee } from "../service/devotees";

const useAddFormHandler = () => {
  const today = new Date().toISOString().split("T")[0];
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    occupation: "",
    gender: "",
    date: today,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState();

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
        occupation: "",
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

  return {
    errors,
    formData,
    handleAddNewDevotee,
    inputOnChange,
    loading,
    toast,
    setToast,
  };
};

export default useAddFormHandler;
