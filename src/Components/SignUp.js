import { useState } from "react";
import React from 'react';
import '../App.css';
import { Link } from "react-router-dom";

const SignUp = () => {

  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, cpassword } = credentials;
    if (password !== cpassword) {
      console.error("Password and confirm password do not match.");
      return; // Don't proceed with submission
    }

    try {
      const response = await fetch('http://localhost:5000/api/auths/newuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });

      // if (!response.ok) {
      //     throw new Error('Failed to login');
      // }

      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.error('Error Signing in:', error.message);
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  return (
    <div>
      <div className="Signcontainer">
        <div className="form_area">
          <p className="title">SIGN UP</p>
          <form onSubmit={handleSubmit}>
            <div className="form_group">
              <label className="sub_title" htmlFor="name">Name</label>
              <input
                placeholder="Enter your full name"
                className="form_style"
                type="text"
                id="name"
                name="name"
                value={credentials.name}
                onChange={onChange}
              />
            </div>
            <div className="form_group">
              <label className="sub_title" htmlFor="email">Email</label>
              <input
                placeholder="Enter your email"
                className="form_style"
                type="email"
                id="email"
                name="email"
                value={credentials.email}
                onChange={onChange}
              />
            </div>
            <div className="form_group">
              <label className="sub_title" htmlFor="password">Password</label>
              <input
                placeholder="Enter your password"
                className="form_style"
                type="password"
                id="password"
                name="password"
                value={credentials.password}
                onChange={onChange}
                minLength={6}
                required
              />
            </div>
            <div className="form_group">
              <label className="sub_title" htmlFor="cpassword">Confirm Password</label>
              <input
                placeholder="Confirm your password"
                className="form_style"
                type="password"
                id="cpassword"
                name="cpassword"
                value={credentials.cpassword}
                onChange={onChange}
                minLength={6}
                required
              />
            </div>
            <div>
              <button type="submit" className="btnform">SIGN UP</button>
              <p>Have an Account? <Link className="link" to="/login">Login Here!</Link></p>
            </div>
          </form>
        </div>
      </div>

    </div>
  );
}

export default SignUp;
