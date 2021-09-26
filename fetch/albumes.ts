const fetch = require('node-fetch');

//función para obtener los álbumes del artista, para ello consumo el servicio correspondiente de Spotify 
export async function fetchAlbumes(idArtista: string, token: string): Promise<string | undefined> {
    //valido si idArtista y Token no están indefinidos o vacíos
    if(idArtista && token){
        try{
            //consumo la API de spotify
            const response = await fetch(`https://api.spotify.com/v1/artists/${idArtista}/albums`, {
                method: 'GET',
                headers: { 
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            const responseJson = await response.json();
            const items = responseJson.items;
           
            // Recorro la lista de ábumes para eliminar los álbumes repetidos
            // Es decir, elimino aquellos álbumes que tengan el mismo nombre
            let cantidadFor = items.length;
            console.log("cantidad items:", cantidadFor)
            for(let i = 0; i < cantidadFor; i++){
                for(let x=i+1; x<cantidadFor; x++){
                    if(items[i].name === items[x].name){
                        items.splice(items.indexOf(items[x]), 1);
                        cantidadFor -= 1;
                        i = 0;
                        x = 1;
                    }
                }
            }

            // Separo la lista en dos, por un lado dejo todos aquellos álbumes que tienen 
            // la fecha de lanzamiento con el siguiente formato: yyyy-mm-dd
            // y obtengo otra lista con aquellos álbumes que tienen la fecha de lanzamiento con el formato yyyyy
            // El objetivo de esto es primero ordenar los álbumes con formato de fecha yyyy-mm-aa
            // Luego ordenar las listas que solamente tengan el formato yyyy.
            let cantidad = items.length;
            let itemsYear: any = [];
            for(let i = 0; i < cantidad; i++){
                if(items[i].release_date_precision === 'year'){
                    itemsYear.push(items.splice(items.indexOf(items[i]), 1));
                    cantidad -= 1;
                }
            }
           
            // Ordeno la lista que contiene la fecha con formato yyyy-mm-dd
            items.sort(function(itemA: any, itemB: any){
                // Debo hacer un split para convertir el valor a string sin caracteres
                // tuve que hacer esto para poder ordenar correctamente el array
                let itemASplit = itemA.release_date.split('-');
                let itemBSplit = itemB.release_date.split('-');
                let dateA = "" + itemASplit[0] + itemASplit[1] + itemASplit[2];
                let dateB = "" + itemBSplit[0] + itemBSplit[1] + itemBSplit[2];
                if (dateA > dateB) {
                    return -1;
                }
                if (dateA > dateB) {
                    return 1;
                }
                return 0;
            });

            // Ordeno la lista que contiene la fecha con formato yyyy
            if(itemsYear.length > 0){
                itemsYear.sort(function(itemA: any, itemB: any){
                    // Debo hacer un split para convertir el valor a string sin caracteres
                    // tuve que hacer esto para poder ordenar correctamente el array
                    let dateA = "" + itemA.release_date;
                    let dateB = "" + itemB.release_date;
                    if (dateA > dateB) {
                        return -1;
                    }
                    if (dateA > dateB) {
                        return 1;
                    }
                    return 0;
                });

                // Aquí dejo los elementos que solamente tienen yyyy como fecha al final.
                for(let i = 0; i < itemsYear.length; i++){
                    Array.prototype.push.apply(items, itemsYear[i]);
                }
            }

            //Si tiene registros devuelvo los items (array con información de los albumes)
            if(items.length != 0){
                return items;
            }else{
                return "No hay albumes";
            }

        }catch(e){
            // error al consumir la API, o al parsear a json();
            console.log(e);
            return 'Hubo un error';
        }
    }else{
        return 'id o code undefined';
    }
}