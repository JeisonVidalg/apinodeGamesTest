"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const gamesControllers_1 = require("../controllers/gamesControllers");
class GamesRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
        console.log('Nuevo agian');
    }
    config() {
        this.router.get('/', gamesControllers_1.gamesController.list);
        this.router.get('/:id', gamesControllers_1.gamesController.getOne);
        this.router.post('/', gamesControllers_1.gamesController.create);
        this.router.delete('/:id', gamesControllers_1.gamesController.delete);
        this.router.put('/:id', gamesControllers_1.gamesController.update);
    }
}
const gamesRoutes = new GamesRoutes();
exports.default = gamesRoutes.router;
