import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import("./Navbar.css");


function DoctorNavbar() {

    const [cookies, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();
    
    const Logout = () => {
      setCookies("access_token", "");
      window.localStorage.clear();
      navigate("/auth");
    };

  return (
    <div className="navbar">
      <div className="logo">My Diet</div>
      <div>
        <Link to="/" className="navlink">
          Home
        </Link>
      </div>
      <div>
        <Link to="doctor/CreateDiet" className="navlink">
          Create New Diet
        </Link>
      </div>
      <div>
        <Link to="doctor/diets" className="navlink">
          Show Diets
        </Link>
      </div>
      <div>
        <Link to="doctor/diets/savedDiets" className="navlink">
          Saved Diets
        </Link>
      </div>
      <div>
        <button onClick={Logout} className="logout">
          Logout
        </button>
      </div>
    </div>
  );
}

export default DoctorNavbar;
