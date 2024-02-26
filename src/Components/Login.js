import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/auths/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: credentials.email, password: credentials.password })
            });

            if (!response.ok) {
                throw new Error('Failed to login');
            }

            const data = await response.json();
            console.log('Login successful:', data);

            // Redirect to a different page after successful login
            if (data.success) {
                localStorage.setItem('token', data.authtoken);
                navigate('/');
            } else {
                alert("Invalid credentials");
            }
        } catch (error) {
            console.error('Error logging in:', error.message);
        }
    }

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    return (
        <div className="Signcontainer">
            <div className="form_area">
                <p className="title">LOGIN</p>
                <form onSubmit={handleSubmit}>
                    <div className="form_group">
                        <label className="sub_title" htmlFor="email">Email address</label>
                        <input
                            type="email"
                            className="form_style"
                            id="email"
                            name="email"
                            value={credentials.email}
                            onChange={handleChange}
                            aria-describedby="emailHelp"
                            placeholder="Enter email"
                            required
                        />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form_group">
                        <label className="sub_title" htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form_style"
                            id="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                            placeholder="Password"
                            required
                        />
                    </div>
                    <div className="my-3">
                        <button type="submit" className="btnform">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
