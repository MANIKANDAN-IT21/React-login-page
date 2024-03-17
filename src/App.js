import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom'; // Import BrowserRouter
import "./App.css";

function App() {
  const history = useHistory();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      history.push("/add");
    }
  }, [history]); // Make sure to include `history` in the dependency array

  async function login() {
    try {
      console.warn(Email, Password);
      let item = { Email, Password };
      let result = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(item),
      });

      if (!result.ok) {
        throw new Error(`HTTP error! Status: ${result.status}`);
      }

      result = await result.json();
      localStorage.setItem("user-info", JSON.stringify(result));
      // history.push(); // You need to specify the route here for redirection
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }

  return (
    <div className="App">
      <h1>Login-Form</h1>
      <label>
        <h3>Email</h3>
        <input
          className=""
          type="text"
          placeholder="mani@gmail.com"
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <h3>Password</h3>
        <input
          className=""
          type="password"
          placeholder="!@234ABC"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <br></br>
        <button onClick={login}>Login</button>
      </label>
    </div>
  );
}

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default AppWrapper; // Render the App component wrapped with BrowserRouter
