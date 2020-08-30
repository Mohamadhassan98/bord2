import React from "react";
import {Redirect, Route, RouteProps} from "react-router";
import {routes} from "../values/routes";
import useAuth from "../contexts/AuthContext";

export default function ({
    redirectTo = routes.login,
    shouldNotLoggedIn,
    ...rest
}: {
    redirectTo?: string;
    shouldNotLoggedIn?: boolean;
} & RouteProps) {
    const {isLoggedIn} = useAuth();
    if (isLoggedIn === !!shouldNotLoggedIn) {
        const renderComponent = ({location}: any) => (
            <Redirect
                to={{
                    pathname: redirectTo,
                    state: {from: location},
                }}
            />
        );
        return <Route {...rest} component={renderComponent} render={undefined} />;
    } else {
        return <Route {...rest} />;
    }
}
