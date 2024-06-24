import React, {useEffect, useState} from 'react';


import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Purchases from "./pages/Purchases";

const App: React.FC = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect( () => {
        (
            async () => {
                const response = await fetch('http://localhost:8080/v1/users', {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include'
                })
                const content = await response.json()
                setName(content.Name)
                setEmail(content.Email)
                setPassword(content.Password)
            }
        )()
    })

    return (
      <div className="App">
          <Router>
              <Nav name={name} setName={setName} />
              <main className="form-signin w-100 m-auto">
                  <Routes>
                      <Route path="/" element={<Home name={name}/>}/>
                      <Route path="/register" element={<Register/>}/>
                      <Route path="/login" element={<Login setName={setName}/>}/>

                  </Routes>
              </main>
              <div className="Purchase">
                  <Routes>
                      <Route path="/purchases" element={<Purchases email={email} password={password} />}/>
                  </Routes>
              </div>
          </Router>

      </div>
    );
}

export default App;
