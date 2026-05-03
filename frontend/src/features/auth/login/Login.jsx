import React, { useState } from "react";
import InputGroup from "../../app/shared/InputGroup";
import Form from "../Form/Form";
import { useNavigate } from "react-router";
import { useUser } from "../../context/userContext";

const Login = () => {
  const { loginUser } = useUser();

  const [formData, setFormData] = useState({
    user: "",
    password: "",
  });
  const navigate = useNavigate();

  const onInputChange = function (e) {
    setFormData((data) => {
      return { ...data, [e.target.name]: e.target.value };
    });
  };

  const handleFormSubmit = function (e) {
    e.preventDefault();

    loginUser({ user: formData.user, password: formData.password });
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <InputGroup
        name="user"
        value={formData.user}
        onChange={onInputChange}
        label="Phone or email"
      />
      <InputGroup
        name="password"
        value={formData.password}
        onChange={onInputChange}
        label="Password"
      />
      <button
        type="submit"
        className="my-5 bg-green-500 p-3 text-xl rounded-lg color-white w-full"
      >
        Login
      </button>
      <div className="text-gray-500">
        If don't have account, please registere here:{" "}
        <span
          className="text-blue-500 cursor-pointer"
          onClick={() => navigate("/auth/register")}
        >
          click here
        </span>
      </div>
    </Form>
  );
};

export default Login;
