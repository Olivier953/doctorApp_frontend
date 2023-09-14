import React from "react";
import Layout from "../layout/Layout";
import { Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../redux/alertSlice";
import axios from "axios";
import { toast } from "react-toastify";
import { setUser } from "../redux/userSlice";

const Notifications = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const markAllAsSeen = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "https://doctor-app-backend-puce.vercel.app/user/mark-all-notifications-as-seen",
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(setUser(response.data.data));
      } else {
        toast.error(response.data.message);
      }
    } catch {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };

  const deleteAll = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "https://doctor-app-backend-puce.vercel.app/user/delete-all-notifications",
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(setUser(response.data.data));
      } else {
        toast.error(response.data.message);
      }
    } catch {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout>
      <h1 className="notification_title">Notifications</h1>

      <Tabs>
        <Tabs.TabPane tab="Unseen" key={0}>
          <h3 className="notification_unseen" onClick={() => markAllAsSeen()}>Mark all as seen</h3>

          {user?.unseenNotifications.map((notification) => {
            return (
              <div
                className="card-text"
                key={notification}
                onClick={() => navigate(notification.onClickPath)}
              >
                <span>{notification.message}</span>
              </div>
            );
          })}
        </Tabs.TabPane>

        <Tabs.TabPane tab="Seen" key={1}>
          <h3 className="notification_unseen" onClick={() => deleteAll()}>Delete all</h3>
          {user?.seenNotifications.map((notification) => {
            return (
              <div
                className="card-text"
                key={notification}
                onClick={() => navigate(notification.onClickPath)}
              >
                <span>{notification.message}</span>
              </div>
            );
          })}
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
};

export default Notifications;

/*
router.post("/apply-doctor-account", async (req, res) => {
    try {
        const newDoctor = new Doctor({...req.body, status: "pending"})
        // console.log(newDoctor)
        await newDoctor.save()
        const adminUser = await User.find({ isAdmin: true})

        console.log(adminUser)

        const unseenNotifications = adminUser.unseenNotifications
        unseenNotifications.push({
            type: "new-doctor-request",
            message : `${newDoctor.firstName} ${newDoctor.lastName} has applied for a doctor account`,
            data : {
                doctorId : newDoctor._id,
                name: newDoctor.firstName + " " + newDoctor.lastName
            },
            onClickPath : "/admin/doctorslist"
        })
        await User.findByIdAndUpdate(adminUser._id, {unseenNotifications})
        return res
        .status(200)
        .send({
            message: "Doctor account applied successfully",
            success: true
        })
    } catch (error) {
        console.log(error)
        return res
        .status(500)
        .send({message : "error applying doctor account", succes : false, error})
    }
})
*/
