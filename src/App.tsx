import React, {useState} from "react";
import "./App.css";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Error4041 from "./pages/404";
import Error4042 from "./pages/another404";
import ForgotPassword from "./pages/ForgotPassword";
import {routes} from "./values/routes";
import RecoverPassword from "./pages/RecoverPassword";

function App() {
    const [isLoggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));
    // axios
    //     .get(getPath("gameList"), {
    //         headers: {
    //             authorize:
    //                 "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImFkbWluIiwiZXhwIjoxNTk4NDMyNDE4LCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSJ9.t7i1-AGonaRhm53IZReM1yFmWTL51aMz7bXN8OThm8M",
    //         },
    //     })
    //     .then((result) => console.log(result))
    //     .catch((reason) => console.log(reason));
    return (
        <BrowserRouter>
            <Switch>
                <Route path={routes.login} component={Login} />
                <Route path={routes.signUp} component={SignUp} />
                <Route path={routes.forgotPassword} component={ForgotPassword} />
                <Route path={routes.recover} component={RecoverPassword} />
                <Route path='/404' component={Error4042} />
                <Route component={Error4041} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
