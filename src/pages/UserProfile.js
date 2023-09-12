import React from "react";
import { useSelector } from "react-redux";
import Layout from "../layout/Layout";

const UserProfile = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <Layout>
      <h1 className="userProfile_title">User Profile</h1>
      <div className="userProfile_info">
      <p><span>Your First Name : </span>{user?.firstName}</p>
      <p><span>Your Last Name : </span>{user?.lastName}</p>
      <p><span>Email : </span>{user?.email}</p>
      </div>
    </Layout>
  );
};

export default UserProfile;
