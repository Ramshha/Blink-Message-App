import React, { useState } from "react";
import { auth, signInWithEmailAndPassword } from '../../../FirebaseConfig';
import { useNavigate } from "react-router-dom";
import './Authentication.css';

const LoginPage = ({ toggleView }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {

      // checking for empty input fields
      if (!email || !password) {
        setError("Email and password are required.");
        return;
      }
      setError("");

      const userCredential = await signInWithEmailAndPassword( auth, email, password);
      
        navigateTo("/home");

    } catch (error) {
      // dispaly errors based on different conditions
      if (error.code === "auth/invalid-credential" || error.code === "auth/wrong-password") {
        setError("Incorrect email or password.");
      } else if (error.code === "auth/user-not-found") {
        setError("User does not exist. Please Signup.");
      } else {
        setError("Failed to login. Please try again later.");
      }
      console.error(error);
    }

  };

  // storing email value
  const handleEmail = (e) => {
    e.preventDefault();

    setEmail(e.target.value);
    setError("");
  };
  
  // storing password value
  const handlePassword = (e) => {
    e.preventDefault();

    setPassword(e.target.value);
    setError("");
  };

  return (
    <section className="auth-box p-5 shadow-lg rounded col-2.5 shadow-lg">
      
      <h1 className="text-center">Login User</h1>
      {error && <p className="text-danger">{error}</p>}

      <div className="form-group mb-4">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" className="form-control" onChange={handleEmail} placeholder="Enter your email" required />
      </div>

      <div className="form-group mb-4">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" className="form-control" onChange={handlePassword} placeholder="Enter your password" required />
      </div>
      <button className="btn w-100" onClick={handleLogin}>Login</button>
      <p className="text-center mt-3">Don't have an account yet? <a href="#" onClick={toggleView}><span className="text-danger">Register</span></a></p>
    
    </section>
  );
};

export default LoginPage;