import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import("./Navbar.css");

function PublicNavbar() {
  // const token = localStorage.getItem("token");
  // const isUser = localStorage.getItem("isUser");
  // const isDoctor = localStorage.getItem("isDoctor");
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  
 
  const LogoutDoctor = () => {
    setCookies("access_token", "");
    window.localStorage.clear();
    navigate("/authDoctor");
  };
  return (
    <div className="navbar">
      <div className="logo">My Diet</div>
      <Link to="/" className="navlink">
        Home
      </Link>
     
        <Link to="/diets" className="navlink">
          Diets
        </Link>
     

        <Link to="/createDiet" className="navlink">
          Create Diet
        </Link>
     
        <Link to="/diets" className="navlink">
           show Diets
        </Link>
     
        <div> 
          <button onClick={LogoutDoctor} className="logout">
            Logout 
          </button>
          <Link to="/savedDiets" className="navlink">
            saved Diet
          </Link>
        </div>
     
    </div>
  );
}

export default PublicNavbar;
