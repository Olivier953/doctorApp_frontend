import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import Doctor from "../component/Doctor";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertSlice";
import axios from "axios";

export const Home = () => {
  const [doctors, setDoctors] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    const getData = async () => {
      try {
        dispatch(showLoading());
        const response = await axios.get(
          "https://doctor-app-backend-puce.vercel.app/user/get-all-approved-doctors",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        dispatch(hideLoading());
        if (response.data.success) {
          setDoctors(response.data.data);
        }
      } catch (error) {
        dispatch(hideLoading());
      }
    };
    getData();
  }, []);

  return (
    <>
      <Layout>
        <div className="home">
        <h1 className="home_title">Homepage</h1>
        <h3 className="home_subtitle">Available doctors :</h3>
        <div className="home_doctorsList">
        {doctors.map((doctor) => {
          return (
            <div key={doctor} className="home_doctorsList_eachDoctor">
              <Doctor doctor={doctor} />
            </div>
          );
        })}
        </div>
        </div>
      </Layout>
    </>
    
  );
};
