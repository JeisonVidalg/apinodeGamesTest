import { Router } from "express";
import{loginControler} from '../controllers/loginControler'
import passport from 'passport';



class LoginRoutes{

   
    public router :Router= Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/',loginControler.listUser)
        this.router.post('/singup', loginControler.InsertarLogin);
        this.router.post('/singin', loginControler.Loguear);
        this.router.get('/special', passport.authenticate('jwt',{session:false}),loginControler.special)
    }
   
}
const loginRoutes= new LoginRoutes();
export default loginRoutes.router;
