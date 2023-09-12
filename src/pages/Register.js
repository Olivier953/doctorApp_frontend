import React from "react";

import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertSlice";
import { RegisterContent } from "../component/RegisterContent";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      dispatch(showLoading());

      const response = await axios.post("http://localhost:5000/user/register", {
        ...data,
      });
      dispatch(hideLoading());
      if (response) {
        toast.success("user created successfully");
        navigate("/login");
      } else {
        toast.error("error creating user");
      }
    } catch {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <RegisterContent onSubmit={onSubmit} />
    </>
  );
};

export default Register;
