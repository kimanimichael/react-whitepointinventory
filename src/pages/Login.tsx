import React, {SyntheticEvent, useState} from "react";
import {Navigate} from "react-router-dom";
import {BASE_URL} from "../config";

interface LoginProps {
    setName: (name: string) =>void;
}

const Login: React.FC <LoginProps> = props => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [redirect, setRedirect] = useState(false)

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault()

        const response = await fetch(`${BASE_URL}/whitepoint/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                email,
                password
            })
        })
        const content = await response.json()
        if (response.status < 400) {
            console.log("Login success. Code: ", response.status)
            setRedirect(true)
            props.setName('')
        }
        else  {
            console.log("Login failed. Error: ", response.status)
            alert(content.error)
            setRedirect(false)
        }
    }
    if (redirect) {
        return <Navigate to="/"/>
    }
    return (
        <form onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal">Login</h1>
            <input type="email" className="form-control" placeholder="Email"
                onChange={e=>setEmail(e.target.value)}
            />
            <input type="password" className="form-control" placeholder="password"
                onChange={e=>setPassword(e.target.value)}
            />
            <button className="btn btn-primary w-100 py-2" type="submit">Submit</button>
        </form>
    )
}

export default Login;