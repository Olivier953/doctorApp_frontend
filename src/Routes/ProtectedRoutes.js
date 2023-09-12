import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../redux/alertSlice";
import { setUser } from "../redux/userSlice";

function ProtectedRoute(props) {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      const getUser = async () => {
        try {
          dispatch(showLoading());
          const response = await axios.post(
            "http://localhost:5000/user/userInfo",
            { token: localStorage.getItem("token") },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          dispatch(hideLoading());
          if (response.data.success) {
            dispatch(setUser(response.data.data));
          } else {
            localStorage.clear();
            navigate("/login");
          }
        } catch (error) {
          dispatch(hideLoading());
          localStorage.clear();
          navigate("/login");
        }
      };
      getUser();
    }
  }, [user, dispatch, navigate]);

  if (localStorage.getItem("token")) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
}

export default ProtectedRoute;
