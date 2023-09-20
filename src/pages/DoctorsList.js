import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertSlice";
import { ToastContainer, toast } from "react-toastify";
import Layout from "../layout/Layout";
import { Table } from "antd";
import axios from "axios";

function Doctorslist() {
  const [doctors, setDoctors] = useState([]);
  const dispatch = useDispatch();

  const getDoctorsData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get(
        "https://doctorapp.onrender.com/admin/get-all-doctors",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        setDoctors(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  const changeDoctorStatus = async (record, status) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "https://doctorapp.onrender.com/admin/change-account-doctor-status",
        { doctorId: record._id, userId: record.userId, status: status },
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
        getDoctorsData();
      }
    } catch (error) {
      toast.error("Error changing doctor account status");
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getDoctorsData();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <h3 className="name">
          {record.firstName} {record.lastName}
        </h3>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div>
          {record.status === "pending" && (
            <h5 onClick={() => changeDoctorStatus(record, "approved")}>
              Approve
            </h5>
          )}
          {record.status === "approved" && (
            <h5 onClick={() => changeDoctorStatus(record, "blocked")}>Block</h5>
          )}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <div className="doctorList">
      <h1>Doctors list</h1>
      <Table columns={columns} dataSource={doctors} />
      <ToastContainer />
      </div>
    </Layout>
  );
}

export default Doctorslist;
