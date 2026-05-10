import React, { createContext, useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import {
  createUserAPI,
  loginUserAPI,
  logoutUserAPI,
} from "../auth/services/userApi";
import Toast from "../app/shared/Toast";

const userContext = createContext();

const UserProvider = () => {
  const [toast, setToast] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState({ status: false, message: "" });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (token && user) {
      setUser(user);
      navigate("/app");
    } else {
      setUser(null);
      navigate("/auth/login");
    }
  }, []);

  const saveUser = function (token, user) {
    setUser(user);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    navigate("/app");
  };

  const registerUser = async function (data, resetForm) {
    try {
      setLoading({
        status: true,
        message: "Creating account as Volunteer, please wait...",
      });
      const user = await createUserAPI(data);
      if (user.data.status === "success")
        saveUser(user.data.token, user.data.data);
    } catch (err) {
      setToast({ type: "error", message: err.response.data.message });
      resetForm();
    } finally {
      setLoading({ status: false, message: "" });
    }
  };

  const loginUser = async function (data) {
    try {
      setLoading({
        status: true,
        message: "Please wait, we are logging you back!",
      });
      const user = await loginUserAPI(data);
      console.log(user);
      if (user.data.status === "success")
        saveUser(user.data.token, user.data.data);
    } catch (err) {
      setToast({ type: "error", message: err.response.data.message });
    } finally {
      setLoading({ status: false, message: "" });
    }
  };

  const logout = async function () {
    try {
      setLoading({ status: true, message: "Logging out.." });
      await logoutUserAPI();

      localStorage.removeItem("user");
      localStorage.removeItem("token");
      navigate("/auth/login");
    } catch (err) {
    } finally {
      setLoading({ status: false, message: "" });
    }
  };

  return (
    <userContext.Provider
      value={{ logout, user, registerUser, loginUser, loading }}
    >
      <Toast toast={toast} onClose={() => setToast(null)} />
      <Outlet />
    </userContext.Provider>
  );
};

export const useUser = () => useContext(userContext);

export default UserProvider;
