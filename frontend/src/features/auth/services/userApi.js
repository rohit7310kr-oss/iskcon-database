import API from "../../../services/axios";

export const createUserAPI = (data) => API.post("/api/v1/user/register", data);

export const loginUserAPI = (data) => API.post("/api/v1/user/login", data);

export const logoutUserAPI = () => API.post("/api/v1/user/logout");
