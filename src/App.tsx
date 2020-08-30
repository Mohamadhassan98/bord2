import React from "react";
import "./App.css";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Error4041 from "./pages/another404";
import {routing} from "./values/routes";
import ProtectedRoute from "./utils/ProtectedRoute";
import MainLayout from "./layouts/MainLayout";

export default function () {
    const props = {} as any;
    return (
        <BrowserRouter>
            <Switch>
                {Object.values(routing).map(({exact, header, redirect, path, protected: protection, component: C}) =>
                    protection ? (
                        <ProtectedRoute
                            exact={exact}
                            shouldNotLoggedIn={protection === "public"}
                            path={path}
                            redirectTo={redirect}
                            key={path}
                        >
                            <MainLayout header={header}>
                                <C {...props} />
                            </MainLayout>
                        </ProtectedRoute>
                    ) : (
                        <Route exact={exact} path={path} key={path}>
                            <MainLayout header={header}>
                                <C {...props} />
                            </MainLayout>
                        </Route>
                    )
                )}
                <Route component={Error4041} />
            </Switch>
        </BrowserRouter>
    );
}
