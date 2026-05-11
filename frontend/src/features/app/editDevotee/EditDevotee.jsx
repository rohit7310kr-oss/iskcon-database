import React from "react";
import { useState } from "react";
import { updateDevotee } from "../service/devotees";
import InputGroup from "../shared/InputGroup";
import MyTagInput from "../../shared/MyTagInput";
import {
  books,
  Counselors,
  InitiationStatus,
  IskconDikshaGurus,
  MaritalStatus,
  Occupations,
  Services,
  skillsOptions,
} from "../../../constants/formConfig";

const EditDevotee = function ({
  editModal,
  editForm,
  setEditForm,
  setToast,
  setEditModal,
  onSuccessEdit,
  setEditLoading,
  editLoading,
}) {
  console.log(editForm);
  const [editErrors, setEditErrors] = useState({});

  const validateEditForm = () => {
    const errors = {};
    if (!editForm.phone || !/^\d{10}$/.test(editForm.phone)) {
      errors.phone = "Phone number must be exactly 10 digits.";
    }
    if (!editForm.gender) {
      errors.gender = "Please select a gender.";
    }
    setEditErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSaveEdit = async () => {
    if (!validateEditForm()) return;
    setEditLoading(true);
    try {
      console.log(editForm);

      const editData = {
        fullName: editForm.fullName,
        phone: editForm.phone,
        address: editForm.address,
        gender: editForm.gender,
        occupation: editForm.occupation,
        registrationDate: editForm.registrationDate,
        department: editForm.department,
        status: editForm.status,
        initiationStatus: editForm.initiationStatus.value,
        maritalStatus: editForm.maritalStatus.value,
        services: editForm.services.map((el) => el.value),
        skills: editForm.skills.map((el) => el.value),
        booksRead: editForm.booksRead.map((el) => el.value),
        age: editForm.age,
        chantingRounds: editForm.chantingRounds,
        templeName: editForm.templeName,
        joinedDate: editForm.joinedDate,
        counselor: editForm.counselor,
        education: editForm.education,
        company: editForm.company,
        designation: editForm.designation,
        guru: editForm.guru,
      };

      await updateDevotee(editModal.devotee._id, editData);
      await onSuccessEdit();
    } catch (err) {
      setToast({ type: "error", message: "Failed to update devotee." });
    } finally {
      setEditLoading(false);
    }
  };

  const onInputChange = (e) => {
    setEditForm((data) => {
      return { ...data, [e.target.name]: e.target.value };
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md overflow-y-auto h-screen">
        <h3 className="text-lg font-bold mb-4">Edit Devotee</h3>
        <div className="space-y-4 overflow-y-scroll-auto">
          <InputGroup
            label="Full Name"
            value={editForm.fullName}
            name="fullName"
            onChange={onInputChange}
            type="text"
            error={editErrors.fullName}
          />
          <InputGroup
            label="Phone"
            value={editForm.phone}
            name="phone"
            onChange={onInputChange}
            type="text"
            error={editErrors.phone}
          />
          <InputGroup
            label="Address"
            value={editForm.address}
            name="address"
            onChange={onInputChange}
            type="text"
            error={editErrors.adress}
          />
          <InputGroup
            label="Select gender"
            value={editForm.gender}
            name="gender"
            onChange={onInputChange}
            type="select"
            selectConfig={{
              options: [
                { label: "Male", value: "male" },
                { label: "Female", value: "female" },
                { label: "Other", value: "other" },
              ],
            }}
            error={editErrors.gender}
          />

          <InputGroup
            type="date"
            label="Registration date"
            name="registrationDate"
            value={editForm.registrationDate}
            onChange={onInputChange}
            error={editErrors.registrationDate}
          />

          <InputGroup
            label="Department"
            name="department"
            type="select"
            value={editForm.department}
            onChange={onInputChange}
            error={editErrors.department}
            selectConfig={{
              options: [
                { label: "IYF", value: "IYF" },
                { label: "Congreation", value: "Congreation" },
              ],
            }}
          />
          <InputGroup
            label="Status"
            name="status"
            type="select"
            value={editForm.status}
            onChange={onInputChange}
            error={editErrors.status}
            selectConfig={{
              options: [
                { label: "New", value: "new" },
                { label: "Sunday Comer", value: "sunday-comer" },
                { label: "Daily Comer", value: "daily-comer" },
                { label: "Disconnected", value: "disconnected" },
              ],
            }}
          />

          <MyTagInput
            mode="select"
            whitelist={Occupations}
            label="Occupation"
            name="occupation"
            setValue={setEditForm}
            value={[editForm.occupation]}
          />

          <MyTagInput
            mode="select"
            whitelist={InitiationStatus}
            label="Initiation Status"
            name="initiationStatus"
            setValue={setEditForm}
            // value={editForm.initiationStatus}
            value={[editForm.initiationStatus]}
          />

          <MyTagInput
            mode="select"
            whitelist={MaritalStatus}
            label="Marital status"
            name="maritalStatus"
            setValue={setEditForm}
            value={[editForm.maritalStatus]}
          />

          <MyTagInput
            whitelist={Services}
            label="Services"
            name="services"
            setValue={setEditForm}
            value={editForm.services}
          />

          <MyTagInput
            whitelist={skillsOptions}
            label="Skills"
            name="skills"
            setValue={setEditForm}
            value={editForm.skills}
          />

          <MyTagInput
            whitelist={books}
            label="Books Read"
            name="booksRead"
            setValue={setEditForm}
            value={editForm.booksRead}
          />

          <InputGroup
            label="Age"
            name="age"
            type="text"
            value={editForm.age}
            onChange={onInputChange}
            error={editErrors.age}
          />
          {/* Phase-3 */}
          <InputGroup
            label="Chanting Rounds"
            name="chantingRounds"
            type="text"
            value={editForm.chantingRounds}
            onChange={onInputChange}
            error={editErrors.chantingRounds}
          />

          <InputGroup
            selectConfig={{
              options: IskconDikshaGurus.map((el) => {
                return { label: el, value: el };
              }),
            }}
            label="Diksha guru"
            name="guru"
            onChange={onInputChange}
            value={editForm.guru}
          />

          <InputGroup
            type="select"
            selectConfig={{ options: [{ label: "Durg", value: "durg" }] }}
            label="Temple"
            name="temple"
            onChange={onInputChange}
            value={editForm.templeName}
          />

          <InputGroup
            label="Joined Date"
            name="joinedDate"
            type="date"
            value={editForm.joinedDate}
            onChange={onInputChange}
            error={editErrors.joinedDate}
          />
          <InputGroup
            type="select"
            selectConfig={{
              options: Counselors.map((c) => {
                return { label: c, value: c };
              }),
            }}
            label="Counselor"
            name="counselor"
            value={editForm.counselor}
            onChange={onInputChange}
          />

          <InputGroup
            label="Education"
            name="education"
            value={editForm.education}
            onChange={onInputChange}
            error={editErrors.education}
          />
          <InputGroup
            label="Company"
            name="company"
            value={editForm.company}
            onChange={onInputChange}
            error={editErrors.company}
          />
          <InputGroup
            label="Designation"
            name="designation"
            value={editForm.designation}
            onChange={onInputChange}
            error={editErrors.designation}
          />

          {/* <div>
            <label className="block text-sm font-medium">Gender</label>
            <select
              className={`w-full border p-2 ${editErrors.gender ? "border-red-500" : ""}`}
              value={editForm.gender}
              onChange={(e) =>
                setEditForm({ ...editForm, gender: e.target.value })
              }
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {editErrors.gender && (
              <div className="text-red-500 text-sm mt-1">
                {editErrors.gender}
              </div>
            )}
          </div> */}
        </div>
        <div className="flex justify-end mt-6 space-x-2">
          <button
            onClick={() => setEditModal({ open: false, devotee: null })}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            disabled={editLoading}
          >
            Cancel
          </button>
          <button
            onClick={handleSaveEdit}
            disabled={editLoading}
            className={`px-4 py-2 rounded text-white ${
              editLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {editLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditDevotee;
