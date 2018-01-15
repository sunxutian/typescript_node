"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var blog_1 = require("./schemas/blog");
var user_1 = require("./schemas/user");
var DbModel = /** @class */ (function () {
    function DbModel() {
        this.user = user_1.User;
        this.blog = blog_1.Blog;
    }
    DbModel.initialize = function () {
        DbModel._model = new DbModel();
    };
    DbModel.instance = function () {
        if (!DbModel._model) {
            DbModel.initialize();
        }
        return DbModel._model;
    };
    return DbModel;
}());
exports.DbModel = DbModel;
//# sourceMappingURL=dbModel.js.map