
import {Link} from "react-router-dom";

import ("./Navbar.css")


function PublicNavbar() {
  


  return (
    <div className="navbar">
      <div className="logo">My Diet</div>
      <div>
      <Link to="/" className="navlink">
        Home
      </Link>
      </div>
      <div>
       <Link to="/auth" className="navlink">
          Login/Register
        </Link>
        </div>
        <div>
        <Link to="/authDoctor" className="navlink">
          Are you Doctor
        </Link>
    </div>
    </div>
  );
  }

export default PublicNavbar
