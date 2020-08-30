import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import {ThemeProvider} from "@material-ui/styles";
import theme from "./values/theme";
import RTL from "./utils/RTL";
import "@brainhubeu/react-carousel/lib/style.css";
import {AuthProvider} from "./contexts/AuthContext";

const Index = () => {
    return (
        <AuthProvider>
            <ThemeProvider theme={theme}>
                <RTL>
                    <App />
                </RTL>
            </ThemeProvider>
        </AuthProvider>
    );
};

ReactDOM.render(
    <React.StrictMode>
        <Index />
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
