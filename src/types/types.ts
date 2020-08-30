export type avatar = {name: string; avatar: string; id: number};

export type User = {
    id: number;
    avatar_detail: avatar_detail;
    username: string;
    email: string;
    games: game[];
};

export type game = {
    game_event: number;
    date: string;
    game_name: string;
    game_logo: string;
    is_winner: boolean;
};

export type avatar_detail = {
    id: number;
    avatar: string;
    name: string;
};

export type game_summary = {
    id: number;
    name: string;
    logo: string;
    description: string;
};
