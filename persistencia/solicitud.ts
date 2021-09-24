import { pool } from "./persistencia";
import { solicitud } from "../objects/solicitud";

export async function insertSolicitud(solicitud: solicitud): Promise<number>{
    const client = await pool();
    
    try{
        if(solicitud.ip && solicitud.nombreArtista){
            const response = await client.query('INSERT INTO SOLICITUD (ipUsuario, nombreArtista) values ($1, $2)', [solicitud.ip, solicitud.nombreArtista]);
            console.log('response:', response);
            return 0;
            //return response.affectedRows;
        }else{
            return 1;//El objeto solicitud es null o undefined
        }
    } catch(e){//Si hay un error, realizamos el rollback en la base de datos y lanzamos la excepción
        await client.query('ROLLBACK');
        throw e;
    } finally{//Pase lo que pase, liberamos la conexión de la base de datos
        client.end;
    }

    return 1;
}