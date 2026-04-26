import React, { useEffect, useState, useMemo } from "react";
import {
  getAllDevotee,
  deleteDevotee,
  updateDevotee,
} from "../service/devotees";
import Toast from "../shared/Toast";
import * as XLSX from "xlsx";

const ViewDevotee = () => {
  const [devotees, setDevotees] = useState([]);
  const [search, setSearch] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [editModal, setEditModal] = useState({ open: false, devotee: null });
  const [editForm, setEditForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    gender: "",
    date: "",
  });
  const [editErrors, setEditErrors] = useState({});
  const [toast, setToast] = useState(null);
  const [listLoading, setListLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [deleteLoadingId, setDeleteLoadingId] = useState(null);

  const handleGetDevotee = async function () {
    setListLoading(true);
    try {
      const res = await getAllDevotee();
      setDevotees(res.data);
    } catch (err) {
      console.log(err);
      setToast({ type: "error", message: "Failed to load devotees." });
    } finally {
      setListLoading(false);
    }
  };

  useEffect(() => {
    const loadDevotees = async () => {
      setListLoading(true);
      try {
        const res = await getAllDevotee();
        setDevotees(res.data);
      } catch (err) {
        console.log(err);
        setToast({ type: "error", message: "Failed to load devotees." });
      } finally {
        setListLoading(false);
      }
    };

    loadDevotees();
  }, []);

  const filteredDevotees = useMemo(() => {
    let filtered = devotees;
    if (search) {
      filtered = filtered.filter(
        (d) =>
          d.fullName.toLowerCase().includes(search.toLowerCase()) ||
          d.phone.toString().includes(search),
      );
    }
    if (genderFilter) {
      filtered = filtered.filter((d) => d.gender === genderFilter);
    }
    if (dateFilter) {
      filtered = filtered.filter((d) => {
        const devoteeDate = new Date(d.date).toISOString().split("T")[0];
        return devoteeDate === dateFilter;
      });
    }
    return filtered;
  }, [search, genderFilter, dateFilter, devotees]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this devotee?")) {
      setDeleteLoadingId(id);
      try {
        await deleteDevotee(id);
        setToast({ type: "success", message: "Devotee deleted successfully." });
        await handleGetDevotee();
      } catch (err) {
        console.log(err);
        setToast({ type: "error", message: "Failed to delete devotee." });
      } finally {
        setDeleteLoadingId(null);
      }
    }
  };

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
      setToast({ type: "success", message: "Devotee updated successfully." });
      setEditModal({ open: false, devotee: null });
      await handleGetDevotee();
    } catch (err) {
      console.log(err);
      setToast({ type: "error", message: "Failed to update devotee." });
    } finally {
      setEditLoading(false);
    }
  };

  const handleExport = () => {
    const data = filteredDevotees.map((d) => ({
      Name: d.fullName,
      Phone: d.phone,
      Address: d.address,
      Gender: d.gender,
      Date: new Date(d.date).toLocaleDateString(),
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Devotees");
    XLSX.writeFile(wb, "devotees.xlsx");
  };

  return (
    <>
      <Toast toast={toast} onClose={() => setToast(null)} />
      <div className="bg-white p-6 rounded-xl shadow">
        <div className="pb-3 flex justify-between items-center">
          <div className="flex flex-wrap gap-2">
            <input
              className="border p-2"
              placeholder="search with name, phone"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              className="border p-2"
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value)}
            >
              <option value="">All genders</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <input
              type="date"
              className="border p-2"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              placeholder="Filter by date"
            />
          </div>
          <button
            onClick={handleExport}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Export to Excel
          </button>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b text-gray-600">
              <th className="py-2">Name</th>
              <th className="py-2">Phone</th>
              <th className="py-2">Address</th>
              <th className="py-2">Gender</th>
              <th className="py-2">Date</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {listLoading ? (
              <tr>
                <td colSpan={6} className="py-4 text-center text-gray-600">
                  Loading devotees...
                </td>
              </tr>
            ) : filteredDevotees.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-4 text-center text-gray-600">
                  No devotees found.
                </td>
              </tr>
            ) : (
              filteredDevotees.map((devotee) => (
                <tr key={devotee._id} className="border-b hover:bg-gray-200">
                  <td className="py-2">{devotee.fullName}</td>
                  <td className="py-2">{devotee.phone}</td>
                  <td className="py-2">{devotee.address}</td>
                  <td className="py-2">{devotee.gender}</td>
                  <td className="py-2">
                    {new Date(devotee.date).toLocaleDateString()}
                  </td>
                  <td className="py-2">
                    <button
                      onClick={() => handleDelete(devotee._id)}
                      disabled={deleteLoadingId === devotee._id || listLoading}
                      className={`pr-2 text-red-500 hover:underline ${
                        deleteLoadingId === devotee._id || listLoading
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      {deleteLoadingId === devotee._id
                        ? "Deleting..."
                        : "Delete"}
                    </button>
                    <button
                      onClick={() => handleEdit(devotee)}
                      disabled={listLoading || editLoading}
                      className={`pl-2 text-blue-500 hover:underline ${
                        listLoading || editLoading
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Edit Modal */}
        {editModal.open && (
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
                <div>
                  <label className="block text-sm font-medium">Date</label>
                  <input
                    type="date"
                    className="w-full border p-2"
                    value={editForm.date}
                    onChange={(e) =>
                      setEditForm({ ...editForm, date: e.target.value })
                    }
                  />
                </div>
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
        )}
      </div>
    </>
  );
};

export default ViewDevotee;
