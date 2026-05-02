import React from "react";
import { useState } from "react";

const useEditFormHandler = (setToast, reFetch) => {
  const [editModal, setEditModal] = useState({ open: false, devotee: null });
  const [editLoading, setEditLoading] = useState(false);
  const [editForm, setEditForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    gender: "",
    date: "",
  });

  const [editErrors, setEditErrors] = useState({});

  const handleEdit = (devotee) => {
    setEditModal({ open: true, devotee });
    setEditForm({
      fullName: devotee.fullName,
      phone: devotee.phone,
      address: devotee.address,
      gender: devotee.gender,
      date: new Date(devotee.date).toISOString().split("T")[0],
    });
    setEditErrors({});
  };

  const onSuccessEdit = function () {
    setToast({ type: "success", message: "Devotee updated successfully." });
    setEditModal({ open: false, devotee: null });
    reFetch();
  };

  return {
    onSuccessEdit,
    editForm,
    setEditForm,
    editLoading,
    setEditLoading,
    handleEdit,
    editErrors,
    editModal,
    setEditModal,
  };
};

export default useEditFormHandler;
