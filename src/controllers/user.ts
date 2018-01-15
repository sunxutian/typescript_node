import { IUserModel } from "../data/schemas/user";
import { DbModel, IDbModel } from "../data/dbModel";
import { Request, RequestHandler, Response, NextFunction } from "express";
import { IUser } from "../model/IUser";
import toAsync from "../utility/to";

const dbModel: IDbModel = DbModel.instance();

export const getAll: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    // let result: IUserModel[] = await dbModel.user.find();

    let { error, t: result } = await toAsync(dbModel.user.find());
    res.json(result);
};

export const getOne: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const name: string = req.params.userName;
    // let userFilter: IUser = {firstName: name};
    // case insensitive
    let result: IUserModel[] = await dbModel.user.find({ firstName: { $regex: new RegExp(name, "i") } });
    res.json(result);
};

export const search: RequestHandler = async (req: Request, res: Response, next: NextFunction | null | undefined) => {
    const body: IUser = <IUser>req.body;
    // let userFilter: IUser = {firstName: name};
    // case insensitive
    // let result: IUserModel[] = await dbModel.user.find(
    //     {
    //         firstName: { $regex: new RegExp(body.firstName, "i") },
    //         lastName: { $regex: new RegExp(body.lastName, "i") },
    //     }
    // );

    let findQuery: PromiseLike<IUserModel[]> = dbModel.user.find(
        {
            firstName: { $regex: new RegExp(body.firstName, "i") },
            lastName: { $regex: new RegExp(body.lastName, "i") },
        },
    );

    let {error, t:result} = await toAsync(findQuery);

    res.json(result);
    next();
};

// export const create: RequestHandler (req: Request, res: Response, next: NextFunction){

// }