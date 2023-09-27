import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/alertSlice";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";
import Layout from "../../layout/Layout";
import { Table } from "antd";

const DoctorAppointment = () => {
  const [appointment, setAppointment] = useState([]);
  const dispatch = useDispatch();
  const getAppointmentData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get(
        "https://doctorapp.onrender.com/doctor/get-appointment-by-doctor-id",
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
  const changeAppointmentStatus = async (record, status) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "https://doctorapp.onrender.com/doctor/change-appointment-doctor-status",
        { appointmentId: record._id, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response);
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        getAppointmentData();
      }
    } catch (error) {
      toast.error("Error changing doctor account status");
      dispatch(hideLoading());
    }
  };

  const columns = [
    {
      title: "Patient name",
      dataIndex: "name",
      render: (text, record) => <h3 className="appointment_name">{record.userInfo.lastName}</h3>, 
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      render: (text, record) => <h3>{record.doctorInfo.phoneNumber}</h3>,
    },
    {
      title: "Date & Time",
      dataIndex: "createdAt",
      render: (text, record) => (
        <h3>
          {moment(record.date).format("DD-MM-YYYY")}{" "}
          {moment(record.time).format("HH:mm")}
        </h3>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="approve">
          {record.status === "pending" && (
            <div>
              <h3 onClick={() => changeAppointmentStatus(record, "approved")}>
                Approve
              </h3>
              <h3 onClick={() => changeAppointmentStatus(record, "rejected")}>
                Reject
              </h3>
            </div>
          )}
        </div>
      ),
    },
  ];


  useEffect(() => {
    getAppointmentData();
  }, []);

  return (
    <Layout>
      <div >
      <h1 className="appointment_title">Appointment(s)</h1>
      <Table columns={columns} dataSource={appointment} />
      <ToastContainer />
      </div>
    </Layout>
  );
};

export default DoctorAppointment;
