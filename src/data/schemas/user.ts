import { Document, Schema, Model, model, mongo } from "mongoose";
import { IUser } from "../../model/IUser";

export interface IUserModel extends IUser, Document {
    fullName: () => string;
}

export const UserSchema: Schema = new Schema({
    createdAt: {type: Date, default: Date.now},
    email: String,
    firstName: String,
    lastName: String,
    active: Boolean,
    id: {type: Schema.Types.ObjectId, default: new mongo.ObjectId()}
});

UserSchema.pre("save", (next) => {
    let now: Date = new Date();
    this.createdAt = this.createdAt || now;
    this.id =  this.id || new mongo.ObjectId();
    next();
});

UserSchema.methods.fullName = function (): string {
    return (this.firstName.trim() + " " + this.lastName.trim());
};

export const User: Model<IUserModel> = model<IUserModel>("user", UserSchema);
