import React, { useEffect, useState } from "react";
import { getAllDevotee, deleteDevotee } from "../service/devotees";
import Toast from "../shared/Toast";
import * as XLSX from "xlsx";
import EditDevotee from "../editDevotee/EditDevotee";
import useFilterHandler from "../hooks/useFilterHandler";
import useEditFormHandler from "../hooks/useEditFormHandler";
import useGetAllDevoteeHandler from "../hooks/useGetAllDevoteeHandler";

const ViewDevotee = () => {
  const [toast, setToast] = useState(null);

  const { devotees, listLoading, handleGetDevotee, reFetch } =
    useGetAllDevoteeHandler(setToast);

  const {
    filteredDevotees,
    setSearch,
    search,
    genderFilter,
    dateFilter,
    setGenderFilter,
    setDateFilter,
  } = useFilterHandler(devotees);

  const {
    editForm,
    setEditForm,
    editLoading,
    setEditLoading,
    handleEdit,
    editModal,
    setEditModal,
    onSuccessEdit,
  } = useEditFormHandler(setToast, reFetch);

  const [deleteLoadingId, setDeleteLoadingId] = useState(null);

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
              <th className="py-2">Occupation</th>
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
                  <td className="py-2">{devotee.occupation}</td>

                  <td className="py-2">{devotee.gender}</td>
                  <td className="py-2">
                    {devotee.date?.map((d) => {
                      return <p>{new Date(d).toLocaleDateString()}</p>;
                    })}
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
          <EditDevotee
            editModal={editModal}
            editForm={editForm}
            setEditForm={setEditForm}
            setToast={setToast}
            setEditModal={setEditModal}
            onSuccessEdit={onSuccessEdit}
            setEditLoading={setEditLoading}
            editLoading={editLoading}
          />
        )}
      </div>
    </>
  );
};

export default ViewDevotee;
