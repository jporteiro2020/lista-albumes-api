const fetch = require('node-fetch');

//función para obtener la información del artista, para ello consumo el servicio correspondiente de Spotify 
export async function fetchArtista(nombreArtista: string, token: string): Promise<string | undefined> {
    //valido si nombreArtista y Token no están indefinidos o vacíos
    if(nombreArtista && token){
        try{
            //consumo la API de spotify
            const response = await fetch(`https://api.spotify.com/v1/search?q=${nombreArtista}&type=artist`, {
                method: 'GET',
                headers: { 
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            const responseJson = await response.json();

            //Si tiene registros devuelvo el id del primer artista que se encuentra en el array
            if(responseJson.artists.items.lenth != 0){
                return responseJson.artists.items[0].id;
            } else{
                return 'Hubo un error';
            }
        }catch(e){
            // error al consumir la API, o al parsear a json();
            console.log(e);
            return 'Hubo un error';
        }
    }else{
        return 'nombre o code undefined';
    }
}