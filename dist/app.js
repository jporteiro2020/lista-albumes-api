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
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const listaAlbums_1 = __importDefault(require("./routes/listaAlbums"));
const login_1 = __importDefault(require("./routes/login"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
class App {
    constructor() {
        //Se crea una instancia de express (Se crea la aplicación)
        this.app = (0, express_1.default)();
        this.settings();
        this.middlewares();
        this.routes();
    }
    settings() {
        this.app.set('port', process.env.PORT || 4000);
    }
    middlewares() {
        this.app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use((0, cors_1.default)());
    }
    routes() {
        this.app.use('/', listaAlbums_1.default);
        this.app.use('/', login_1.default);
    }
    listen() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.app.listen(this.app.get('port'));
            console.log(`El servidor HTTP está escuchando en el puerto ${this.app.get('port')}.`);
        });
    }
}
exports.App = App;
