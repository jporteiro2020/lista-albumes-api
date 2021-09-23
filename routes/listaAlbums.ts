import { Router, Request, Response } from "express";
import { solicitud } from "../objects/solicitud";
import { code } from './login';
import fetch from "node-fetch";
import { fetchArtista } from '../fetch/artista';
import { fetchAlbumes } from '../fetch/albumes';
const router = Router();

router.get('/listarAlbumes', async (req: Request, res: Response): Promise<Response> => {

    if(code){
        const nombreArtista: string = req.params.nombreArtista;
        const ip: string | undefined = req.header('x-forwarded-for') || req.socket.remoteAddress;

        if(nombreArtista && ip){
            const nuevaSolicitud: solicitud = {
                ip: ip,
                nombreArtista: nombreArtista
            }


        }
        
        return res.status(200).json({ 
            data: 'hola'
        });
    }else{

        await fetch('http://localhost:4000/login');

        return res.status(200).json({ 
            data: 'redireccionando'
        });
    }

    
});

export default router;