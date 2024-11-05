import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Box, CardMedia } from "@mui/material";

import { Videos, ChannelCard } from ".";
import { loginAPI, loginFacebookAPI } from "../utils/fetchFromAPI";
import { toast } from "react-toastify";
import ReactFacebookLogin from "react-facebook-login";

const Login = () => {
  const [channelDetail, setChannelDetail] = useState();
  const [videos, setVideos] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {}, []);

  return (
    <div className="p-5 " style={{ minHeight: "100vh" }}>
      <div className=" d-flex justify-content-center">
        <form className="row g-3 text-white">
          <div className="col-md-12">
            <label htmlFor="inputEmail4" className="form-label">
              Email
            </label>
            <input type="email" className="form-control" id="email" />
          </div>

          <div className="col-md-12">
            <label htmlFor="inputEmail4" className="form-label">
              Password
            </label>
            <input className="form-control" id="pass" />
          </div>
          <div className="col-12">
            <button
              onClick={() => {
                let email = document.getElementById("email").value;
                let pass_word = document.getElementById("pass").value;
                console.log(`email:${email}; pass_word:${pass_word} `);
                loginAPI({ email, pass_word })
                  .then((result) => {
                    // result gồm message và data (access token)
                    // tạo popup thông báo login thành công
                    toast.success(result.message);
                    // lưu access token trong local storage của browzer
                    localStorage.setItem("LOGIN_USER", result.data);
                    // chuyển hướng sang trang chủ sau khi login thành công
                    navigate("/");
                  })
                  .catch((error) => {
                    console.log("error from API login");
                    toast.error(error.response.data.message);
                  });
              }}
              type="button"
              className="btn btn-primary"
            >
              Login
            </button>
            <Link to="/forgot-pass" className="text-primary">
              Forgot password
            </Link>
            <ReactFacebookLogin
              appId="1119396706272724"
              fields="name, email,picture"
              callback={(response) => {
                // console.log(response);
                let { id, email, name } = response;
                loginFacebookAPI({ id, email, name })
                  .then((result) => {
                    toast.success(result.message);
                    localStorage.setItem("LOGIN_USER", result.data);
                    navigate("/");
                  })
                  .catch((error) => {
                    toast.error(error.response.data.message);
                  });
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
