"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.code = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
let code;
exports.code = code;
router.get('/login', function (req, res) {
    const scopes = 'user-read-private user-read-email';
    const client_id = '3a359dca36fd4b7e8bfdc81f22d6b7f7';
    const redirect_uri = 'http://localhost:4000/callback';
    res.redirect('https://accounts.spotify.com/authorize' +
        '?response_type=code' +
        '&client_id=' + client_id +
        (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
        '&redirect_uri=' + encodeURIComponent(redirect_uri));
});
router.get('/callback', function (req, res) {
    const error = req.query.error;
    exports.code = code = req.query.code;
    const state = req.query.state;
    console.log('error:', error);
    console.log('code:', code);
    console.log('state:', state);
    if (error && state) {
        console.log('error:', error);
        console.log('state:', state);
    }
    if (code && !error) {
        console.log(code);
        console.log(state);
        res.redirect('http://localhost:4000/estoEsUnaPrueba');
    }
});
exports.default = router;
