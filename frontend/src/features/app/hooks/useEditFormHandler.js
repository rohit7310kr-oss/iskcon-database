import {
  books,
  InitiationStatus,
  MaritalStatus,
  Occupations,
  Services,
  skillsOptions,
} from "../../../constants/formConfig";
import React from "react";
import { useState } from "react";

const useEditFormHandler = (
  setToast,
  handleHideModal,
  handleShowModal,
  devotees,
  reFetch,
) => {
  const [editLoading, setEditLoading] = useState(false);
  const [editForm, setEditForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    gender: "",
    date: "",
    occupation: "",
    age: "",
  });

  const [editErrors, setEditErrors] = useState({});

  const handleEdit = (id) => {
    const devotee = devotees.find((el) => el._id === id);

    handleShowModal("edit", devotee);
    setEditForm({
      fullName: devotee.fullName,
      phone: devotee.phone,
      address: devotee.address,
      gender: devotee.gender,
      registrationDate: new Date(devotee.registrationDate)
        ?.toISOString()
        .split("T")[0],
      department: devotee.department,
      status: devotee.status,
      initiationStatus: InitiationStatus.find(
        (el) => el.value === devotee.initiationStatus,
      ),
      maritalStatus: MaritalStatus.find(
        (el) => el.value === devotee.maritalStatus,
      ),
      occupation: Occupations.find((el) => el.value === devotee.occupation),
      services: Services.filter((s) => devotee.services.includes(s.value)),
      skills: skillsOptions.filter((s) => devotee.skills.includes(s.value)),
      booksRead: books.filter((b) => devotee.booksRead.includes(b.value)),
      age: devotee.age,
      chantingRounds: devotee.chantingRounds,
      templeName: devotee.templeName,
      joinedDate:
        devotee.joinedDate &&
        new Date(devotee.joinedDate).toISOString().split("T")[0],
      counselor: devotee.counselor,
      education: devotee.education,
      company: devotee.company,
      designation: devotee.designation,
      guruName: devotee.guruName,
    });
    setEditErrors({});
  };

  const onSuccessEdit = function () {
    setToast({ type: "success", message: "Devotee updated successfully." });
    handleHideModal();
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
  };
};

export default useEditFormHandler;
