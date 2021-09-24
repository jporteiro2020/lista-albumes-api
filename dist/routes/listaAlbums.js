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
const express_1 = require("express");
const login_1 = require("./login");
//import fetch from 'node-fetch';
const artista_1 = require("../fetch/artista");
const router = (0, express_1.Router)();
router.get('/listarAlbumes', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (login_1.code) {
        const nombreArtista = req.params.nombreArtista;
        const ip = req.header('x-forwarded-for') || req.socket.remoteAddress;
        if (nombreArtista && ip) {
            const nuevaSolicitud = {
                ip: ip,
                nombreArtista: nombreArtista
            };
            (0, artista_1.fetchArtista)('hola');
        }
        return res.status(200).json({
            data: 'hola'
        });
    }
    else {
        fetch('http://localhost:4000/login');
        return res.status(200).json({
            data: 'redireccionando'
        });
    }
}));
exports.default = router;
