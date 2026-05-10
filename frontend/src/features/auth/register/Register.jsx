import React, { useState } from "react";
import { useNavigate } from "react-router";
import Form from "../Form/Form";
import InputGroup from "../../app/shared/InputGroup";
import { useUser } from "../../context/userContext";

const Register = () => {
  const { registerUser, loading } = useUser();

  const navigate = useNavigate();
  const initFormField = {
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  };
  const [formData, setFormData] = useState(initFormField);

  const [formError, setFormError] = useState(initFormField);

  const inputOnChange = function (e) {
    setFormData((data) => {
      return { ...data, [e.target.name]: e.target.value };
    });
  };

  const validateForm = function () {
    let errors = { ...initFormField };

    if (formData.fullName === "") {
      errors.fullName = "Please write your name";
    }

    if (formData.email === "") {
      errors.email = "Please write the email";
    }

    if (formData.phone === "") {
      errors.phone = "Please write your phone number";
    } else if (formData.phone.length !== 10) {
      errors.phone = "Please fill correct number (only 10 digits)";
    }

    if (formData.password === "") {
      errors.password = "Please write password";
    }

    if (formData.confirmPassword === "") {
      errors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setFormError(errors);

    // check if all fields are empty (no errors)
    return Object.values(errors).every((val) => val === "");
  };

  const handleFormSubmit = function (e) {
    e.preventDefault();

    if (validateForm())
      registerUser(
        {
          fullName: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        },
        () => {
          setFormData(initFormField);
        },
      );
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <InputGroup
        name="fullName"
        label="Full Name"
        value={formData.fullName}
        onChange={inputOnChange}
        error={formError.fullName}
      />
      <InputGroup
        name="email"
        label="Email"
        value={formData.email}
        onChange={inputOnChange}
        error={formError.email}
      />
      <InputGroup
        name="phone"
        label="Phone"
        value={formData.phone}
        onChange={inputOnChange}
        error={formError.phone}
      />
      <InputGroup
        name="password"
        label="Password"
        value={formData.password}
        onChange={inputOnChange}
        error={formError.password}
      />
      <InputGroup
        name="confirmPassword"
        label="Confirm password"
        value={formData.confirmPassword}
        onChange={inputOnChange}
        error={formError.confirmPassword}
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
