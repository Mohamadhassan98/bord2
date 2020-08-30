import React, {useContext} from "react";
import axios from "axios";
import {getPath} from "../values/connection";
import {User} from "../types/types";

export interface AuthContextShape {
    isLoggedIn: boolean;
    user: User | null;
    token: string | null;
    login: (response: {user: User; token: string}) => void;
    logout: () => void;
    updateUser: (user: User) => void;
}

const AuthContext = React.createContext<AuthContextShape>({
    isLoggedIn: false,
    user: null,
    token: null,
    logout: () => {},
    login: () => {},
    updateUser: () => {},
});

export function AuthProvider({children}: {children: React.ReactElement}) {
    const initialUser = {
        id: 0,
        avatar_detail: JSON.parse(localStorage.getItem("avatar") || '""'),
        username: localStorage.getItem("username") || "",
        email: localStorage.getItem("email") || "",
        games: [],
    };
    const [user, setUser] = React.useState<User | null>(initialUser.username !== "" ? initialUser : null);
    const [token, setToken] = React.useState<string | null>(localStorage.getItem("token"));
    const isLoggedIn = !!token;
    React.useEffect(() => {
        const currentToken = localStorage.getItem("token");
        if (currentToken) {
            axios.defaults.headers["Authorization"] = `Token ${currentToken}`;
            axios
                .get<User>(getPath("currentUser"))
                .then(({data}) => {
                    setToken(currentToken);
                    setUser(data);
                })
                .catch(() => localStorage.clear());
        }
    }, []);
    const login = ({user, token}: {user: User; token: string}) => {
        axios.defaults.headers["Authorization"] = `Token ${token}`;
        setUser(user);
        const {email, username, avatar_detail: avatar} = user;
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
        localStorage.setItem("email", email);
        localStorage.setItem("avatar", JSON.stringify(avatar));
    };
    const updateUser = (user: User) => {
        setUser(user);
        const {email, username, avatar_detail: avatar} = user;
        localStorage.setItem("username", username);
        localStorage.setItem("email", email);
        localStorage.setItem("avatar", JSON.stringify(avatar));
    };
    const logout = () => {
        axios
            .post(getPath("logout"), {})
            .then(() => {
                setUser(null);
                setToken(null);
                localStorage.clear();
            })
            .catch((error) => console.error(error));
    };
    return (
        <AuthContext.Provider value={{isLoggedIn, login, logout, token, user, updateUser}}>
            {children}
        </AuthContext.Provider>
    );
}

export const AuthConsumer = AuthContext.Consumer;

export default function useAuth() {
    return useContext(AuthContext);
}
