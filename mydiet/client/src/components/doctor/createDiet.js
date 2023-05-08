import React from 'react'
import axios from "axios";
import { useState } from "react";
import {useGetUserID} from "../../hooks/useGetUserID";
import {useNavigate} from "react-router-dom";
import { useCookies } from "react-cookie";
import("./createDiet.css");

function CreateDiet() {
 const doctorID = localStorage.getItem("doctorID");
  const [cookies, _] = useCookies(["access_token"]);
  const [diet, setDiet] = useState({
    name: "",
    breakfast: [],
    lunch: [],
    dinner: [],
    DailyTotalsCaloris:[],
    doctorOwner: doctorID,
  });
  const navigate=useNavigate()


  const handleChange = (event) => {
    const { name, value } = event.target;
    setDiet({ ...diet, [name]: value });
  };

  const onHandleSubmit= async(event)=>{
    event.preventDefault();
    try {
   const response=await axios.post("http://localhost:3001/doctor/createDiet", diet, {
     headers: { Authorization: cookies.access_token },
     
   });
   console.log(response);
   alert("Diet has been created successfully")
     navigate("/doctor/diets") 
    } catch (err) {
      console.log(err)
    }

  


}
  return (
    <div className="create-diet">
      <h2>Create a diet</h2>
      <form onSubmit={onHandleSubmit} className="form">
        <div>
          <label htmlFor="name"> Name</label>
          <input
            className="inp"
            type="text"
            id="name"
            name="name"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="breakfast">Breakfast </label>
          <input
            type="text"
            id="breakfast"
            name="breakfast"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="lunch">Lunch</label>
          <input type="text" id="lunch" name="lunch" onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="dinner"> Dinner</label>
          <input
            className="inp"
            type="text"
            id="dinner"
            name="dinner"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="DailyTotalsCaloris"> Daily Totals Caloris</label>
          <input
            className="inp"
            type="text"
            id="DailyTotalsCaloris"
            name="DailyTotalsCaloris"
            onChange={handleChange}
          />
        </div>

        <div style={{ paddingTop: 20 }}>
          <label htmlFor="imageUrl">Photo</label>
          <input
            className="inp"
            type="text"
            id="imageUrl"
            name="imageUrl"
            onChange={handleChange}
          />
        </div>
        <di style={{ paddingTop: 20 }}>
          <button style={{ marginLeft: "500px" }} type="submit">
            Save
          </button>
        </di>
      </form>
    </div>
  );
}

export default CreateDiet
