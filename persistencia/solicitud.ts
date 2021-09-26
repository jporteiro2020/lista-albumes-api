import { pool } from "./persistencia";
import { solicitud } from "../objects/solicitud";

// con esta función inserto en la base de datos las peticiones.
// La tabla se llama SOLICITUD, y guarda la IP del usuario (Decidí permitir guardar el prefijo ::ffff:,
// se guardará otro prefijo distinto). Además, guardo el nombre del artista buscado y la fecha de la solicitud.
export async function insertSolicitud(solicitud: solicitud): Promise<number>{
    const client = await pool();
    
    try{
        if(solicitud.ip && solicitud.nombreArtista){
            const response: any = await client.query('INSERT INTO SOLICITUD (ipUsuario, nombreArtista) values (?, ?)', [solicitud.ip, solicitud.nombreArtista]);
            return response.affectedRows;
        }else{
            return -1;//El objeto solicitud es null o undefined
        }
    } catch(e){//Si hay un error, realizamos el rollback en la base de datos y lanzamos la excepción
        await client.query('ROLLBACK');
        throw e;
    } finally{//Pase lo que pase, liberamos la conexión de la base de datos
        client.end;
    }
}