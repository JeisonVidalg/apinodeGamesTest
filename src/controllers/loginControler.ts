import { request, Request,Response } from "express";
import pool from "../database";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

import secretJwt from '../keys'


 class LoginController{

    
   
     InsertarLogin=async( req :Request, res: Response):Promise<void>=>{
         
         const { userCorreo, password } = req.body;
        
        try {

            const login: any=  await pool.query( `
            call userIdentify
            ('${userCorreo}')
            `)
            console.log("Insertar Login"  );
            if(login[0].length > 0)
            {
                res.json("Correo ya existe")

            }else{
             
                //Las veces que se va emcriptar
               const salt = await bcrypt.genSalt(10);
               const hash = await bcrypt.hash(req.body.password, salt);
              const insertUser=  await pool.query ( `
               call insertarLogin
               ('${req.body.userCorreo}', '${hash}', 
               '${req.body.rolUser}')
               `)
               res.json("Se ingresa con exito")
            }

        } catch (error) {
            console.log('Error singUp user ///' , error);
        }
      
    } //Fin de metodo InsertarLogin
    

     Loguear=async( req :Request, res: Response):Promise<void>=>{
        const { userCorreo, password } = req.body;
       
        try {
            const login: any=  await pool.query( `
            call userIdentify
            ('${userCorreo}')
            `)
           //Permite pasar de un  RowDataPacket a un objeto para extraer propiedades
            var login2= JSON.stringify(login[0])
            var Objeto=JSON.parse(login2);
            //********************************* */
         
            if(login[0].length > 0){
    
               //Para q se hagan a String
               var valorEntradaPassword=req.body.password;
                var valorEntradaUser=req.body.userCorreo;
                var valorBd=Objeto[0].password;
                /******************************* */
              const x= await this.getfunctionCampare(valorEntradaPassword,valorBd)
              if(x){
                  console.log('Se crea token')
                const token= {token:this.createToken(valorEntradaUser,valorBd)}
               
                    res.json(token) 
              }else{
              res.json("incorrectos")
            }
            }else{
                res.json(" Usuario no existe")
            }
          
        } catch  (error) {
            console.log('Error logueo ///' , error);
        }
      
     } //Fin de metodo listUser

    //Metodo para comparar contraseña del body y lo compara con la clave de la base de datos incriptada
     getfunctionCampare=async (rq:any,res:any):Promise<Boolean>=>{
        const isMacthc=  await bcrypt.compare(rq,res)
        return isMacthc;
    }


    //Metodo que permite crear el Token
     createToken(userCorreoRB:any, passwordRB:any) {
       return jwt.sign({user:userCorreoRB,password:passwordRB},secretJwt.jwtSecret,{
            expiresIn:86400
        });
    }


    
  //Traer datos  usuario
  public async listUser( req :Request, res: Response):Promise<void>{
 
    try {

       const login= await pool.query ( `
        call ListUser()
        `)
        res.json(login[0])
    } catch (error) {
        console.log('Error Lista user ///' ,error);
    }
   
 } //Fin de metodo listUser


 public async special( req :Request, res: Response):Promise<void>{
 
    res.json('Done Jason')
   
 } //Fin de metodo listUserdd


//Inicio  getOneLogin


public async getOneLogin( req :Request, res: Response):Promise<void>{
    const { userCorreo, password } = req.body;
    const jwt = require('jsonwebtoken');
 
    
    try {
        const login: any=  await pool.query( `
        call userIdentify
        ('${userCorreo}','${password}')
        `)
        if(login[0].length > 0)
        {
        //  const data : any = res.json(login[0]);
          //Vamos creando el token (json, clave secreta)
         const token= jwt.sing(res.json(login[0]),'still')
         res.json(token);
         
        }else{
           res.json("Usuario  aaaa o clace incorrecta")
        }
        
    } catch (error) {
        console.log('Error Login/sin ///' +error);
    }
    
   
}

}//Fin de clase
export const loginControler= new LoginController();
export default LoginController;

