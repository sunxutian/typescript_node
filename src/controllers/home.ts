import { RequestHandler, Request, Response, NextFunction } from "express";
import { DbModel, IDbModel } from "../data/dbModel";
import { IUser } from "../model/IUser";
import { IUserModel } from "../data/schemas/user";

export let home: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    // const dbModel: IDbModel = DbModel.instance();
    // let user: IUser = {
    //     firstName: "Alex",
    //     lastName: "Sun"
    // };

    // const dbUser: IUserModel = await dbModel.user.findOne(user);
    // if (!dbUser) {
    //     let creation: IUserModel = await dbModel.user.create(user);
    //     res.send(creation.fullName());
    // } else {
    //     res.send(dbUser.fullName());
    // }

    res.send("Welcome to my API!!");
};