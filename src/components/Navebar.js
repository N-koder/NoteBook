import React  from 'react';
import {Link , useLocation, useNavigate}  from "react-router-dom";
import Logo1 from '../components/Logo1'
const Navebar = () => {
        let history  = useNavigate();
        const handleLOGOUT = () => {
            localStorage.removeItem('token');
            history("/login");
        }
        let location = useLocation();
        return (
        <>

            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        <Logo1/> 
                    </Link>
                    <Link className="navbar-brand" to="/">
                    Note-Book
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className ={`nav-link ${location.pathname === "/"?`active`:``}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className ={`nav-link ${location.pathname === "/about"?`active`:``}`} to="/about">About</Link>
                            </li>
                        </ul>
                      {!localStorage.getItem('token')?<form className="d-flex" role="search">
                            {/* <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                                <button className="btn btn-success mx-3" type="submit">Search</button> */}
                                <Link className="btn btn-danger mx-3" to = "/login" role= "button">LogIN</Link>
                                <Link className="btn btn-danger mx-3" to =  "/signup" role= "button">SignUP</Link>
                        </form>:<button className="btn btn-danger mx-3" onClick = {handleLOGOUT} >LogOUT</button> }
                    </div>
                </div>
            </nav>


        </>
    )
}

export default Navebar