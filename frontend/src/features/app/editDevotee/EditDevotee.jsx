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
import ModalLayout from "../shared/ModalLayout";
import Button from "../shared/Button";

const EditDevotee = function ({
  handleHideModal,
  selectedDevotee,
  editForm,
  setEditForm,
  setToast,
  onSuccessEdit,
  setEditLoading,
  editLoading,
}) {
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
      const editData = {
        fullName: editForm.fullName,
        phone: editForm.phone,
        address: editForm.address,
        gender: editForm.gender,
        occupation: editForm.occupation.value,
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
        guruName: editForm.guruName,
      };

      await updateDevotee(selectedDevotee._id, editData);
      await onSuccessEdit();
    } catch (err) {
      setToast({ type: "error", message: "Failed to update devotee." });
      console.log("update error", err);
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
    <ModalLayout title="Edit devotee">
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
        name="guruName"
        onChange={onInputChange}
        value={editForm.guruName}
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

      <div className="flex justify-end mt-6 space-x-2">
        <Button
          variant="secondary"
          onClick={handleHideModal}
          loading={editLoading}
        >
          Cancel
        </Button>
        <Button onClick={handleSaveEdit} loading={editLoading}>
          Save
        </Button>
      </div>
    </ModalLayout>
  );
};

export default EditDevotee;
