import React, {SyntheticEvent, useState} from "react";
import {Navigate} from "react-router-dom";

interface RegisterProps {

}

const Register: React.FC <RegisterProps> =props => {
    const [name, setName] = useState('')
    const [email_address, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [redirect, setRedirect] = useState(false)

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault()

        const  response = await fetch('http://localhost:8080/v1/users', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                name,
                email_address,
                password
            })
        });
        const content = await response.json()

        console.log("Submit button hit")
        if (response.status === 201) {
            setRedirect(true)
        }
        else {
            console.log('Http error:', response.status)
            setRedirect(false)
            alert(content.error)
        }
    };


    if (redirect) {
        return<Navigate to="/login"/>
    }
    return (
        <form onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal">Create Account</h1>

            <input className="form-control" placeholder="Name"
                onChange={e =>setName(e.target.value)}
            />

            <input type="email" className="form-control" placeholder="Email"
                onChange={e=>setEmail(e.target.value)}
            />
            <input type="password" className="form-control" placeholder="Password"
            onChange={e=>setPassword(e.target.value)}
            />

            <button className="btn btn-primary w-100 py-2" type="submit">Submit</button>
        </form>
    )
}

export default Register;