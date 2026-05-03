import React, { createContext, useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { createUserAPI, loginUserAPI } from "../auth/services/userApi";

const userContext = createContext();

const UserProvider = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

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

  const registerUser = async function (data) {
    try {
      const user = await createUserAPI(data);
      saveUser(user.token, user.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const loginUser = async function (data) {
    try {
      const user = await loginUserAPI(data);
      saveUser(user.data.token, user.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const logout = function () {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/auth/login");
  };

  return (
    <userContext.Provider value={{ logout, user, registerUser, loginUser }}>
      <Outlet />
    </userContext.Provider>
  );
};

export const useUser = () => useContext(userContext);

export default UserProvider;
