import API from "../../../services/axios";

export const createCourseAPI = (data) => API.post("api/v1/course", data);
export const getAllCourseAPI = () => API.get("api/v1/course");

export const updateCourseAPI = (id, data) =>
  API.patch(`api/v1/course/${id}`, data);

export const deleteCourseAPI = (id) => API.delete(`api/v1/course/${id}`);
