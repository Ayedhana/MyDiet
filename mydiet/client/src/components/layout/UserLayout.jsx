import { Link } from "react-router-dom";

import("./Navbar.css");

function UserNavbar() {
  return (
    <div className="navbar">
      <div className="logo">My Diet</div>
      <div>
        <Link to="/" className="navlink">
          Home
        </Link>
      </div>
      <div>
        <Link to="/diets" className="navlink">
          Diets
        </Link>
      </div>
      <div>
        <Link to="/savedDiets" className="navlink">
          Are you Doctor
        </Link>
      </div>
    </div>
  );
}

export default UserNavbar;
