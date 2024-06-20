import React from "react";
import {Link} from "react-router-dom";

interface NavProps {
    name: string
    setName: (name: string) => void
}

const Nav: React.FC <NavProps> = props => {
    const logout = async () => {
        await fetch('http://localhost:8080/v1/logout', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        })
        props.setName('')
        console.log('Logout button hit')
    }

    let menu;
    if (props.name === undefined) {
        menu = (
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">Home</Link>
                <div>
                    <Link to="/login" className="navbar-brand">Login</Link>
                    <Link to="/register" className="navbar-brand">SignUp</Link>
                </div>
            </div>
        )
    } else {
        menu = (
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">Home</Link>
                <Link to="/payments" className="navbar-brand">Payments</Link>
                <Link to="/purchases" className="navbar-brand">Purchases</Link>
                <Link to="/farmers" className="navbar-brand">Farmers</Link>

                <div>
                    <Link to="/users" className="navbar-brand">Users</Link>
                    <Link to="/login" className="navbar-brand" onClick={logout}>Logout</Link>
                </div>
            </div>
        )
    }

    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
            {menu}
        </nav>
    );
};

export default Nav;