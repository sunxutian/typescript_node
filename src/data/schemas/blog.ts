import { Schema, Model, model, Document } from "mongoose";
import { IBlog } from "../../model/IBlog";

export interface IBlogModel extends IBlog, Document {
    findAllBlogsOfSameAuthor(): IBlogModel[];
}

export const BlogSchema: Schema = new Schema({
    title: String,
    author: String,
    body: String,
    comments: [
        {
            body: String,
            date: Date
        }
    ],
    date: Date,
    hidden: Boolean,
    meta: {
        votes: Number,
        favs: Number
    }
});

BlogSchema.methods.findAllBlogsOfSameAuthor = (cb: (err: any, res: IBlogModel[]) => void) => {
    let model: Model<IBlogModel> = this.model("blog");
    return model.find({ author: this.author }, cb);
};

export const Blog: Model<IBlogModel> = model<IBlogModel>("blog", BlogSchema);
