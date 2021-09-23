"use strict";
const express = require('express');
const cors = require('cors');
const path = require('path');
//Se crea una instancia de express (Se crea la aplicación)
const app = express();
//Settings
app.set('port', process.env.PORT || 4000);
// middlewares
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.listen(app.get('port'), function () {
    console.log(`El servidor HTTP está escuchando en el puerto ${app.get('port')}.`);
});
