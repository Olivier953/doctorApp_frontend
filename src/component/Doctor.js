import React from "react";
import { useNavigate } from "react-router-dom";

function Doctor({ doctor }) {
  const navigate = useNavigate();
  return (
    <>
      <div onClick={() => navigate(`/book-appointment/${doctor._id}`)} className="homepage_doctorList">
        <h2>{doctor.firstName} {doctor.lastName}</h2>
        <ul>
        <li><span>Phone Number :</span> {doctor.phoneNumber}</li>
        <li><span>Address :</span> {doctor.adress}</li>
        <li><span>Fee Per Consultation :</span> {doctor.feePerConsultation}</li>
        <li><span>Availabilities :</span> {doctor.startTimings} - {doctor.endTimings}</li>
        </ul>
       
      </div>
    </>
  );
}

export default Doctor;

//        <p>Availabilities : {doctor.timings[0]} - {doctor.timings[1]}</p>
