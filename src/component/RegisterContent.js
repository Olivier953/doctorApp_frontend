import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Button from "../utils/Button";

export const RegisterContent = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  return (
    <div className="login">
      <form
        className="login_content register_content"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="login_content_inputs">
          <input
            type="text"
            placeholder="Your First Name"
            {...register("firstName", {
              required: "Please type in your first name!",
            })}
          />
          <p className="error">{errors.firstName?.message}</p>

          <input
            type="text"
            placeholder="Your Last Name"
            {...register("lastName", {
              required: "Please type in your last name!",
            })}
          />
          <p className="error">{errors.lastName?.message}</p>

          <input
            type="email"
            placeholder="Your email"
            {...register("email", { required: "Please type in your email!" })}
          />
          <p className="error">{errors.email?.message}</p>

          <input
            type="password"
            placeholder="Your password"
            {...register("password", {
              required: "Please type in your password!",
            })}
          />
          <p className="error">{errors.password?.message}</p>
        </div>
        <Button type="submit" label="Register" className="login_content_btn" />
        <p>
          Don't you have an account ? <Link to="/">Login</Link>
        </p>
      </form>
    </div>
  );
};
