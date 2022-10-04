import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logout = e => {
        dispatch({ type: 'LogOut' })
        navigate("/");
    }

    const state = useSelector((state) => state);

    console.log("LoggedIn ", state.loggedin.IsLoggedIn)

    const isadmin = state.loggedin.IsLoggedIn && sessionStorage.getItem("role") === "Admin" ? true : false;

    const isowner = state.loggedin.IsLoggedIn && sessionStorage.getItem("role") === "CareTaker" ? true : false;

    const isuser = state.loggedin.IsLoggedIn && sessionStorage.getItem("role") === "Customer" ? true : false;

    const profile = isowner ? "/oprofile" : (isuser ? "/uprofile" : "/")

    var menuFlex = () => {

        var val = document.getElementById("navbarNav").getAttribute("class");
        if (val == "collapse navbar-collapse") {
            document.getElementById("navbarNav").setAttribute("class", "d-block")
            document.getElementById("menu").style.position = 'absolute';
            document.getElementById("menu").style.top = '100px';
            document.getElementById("menu").style.left = '0px';
            document.getElementById("caretitle").style.position = 'absolute';
            document.getElementById("caretitle").style.top = '0px';
            document.getElementById("caretitle").style.left = '0px';
        } else {
            document.getElementById("navbarNav").setAttribute("class", "collapse navbar-collapse")
            document.getElementById("menu").style.position = 'static';
            document.getElementById("caretitle").style.position = 'static';
        }
    }

    return (

        <div>
            <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-info bg-gradient text-black fw-bold opacity-75">
                <div className="container-fluid">
                    <Link className="navbar-brand" id="caretitle" to="/">Oldster Care</Link>
                    <button className="navbar-toggler menu" onClick={menuFlex}>
                        <span className="navbar-toggler-icon" id="menu"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            {isadmin ? (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to="/aservices">Services</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to="/owners">Care Takers</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to="/customers">Customers</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to="/ongoing">Paid Bookings</Link>
                                    </li>
                                </>
                            ) : ""}
                            {isowner ? (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to="/mybookings" >Bookings</Link>
                                    </li>
                                </>
                            ) : ""}
                            {isuser ? (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to="/mybookings">Bookings</Link>
                                    </li>
                                </>
                            ) : ""}
                            {!state.loggedin.IsLoggedIn ? (<>
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/services">Services</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/admin">Admin Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/cregister">User Register</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" to="/oregister">Caretaker Register</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" to="/team">Contact Us</Link>
                                </li>
                            </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to="/services">Services</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={profile} className="nav-link active" aria-current="page">Hi! {state.loggedin.Username}</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/login" className="nav-link active" aria-current="page" onClick={logout}>Logout</Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

