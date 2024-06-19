import React from 'react';


import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import Register from "./pages/Register";

const App: React.FC = () => {
  return (
      <div className="App">
          <Router>
              <Nav />
              <main className="form-signin w-100 m-auto">
                  <Routes>
                      <Route path="/" element={<Home/>}/>
                      <Route path="/register" element={<Register/>}/>
                  </Routes>
              </main>
          </Router>

      </div>
  );
}

export default App;
