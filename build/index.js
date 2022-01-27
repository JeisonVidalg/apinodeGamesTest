"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const gamesRoutes_1 = __importDefault(require("./routes/gamesRoutes"));
const loginRoutes_1 = __importDefault(require("./routes/loginRoutes"));
const passport_1 = __importDefault(require("./middlewares/passport"));
const passport_2 = __importDefault(require("passport"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use((0, morgan_1.default)('dev'));
        //Pide datos al servidor
        this.app.use((0, cors_1.default)());
        //Prmite formatos Json para angular
        this.app.use(express_1.default.json());
        //Para valitadr envio en formato html
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use(passport_2.default.initialize());
        passport_2.default.use(passport_1.default);
    }
    routes() {
        this.app.use('/', indexRoutes_1.default);
        this.app.use('/api/games', gamesRoutes_1.default);
        this.app.use('/api/login', loginRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }
} //Fin de clase
const server = new Server();
server.start();
