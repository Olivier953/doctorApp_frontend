import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertSlice";
import { toast, ToastContainer } from "react-toastify";
import Layout from "../layout/Layout";
import { DatePicker, TimePicker } from "antd";

const BookAppointment = () => {
  const [isAvailable, setIsAvailable] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const params = useParams();
  const dispatch = useDispatch();
  const [doctor, setDoctor] = useState(null);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    const getDoctorData = async () => {
      try {
        dispatch(showLoading());
        const response = await axios.post(
          "http://localhost:5000/doctor/get-doctor-info-by-id",
          {
            doctorId: params.doctorId,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setDoctor(response.data.data);
        dispatch(hideLoading());
      } catch (error) {
        dispatch(hideLoading());
      }
    };
    getDoctorData();
  }, [dispatch, params.doctorId]);

  const bookNow = async () => {
    setIsAvailable(false);
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "http://localhost:5000/user/book-appointment",
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctor,
          userInfo: user,
          date: date,
          time: time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/");
      }
    } catch (error) {
      toast.error("Something went wrong");
      dispatch(hideLoading());
    }
  };

  const checkAvailability = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "http://localhost:5000/user/check-booking-availability",
        {
          doctorId: params.doctorId,
          date: date,
          time: time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        setIsAvailable(true);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
      dispatch(hideLoading());
    }
  };

  return (
    <Layout>
      <div className="book">
      {doctor && (
        <div>
          <h2 className="book_title">
            {doctor.firstName} {doctor.lastName}
          </h2>
          <p>
            Timings : {doctor.startTimings} - {doctor.endTimings}
          </p>
          <div>
            <DatePicker
              format="DD-MM-YYYY"
              onChange={(value) => {
                setDate(value.format("DD-MM-YYYY"));
                setIsAvailable(false);
              }}
            />
            <TimePicker
              format="HH:mm"
              onChange={(values) => {
                setIsAvailable(false);
                setTime(values?.format("HH:mm"));
              }}
            />

            <button className="book_btn" onClick={checkAvailability}>Check Availabilty</button>
            {isAvailable && <button className="book_btn" onClick={bookNow}>Book now</button>}
          </div>
        </div>
      )}
      </div>
      <ToastContainer />
    </Layout>
  );
};

export default BookAppointment;

/*
                    {
                        isAvailable && (
                            <button onClick={bookNow} >Book now</button>
                        )
                    }

*/
