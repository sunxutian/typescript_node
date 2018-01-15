import { Document, Schema, Model, model } from "mongoose";
import { IBlogModel, Blog } from "./schemas/blog";
import { IUserModel, User } from "./schemas/user";

export interface IDbModel {
    user: Model<IUserModel>;
    blog: Model<IBlogModel>;
}

export class DbModel implements IDbModel {
    public user: Model<IUserModel>;
    public blog: Model<IBlogModel>;
    private static _model: DbModel;
    public static initialize(): void {
        DbModel._model = new DbModel();
    }
    static get instance(): IDbModel {
        if (!DbModel._model) {
            DbModel.initialize();
        }
        return DbModel._model;
    }
    private constructor() {
        this.user = User;
        this.blog = Blog;
    }
}