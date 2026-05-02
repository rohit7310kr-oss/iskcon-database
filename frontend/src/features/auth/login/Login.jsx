import React from "react";
import InputGroup from "../../app/shared/InputGroup";
import Form from "../Form/Form";
import { useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate();

  return (
    <Form>
      <InputGroup label="Email" />
      <InputGroup label="Password" />
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
          onClick={() => navigate("/register")}
        >
          click here
        </span>
      </div>
    </Form>
  );
};

export default Login;
