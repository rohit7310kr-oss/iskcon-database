import React from "react";
import { useState } from "react";
import { updateDevotee } from "../service/devotees";

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
      await updateDevotee(editModal.devotee._id, editForm);
      await onSuccessEdit();
    } catch (err) {
      setToast({ type: "error", message: "Failed to update devotee." });
    } finally {
      setEditLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h3 className="text-lg font-bold mb-4">Edit Devotee</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Full Name</label>
            <input
              type="text"
              className="w-full border p-2"
              value={editForm.fullName}
              onChange={(e) =>
                setEditForm({ ...editForm, fullName: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Phone</label>
            <input
              type="text"
              className={`w-full border p-2 ${editErrors.phone ? "border-red-500" : ""}`}
              value={editForm.phone}
              onChange={(e) =>
                setEditForm({ ...editForm, phone: e.target.value })
              }
            />
            {editErrors.phone && (
              <div className="text-red-500 text-sm mt-1">
                {editErrors.phone}
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">Address</label>
            <input
              type="text"
              className="w-full border p-2"
              value={editForm.address}
              onChange={(e) =>
                setEditForm({ ...editForm, address: e.target.value })
              }
            />
          </div>
          <div>
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
          </div>
          {/* <div>
                  <label className="block text-sm font-medium">Date</label>
                  <input
                    type="date"
                    className="w-full border p-2"
                    value={editForm.date}
                    onChange={(e) =>
                      setEditForm({ ...editForm, date: e.target.value })
                    }
                  />
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
