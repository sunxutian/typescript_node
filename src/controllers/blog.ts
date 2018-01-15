import { IBlogModel } from "../data/schemas/blog";
import { RequestHandler, Request, Response, NextFunction } from "express";
import toAsync from "../utility/to";
import { DbModel, IDbModel } from "../data/dbModel";

const dbModel: IDbModel = DbModel.instance;

export const getAllBlogs: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    let { error, t: blogs } = await toAsync(dbModel.blog.find());
    res.json(blogs);
};

export const getBlogOfUser: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const userName: string = req.params.userName;
    if (userName) {
        let filter: (blogs: IBlogModel[], name: string) => IBlogModel[] = (blogs, name) => {
            return blogs.filter(b => b.author.trim().toUpperCase() === name.trim().toUpperCase());
        };

        let { error, t: blogs } = await toAsync(dbModel.blog.find({
            author: { $regex: new RegExp(userName, "i") }
        }));

        if (!error) {
            return res.json(blogs);
        }

        return res.status(404).send("not found");
    }
};