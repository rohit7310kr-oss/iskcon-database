import API from "../../../services/axios";

export const getAllDevotee = () => API.get("/api/v1/devotees");

export const createDevotee = (data) => API.post("/api/v1/devotees", data);

export const updateDevotee = (id, data) =>
  API.put(`/api/v1/devotees/${id}`, data);

export const deleteDevotee = (id) => API.delete(`/api/v1/devotees/${id}`);

export const importDevotee = (data) =>
  API.post("/api/v1/devotees/upload", data);
