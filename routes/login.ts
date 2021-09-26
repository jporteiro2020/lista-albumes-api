import { Router, Request, Response } from "express";
const fetch = require('node-fetch');
import qs from "qs";
const router = Router();
let code: string = "";
let token: string = "";
const client_id: string = '3a359dca36fd4b7e8bfdc81f22d6b7f7';

// Esta ruta está definida para tener la autorización del usuario para utilizar su información de Spotify
router.get('/login', function(req: Request, res: Response): void {
    const scopes: string = 'user-read-private user-read-email';
    const redirect_uri: string = 'http://localhost:4000/callback';
    res.redirect('https://accounts.spotify.com/authorize' +
        '?response_type=code' +
        '&client_id=' + client_id +
        (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
        '&redirect_uri=' + encodeURIComponent(redirect_uri)
    );
});

// Función callback que se ejecutará luego de la autenticación en Spotify
router.get('/callback', async function(req: Request, res: Response): Promise<void> {
    const error = req.query.error;
    code = req.query.code as string;
    const state:string = req.query.state as string;

    if(error && state){
        console.log('error:', error);
        console.log('state:', state);
        res.redirect('http://localhost:3000/');
        return;
    }

    if(code && !error){
        // Ejecuto la función obtenerToken para ejecutar el paso 2, que es obtener el Token de Spotify para poder
        // enviar las request de los distintos endPoints que ofrece
        await obtenerToken();
        if(token){
            res.redirect('http://localhost:3000/buscador');
        }else{
            console.log("Se produjo un error")
        }
    }
});

// IDEM: función obtenerToken para ejecutar el paso 2, que es obtener el Token de Spotify para poder
// enviar las request de los distintos endPoints que ofrece
async function obtenerToken(){

    const params = qs.stringify({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: 'http://localhost:4000/callback'
    });
    
    try{
        const response = await fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                    "Content-type": "application/x-www-form-urlencoded",
                    'Authorization': 'Basic M2EzNTlkY2EzNmZkNGI3ZThiZmRjODFmMjJkNmI3Zjc6ZTdlMGMxOTNiMWQ4NDFhMGI3NDNlY2FmYzE4ZmRlNTU='
                },
                body:params
            });
        
        const respText = await response.text();
        const respJson = await JSON.parse(respText);

        token = respJson.access_token;

    }catch(e){
        console.log(e);
    }
}

export { token };
export default router;