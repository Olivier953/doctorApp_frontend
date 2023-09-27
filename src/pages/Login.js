import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "../utils/Button";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertSlice";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onTouched",
  });

  const onSubmit = async (data, e) => {
    e.preventDefault();
    try {
      dispatch(showLoading());
      const response = await axios.post("https://doctorapp-y8n7.onrender.com/user/login", {
        ...data,
      });
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.data);
        //setTimeout(() => {
        navigate("/");
        //}, 1000);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("something went wrong");
    }
  };

  return (
    <div className="login">
      <form className="login_content" onSubmit={handleSubmit(onSubmit)}>
        <div className="login_content_inputs">
          <input
            type="email"
            placeholder="Your email..."
            {...register("email", { required: "Please type in your email!" })}
          />
          <p className="error">{errors.email?.message}</p>
          <input
            type="password"
            placeholder="Your password..."
            {...register("password", {
              required: "Please type in your password!",
            })}
          />
          <p className="error">{errors.password?.message}</p>
        </div>

        <Button type="submit" label="Login" className="login_content_btn" />
        <p>
          Don't you have an account ? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
};
