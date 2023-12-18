import { useState } from "react";
import axios from "axios";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import "../css/register.css";

export default function Register() {
  if (localStorage.getItem("name")) {
    window.location.href = "/user";
  }

  const initialFormData = {
    name: "",
    password: "",
    number: "",
    usertype: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.password ||
      !formData.usertype === "user or admin" ||
      !formData.number
    ) {
      alert("please enter every detail");
      return;
    }

    try {
      console.log(formData);
      const response = await axios.post(
        `https://roombooking-fs1h.onrender.com/add${formData.usertype}`,
        formData
      );
      const token = response.data.message;

      if (token === "Success") {
        setFormData(initialFormData);
        window.location.href = "/login";
      } else {
        alert("Please enter the correct username and password");
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert("User already exists. Please choose a different name.");
      } else {
        alert("Error registering user:", error.message);
      }
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
        <h2>Register</h2>
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
              id="Password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
            <label htmlFor="Password">Password</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="number"
              className="form-control"
              id="phoneNumber"
              name="number"
              placeholder="phone number"
              onChange={handleChange}
              required
            />
            <label htmlFor="number">Phone Number</label>
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
          Already registered then <Link to="/login">here</Link>
        </p>
      </div>
    </div>
  );
}
