import React, { useState } from "react";
import '../App.css';
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
  const navigate = useNavigate(); // Initialize navigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, cpassword } = credentials;
    if (password !== cpassword) {
      console.error("Password and confirm password do not match.");
      return; // Don't proceed with submission
    }

    try {
      const response = await fetch(`${window.location.origin}/api/auths/newuser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });

      // if (response.ok) {
      //   // Redirect to dashboard after successful sign-up
      //   navigate('/');
      // } else {
      //   // Handle error cases
      //   const data = await response.json();
      //   throw new Error(data.message);
      // }
      if (!response.ok) {
        throw new Error('Failed to Sign In');
      }

      const data = await response.json();
      console.log('Signed In successful:', data);

      // Redirect to a different page after successful login
      if (data.success) {
        localStorage.setItem('token', data.authtoken);
        navigate('/');
      } else {
        alert("Invalid credentials");
      }

    } catch (error) {
      console.error('Error Signing in:', error.message);
      // Handle error cases, such as displaying an alert to the user
      alert("Failed to sign up: " + error.message);
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
