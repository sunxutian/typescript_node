"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
exports.UserSchema = new mongoose_1.Schema({
    createdAt: { type: Date, default: Date.now },
    email: String,
    firstName: String,
    lastName: String,
    active: Boolean,
    id: { type: mongoose_1.Schema.Types.ObjectId, default: new mongoose_1.mongo.ObjectId() }
});
exports.UserSchema.pre("save", function (next) {
    var now = new Date();
    _this.createdAt = _this.createdAt || now;
    _this.id = _this.id || new mongoose_1.mongo.ObjectId();
    next();
});
exports.UserSchema.methods.fullName = function () {
    return (this.firstName.trim() + " " + this.lastName.trim());
};
exports.User = mongoose_1.model("user", exports.UserSchema);
//# sourceMappingURL=user.js.map