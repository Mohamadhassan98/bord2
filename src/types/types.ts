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

export type comment = {
    user_name: string;
    user_avatar: string;
    comment: string;
    date: string;
};

export type game_full = {
    id: number;
    mean_vote: number | null;
    images: {image: string}[];
    comments: comment[];
    name: string;
    min_player: number;
    max_player: number;
    tutorial_video: string;
    tutorial_doc: string;
    logo: string;
    slug: string;
    description: string;
    long_description: string;
    is_active: boolean;
};
