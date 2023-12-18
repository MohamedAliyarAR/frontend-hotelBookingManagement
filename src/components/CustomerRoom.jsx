import axios from "axios";
import { useEffect, useState } from "react";

function CustomerRoom() {
  const [rooms, setRooms] = useState([]);
  const [booked, setBooked] = useState(false);
  const user = JSON.parse(localStorage.getItem("name")).name;

  const book = (roomName, type) => {
    var isConfirmed;
    if (type === "book") {
      isConfirmed = window.confirm("Are you sure you want to book this room?");
    } else {
      isConfirmed = window.confirm(
        "Are you sure you want to vacate this room?"
      );
    }

    if (isConfirmed) {
      axios
        .post("https://roombooking-fs1h.onrender.com/bookroom", {
          roomName,
          user,
          type,
        })
        .then((response) => {
          if (type === "book") {
            alert("Room booked successfully");
          } else {
            alert("Room Vacated successfully");
          }
          setBooked(!booked);
        })
        .catch((error) => {
          if (error.response && error.response.status === 409) {
            alert("Room is already booked");
          }
          alert("Error booking room:", error);
        });
    }
  };

  useEffect(() => {
    async function getRooms() {
      try {
        const apiCall = await axios.get(
          "https://roombooking-fs1h.onrender.com/getroom"
        );
        setRooms(apiCall.data);
      } catch (error) {
        console.log(error);
      }
    }

    getRooms();
  }, [booked]);

  return (
    <>
      {rooms?.map((room) => (
        <div
          className="row   d-flex  align-items-center room-card justify-content-center"
          key={room.roomname}
        >
          <div className=" col-lg-5 col-sm-12 image-content">
            <img
              className="border rounded img-fluid"
              src={room.photo}
              alt={`Room ${room.roomname}`}
            />
          </div>

          <div className="col-lg-5 col-sm-12">
            <h3>{room.roomname}</h3>
            <p>
              <b>minimum day to stay : </b>
              {room.minDay}
            </p>
            <p>
              <b>Maximum Day you can stay : </b>
              {room.maxDay}
            </p>
            <p>
              <b>Number of beds : </b>
              {room.bed}
            </p>
            <p>
              <b>Rent : </b>
              {room.rent}
            </p>
            {room.booked && room.bookedby === user && (
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => book(room.roomname, "vacate")}
              >
                Vacate
              </button>
            )}
            {!room.booked && (
              <button
                type="button"
                onClick={() => book(room.roomname, "book")}
                className="btn btn-primary"
              >
                Book it
              </button>
            )}
            {room.bookedby !== user && room.booked && (
              <p className="booked">
                <b>Reserved </b>
              </p>
            )}
          </div>
        </div>
      ))}
    </>
  );
}

export default CustomerRoom;
