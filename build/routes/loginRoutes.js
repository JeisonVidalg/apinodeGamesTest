"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loginControler_1 = require("../controllers/loginControler");
const passport_1 = __importDefault(require("passport"));
class LoginRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', loginControler_1.loginControler.listUser);
        this.router.post('/singup', loginControler_1.loginControler.InsertarLogin);
        this.router.post('/singin', loginControler_1.loginControler.Loguear);
        this.router.get('/special', passport_1.default.authenticate('jwt', { session: false }), loginControler_1.loginControler.special);
    }
}
const loginRoutes = new LoginRoutes();
exports.default = loginRoutes.router;
