import express,{Application} from "express";
import morgan from 'morgan';
import cors from 'cors';

import indexRoutes from './routes/indexRoutes';
import gamesRoutes from './routes/gamesRoutes';
import loginRoutes from "./routes/loginRoutes";

import passportMiddleware from "./middlewares/passport";
import passport from 'passport'

 class Server{

     app: Application;

    constructor(){
        this.app= express();
        this.config();
        this.routes();
        
    }

    config() :void{
      
        this.app.set('port', process.env.PORT||3000)
        this.app.use(morgan('dev'));
        //Pide datos al servidor
        this.app.use(cors());
        //Prmite formatos Json para angular
        this.app.use(express.json());
        //Para valitadr envio en formato html
        this.app.use(express.urlencoded({extended:false}));
       
        this.app.use(passport.initialize());
        passport.use(passportMiddleware);

    }

    routes():void{
        this.app.use('/',indexRoutes);
        this.app.use('/api/games',gamesRoutes);
        this.app.use('/api/login',loginRoutes)
       
        
        
    }

    start(): void{
      this.app.listen(this.app.get('port'),()=>{
          console.log('Server on port', this.app.get('port'));
      });
    
    }
   
}//Fin de clase



const server =new Server();
server.start();
