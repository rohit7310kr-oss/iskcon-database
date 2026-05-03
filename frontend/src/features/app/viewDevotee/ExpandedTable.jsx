import React from "react";

const ExpandedTable = ({
  listLoading,
  filteredDevotees,
  handleDelete,
  deleteLoadingId,
  handleEdit,
  editLoading,
}) => {
  return (
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
                <p>{new Date(devotee.date).toLocaleDateString()}</p>
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
                  {deleteLoadingId === devotee._id ? "Deleting..." : "Delete"}
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
  );
};

export default ExpandedTable;
