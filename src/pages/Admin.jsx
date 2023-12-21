import { useEffect, useState } from "react";
import axios from "axios";
import RoomForm from "../components/RoomForm";
import LNav from "../components/LNav";
import "../css/Admin.css";

const Admin = () => {
  const [rooms, setRooms] = useState([]);

  const admin = JSON.parse(localStorage.getItem("name")).name;

  useEffect(() => {
    async function fetching() {
      try {
        const response = await axios.post(
          "https://roombooking-fs1h.onrender.com/getadminroom",
          { adminName: admin }
        );
        setRooms(response.data);
      } catch (error) {
        console.error("Error fetching room data:", error);
      }
    }
    fetching();
  }, []);

  const Data = {
    adminname: admin,
    roomname: "",
    minDay: null,
    maxDay: null,
    rent: null,
    bed: null,
    photo: "",
    booked: false,
    bookedby: null,
  };

  const handleAddRoom = () => {
    setRooms([Data, ...rooms]);
  };

  const handleUpdateRoom = async (formData) => {
    try {
      await axios.post(
        "https://roombooking-fs1h.onrender.com/updateroom",
        formData
      );
      const response = await axios.post(
        "https://roombooking-fs1h.onrender.com/getadminroom",
        {
          adminName: admin,
        }
      );
      alert("updated successfully");
      setRooms(response.data);
      if (response.status == 500) alert("you can't update name");
    } catch (error) {
      if (error.status === 500) alert("you can't update name");
      console.error("Error updating room:", error);
    }
  };

  const handleDeleteRoom = async (roomname) => {
    try {
      await axios.post("https://roombooking-fs1h.onrender.com/deleteroom", {
        roomname,
      });

      const response = await axios.post(
        "https://roombooking-fs1h.onrender.com/getadminroom",
        {
          adminName: admin,
        }
      );
      alert("room deleted successfully");
      setRooms(response.data);
    } catch (error) {
      console.error("Error deleting room:", error);
    }
  };

  return (
    <>
      <LNav />

      <div className="container">
        <div className="row">
          <div className=""></div>
          <h2 className="text-center">Admin Page</h2>
          <button
            className="btn btn-outline-success btn-lg"
            onClick={() => handleAddRoom()}
          >
            Add Room
          </button>
        </div>
        <div className="row">
          {rooms.map((room) => (
            <div key={room.roomname}>
              <RoomForm onSubmit={handleUpdateRoom} initialData={room} />
              <button
                className="btn btn-outline-danger m-2"
                onClick={() => handleDeleteRoom(room.roomname)}
              >
                delete
              </button>
              <hr />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Admin;
