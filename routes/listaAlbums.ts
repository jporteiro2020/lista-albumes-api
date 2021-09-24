import { Router, Request, Response } from "express";
import { insertSolicitud } from "../persistencia/solicitud";
import { solicitud } from "../objects/solicitud";
import { code } from './login';
import { fetchArtista } from '../fetch/artista';
import { fetchAlbumes } from '../fetch/albumes';
const router = Router();

router.get('/listarAlbumes', async (req: Request, res: Response): Promise<Response> => {

    if(code){
        const nombreArtista: string = req.params.nombreArtista;
        const ip: string | undefined = req.header('x-forwarded-for') || req.socket.remoteAddress;
        let idArtista: string | undefined;

        if(nombreArtista && ip){
            const nuevaSolicitud: solicitud = {
                ip: ip,
                nombreArtista: nombreArtista
            }

            try{
                idArtista = await fetchArtista(nombreArtista, code);
            }catch(e){
                console.log(e);
                return res.status(500).json({ 
                    data: 'Hubo un error en el servidor'
                });
            }
            
            if(idArtista && idArtista != 'Hubo un error'){
                try{
                    const albumes = await fetchAlbumes(idArtista, code);
                    const resultInsert = await insertSolicitud(nuevaSolicitud);

                    if(resultInsert != 1){
                        return res.status(200).json({ 
                            data: albumes
                        });
                    }else{
                        return res.status(500).json({ 
                            data: 'Hubo un error en el servidor'
                        });
                    }
                }catch(e){
                    console.log(e);
                    return res.status(500).json({ 
                        data: 'Hubo un error en el servidor'
                    });
                }
            }else{
                console.log('error');
                return res.status(500).json({ 
                    data: 'Hubo un error en el servidor'
                });
            }
        }else{
            console.log('error');
            return res.status(500).json({ 
                data: 'Hubo un error en el servidor'
            });
        }
    }else{

        res.redirect('http://localhost:4000/estoEsUnaPrueba');

        return res.status(200).json({ 
            data: 'redireccionando'
        });
    }    
});

export default router;