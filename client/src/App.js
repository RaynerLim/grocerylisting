//Import react library and require react functionality
import React, {Fragment, useState, useEffect} from 'react';
import {BrowserRouter as Router, 
  Switch, 
  Route, 
  Redirect
} from "react-router-dom";

//Import css styling
import './App.css';

//Import components
import Listing from "./components/Listing";
import Login from "./components/Login";
import Register from "./components/Register";
import Add from "./components/AddItem";

//Import react-toast
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  async function isAuth(){
    try {
      const response = await fetch("http://localhost:5000/auth/is-verify",{
        method: "GET",
        headers: {token: localStorage.token}
      });

      const parseRes = await response.json()

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    isAuth()
  })

  return (
    <Fragment>
      <Router>
        
        <div className="container">
          <Switch>
            <Route exact path="/login" render={props => !isAuthenticated ? (<Login {...props} setAuth={setAuth} />) : (<Redirect to="/listing" />)} />
            <Route exact path="/register" render ={props => !isAuthenticated ? (<Register {...props} setAuth={setAuth}/>) : (<Redirect to="/login" />)} />
            <Route exact path="/listing" render ={props => isAuthenticated ? (<Listing {...props} setAuth={setAuth}/>) : (<Redirect to="/login" />)}/>
            <Route exact path="/add" render ={props => isAuthenticated ? (<Add {...props} setAuth={setAuth}/>) : (<Redirect to="/login" />)}/>
          </Switch>
        </div>

      </Router>
    </Fragment>
  );
}

export default App;
