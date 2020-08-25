import React from "react";
import "./App.css";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Error4041 from "./pages/404";
import Error4042 from "./pages/another404";

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/login' component={Login} />
                <Route path='/sign-up' component={SignUp} />
                <Route path='/404' component={Error4042} />
                <Route component={Error4041} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
