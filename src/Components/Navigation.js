import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';


const Navigation = () => {
    let location = useLocation();
    const navigate = useNavigate();

    const handlelogout=()=>{
        localStorage.removeItem('token');
        navigate('/login')

    }

    React.useEffect(() => {
        console.log(location.pathname);
    }, [location]);
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Navbar</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/Homie" ? "active" : ""}`} to="/Homie">Homie</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/AboutUS" ? "active" : ""}`} to="/AboutUS">AboutUS</Link>
                        </li>
                    </ul>
                    {!localStorage.getItem('token')?<form className="d-flex" role="search">
                        <Link className="button-74" to="/login" role="button">Login</Link>
                        <Link className="button-74" to="/signup" role="button">SignUp</Link>
                    </form> : <button onClick={handlelogout} type="button" className="button-74">LogOut</button> }
                </div>
            </div>
        </nav>
    );
}

export default Navigation;
