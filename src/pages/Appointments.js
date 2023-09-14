import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertSlice";
import axios from "axios";
import moment from "moment";
import Layout from "../layout/Layout";
import { Table } from "antd";
import { ToastContainer } from "react-toastify";

function Appointments() {
  const [appointment, setAppointment] = useState([]);
  const dispatch = useDispatch();
  const getAppointmentData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get(
        "https://doctor-app-backend-puce.vercel.app/user/get-appointment-by-user-id",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        setAppointment(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  const columns = [
    {
      title: "Doctor",
      dataIndex: "name",
      render: (text, record) => (
        <h2 className="appointments_doctorName">
          {record.doctorInfo.firstName} {record.doctorInfo.lastName}
        </h2>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      render: (text, record) => <h2 className="appointments_phoneNumber">{record.doctorInfo.phoneNumber}</h2>,
    },
    {
      title: "Date & Time",
      dataIndex: "createdAt",
      render: (text, record) => (
        <h2 className="appointments_date">
          {moment(record.date).format("DD-MM-YYYY")}{" "} <span>at </span>
          {moment(record.time).format("HH:mm")}
        </h2>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];

  useEffect(() => {
    getAppointmentData();
  }, []);

  return (
    <Layout>
      <h1 className="appointments_title">Appointment(s)</h1>
      <Table columns={columns} dataSource={appointment} />
      <ToastContainer />
    </Layout>
  );
}

export default Appointments;
