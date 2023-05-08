
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Home from "./components/home.js";
import Auth from "./user/authUser.jsx";
import CreateDiet from "./components/doctor/createDiet.js";
import { SavedDiets} from "./components/doctor/savedDiets.js"
import PublicNavbar from "./components/navbar/PublicNavbar.js";
import AuthDoctor from "./components/doctor/authDoctor.js";
import PrivedRoutes from "./components/routes/PrivedRoutes.jsx";
import AuthRoutes from "./components/routes/AuthRoutes.jsx";
import AdminLogin from "./components/admin/AdminLogin.js";
import "./App.css"
import {Diets} from "./components/doctor/diets.jsx";
import PublicLayout from "./components/layout/PublicLayout.jsx";
import DoctorLayout from "./components/layout/DoctorLayout.jsx";
import ("./App.css")


function App() {
  return (
    <div className="body">
      <Router>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/authDoctor" element={<AuthDoctor />} />
          </Route>
          <Route element={<DoctorLayout />}>
            <Route path="doctor/createDiet" element={<CreateDiet />} />
            <Route
              path="doctor/diets"
              element={<Diets />}/>

            <Route path="doctor/diets/savedDiets" element={<SavedDiets />} />
          </Route>

          <Route path="/admin/login" element={<AdminLogin />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
