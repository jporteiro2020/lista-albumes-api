import express, {Application} from 'express';
import listaAlbum from './routes/listaAlbums';
import login from './routes/login';
import path from 'path';
import cors from 'cors';

export class App{

    private app: Application;

    constructor(){
        //Se crea una instancia de express (Se crea la aplicación)
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();      
    }

    private settings(){
        this.app.set('port', process.env.PORT || 4000);
    }

    private middlewares(){
        this.app.use(express.static(path.join(__dirname, "public")));
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(cors());
    }

    routes(){
        this.app.use('/', listaAlbum);
        this.app.use('/', login);
    }

    async listen(){
        await this.app.listen(this.app.get('port'));
        console.log(`El servidor HTTP está escuchando en el puerto ${this.app.get('port')}.`);
    }
}