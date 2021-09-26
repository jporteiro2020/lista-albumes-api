import { Router, Request, Response } from "express";
import { insertSolicitud } from "../persistencia/solicitud";
import { solicitud } from "../objects/solicitud";
import { token } from './login';
import { fetchArtista } from '../fetch/artista';
import { fetchAlbumes } from '../fetch/albumes';
const router = Router();

// este endpoint es para obtener la lista de álbumes, si el artista buscado existiese y este mismo tuviera álbumes.
router.get('/listarAlbumes', async (req: Request, res: Response): Promise<Response | void> => {
    // Valido que tengamos seteado el token para poder consumir la API
    if(token){
        const nombreArtista: string = req.query.nombreArtista as string;
        let ip: string | undefined = req.headers['x-forwarded-for'] as string || req.socket.remoteAddress;
        let idArtista: string | undefined | number;

        // Valido que el nombre del artista y la IP no estén vacías o indefinidas
        if(nombreArtista && ip){

            // Creo un objeto solicitud para enviarlo a la persistencia para insertar en la base de datos
            const nuevaSolicitud: solicitud = {
                ip: ip,
                nombreArtista: nombreArtista
            }

            try{
                // Ejecuto la función fetchArtista que se encuentra en la siguiente ruta: ../fetch/artista
                // el objetivo es obtener el id del artista, para luego hacer la búsqueda de sus álbumes.
                idArtista = await fetchArtista(nombreArtista, token);
            }catch(e){
                // Si entramos aquí es porque surgió un error en la ejecución de la función
                console.log(e);
                return res.status(500).json({ 
                    data: 'Hubo un error en el servidor'
                });
            }

            // Valido que el artista no esté vacío o indefinido y que no haya ocurrido un error en la función fetchArtista
            if(idArtista && idArtista != 'Hubo un error'){
                try{
                    // Ejecuto la función fetchAlbumes que se encuentra en la siguiente ruta: ../fetch/albumes
                    // el objetivo es obtener los álbumes del artista, que luego lo enviaré en el response
                    const albumes = await fetchAlbumes(idArtista, token);

                    // Ejecuto la función insertSolicitud que se encuentra en la siguiente ruta: ../persistencia/solicitud
                    // el objetivo es insertar en la base de datos algunos datos de la solicitud realizada por el usuario
                    const resultInsert = await insertSolicitud(nuevaSolicitud);

                    // Valido que no haya habido algún error en el momento de haber insertado el registro en la base de
                    // datos, y  que existan álbumes para devolver
                    if(resultInsert != -1 && albumes != "No hay albumes"){
                        return res.status(200).json({ 
                            data: albumes
                        });
                    }else{
                        if(resultInsert == -1){
                            return res.status(500).json({ 
                                data: 'Hubo un error al momento de insertar el registro en la base de datos'
                            });
                        }else{
                            return res.status(500).json({ 
                                data: 'No existen albumes para el artista seleccionado'
                            });
                        }
                        
                    }                   
                }catch(e){
                    // Si ingresamos aquí es porque tuvimos un error en el momento de buscar los álbumes o de insertar el
                    // registro en la base de datos
                    console.log(e);
                    return res.status(500).json({ 
                        data: 'Hubo un error en el servidor'
                    });
                }
            }else{
                // si ingresamos aquí es porque el artista buscado no existe o hubo un error en la búsqueda.
                console.log('El artsita ingresado no existe');
                return res.status(500).json({ 
                    data: 'El artsita ingresado no existe'
                });
            }
        }else{
            // si ingresamos aquí es porque el nombre del artista o la IP son indefinidos o tienen un valor "vacío"
            console.log('El nombre del artista o la IP no son correctos');
            return res.status(500).json({ 
                data: 'El nombre del artista o la IP no son correctos'
            });
        }
    }else{
        // Si ingresamos aquí es porque el Token es indefinido o vacío
        return res.status(500).json({ 
            data: 'Acceso no permitido'
        });
    }    
});

export default router;