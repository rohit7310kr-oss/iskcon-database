import React, { useState } from "react";
import { useNavigate } from "react-router";
import Form from "../Form/Form";
import InputGroup from "../../app/shared/InputGroup";
import { useUser } from "../../context/userContext";

const Register = () => {
  const { registerUser } = useUser();

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const inputOnChange = function (e) {
    setFormData((data) => {
      return { ...data, [e.target.name]: e.target.value };
    });
  };

  const handleFormSubmit = function (e) {
    e.preventDefault();

    registerUser({
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    });
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <InputGroup
        name="fullName"
        label="Full Name"
        value={formData.fullName}
        onChange={inputOnChange}
      />
      <InputGroup
        name="email"
        label="Email"
        value={formData.email}
        onChange={inputOnChange}
      />
      <InputGroup
        name="phone"
        label="Phone"
        value={formData.phone}
        onChange={inputOnChange}
      />
      <InputGroup
        name="password"
        label="Password"
        value={formData.password}
        onChange={inputOnChange}
      />
      <InputGroup
        name="confirmPassword"
        label="Confirm password"
        value={formData.confirmPassword}
        onChange={inputOnChange}
      />

      <button
        type="submit"
        className="my-5 bg-green-500 p-3 text-xl rounded-lg color-white w-full"
      >
        Register yourself
      </button>
      <div className="text-gray-500">
        Already have an account? login here
        <span
          className="text-blue-500 cursor-pointer"
          onClick={() => navigate("/auth/login")}
        >
          click here
        </span>
      </div>
    </Form>
  );
};

export default Register;
