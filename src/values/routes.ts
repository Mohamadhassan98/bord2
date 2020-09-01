import HomePage from "../pages/HomePage";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import React from "react";
import {RouteComponentProps} from "react-router";
import ForgotPassword from "../pages/ForgotPassword";
import ProfilePage from "../pages/ProfilePage";
import EditProfile from "../pages/EditProfile";
import RecoverPassword from "../pages/RecoverPassword";
import GamePage from "../pages/GamePage";
import Error500 from "../pages/500";
import GamePlay from "../pages/GamePlay";

export const routes = {
    home: "/",
    login: "/login",
    signUp: "/sign-up",
    forgotPassword: "/forgot",
    profile: "/profile",
    editProfile: "/profile/edit",
    recover: "/recover/:uid/:token",
};

interface RoutingType {
    path: string;
    component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
    exact?: boolean;
    header?: boolean;
    protected: false | "public" | "private";
    redirect?: string;
}

export const routing: {[k: string]: RoutingType} = {
    home: {
        path: "/",
        component: HomePage,
        exact: true,
        header: true,
        protected: false,
    },
    login: {
        path: "/login",
        component: Login,
        exact: true,
        header: true,
        protected: "public",
        redirect: "/profile",
    },
    signUp: {
        path: "/sign-up",
        component: SignUp,
        exact: true,
        header: true,
        protected: "public",
        redirect: "/profile",
    },
    forgotPassword: {
        path: "/forgot",
        component: ForgotPassword,
        exact: true,
        header: true,
        protected: "public",
        redirect: "/profile",
    },
    profile: {
        path: "/profile",
        component: ProfilePage,
        exact: true,
        header: true,
        protected: "private",
        redirect: "/login",
    },
    editProfile: {
        path: "/profile/edit",
        component: EditProfile,
        exact: true,
        header: true,
        protected: "private",
        redirect: "/login",
    },
    recover: {
        path: "/recover/:uid/:token",
        component: RecoverPassword,
        exact: false,
        header: false,
        protected: false,
    },
    game: {
        path: "/game/:id",
        component: GamePage,
        exact: true,
        header: true,
        protected: false,
    },
    gamePlay: {
        path: "/game/:id/play",
        component: GamePlay,
        exact: true,
        header: false,
        protected: "private",
    },
    error500: {
        path: "/500",
        component: Error500,
        protected: false,
        header: false,
        exact: true,
    },
};
