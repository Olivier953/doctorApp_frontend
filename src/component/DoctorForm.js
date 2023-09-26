import React from "react";
import { useForm } from "react-hook-form";
// import { TimePicker } from 'antd';
// import Form from "antd/es/form/Form"
// import { Input } from "antd"

export const DoctorForm = ({ onFinish, initialValues }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      adress: "",
      specialization: "",
      experience: "",
      feePerConsultation: "",
      startTimings: "",
      endTimings: "",
    },
    mode: "onTouched",
  });

  return (
    <div className="applyDoctor">
      <h3>Personnal Information</h3>
      <form onSubmit={handleSubmit(onFinish, initialValues)}>
        <div>
          <input
            type="text"
            placeholder="Your First Name..."
            {...register("firstName", {
              required: "Please type in your first name!",
            })}
          />
          <p className="error">{errors.firstName?.message}</p>

          <input
            type="text"
            placeholder="Your Last Name..."
            {...register("lastName", {
              required: "Please type in your last name!",
            })}
          />
          <p className="error">{errors.lastName?.message}</p>

          <input
            type="text"
            placeholder="Your Phone Number..."
            {...register("phoneNumber", {
              required: "Please type in your phone number!", 
            })}
          />
          <p className="error">{errors.phoneNumber?.message}</p>

          <input
            type="text"
            placeholder="Your Adress..."
            {...register("adress", { required: "Please type in your adress!" })}
          />
          <p className="error">{errors.adress?.message}</p>

          <h3>Professional Information</h3>

          <input
            type="text"
            placeholder="Your Specialization..."
            {...register("specialization", {
              required: "Please type in your specialization!",
            })}
          />
          <p className="error">{errors.specialization?.message}</p>

          <input
            type="number"
            placeholder="Experience (in years)..."
            {...register("experience", {
              required: "Please enter your experience!",
            })}
          />
          <p className="error">{errors.experience?.message}</p>

          <input
            type="text"
            placeholder="Fee Per Consultation..."
            {...register("feePerConsultation", {
              required: "Please enter your fees!",
            })}
          />
          <p className="error">{errors.feePerConsultation?.message}</p>

          <span>Available from:</span>
          <input
            type="time"
            {...register("startTimings", { required: "Enter time!" })}
          />
          <span> to </span>
          <input
            type="time"
            {...register("endTimings", { required: "Enter time2!" })}
          />
        </div>

        <button className="applyDoctor_btn" type="submit">Submit</button>
      </form>
    </div>
  );
};

/*
try{
      const response = await axios.post("https://doctorapp-y8n7.onrender.com/user/apply-doctor-account",
      {...value},
      {
          headers: {Authorization : `Bearer ${localStorage.getItem("token")}`}
        })
        if(response.data.success){
          alert("bravo")
        }
    }catch(error){
      console.log(error)
    }

   
*/
