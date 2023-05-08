import React, { useState } from "react";

import axios from "axios";



import("./Login.css");

function AdminLogin() {
  const [admin, setAdmin] = useState({});
  console.log("admin",admin)
  
  const handleChange=(e)=>{
setAdmin({...admin,[e.target.name]:e.target.value})
  }

  
  const handleLogin =async()=>{
await axios
  .post("http://localhost:3001/admin/login", admin)
  .then((res) => {
    console.log(res);
    if(res.status){

    }
  })
  .catch((err) => {
    console.dir(err);
  });
      

  } 
  

  return (
   
      <div className="authcontainer">
      <form onChange={(e)=>{handleChange(e)}}>
        <h2>Login</h2>
        <div>
          <label htmlFor="username">Email:</label>
          <input
            type="email"
            placeholder="Email"
            id="email"
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            placeholder="Password"
            id="password"
          />
        </div>
        <button type="submit" onClick={()=>{handleLogin()}} >Login</button>
      </form>
    </div>
  );
}

export default AdminLogin;
