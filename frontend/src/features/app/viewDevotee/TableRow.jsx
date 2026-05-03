import React from "react";
import { useState } from "react";

const TableRow = ({
  deleteLoadingId,
  handleDelete,
  editLoading,
  handleEdit,
  listLoading,
  summery,
  list,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const devoteeList = list.filter((el) => el.phone === summery);

  return (
    <div className="my-3 cursor-pointer bg-gray-100">
      <div className="border-b text-gray-600 text-xl">
        <div
          className="py-3 px-4 flex justify-between items-center hover:bg-gray-300"
          onClick={() => setIsOpen((p) => !p)}
        >
          {listLoading ? (
            <p>Loading</p>
          ) : devoteeList.length === 0 ? (
            <p>No devotee found</p>
          ) : (
            <>
              <span>Phone: {summery}</span>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d={
                      isOpen
                        ? "m4.5 15.75 7.5-7.5 7.5 7.5"
                        : "m19.5 8.25-7.5 7.5-7.5-7.5"
                    }
                  />
                </svg>
              </span>
            </>
          )}
        </div>
      </div>
      {isOpen && (
        <table className="w-full pl-3 mx-3">
          <thead>
            <tr className="border-b text-gray-600">
              <th className="py-2">Name</th>
              <th className="py-2">Address</th>
              <th className="py-2">Occupation</th>
              <th className="py-2">Gender</th>
              <th className="py-2">Date</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {devoteeList.map((el) => (
              <tr className="hover:bg-gray-300">
                <td className="py-2 p">{el.fullName}</td>
                <td className="py-2">{el.address}</td>
                <td className="py-2">{el.occupation}</td>
                <td className="py-2">{el.gender}</td>
                <td className="py-2">
                  {new Date(el.date).toLocaleDateString()}
                </td>
                <td className="py-2">
                  <button
                    onClick={() => handleDelete(el._id)}
                    disabled={deleteLoadingId === el._id || listLoading}
                    className={`pr-2 text-red-500 hover:underline ${
                      deleteLoadingId === el._id || listLoading
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    {deleteLoadingId === el._id ? "Deleting..." : "Delete"}
                  </button>
                  <button
                    onClick={() => handleEdit(el)}
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
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TableRow;
