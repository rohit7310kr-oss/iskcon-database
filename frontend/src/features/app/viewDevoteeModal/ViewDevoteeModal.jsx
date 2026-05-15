import React from "react";
import ModalLayout from "../shared/ModalLayout";
import Button from "../shared/Button";

const ViewDevoteeModal = ({
  selectedDevotee,
  handleHideModal,
  handleShowModal,
}) => {
  const data = [
    { label: "Full Name", value: selectedDevotee.fullName },
    { label: "Email", value: selectedDevotee.user },
    { label: "Phone", value: selectedDevotee.phone },
    { label: "Gender", value: selectedDevotee.gender },
    { label: "Age", value: selectedDevotee.age },
    { label: "Address", value: selectedDevotee.address },
    { label: "Occupation", value: selectedDevotee.occupation },
    { label: "Company", value: selectedDevotee.company },
    { label: "Designation", value: selectedDevotee.designation },
    { label: "Education", value: selectedDevotee.education },
    { label: "Temple Name", value: selectedDevotee.templeName },
    { label: "Counselor", value: selectedDevotee.counselor },
    { label: "Guru Name", value: selectedDevotee.guruName },
    { label: "Initiation Status", value: selectedDevotee.initiationStatus },
    { label: "Marital Status", value: selectedDevotee.maritalStatus },
    { label: "Chanting Rounds", value: selectedDevotee.chantingRounds },
    { label: "Status", value: selectedDevotee.status },
    {
      label: "Joined Date",
      value: new Date(selectedDevotee.joinedDate).toLocaleDateString(),
    },
    {
      label: "Registration Date",
      value: new Date(selectedDevotee.registrationDate).toLocaleDateString(),
    },
    {
      label: "Created At",
      value: new Date(selectedDevotee.createdAt).toLocaleString(),
    },
  ];

  return (
    <ModalLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        {data.map((item) => (
          <div
            key={item.label}
            className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
          >
            <p className="text-gray-500 text-xs font-medium uppercase tracking-wide">
              {item.label}
            </p>

            <p className="mt-1 text-gray-900 font-semibold break-words">
              {item.value || "-"}
            </p>
          </div>
        ))}

        {/* Skills */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm md:col-span-2">
          <p className="text-gray-500 text-xs font-medium uppercase tracking-wide">
            Skills
          </p>

          <div className="flex flex-wrap gap-2 mt-3">
            {selectedDevotee.skills?.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Services */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm md:col-span-2">
          <p className="text-gray-500 text-xs font-medium uppercase tracking-wide">
            Services
          </p>

          <div className="flex flex-wrap gap-2 mt-3">
            {selectedDevotee.services?.map((service) => (
              <span
                key={service}
                className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium"
              >
                {service}
              </span>
            ))}
          </div>
        </div>

        {/* Books Read */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm md:col-span-2">
          <p className="text-gray-500 text-xs font-medium uppercase tracking-wide">
            Books Read
          </p>

          <div className="flex flex-wrap gap-2 mt-3">
            {selectedDevotee.booksRead?.map((book) => (
              <span
                key={book}
                className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-medium"
              >
                {book}
              </span>
            ))}
          </div>
        </div>
        <Button variant="secondary" onClick={handleHideModal}>
          Cancle
        </Button>
        <Button onClick={() => handleShowModal("edit", selectedDevotee)}>
          Go to edit
        </Button>
      </div>
    </ModalLayout>
  );
};

export default ViewDevoteeModal;
