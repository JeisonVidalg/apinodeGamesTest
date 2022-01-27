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
exports.loginControler = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const keys_1 = __importDefault(require("../keys"));
class LoginController {
    constructor() {
        this.InsertarLogin = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { userCorreo, password } = req.body;
            try {
                const login = yield database_1.default.query(`
            call userIdentify
            ('${userCorreo}')
            `);
                console.log("Insertar Login");
                if (login[0].length > 0) {
                    res.json("Correo ya existe");
                }
                else {
                    //Las veces que se va emcriptar
                    const salt = yield bcrypt_1.default.genSalt(10);
                    const hash = yield bcrypt_1.default.hash(req.body.password, salt);
                    const insertUser = yield database_1.default.query(`
               call insertarLogin
               ('${req.body.userCorreo}', '${hash}', 
               '${req.body.rolUser}')
               `);
                    res.json("Se ingresa con exito");
                }
            }
            catch (error) {
                console.log('Error singUp user ///', error);
            }
        }); //Fin de metodo InsertarLogin
        this.Loguear = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { userCorreo, password } = req.body;
            try {
                const login = yield database_1.default.query(`
            call userIdentify
            ('${userCorreo}')
            `);
                //Permite pasar de un  RowDataPacket a un objeto para extraer propiedades
                var login2 = JSON.stringify(login[0]);
                var Objeto = JSON.parse(login2);
                //********************************* */
                if (login[0].length > 0) {
                    //Para q se hagan a String
                    var valorEntradaPassword = req.body.password;
                    var valorEntradaUser = req.body.userCorreo;
                    var valorBd = Objeto[0].password;
                    /******************************* */
                    const x = yield this.getfunctionCampare(valorEntradaPassword, valorBd);
                    if (x) {
                        console.log('Se crea token');
                        const token = { token: this.createToken(valorEntradaUser, valorBd) };
                        res.json(token);
                    }
                    else {
                        res.json("incorrectos");
                    }
                }
                else {
                    res.json(" Usuario no existe");
                }
            }
            catch (error) {
                console.log('Error logueo ///', error);
            }
        }); //Fin de metodo listUser
        //Metodo para comparar contraseña del body y lo compara con la clave de la base de datos incriptada
        this.getfunctionCampare = (rq, res) => __awaiter(this, void 0, void 0, function* () {
            const isMacthc = yield bcrypt_1.default.compare(rq, res);
            return isMacthc;
        });
    }
    //Metodo que permite crear el Token
    createToken(userCorreoRB, passwordRB) {
        return jsonwebtoken_1.default.sign({ user: userCorreoRB, password: passwordRB }, keys_1.default.jwtSecret, {
            expiresIn: 86400
        });
    }
    //Traer datos  usuario
    listUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const login = yield database_1.default.query(`
        call ListUser()
        `);
                res.json(login[0]);
            }
            catch (error) {
                console.log('Error Lista user ///', error);
            }
        });
    } //Fin de metodo listUser
    special(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.json('Done Jason');
        });
    } //Fin de metodo listUserdd
    //Inicio  getOneLogin
    getOneLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userCorreo, password } = req.body;
            const jwt = require('jsonwebtoken');
            try {
                const login = yield database_1.default.query(`
        call userIdentify
        ('${userCorreo}','${password}')
        `);
                if (login[0].length > 0) {
                    //  const data : any = res.json(login[0]);
                    //Vamos creando el token (json, clave secreta)
                    const token = jwt.sing(res.json(login[0]), 'still');
                    res.json(token);
                }
                else {
                    res.json("Usuario  aaaa o clace incorrecta");
                }
            }
            catch (error) {
                console.log('Error Login/sin ///' + error);
            }
        });
    }
} //Fin de clase
exports.loginControler = new LoginController();
exports.default = LoginController;
