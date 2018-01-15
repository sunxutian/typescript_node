"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
exports.BlogSchema = new mongoose_1.Schema({
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
exports.BlogSchema.methods.findAllBlogsOfSameAuthor = function (cb) {
    var model = _this.model("blog");
    return model.find({ author: _this.author }, cb);
};
exports.Blog = mongoose_1.model("blog", exports.BlogSchema);
//# sourceMappingURL=blog.js.map