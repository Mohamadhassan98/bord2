export const serverBaseAddress = "http://192.168.1.6:8000/";
const paths: {[key: string]: ((...a: any[]) => string) | string} = {
    login: "auth/login/",
    register: "auth/registration/",
    forgotPassword: "auth/password/reset/",
    avatars: "auth/avatars/",
    recoverPassword: "auth/password/reset/confirm/",
    currentUser: "auth/user/",
    changePassword: "auth/password/change/",
    logout: "auth/logout/",
    games: (search?: string) => `game/games${search ? `?search=${search}` : ""}`,
    game: (id: number) => `game/games/${id}`,
    createServer: (slug: string) => `${slug}/create_server`,
};

export const getPath = (path: keyof typeof paths, ...args: any[]) => {
    const currentPath = paths[path];
    return `${serverBaseAddress}${typeof currentPath === "string" ? currentPath : currentPath(...args)}`;
};
