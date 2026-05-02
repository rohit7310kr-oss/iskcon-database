import React from "react";
import { useNavigate } from "react-router";
import Form from "../Form/Form";
import InputGroup from "../../app/shared/InputGroup";

const Register = () => {
  const navigate = useNavigate();

  return (
    <Form>
      <InputGroup label="Full Name" />
      <InputGroup label="email" />
      <InputGroup label="Password" />
      <InputGroup label="Confirm password" />

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
          onClick={() => navigate("/login")}
        >
          click here
        </span>
      </div>
    </Form>
  );
};

export default Register;
