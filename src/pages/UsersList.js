import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertSlice";
import axios from "axios";
import { Table } from "antd";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();

  const getUsersData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get(
        "https://doctorapp.onrender.com/admin/get-all-users",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        setUsers(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    getUsersData();
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
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="usersList_sheet">
          <h3>Block</h3>
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <div className="usersList">
      <h1>Users List</h1>
      <Table key={users} columns={columns} dataSource={users} />
      </div>
    </Layout>
  );
};

export default UsersList;
