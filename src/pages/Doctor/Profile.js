import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { showLoading, hideLoading } from "../../redux/alertSlice";
import axios from "axios";
import { DoctorForm } from "../../component/DoctorForm";
import Layout from "../../layout/Layout";

function Profile() {
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const [doctor, setDoctor] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "https://doctorapp-y8n7.onrender.com/doctor/update-doctor-profile",
        { ...values, userId: user._id },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      dispatch(hideLoading());
      if (response.data.succes) {
          toast.success(response.data.message);       
          navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  const getDoctorData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "https://doctorapp-y8n7.onrender.com/doctor/get-doctor-info-by-user-id",
        {
          userId: params.userId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        setDoctor(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getDoctorData();
  }, []);

  const getDoctorsInfo = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get(
        "https://doctorapp-y8n7.onrender.com/admin/get-all-doctors",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        setDoctor(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctorsInfo();
  }, []);

  return (
    <>
      <Layout>
        <div className="update">
        <h1>Update Your Doctor Profile</h1>
        <DoctorForm onFinish={onFinish} initialValues={doctor} />
        </div>
      </Layout>
    </>
  );
}

export default Profile;
