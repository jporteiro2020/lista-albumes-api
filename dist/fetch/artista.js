"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchArtista = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
function fetchArtista(nombreArtista) {
    (0, node_fetch_1.default)('http://localhost:4000/');
}
exports.fetchArtista = fetchArtista;
