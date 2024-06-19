import React, {useState} from 'react';


import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import Register from "./pages/Register";
import Login from "./pages/Login";

const App: React.FC = () => {
    const [name, setName] = useState('')
    return (
      <div className="App">
          <Router>
              <Nav />
              <main className="form-signin w-100 m-auto">
                  <Routes>
                      <Route path="/" element={<Home/>}/>
                      <Route path="/register" element={<Register/>}/>
                      <Route path="/login" element={<Login setName={setName}/>}/>
                  </Routes>
              </main>
          </Router>

      </div>
    );
}

export default App;
