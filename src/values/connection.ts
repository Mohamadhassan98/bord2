// export const serverBaseAddress = "http://192.168.1.3:8000/";
const paths = {
    login: "auth/login/",
    register: "auth/registration/",
    forgotPassword: "auth/password/reset/",
    gameList: "game/games/",
    avatars: "auth/avatars/",
    recoverPassword: "auth/password/reset/confirm/",
};

export const getPath = (path: keyof typeof paths) => `${paths[path]}`;
