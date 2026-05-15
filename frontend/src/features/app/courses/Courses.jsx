import React, { useEffect, useState } from "react";
import InputGroup from "../shared/InputGroup";
import Button from "../shared/Button";
import {
  createCourseAPI,
  getAllCourseAPI,
  updateCourseAPI,
} from "../service/courses";
import Toast from "../shared/Toast";
import ExpandedTable from "../viewDevotee/ExpandedTable";
import {
  getFormattedDateForDateEl,
  getTimeStamp,
  getTodayDate,
} from "../../utils/dateUtils";

const Courses = () => {
  const todayDate = getTodayDate();
  const [formMode, setFormMode] = useState("create");

  const [selectedDataId, setSelectedDataId] = useState("create");

  const initForm = {
    name: "",
    department: "",
    duration: "",
    startDate: todayDate,
    expectedEndDate: "",
  };

  const [courses, setCourses] = useState();
  const [formData, setFormData] = useState(initForm);
  const [formError, setFormError] = useState({});
  const [toast, setToast] = useState(null);
  const [fetchCount, setFetchCount] = useState(0);
  const [loading, setLoading] = useState({ status: false, message: null });

  const inputOnChange = (e) => {
    setFormData((data) => {
      return { ...data, [e.target.name]: e.target.value };
    });
  };

  const validateForm = function () {
    const newError = {};

    if (formData.name === "") newError.name = "Please write Name of the course";
    if (formData.department === "")
      newError.department = "Please choose the department";

    if (formData.startDate === "")
      newError.startDate = "Start date of the course is required";

    if (formData.expectedEndDate === "")
      newError.expectedEndDate =
        "Please mention the expected date the course going to end";

    if (
      getTimeStamp(formData.expectedEndDate) < getTimeStamp(formData.startDate)
    )
      newError.expectedEndDate =
        "Expected finish date must be greater than start date";

    setFormError(newError);
    if (
      newError.name ||
      newError.department ||
      newError.startDate ||
      newError.expectedEndDate
    )
      return false;

    return true;
  };

  const reFetch = function () {
    setFetchCount((c) => c + 1);
  };

  const handleAddCourse = async function (e) {
    e.preventDefault();

    if (!validateForm()) return;
    try {
      setLoading({ status: true, message: null });
      const res = await createCourseAPI({
        name: formData.name,
        department: formData.department,
        startDate: formData.startDate,
        expectedEndDate: formData.expectedEndDate,
      });
      if (res.data.status === "fail")
        return setToast({ type: "error", message: res.data.message });

      console.log(res.data);

      setToast({
        type: "success",
        message: "Course added successfully!",
      });
      setFormData(initForm);
      reFetch();
    } catch (err) {
    } finally {
      setLoading({ status: false, message: null });
    }
  };

  useEffect(() => {
    const fetchCourses = async function () {
      try {
        setLoading({
          status: true,
          message: "Please wait, we are getting your courses!",
        });
        const courses = await getAllCourseAPI();
        setCourses(courses.data.data);
      } catch (err) {
      } finally {
        setLoading({ status: false, message: null });
      }
    };

    fetchCourses();
  }, [fetchCount]);

  const handleEditButton = function (id) {
    const course = courses.find((el) => el._id === id);
    setSelectedDataId(course._id);
    setFormMode("edit");
    setFormData({
      ...course,
      startDate: getFormattedDateForDateEl(course.startDate),
      expectedEndDate: getFormattedDateForDateEl(course.expectedEndDate),
    });
  };

  const handleCancleButton = function () {
    setFormData(initForm);
    setSelectedDataId(null);
    setFormMode("create");
  };

  const handleEditCourse = async function (e) {
    e.preventDefault();

    try {
      setLoading({ status: true, message: "wait we are updating," });
      const res = await updateCourseAPI(selectedDataId, formData);
      if (res.data.status === "success") {
        reFetch();
        setToast({ type: "success", message: "Course editted successfull" });
      }
    } catch (err) {
    } finally {
      setLoading({ status: false, message: null });
    }
  };

  const columns = [
    { label: "Course Name", key: "name", type: "text" },
    { label: "Department", key: "department", type: "text" },
    { label: "Start date", key: "startDate", type: "date" },
    { label: "Expected Finish date", key: "expectedEndDate", type: "date" },
  ];

  return (
    <>
      <Toast toast={toast} onClose={() => setToast(null)} />
      <div className="bg-white p-6 rounded-xl shadow">
        <div>Add new course</div>
        <form
          onSubmit={formMode === "create" ? handleAddCourse : handleEditCourse}
        >
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 py-3">
            <InputGroup
              value={formData.name}
              onChange={inputOnChange}
              type="text"
              label="Course name"
              name="name"
              error={formError.name}
            />
            <InputGroup
              type="select"
              value={formData.department}
              onChange={inputOnChange}
              label="Select department"
              name="department"
              selectConfig={{
                options: [
                  { label: "IYF", value: "iyf" },
                  { label: "Congreation", value: "congreation" },
                ],
              }}
              error={formError.department}
            />
            <InputGroup
              type="date"
              value={formData.startDate}
              onChange={inputOnChange}
              label="Start date"
              name="startDate"
              error={formError.startDate}
            />

            <InputGroup
              type="date"
              value={formData.expectedEndDate}
              onChange={inputOnChange}
              label="Expected finish date"
              name="expectedEndDate"
              error={formError.expectedEndDate}
            />
          </div>
          <Button
            className="mr-2"
            variant="secondary"
            loading={loading.status}
            onClick={handleCancleButton}
          >
            Cancle
          </Button>
          <Button type="submit" loading={loading.status}>
            {formMode === "create" ? "Add course" : "Edit course"}
          </Button>
        </form>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <ExpandedTable
          columns={columns}
          data={courses}
          listLoading={loading.status}
          actions={[
            { label: "edit", color: "blue", onClick: handleEditButton },
          ]}
        />
      </div>
    </>
  );
};

export default Courses;
