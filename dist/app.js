"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var dotenv = require("dotenv");
var mongoose = require("mongoose");
var fs = require("fs");
var rfs = require("rotating-file-stream");
var logger = require("morgan");
var enums = require("./utility/enums");
var homeController = require("./controllers/home");
var userController = require("./controllers/user");
var dbModel_1 = require("./data/dbModel");
dotenv.config({
    path: ".env.example"
});
var Server = /** @class */ (function () {
    function Server() {
        this.app = express();
        this.config();
        this.routes();
    }
    Server.bootstrap = function () {
        return new Server();
    };
    Server.prototype.config = function () {
        this.app.use(express.static(path.join(__dirname, "public")));
        // mount json form parser
        this.app.use(bodyParser.json());
        // mount query string parser
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
        // mount logger
        var logDirectory = path.join(__dirname, "../log");
        if (!fs.existsSync(logDirectory)) {
            fs.mkdirSync(logDirectory);
        }
        var accessFileStream = rfs("app.log", {
            interval: "1d",
            path: logDirectory
        });
        this.app.use(logger(enums.MorganLoggerLevel.Tiny, { stream: accessFileStream }));
        mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true }).then(function () {
            console.log("mongodb connected");
        }).catch(function (err) {
            console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
        });
        // init db
        dbModel_1.DbModel.initialize();
    };
    Server.prototype.routes = function () {
        var appRouter = express.Router();
        appRouter.get("/", homeController.home);
        appRouter.get("/user", userController.getAll);
        appRouter.get("/user/:userName", userController.getOne);
        appRouter.post("/user/search", userController.search);
        this.app.use("/api", appRouter);
    };
    return Server;
}());
exports.port = process.env.PORT || 3000;
var app = Server.bootstrap().app;
exports.default = app;
//# sourceMappingURL=app.js.map