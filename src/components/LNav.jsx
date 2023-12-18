import "../css/Nav.css";
import img from "../assets/logo.png";
import { Link } from "react-router-dom";
function LNav() {
  function signOut() {
    localStorage.clear();
    window.location.href = "/";
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <a className="navbar-brand" href="#">
        <img
          src={img}
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt=""
        />
        Booking.com
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className="collapse navbar-collapse navbar-expand-lg navbar-expand-md"
        id="navbarSupportedContent"
      >
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <button className="btn btn-light" onClick={signOut}>
              <Link className="link" to="/login">
                Sign-Out
              </Link>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default LNav;
