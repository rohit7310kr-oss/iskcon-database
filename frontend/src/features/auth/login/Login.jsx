import React, { useState } from "react";
import InputGroup from "../../app/shared/InputGroup";
import Form from "../Form/Form";
import { useNavigate } from "react-router";
import { useUser } from "../../context/userContext";

const Login = () => {
  const { loginUser } = useUser();
  const initFormData = {
    user: "",
    password: "",
  };

  const [formData, setFormData] = useState(initFormData);

  const [formError, setFormError] = useState(initFormData);

  const navigate = useNavigate();

  const validateForm = () => {
    let errors = { ...initFormData };
    if (formData.user === "") errors.user = "Please write your email";

    if (formData.password === "")
      errors.password = "please write your password";

    setFormError(errors);

    return Object.values(errors).every((val) => val === "");
  };

  const onInputChange = function (e) {
    setFormData((data) => {
      return { ...data, [e.target.name]: e.target.value };
    });
  };

  const handleFormSubmit = function (e) {
    e.preventDefault();

    if (validateForm())
      loginUser({ user: formData.user, password: formData.password });
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <InputGroup
        name="user"
        value={formData.user}
        onChange={onInputChange}
        label="Phone or email"
        error={formError.user}
      />
      <InputGroup
        name="password"
        value={formData.password}
        onChange={onInputChange}
        label="Password"
        error={formError.password}
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
