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
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertSolicitud = void 0;
const persistencia_1 = require("./persistencia");
function insertSolicitud(solicitud) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield (0, persistencia_1.pool)();
        try {
            if (solicitud) {
                const response = yield client.query('INSERT INTO SOLICITUD (ipUsuario, nombreArtista) values ($1, $2)', [solicitud.ip, solicitud.nombreArtista]);
                console.log('response:', response);
            }
            else {
                return 1; //El objeto login es null o undefined
            }
        }
        catch (e) { //Si hay un error, realizamos el rollback en la base de datos y lanzamos la excepción
            yield client.query('ROLLBACK');
            throw e;
        }
        finally { //Pase lo que pase, liberamos la conexión de la base de datos
            client.end;
        }
        return 1;
    });
}
exports.insertSolicitud = insertSolicitud;
