import { Link } from "react-router-dom";
import "../css/NotFound.css";

function NotFound() {
  return (
    <div className="nf">
      <h1 className="title">4Q4</h1>
      <p>
        click <Link to="/">here</Link> to stay on path{" "}
      </p>
    </div>
  );
}

export default NotFound;
