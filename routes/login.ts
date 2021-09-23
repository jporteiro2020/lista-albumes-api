import { Router, Request, Response } from "express";
const router = Router();
let code: string;

router.get('/login', function(req: Request, res: Response): void {
    const scopes: string = 'user-read-private user-read-email';
    const client_id: string = '3a359dca36fd4b7e8bfdc81f22d6b7f7';
    const redirect_uri: string = 'http://localhost:4000/callback';
    res.redirect('https://accounts.spotify.com/authorize' +
        '?response_type=code' +
        '&client_id=' + client_id +
        (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
        '&redirect_uri=' + encodeURIComponent(redirect_uri)
    );
});

router.get('/callback', function(req: Request, res: Response): void {
    const error = req.query.error;
    code = req.query.code as string;
    const state:string = req.query.state as string;
    console.log('error:', error)
    console.log('code:', code);
    console.log('state:', state);

    if(error && state){
        console.log('error:', error);
        console.log('state:', state);
    }

    if(code && !error){
        console.log(code);
        console.log(state);

        res.redirect('http://localhost:4000/estoEsUnaPrueba');
    }
});

export {code};
export default router;