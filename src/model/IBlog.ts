export interface IComment {
    body: string;
    date: Date;
}

export interface IBlog {
    title: string;
    author: string;
    body?: string;
    comments: IComment[];
    date?: Date;
    hidden: {type:Boolean, default: false};
    meta: {
        votes: number;
        favs: number;
    };
}