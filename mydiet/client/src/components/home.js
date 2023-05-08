import React , {useState,useEffect}from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';


import ("./home.css")

function Home() {
  const [diets,setDiets]=useState([])
  //console.log(diets)
   const navigate = useNavigate();
   
  useEffect(() => {
    axios
      .get("http://localhost:3001/public/diets")
      .then((res) => {
        setDiets(res.data);
      })
      .catch((err) => {
        console.dir(err);
      });
  }, [])
  
const Register = () => {
  alert(" You are not member! You should login" )
  navigate("/");
};
  
  return (
    <div className="cardDiet">
      {diets.map((diet) => (
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
            <button
              className="link"
              onClick={Register}
            >
             Save
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}


export default Home

 
  




