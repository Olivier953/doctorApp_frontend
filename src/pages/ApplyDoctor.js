import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertSlice";
import axios from "axios";
import Layout from "../layout/Layout";
import { DoctorForm } from "../component/DoctorForm";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ApplyDoctor() {
  const { user } = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const onFinish = async (value) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "https://doctorapp-y8n7.onrender.com/user/apply-doctor-account",
        { ...value, userId: user._id },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message)
        navigate("/")
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("something went wrong");
    }
  };

  return (
    <Layout>
      <h1 className="applyDoctor_title">Doctor profile</h1>
      <DoctorForm onFinish={onFinish} />
    </Layout>
  );
}

export default ApplyDoctor;
