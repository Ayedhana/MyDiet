import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import("./Navbar.css");

function PublicNavbar() {
  const token = localStorage.getItem("token");
  const isUser = localStorage.getItem("isUser");
  const isDoctor = localStorage.getItem("isDoctor");
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
      <Link to="/" className="navlink">
        Home
      </Link>
      {cookies.access_token ? (
        <Link to="/diets" className="navlink">
          Diets
        </Link>
      ) : null}

      {!token ? (
        <Link to="/auth" className="navlink">
          Login/Register
        </Link>
      ) : (
        <div>
          <Link to="/savedDiets" className="navlink">
            saved Diets
          </Link>{" "}
          <button onClick={Logout} className="logout">
            Logout
          </button>
        </div>
      )}
      
    </div>
  );
}

export default PublicNavbar;
