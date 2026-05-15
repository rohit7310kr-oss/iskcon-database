import React, { useEffect, useState } from "react";
import { deleteDevotee } from "../service/devotees";
import Toast from "../shared/Toast";
import * as XLSX from "xlsx";
import EditDevotee from "../editDevotee/EditDevotee";
import useFilterHandler from "../hooks/useFilterHandler";
import useEditFormHandler from "../hooks/useEditFormHandler";
import useGetAllDevoteeHandler from "../hooks/useGetAllDevoteeHandler";
import TableRow from "./TableRow";
import ExpandedTable from "./ExpandedTable";
import DatePicker from "../shared/DatePicker";
import { useSearchParams } from "react-router";
import ViewDevoteeModal from "../viewDevoteeModal/ViewDevoteeModal";

const ViewDevotee = () => {
  const [toast, setToast] = useState(null);
  const [isTableExpanded, setIsTableExpanded] = useState(true);
  const { devotees, listLoading, reFetch } = useGetAllDevoteeHandler(setToast);
  const [searchParams] = useSearchParams();

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

  const [modal, setModal] = useState({ open: false, type: "edit" });
  const [selectedDevotee, setSelectedDevotee] = useState(null);

  const handleHideModal = function () {
    setModal({ open: false });
  };

  const handleShowModal = function (type, devotee) {
    setModal({ open: true, type });
    setSelectedDevotee(devotee);
  };

  const {
    editForm,
    setEditForm,
    editLoading,
    setEditLoading,
    handleEdit,
    onSuccessEdit,
  } = useEditFormHandler(
    setToast,
    handleHideModal,
    handleShowModal,
    filteredDevotees,
    reFetch,
  );

  const handleExport = () => {
    const data = filteredDevotees.map((d) => ({
      name: d.fullName,
      phone: d.phone,
      address: d.address,
      gender: d.gender,
      date: new Date(d.date).toLocaleDateString("en-GB"),
      occupation: d.occupation,
    }));

    // const ws = XLSX.utils.json_to_sheet(data);
    // const wb = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(wb, ws, "Devotees");
    // XLSX.writeFile(wb, "devotees.xlsx");

    const grouped = Object.values(
      data.reduce((acc, item) => {
        if (!acc[item.phone]) {
          acc[item.phone] = {
            phone: item.phone,
            rows: [],
          };
        }

        acc[item.phone].rows.push(item);

        return acc;
      }, {}),
    );

    const excelRows = [];

    grouped.forEach((group) => {
      group.rows.forEach((row) => {
        excelRows.push({
          name: row.name,
          phone: row.phone,
          gender: row.gender,
          registrationDate: row.registrationDate,
          address: row.address,
          occupation: row.occupation,
        });
      });

      // empty row after each group
      excelRows.push({
        name: "",
        phone: "",
        gender: "",
        registrationDate: "",
        address: "",
        occupation: "",
      });
    });

    const ws = XLSX.utils.json_to_sheet(excelRows);
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

  const handleView = function (id) {
    const devotee = filteredDevotees.find((el) => el._id === id);
    setModal({ open: true, type: "view" });
    setSelectedDevotee(devotee);
  };

  const devoteePhoneList = [];

  filteredDevotees.forEach((el) => {
    if (!devoteePhoneList.includes(el.phone)) devoteePhoneList.push(el.phone);
  });

  const registeredPhoneListNum = devoteePhoneList.length;

  const registeredDevotee = filteredDevotees.length;

  const columns = [
    { label: "Name", key: "fullName" },
    { label: "Gender", key: "gender" },
    { label: "Address", key: "address" },
    { label: "Status", key: "status" },
  ];

  return (
    <>
      <Toast toast={toast} onClose={() => setToast(null)} />
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Devotees</h1>

          {/* Controls - Responsive Grid */}
          <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-12 lg:gap-4">
            {/* Search and Gender Filter */}
            <div className="lg:col-span-5 flex flex-col sm:flex-row gap-3">
              <input
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm"
                placeholder="Search name, phone..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <select
                className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm bg-white cursor-pointer"
                value={genderFilter}
                onChange={(e) => setGenderFilter(e.target.value)}
              >
                <option value="">All genders</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* View Mode */}
            <div className="lg:col-span-4 flex items-center gap-3">
              <label
                htmlFor="viewMode"
                className="font-medium text-gray-700 text-sm whitespace-nowrap"
              >
                View Mode:
              </label>
              <select
                id="viewMode"
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm bg-white cursor-pointer"
                value={isTableExpanded}
                onChange={() => setIsTableExpanded((p) => !p)}
              >
                <option value="">Select format</option>
                <option value={true}>Expanded</option>
                <option value={false}>Phone listing</option>
              </select>
            </div>

            {/* Export Button */}
            <div className="lg:col-span-3">
              <button
                onClick={handleExport}
                className="w-full px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 active:scale-95 transition-all shadow-md text-sm"
              >
                📥 Export Excel
              </button>
            </div>
          </div>
        </div>

        {/* Filters and Options */}
        <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 pb-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <input
              id="consistent"
              type="checkbox"
              checked={isCheckingConsistent}
              onChange={() => setIsCheckingConsistent((c) => !c)}
              className="w-5 h-5 text-blue-500 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
            />
            <label
              htmlFor="consistent"
              className="font-medium text-gray-700 text-sm cursor-pointer"
            >
              Check consistency
            </label>
          </div>
          <DatePicker
            className="flex-1"
            dateFilter={dateFilter}
            setDateFilter={setDateFilter}
          />
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-gradient-to-br from-green-50 to-green-100 border-l-4 border-green-500 p-4 rounded-lg shadow-sm">
            <p className="text-gray-600 text-sm font-medium mb-1">
              Registered Devotees
            </p>
            <p className="text-3xl font-bold text-green-700">
              {registeredDevotee}
            </p>
          </div>
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 border-l-4 border-amber-500 p-4 rounded-lg shadow-sm">
            <p className="text-gray-600 text-sm font-medium mb-1">
              Registered Phone Numbers
            </p>
            <p className="text-3xl font-bold text-amber-700">
              {registeredPhoneListNum}
            </p>
          </div>
        </div>
        {/* Table Section */}
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          {listLoading ? (
            <div className="flex items-center justify-center p-12">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
                <p className="text-gray-600 font-medium">Loading devotees...</p>
              </div>
            </div>
          ) : filteredDevotees.length === 0 ? (
            <div className="text-center p-12">
              <p className="text-gray-500 text-lg">No devotees found</p>
            </div>
          ) : !isTableExpanded ? (
            <div className="w-full text-left">
              {devoteePhoneList.map((el) => (
                <TableRow
                  key={el}
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
              columns={columns}
              listLoading={listLoading}
              data={filteredDevotees}
              actions={[
                { label: "View", color: "yellow", onClick: handleView },
                {
                  label: "Edit",
                  color: "blue",
                  onClick: handleEdit,
                  loading: editLoading,
                },
                {
                  label: "delete",
                  color: "red",
                  onClick: handleDelete,
                  loading: deleteLoadingId,
                },
              ]}
              deleteLoadingId={deleteLoadingId}
              handleEdit={handleEdit}
              handleView={handleView}
              editLoading={editLoading}
            />
          )}
        </div>
        {/* Edit Modal */}
        {modal.open && modal.type === "edit" && (
          <EditDevotee
            modal={modal}
            handleHideModal={handleHideModal}
            selectedDevotee={selectedDevotee}
            setSelectedDevotee={setSelectedDevotee}
            editForm={editForm}
            setEditForm={setEditForm}
            setToast={setToast}
            onSuccessEdit={onSuccessEdit}
            setEditLoading={setEditLoading}
            editLoading={editLoading}
          />
        )}

        {modal.open && modal.type === "view" && (
          <ViewDevoteeModal
            selectedDevotee={selectedDevotee}
            handleHideModal={handleHideModal}
            handleShowModal={handleShowModal}
          />
        )}
      </div>
    </>
  );
};

export default ViewDevotee;
