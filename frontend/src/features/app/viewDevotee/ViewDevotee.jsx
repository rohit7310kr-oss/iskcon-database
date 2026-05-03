import React, { useState } from "react";
import { deleteDevotee } from "../service/devotees";
import Toast from "../shared/Toast";
import * as XLSX from "xlsx";
import EditDevotee from "../editDevotee/EditDevotee";
import useFilterHandler from "../hooks/useFilterHandler";
import useEditFormHandler from "../hooks/useEditFormHandler";
import useGetAllDevoteeHandler from "../hooks/useGetAllDevoteeHandler";
import TableRow from "./TableRow";
import ExpandedTable from "./ExpandedTable";
import DayPicker from "../shared/DatePicker";
import DatePicker from "../shared/DatePicker";

const ViewDevotee = () => {
  const [toast, setToast] = useState(null);
  const [isTableExpanded, setIsTableExpanded] = useState(true);

  const { devotees, listLoading, reFetch } = useGetAllDevoteeHandler(setToast);

  const {
    filteredDevotees,
    setSearch,
    search,
    genderFilter,
    dateFilter,
    setGenderFilter,
    setDateFilter,
    isCheckingConsistent,
    setIsCheckingConsistent,
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

  const [deleteLoadingId, setDeleteLoadingId] = useState(null);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this devotee?")) {
      setDeleteLoadingId(id);
      try {
        await deleteDevotee(id);
        setToast({ type: "success", message: "Devotee deleted successfully." });
        reFetch();
      } catch (err) {
        console.log(err);
        setToast({ type: "error", message: "Failed to delete devotee." });
      } finally {
        setDeleteLoadingId(null);
      }
    }
  };

  const devoteePhoneList = [];

  filteredDevotees.forEach((el) => {
    if (!devoteePhoneList.includes(el.phone)) devoteePhoneList.push(el.phone);
  });

  const registeredPhoneListNum = devoteePhoneList.length;

  const registeredDevotee = filteredDevotees.length;

  return (
    <>
      <Toast toast={toast} onClose={() => setToast(null)} />
      <div className="bg-white p-6 rounded-xl shadow">
        <div className="pb-3 flex justify-between items-center">
          <div className="flex flex-wrap gap-2 ">
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
            <div>
              <label htmlFor="consistent">Check consistency </label>
              <input
                id="consistent"
                type="checkbox"
                value={isCheckingConsistent}
                onChange={() => setIsCheckingConsistent((c) => !c)}
              />
              <DatePicker
                className=""
                dateFilter={dateFilter}
                setDateFilter={setDateFilter}
              />
            </div>
          </div>

          <select
            className="border p-2"
            value={isTableExpanded}
            onChange={() => setIsTableExpanded((p) => !p)}
          >
            <option value="">Select table format</option>
            <option value={true}>Expanded</option>
            <option value={false}>Phone listing</option>
          </select>

          <button
            onClick={handleExport}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Export to Excel
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          <div>
            <p className="bg-green-300 p-1 mb-1">
              {registeredDevotee}: Registered devotees
            </p>
            <p className="bg-yellow-300 p-1">
              {registeredPhoneListNum}: Registered Phone number
            </p>
          </div>
        </div>
        {!isTableExpanded ? (
          <div className="w-full text-left">
            {devoteePhoneList.map((el) => (
              <TableRow
                handleDelete={handleDelete}
                deleteLoadingId={deleteLoadingId}
                summery={el}
                list={filteredDevotees}
                editLoading={editLoading}
                handleEdit={handleEdit}
                listLoading={listLoading}
              />
            ))}
          </div>
        ) : (
          <ExpandedTable
            listLoading={listLoading}
            filteredDevotees={filteredDevotees}
            handleDelete={handleDelete}
            deleteLoadingId={deleteLoadingId}
            handleEdit={handleEdit}
            editLoading={editLoading}
          />
        )}
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
