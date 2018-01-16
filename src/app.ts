import * as express from "express";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as path from "path";
import * as dotenv from "dotenv";
import * as mongoose from "mongoose";
import * as fs from "fs";
import * as rfs from "rotating-file-stream";
import * as logger from "morgan";
import * as enums from "./utility/enums";
import { Document, Schema, Model, model } from "mongoose";
import * as homeController from "./controllers/home";
import * as userController from "./controllers/user";
import { IDbModel, DbModel } from "./data/dbModel";

dotenv.config({
    path: ".env.example"
});

class Server {
    public static bootstrap(): Server {
        return new Server();
    }

    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    private config(): void {
        this.app.use(express.static(path.join(__dirname, "public")));

        // mount json form parser
        this.app.use(bodyParser.json());

        // mount query string parser
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));

        // mount logger
        const logDirectory: string = path.join(__dirname, "../log");
        if (!fs.existsSync(logDirectory)) {
            fs.mkdirSync(logDirectory);
        }
        const accessFileStream: logger.StreamOptions = rfs("app.log", {
            interval: "1d", // rotate daily
            path: logDirectory
        });
        this.app.use(logger(enums.MorganLoggerLevel.Tiny, { stream: accessFileStream }));

        mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true }).then(
            () => {
                console.log("mongodb connected");
            },
        ).catch((err) => {
            console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
        });

        // init db
        DbModel.initialize();
    }

    private routes(): void {
        const appRouter: express.Router = express.Router();
        appRouter.get("/", homeController.home);
        appRouter.get("/user", userController.getAll);
        appRouter.get("/user/:userName", userController.getOne);
        appRouter.post("/user/search", userController.search);

        this.app.use("/api", appRouter);
    }
}

export const port: any = process.env.PORT || 3000;

const app: express.Application = Server.bootstrap().app;

export default app;
