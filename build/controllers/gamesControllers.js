"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gamesController = void 0;
const database_1 = __importDefault(require("../database"));
class GamesController {
    //Inicio de list
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const game = yield database_1.default.query(`
            call ListGames()
            `);
                res.json(game[0]);
            }
            catch (error) {
                console.log('Error Lista ///' + error);
            }
        });
    } //Fin de metodo list
    //Inicio de metedo getOne
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const game = yield database_1.default.query(`
            call ListOneGame
            ('${id}')
            `);
                if (game[0].length > 0) {
                    return res.json(game[0]);
                }
                res.status(404).json({ text: "The game doesn't exits" });
            }
            catch (error) {
                console.log('Error get One ++++++' + error);
            }
        });
    } //Fin getOne
    //Se manda a  llamar a la ruta gamerouter
    //Inicio create
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.default.query(`
            call insertGame
            ('${req.body.title}', '${req.body.description}', 
            '${req.body.image}')
            `);
            }
            catch (error) {
                console.log('Error ****' + error);
            }
            res.json({ Text: 'Creating Game' + req.body.title });
        });
    } //Fin de método para crear juego
    //Se manda a  llamar a la ruta gamrouter
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const game = yield database_1.default.query(`
            call DeleteGame
            ('${id}')
            `);
                res.json({ Text: 'Deleting Game' });
            }
            catch (error) {
                console.log('Error Deleting ++++++' + error);
            }
        });
    } //Fin de método para eleminar juego
    //Se manda a  llamar a la ruta gamrouter
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const game = yield database_1.default.query(`
            call UpdateGame
            ('${id}','${req.body.title}','${req.body.description}',
            '${req.body.image}')
            `);
                res.json({ Text: 'Udating Game' });
            }
            catch (error) {
                console.log('Error Deleting ++++++' + error);
            }
        });
    } //Fin de método para eleminar juego
} //Fin  de clase GamesController
exports.gamesController = new GamesController();
exports.default = GamesController;
