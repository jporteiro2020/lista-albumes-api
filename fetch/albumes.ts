const fetch = require('node-fetch');

export function fetchAlbumes(idArtista: string, code: string) {
    if(idArtista && code){
        try{
            fetch(`https://api.spotify.com/v1/artists/${idArtista}/albums`, {
                method: 'GET',
                headers: { 
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${code}`
                }
            })
            .then(
                (response: any) => {
                    response.json();
                }
            )
            .then(
                (albumes: any) => {
                    console.log(albumes);
                    if(albumes.length > 0){
                        return albumes;
                    }else{
                        return 'No existe el artista';
                    }
                }
            );
        }catch(e){
            console.log(e);
            return 'Hubo un error';
        }
    }else{
        return 'id o code undefined';
    }
}