import axios from "axios";
import { useNavigate } from "react-router-dom";
import CustomerRoom from "../components/CustomerRoom";
import { useEffect, useState } from "react";
import "../css/User.css";
import LNav from "../components/LNav";
function Index() {
  const navigate = useNavigate();
  if (JSON.parse(localStorage.getItem("name")).name === "admin") {
    navigate("/admin");
  }
  const [rooms, setrooms] = useState([]);

  useEffect(() => {
    async function getrooms() {
      try {
        const apiCall = (
          await axios.get("https://roombooking-fs1h.onrender.com/getroom")
        ).data;
        setrooms(apiCall);
      } catch (error) {
        console.log(error);
      }
    }
    getrooms();
  });

  return (
    <>
      <LNav />

      <div className="container">
        <CustomerRoom rooms={rooms} />
      </div>
    </>
  );
}

export default Index;
