import React from "react";
import Button from "../shared/Button";
import { getFormattedDate } from "../../utils/dateUtils";

const ExpandedTable = ({
  columns,
  data = [],
  listLoading = false,
  actions = [],
}) => {
  return (
    <table className="w-full text-left">
      <thead>
        <tr className="border-b text-gray-600">
          {columns.map((el) => (
            <th className="py-2">{el.label}</th>
          ))}
          <th className="py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {listLoading ? (
          <tr>
            <td colSpan={6} className="py-4 text-center text-gray-600">
              Loading...
            </td>
          </tr>
        ) : data?.length === 0 ? (
          <tr>
            <td colSpan={6} className="py-4 text-center text-gray-600">
              No devotees found.
            </td>
          </tr>
        ) : (
          data.map((row, i) => (
            <tr key={i} className="border-b hover:bg-gray-200">
              {columns.map((col) => (
                <td className="py-2">
                  {col.type === "date"
                    ? getFormattedDate(row[col.key])
                    : row[col.key]}
                </td>
              ))}
              <td className="py-2">
                {actions?.map((action) => (
                  <Button
                    variant="underlined"
                    color={action.color}
                    loading={action.loading}
                    onClick={() => action.onClick(row._id)}
                  >
                    {action.label}
                  </Button>
                ))}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default ExpandedTable;
