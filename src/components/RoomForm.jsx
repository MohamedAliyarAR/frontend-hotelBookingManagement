import { useState } from "react";

const RoomForm = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState(initialData || {});

  const handleChange = (e) => {
    // Prevent unchecking the "Booked" checkbox
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="mt-5" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="roomname" className="form-label">
          Room Name:
        </label>
        <input
          type="text"
          id="roomname"
          name="roomname"
          value={formData.roomname}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="minDay" className="form-label">
          Minimum Days:
        </label>
        <input
          type="number"
          id="minDay"
          name="minDay"
          value={formData.minDay || ""}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="maxDay" className="form-label">
          Maximum Days:
        </label>
        <input
          type="number"
          id="maxDay"
          name="maxDay"
          value={formData.maxDay || ""}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="rent" className="form-label">
          Rent:
        </label>
        <input
          type="number"
          id="rent"
          name="rent"
          value={formData.rent || ""}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="bed" className="form-label">
          Number of Beds:
        </label>
        <input
          type="number"
          id="bed"
          name="bed"
          value={formData.bed || ""}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="photo" className="form-label">
          Photo URL:
        </label>
        <input
          type="text"
          id="photo"
          name="photo"
          value={formData.photo || ""}
          onChange={handleChange}
          className="form-control"
          required
        />
        <img src={formData.photo} alt="" className="mt-2 img-fluid" />
      </div>

      <div className="mb-3 form-check">
        <input
          type="checkbox"
          id="booked"
          name="booked"
          checked={formData.booked || false}
          readOnly
          className="form-check-input"
        />
        <label htmlFor="booked" className="form-check-label">
          Booked
        </label>
      </div>

      <div className="mb-3">
        <label htmlFor="bookedby" className="form-label">
          Booked By:
        </label>
        <input
          type="text"
          id="bookedby"
          name="bookedby"
          value={formData.bookedby || "you can't edit"}
          onChange={handleChange}
          className="form-control"
          readOnly
        />
      </div>

      <button type="submit" className="btn btn-outline-success">
        Submit
      </button>
    </form>
  );
};

export default RoomForm;
