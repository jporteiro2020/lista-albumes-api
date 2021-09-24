const fetch = require('node-fetch');

export function fetchArtista(nombreArtista: string, code: string): string | undefined {
    if(nombreArtista && code){
        try{
            fetch(`https://api.spotify.com/v1/search?q=${nombreArtista}%20bowra&type=artist`, {
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
                (artistas: any) => {
                    console.log(artistas);
                    if(artistas.length > 0){
                        return artistas;
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
        return 'nombre o code undefined';
    }
}