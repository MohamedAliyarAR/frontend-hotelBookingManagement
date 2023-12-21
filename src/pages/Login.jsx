import { useState } from "react";
import axios from "axios";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import "../css/login.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    password: "",
    usertype: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.password ||
      formData.usertype === "user or admin"
    ) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      const response = await axios.post(
        `https://roombooking-fs1h.onrender.com/get${formData.usertype}`,
        formData
      );

      const token = response.data.auth;

      if (token) {
        console.log("Login successful. Token:", token);
        localStorage.setItem("name", JSON.stringify(formData));

        if (formData.usertype === "admin") {
          navigate("/admin");
        } else {
          navigate("/user");
        }
        setFormData({
          name: "",
          password: "",
          usertype: "",
        });
      } else {
        alert("Please enter the correct username and password");
      }
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div>
        <img src={logo} alt="logo" className="logo" />
      </div>

      <div className="head">
        <h2>Login</h2>
      </div>
      <div className="form">
        <form id="userData">
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="name"
              placeholder="email"
              name="name"
              onChange={handleChange}
              required
            />
            <label htmlFor="name">Email</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              name="password"
              required
              placeholder="Password"
              onChange={handleChange}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <select
            className="form-select px-3 py-3"
            aria-label="Default select example"
            name="usertype"
            onChange={handleChange}
          >
            <option selected>user or admin</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <button
            type="submit"
            className="btn btn-outline-success py-2 px-5  m-3"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
        <p>
          Not yet register then click <Link to="/register">here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
