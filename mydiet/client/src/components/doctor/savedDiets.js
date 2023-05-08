import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import "../home.css";

export const SavedDiets = () => {
  const [savedDiets, setSavedDiets] = useState([]);
  console.log(savedDiets)
  
   const doctorID = localStorage.getItem("doctorID");
   

  useEffect(() => {
    
    const fetchSavedDiet = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/doctor/diets/savedDiets/${doctorID}`
        );
        setSavedDiets(response.data.savedDiets);
        console.log(response.data.savedDiets);
        
      } catch (err) {
        console.error(err);
      }
    };
     fetchSavedDiet();
  }, []);


  return (
    <div className="cardDiet">
      {savedDiets.map((diet) => (
        <div class="card" key={diet._id}>
          <img src={diet.imageUrl} />
          <div class="card-body">
            <h5 class="card-title">{diet.name}</h5>
            <ul>
              <li>
                <span>Breakfast:</span>
                {diet.breakfast}
              </li>
              <li>
                <span>Lunch:</span>
                {diet.lunch}
              </li>
              <li>
                <span>Dinner:</span>
                {diet.dinner}
              </li>
            </ul>
            <p>
              <span>Daily Totals Caloris:</span>
              {diet.DailyTotalsCaloris}
              <span>(Calories)</span>
            </p>
            <button style={{marginLeft:"700px"}}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};
