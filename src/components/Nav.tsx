import React from "react";
import {Link} from "react-router-dom";

interface NavProps {
    name: string
}

const Nav: React.FC <NavProps> = props => {
    // const logout = async () => {
    //     await fetch('http://localhost:8000/api/logout', {
    //         method: 'POST',
    //         headers: {'Content-Type': 'application/json'},
    //         credentials: 'include'
    //     })
    // }
    // let menu;

    // if (props.name === undefined) {
    //     menu = (
    //         <ul className="navbar-nav me-auto mb-2 mb-md-0">
    //             <li className="nav-item">
    //                 <Link to="/login" className="nav-link active">Login</Link>
    //             </li>
    //             <li className="nav-item">
    //                 <Link to="/register" className="nav-link active">Register</Link>
    //             </li>
    //         </ul>
    //     )
    // }
    // else {
    //     menu = (
    //         <ul className="navbar-nav me-auto mb-2 mb-md-0">
    //             <li className="nav-item">
    //                 <Link to="/login" className="nav-link active" onClick={logout}>Logout</Link>
    //             </li>
    //         </ul>
    //     )
    // }
    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">Home</Link>
                <Link to="/payments" className="navbar-brand">Payments</Link>
                <Link to="/purchases" className="navbar-brand">Purchases</Link>
                <Link to="/farmers" className="navbar-brand">Farmers</Link>
                <Link to="/users" className="navbar-brand">Users</Link>
                <div>
                    <Link to="/login" className="navbar-brand">Login</Link>
                    <Link to="/register" className="navbar-brand">SignUp</Link>
                </div>
            </div>
        </nav>
    );
};

export default Nav;