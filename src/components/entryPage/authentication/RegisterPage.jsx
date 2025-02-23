import React, { useState } from "react";
import { auth, createUserWithEmailAndPassword, database, ref, set } from "../../../FirebaseConfig";
import './Authentication.css';

const RegisterPage = ({ toggleView }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // checking for empty input fields
      if (!email || !password || !fullName) {
        setSuccess(false)
        setMessage("All fields are required.");
        return;
      } 
      setMessage("")

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userUid = userCredential.user.uid;

      //referencing database to store user credentials
      await set(ref(database, 'users/' + userUid), {
        fullName: fullName,
        email: email,
        notifications: [],
      });

      setSuccess(true);
      setMessage("User registered successfully");

      ["fullName", "email", "password"].forEach((id) =>
        document.getElementById(id).value = "")

    // dispaly errors based on different conditions
    } catch (error) {
      setSuccess(false)
      if (error.code === "auth/email-already-in-use") {
        setMessage("The email address is already in use by another account.");
      } else if (error.code === "auth/invalid-email") {
        setMessage("Invalid email address format.");
      } else if (error.code === "auth/weak-password"){
        setMessage("Password must be at least 6 characters long.");
      } else {
        setMessage("Failed to register. Please try again later.");
      }

      console.error(error);
    }
    // clearing errors
    setEmail("");
    setFullName("")
    setPassword("")

    }

  // storing email value
  const handleEmail = (e) => {
    e.preventDefault();

    setEmail(e.target.value);
    setMessage("");
  };

  // storing password value
  const handlePassword = (e) => {
    e.preventDefault();

    setPassword(e.target.value);
    setMessage("");
  };

  // storing name value
  const handleFullName = (e) => {
    e.preventDefault();

    setFullName(e.target.value);
    setMessage("");
  };

  return (
    <section className="auth-box py-5 shadow-lg rounded col-2.5 register shadow-lg">

      <h1 className="text-center mb-3">Register User</h1>

      {message && <p className={success ? 'text-success' : 'text-danger'}>{message}</p>}

      <div className="form-group mb-4">
          <label htmlFor="fullName">Full name:</label>
          <input type="text" id="fullName" className="form-control" value={fullName} onChange={handleFullName} required placeholder="Enter your Name"/>
      </div>
      <div className="form-group mb-4">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" className="form-control" value={email} onChange={handleEmail} required placeholder="Enter your Email"/>
      </div>
      <div className="form-group mb-4">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" className="form-control" value={password} onChange={handlePassword} required placeholder="Enter your Password"/>
      </div>

      <button className="btn w-100" onClick={handleRegister}>Register</button>

      <p className="text-center mt-3">Already have an account? <a href="#" onClick={toggleView}><span className="text-danger">Login</span></a></p>

  </section>
  );
};
export default RegisterPage;